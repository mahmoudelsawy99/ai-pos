import {Inject, Injectable, LOCALE_ID, OnDestroy} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {map, share, shareReplay, takeUntil} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Injectable()
export class TimeService implements OnDestroy {
  public appTime$: Observable<Date>;

  private unsubscribe: Subject<any> = new Subject<any>();

  public dayOfWeekStr: string = '';
  private dayOfWeekNum: number = 0;
  private usWeekDays: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.appTime$ =
      timer(0, 1000)
        .pipe(
          map(() => new Date()),
          share()
        );


    this.appTime$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(t => {
        this.dayOfWeekStr = formatDate(t, 'EEE', this.locale);
        this.dayOfWeekNum = this.usWeekDays.indexOf(this.dayOfWeekStr);
      });
  }
  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
export interface CartItem {
  id: string;
  category: string;
  delete: any;
  product: string;
  quantity: number;
  price: number;
  total_price: number;
  discountsApplied?: string;
  appliedTo?: string;
  applyTo: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  available: string;
  applyTo?: string;
}

export interface Promotion {
  id: string;
  name: string;
  category: string;
  price: string;
  available: string;
  applyTo?: string;
}

export interface ConfigJson {
  products: Product[];
  promotions: Promotion[];
}
