import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { ToastComponent } from './core/components/toast/toast.component';
import { ModalComponent } from './core/components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, ToastComponent, ModalComponent],
  template: `
    <!-- <app-layout> -->
      <router-outlet></router-outlet>
    <!-- </app-layout> -->
    <app-toast></app-toast>
    <app-modal></app-modal>
  `,
  styles: []
})
export class AppComponent {
  title = 'POS System';
}
