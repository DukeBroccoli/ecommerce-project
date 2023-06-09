import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {

  constructor(private router: Router) { }

  searchProduct(searchKeyWord: string): void {
    console.log(`searchKeyWord=${searchKeyWord}`);
    this.router.navigateByUrl(`/search/${searchKeyWord}`);
  }
}
