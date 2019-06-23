import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
// of est une façon rapide et facile d'ajouter et créer un observable qui émettra les données immédiatement
// Contiendra le validateur d'image : respect du format par exemple
export const mimeType = (control: AbstractControl
  ): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
    /*
    tâche asynchrone
    <{[key: string]: any}> : l'objet possèdera une propriété qui peut être interprété
    comme une chaîne de caractère et où on ne se préoccupe pas du nom (d'où 'key')
    les {} n'indiquent pas une liste, mais simplement que la propriété est dynamique
  */
  if (typeof(control.value) === 'string') {
    return of(null); // retourne que le type est valide
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener('loadend', () => {
      const array = new Uint8Array(<ArrayBuffer>fileReader.result).subarray(0, 4);
      // <ArrayBuffer> permet d'éviter les erreurs d'assignation de type lors de la compilation
      let header = ''; // 'let' permet de créer une variable qui n'existe qu'entre les {} où elle se trouve
      let isValid = false;
      for (let i = 0; i < array.length; i++) {
        header += array[i].toString(16);
      }
      switch (header) {
        case '89504e47': // Signature de fichier .png
          isValid = true;
          break;
        case 'ffd8ffe0': //
        case 'ffd8ffe1': //
        case 'ffd8ffe2': // Signature de fichier .jpeg / .jpg
        case 'ffd8ffe3': //
        case 'ffd8ffe8': //
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
