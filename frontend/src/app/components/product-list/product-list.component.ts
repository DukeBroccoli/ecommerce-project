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

  searchMode: boolean = false;

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

    this.productService.searchProducts(searchKeyWord).subscribe(
      data => {
        this.products = data;
      }
    );
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

    // get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

}
