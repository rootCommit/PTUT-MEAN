import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/authentication/authentication.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  isLoading = false;
  totalProducts = 0;
  productsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 5, 10, 50];
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;
  private productsSub: Subscription;

  constructor(public productsService: ProductsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((productData: {products: Product[], productCount: number}) => {
        this.isLoading = false;
        this.products = productData.products;
        this.totalProducts = productData.productCount;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }

  onSearch(form:  NgForm) {
    this.isLoading = true;
    this.productsService.getProductsByCategory(form.value.category, this.productsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((productData: {products: Product[], productCount: number}) => {
        this.isLoading = false;
        this.products = productData.products;
        this.totalProducts = productData.productCount;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
  }

  onDelete(productId: string) {
    this.isLoading = true;
    this.productsService.deleteProduct(productId).subscribe(() => {
        this.productsService.getProducts(this.productsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
