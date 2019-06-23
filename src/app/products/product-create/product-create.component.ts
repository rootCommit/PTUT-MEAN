import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// On supprime l'importation de NgForm, nous allons utilisé FormGroup pour l'approche réactive.

import { ProductsService } from '../products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product.model';
import { mimeType } from './mime-type.validator';
import { AuthService } from 'src/app/authentication/authentication.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit, OnDestroy {
  form: FormGroup; // on définit notre formulaire comme étant de type FormGroup
  imagePreview: string; // pour afficher l'image, il faut la convertir
  product: Product;
  isLoading = false;
  private mode = 'create';
  private productId: string;
  private authStatusSub: Subscription;

  constructor(
    public productsService: ProductsService,
    public route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
        authStatus => {
          this.isLoading = false;
      });
      this.form = new FormGroup({ // on initialise notre formulaire
        'image': new FormControl(null, {validators: [Validators.required],
                                asyncValidators: [mimeType]}),
        'reference': new FormControl(null, {validators: [Validators.required]}), // on crée un contrôleur
        'price': new FormControl(null, {validators: [Validators.required]}),
        'description': new FormControl(null, {validators: [Validators.required]}),
        'brand': new FormControl(null, {validators: [Validators.required]}),
        'category': new FormControl(null, {validators: [Validators.required]}),
        'color': new FormControl(null, {validators: []}),
        'weight': new FormControl(null, {validators: []}),
        'length': new FormControl(null, {validators: []}),
        'width': new FormControl(null, {validators: []}),
        'height': new FormControl(null, {validators: []})
      });
    // paramMap est un Observer sur lequel on peut utiliser subscribe()
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.productsService.getProduct(this.productId)
          .subscribe(productData => {
            this.isLoading = false;
            this.product = {id: productData._id,
                            reference: productData.reference,
                            imagePath: productData.imagePath,
                            price: productData.price,
                            description: productData.description,
                            brand: productData.brand,
                            color: productData.color,
                            weight: productData.weight,
                            length: productData.length,
                            width: productData.width,
                            height: productData.height,
                            category: productData.category,
                            creator: productData.creator
            };
            console.log(this.product.imagePath);
          this.form.setValue({reference: this.product.reference,
                              image: this.product.imagePath,
                              price: this.product.price,
                              description: this.product.description,
                              brand: this.product.brand,
                              color: this.product.color,
                              weight: this.product.weight,
                              length: this.product.length,
                              width: this.product.width,
                              height: this.product.height,
                              category: this.product.category
          });
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }

    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    // Ci-dessous, nous convertissons l'image afin qu'elle puisse être affiché
    const reader = new FileReader();
    // onload est une méthode asynchrone
    reader.onload = () => {
      this.imagePreview = <string>(reader.result);
      // ne pas oublier <string> à la compilation, le terminal renvoie une erreur.
      // vous pourrez effectuer l'action prévue, mais un code sans erreur est toujours plus agréable pour le développeur
    };
    reader.readAsDataURL(file);
  }

  onSaveProducts() {
    if (this.form.invalid) {
      return;
    }
   this.isLoading = true;
    if (this.mode === 'create') {
      this.productsService.addProduct(
        this.form.value.reference,
        this.form.value.image,
        this.form.value.price,
        this.form.value.description,
        this.form.value.brand,
        this.form.value.color,
        this.form.value.weight,
        this.form.value.length,
        this.form.value.width,
        this.form.value.height,
        this.form.value.category);
    } else {
        this.productsService.updateProduct(
          this.productId,
          this.form.value.reference,
          this.form.value.image,
          this.form.value.price,
          this.form.value.description,
          this.form.value.brand,
          this.form.value.color,
          this.form.value.weight,
          this.form.value.length,
          this.form.value.width,
          this.form.value.height,
          this.form.value.category);
    }
    this.form.reset(); // on modifie la méthode resetForm() par la méthode reset()
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}

