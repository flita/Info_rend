import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders$!: Observable<Cart[]>;

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    this.orders$ = this.fetchAll();
  }

  fetchAll(): Observable<Cart[]> {
    return this.cartService.getCart();
  }

  delete(id: Pick<Cart, 'id'>): void {
    this.cartService.deleteCart(id).subscribe(() => (this.orders$ = this.fetchAll()));
  }
}
