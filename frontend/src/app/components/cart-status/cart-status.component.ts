import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: string = '';
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  private updateCartStatus(): void {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data.toFixed(2)
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
