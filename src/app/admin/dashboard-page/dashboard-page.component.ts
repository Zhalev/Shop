import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products = [];
  pSub: Subscription;
  rSub: Subscription;

  constructor(
    private productServ: ProductService,
  ) {
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  remove(id): void {
    this.rSub = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

}
