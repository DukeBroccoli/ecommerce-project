import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(itemToBeAdded: CartItem) {

    let existingCartItem = this.cartItems.find(
      cartItem => cartItem.id == itemToBeAdded.id
    );

    if(existingCartItem != undefined) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(itemToBeAdded);
    }

    this.computeTotals();
  }

  private computeTotals() {

    let newTotalPrice: number = 0;
    let newTotalQuantity: number = 0;

    for(let cartItem of this.cartItems) {
      newTotalPrice += cartItem.quantity * cartItem.unitPrice;
      newTotalQuantity += cartItem.quantity;
    }

    // publish new values to all subcribers
    this.totalPrice.next(newTotalPrice);
    this.totalQuantity.next(newTotalQuantity);

    // log new values
    this.logCaratData(newTotalPrice, newTotalQuantity);
  }

  private logCaratData(newTotalPrice: number, newTotalQuantity: number) {

    console.log('Contents of the cart:');
    for(let cartItem of this.cartItems) {
      const subTotal = cartItem.quantity * cartItem.unitPrice;
      console.log(`name: ${cartItem.name}, quantity: ${cartItem.quantity}, `
            + `unitPrice: ${cartItem.unitPrice}, subTotal: ${subTotal}`);
    }

    console.log(`totalPrice: ${newTotalPrice.toFixed(2)}, totalQuantity: ${newTotalQuantity}`);
    console.log('-----');
  }
}
