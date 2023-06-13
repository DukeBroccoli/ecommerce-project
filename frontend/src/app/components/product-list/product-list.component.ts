import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit  {

  products: Product[] = [];

  // default to category 1 (Books)
  currentCategoryId: number = 1;
  currentCategoryName: string = 'Books';

  previousCategoryId: number = 1;
  previousKeyword: string = "";

  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    });
  }
  
  listProducts(): void {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.listProductsBySearch();
    }
    else {
      this.listProductsByCategory();
    }
  }

  listProductsBySearch(): void {
    
    const searchKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;

    if(searchKeyWord != this.previousKeyword) {
      this.pageNumber = 1;
      this.previousKeyword = searchKeyWord;
    }

    console.log(`currentSearchKeyword=${searchKeyWord}, pageNumber=${this.pageNumber}`);

    this.productService.searchProductsPaginate(this.pageNumber - 1, 
                                       this.pageSize,
                                       searchKeyWord).subscribe(this.processResult());
  }

  listProductsByCategory(): void {

    // check if "id" parameter is available at the moment for the activated route
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      // get the "id" param string and convert to number
      // "+" for converting string to number, "!" for not-null assertion
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }

    // check if we have a different category id than the previous one
    // for example, change category when at page 2: needs to reset page number to 1
    // because Angular reuses a component if it's currently being used
    if(this.currentCategoryId != this.previousCategoryId) {
      this.pageNumber = 1;
      this.previousCategoryId = this.currentCategoryId;
    }

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    // get the products for the given category id
    // "-1" since pages in Spring Data REST are 0-based
    this.productService.getProductsByCategoryPaginate(this.pageNumber - 1,
                                               this.pageSize,
                                               this.currentCategoryId).subscribe(this.processResult());
  }

  private processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(newPageSize: string): void {
    this.pageSize = +newPageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

}
