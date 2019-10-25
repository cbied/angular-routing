import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) { }


  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }


  ngOnInit() {
    return +this.activatedRoute.paramMap.subscribe(
      params => {
        const id: number = +params.get('id');
        this.getProduct(id);
      }
    );

  }
}
