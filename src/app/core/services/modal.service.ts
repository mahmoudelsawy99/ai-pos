import { Injectable, ComponentRef, createComponent, ApplicationRef, Injector, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModalConfig {
  title: string;
  content: Type<any>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponentRef: ComponentRef<any> | null = null;
  private modalConfig = new BehaviorSubject<ModalConfig | null>(null);
  modal$ = this.modalConfig.asObservable();

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(config: ModalConfig) {
    if (this.modalComponentRef) {
      this.close();
    }

    const componentRef = createComponent(config.content, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector
    });

    document.body.appendChild(componentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);
    this.modalComponentRef = componentRef;
    this.modalConfig.next(config);

    return this.modalConfig.asObservable();
  }

  close() {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
      this.modalConfig.next(null);
    }
  }
}
