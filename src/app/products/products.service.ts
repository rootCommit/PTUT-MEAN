import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './product.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL + '/products/';

@Injectable({providedIn: 'root'})
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{products: Product[], productCount: number}>();


  constructor(private http: HttpClient, private router: Router) {}


  getProductsByCategory(category: string, productsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}&category=${category}`;

    this.http.get<{message: string, products: any, maxProducts: number}>
    (BACKEND_URL + 'filtres/' + category + queryParams
    ) .pipe(map((productData) => {
        return { products: productData.products.map(product => {
            return {
              reference: product.reference,
              imagePath: product.imagePath,
              price: product.price,
              description: product.description,
              brand: product.brand,
              color: product.color,
              weight: product.weight,
              length: product.length,
              width: product.width,
              height: product.height,
              category: product.category,
              id: product._id,
              creator: product.creator
            };
          }),
          maxProducts: productData.maxProducts
        };
      }))
      .subscribe(transformedProductData => {
        //  console.log(transformedProductData);
        this.products = transformedProductData.products;
        this.productsUpdated.next({products: [...this.products], productCount: transformedProductData.maxProducts});
      });
  }
  // Retourne la liste de tous les produits dans la base de donnée

  getProducts(productsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;

    // `` permet d'ajouter dynamiquement des valeurs dans une chaîne de caractère

    this.http.get<{message: string, products: any, maxProducts: number}>(
      BACKEND_URL + queryParams
      )
      // Solution au problème de model front-end et model back-end (cf. /backend/routes/products.js)
      .pipe(map((productData) => {
        return { products: productData.products.map(product => {
            return {
              reference: product.reference,
              imagePath: product.imagePath,
              price: product.price,
              description: product.description,
              brand: product.brand,
              color: product.color,
              weight: product.weight,
              length: product.length,
              width: product.width,
              height: product.height,
              category: product.category,
              id: product._id,
              creator: product.creator
            };
          }),
          maxProducts: productData.maxProducts
        };
      }))
      .subscribe(transformedProductData => {
        //  console.log(transformedProductData);
        this.products = transformedProductData.products;
        this.productsUpdated.next({products: [...this.products], productCount: transformedProductData.maxProducts});
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      reference: string;
      imagePath: string;
      price: number;
      description: string;
      brand: string;
      color: string;
      weight: number;
      length: number;
      width: number;
      height: number;
      category: string;
      creator: string;
    }>
    (BACKEND_URL + id);
  }


  addProduct(reference: string,
             image: File,
             price: number,
             description: string,
             brand: string,
             color: string,
             weight: number,
             length: number,
             width: number,
             height: number,
             category: string) {

  /*  const product: Product = {id: null,
                              reference: reference,
                              price: price,
                              description: description,
                              brand: brand,
                              color: color,
                              weight: weight,
                              length: length,
                              width: width,
                              height: height};

  */

    /*
      On ne renvoie plus un fichier JSON sur le back-end car cela ne prend pas
      en compte les fichiers, seulement du texte.
      Pour prend en compte les fichiers, on renverra un objet de type FormData
    */

    const productData = new FormData();
    productData.append('reference', reference);
    productData.append('image', image, reference);
    productData.append('price', price.toString());
    productData.append('description', description);
    productData.append('brand', brand);
    productData.append('color', color);
    if (weight !== null) {
      productData.append('weight', weight.toString());
    } else {
      productData.append('weight', null);
    }
    if (length !== null) {
      productData.append('length', length.toString());
    } else {
      productData.append('length', null);
    }
    if (width !== null) {
      productData.append('width', width.toString());
    } else {
      productData.append('width', null);
    }
    if (height !== null) {
      productData.append('height', height.toString());
    } else {
      productData.append('height', null);
    }
    productData.append('category', category);

    this.http
      .post<{message: string, product: Product}>(
        BACKEND_URL,
        productData)
      .subscribe((responseData) => {
      /*
        // pour pouvoir ajouter puis supprimer un produit sans avoir à recharger la page
        const product: Product = {id: responseData.product.id,
                                  reference: reference,
                                  imagePath: responseData.product.imagePath,
                                  price: price,
                                  description: description,
                                  brand: brand,
                                  color: color,
                                  weight: weight,
                                  length: length,
                                  width: width,
                                  height: height
                                };
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
        // la méthode navigate() d'un objet de type Router permet de naviguer dans les pages configurées lorsqu'une MàJ de la page est faite
      */
        this.router.navigate(['/']);
      });
  }

  updateProduct(id: string,
                reference: string,
                image: File | string,
                price: number,
                description: string,
                brand: string,
                color: string,
                weight: number,
                length: number,
                width: number,
                height: number,
                category: string) {
    let productData: Product | FormData;
    if (typeof(image) === 'object') {
      productData = new FormData();
      productData.append('id', id);
      productData.append('reference', reference);
      productData.append('image', image, reference); // reference constitue le nom de l'image
      productData.append('description', description);
      productData.append('category', category);
      productData.append('brand', brand);
      productData.append('color', color);
      productData.append('price', price.toString());
      if (weight !== null) {
        productData.append('weight', weight.toString());
      } else {
        productData.append('weight', null);
      }
      if (length !== null) {
        productData.append('length', length.toString());
      } else {
        productData.append('length', null);
      }
      if (width !== null) {
        productData.append('width', width.toString());
      } else {
        productData.append('width', null);
      }
      if (height !== null) {
        productData.append('height', height.toString());
      } else {
        productData.append('height', null);
      }
    } else {
      productData = {
        id: id,
        reference: reference,
        imagePath: image,
        price: price,
        description: description,
        brand: brand,
        color: color,
        weight: weight,
        length: length,
        width: width,
        height: height,
        category: category,
        creator: null
      };
    }
    this.http.put(BACKEND_URL + id, productData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete(BACKEND_URL + productId);

  }
}
