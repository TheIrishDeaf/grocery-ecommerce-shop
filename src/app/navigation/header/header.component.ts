import { Component, OnInit, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DatabaseUser } from 'src/app/shared/models/users.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  cart$: Observable<ShoppingCart>

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    public authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    // TODO: AUTH
    this.cart$ = await this.shoppingCartService.getCart();

  }

  ngAfterViewInit() {
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }

}
