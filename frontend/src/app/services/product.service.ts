import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(pageNumber: number,
                         pageSize: number,
                         categoryId: number): Observable<GetResponseProductList> {
    
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryIdIs?id=${categoryId}`
            + `&page=${pageNumber}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProductList>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetReponseProductCategoryList>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(searchKeyWord: string): Observable<Product[]> {

    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${searchKeyWord}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProductList>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {

    const searchUrl: string = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(searchUrl);
  }
}


interface GetResponseProductList {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetReponseProductCategoryList {
  _embedded: {
    productCategory: ProductCategory[];
  }
}