import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService, ModalConfig } from '../../services/modal.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="modalConfig"
         class="fixed inset-0 z-50 overflow-y-auto"
         [@fadeInOut]>
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
           (click)="close()"></div>

      <!-- Modal -->
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8"
             [ngClass]="{
               'sm:max-w-sm': modalConfig.size === 'sm',
               'sm:max-w-md': modalConfig.size === 'md',
               'sm:max-w-lg': modalConfig.size === 'lg',
               'sm:max-w-xl': modalConfig.size === 'xl'
             }"
             [@slideInOut]>
          <!-- Header -->
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-start justify-between">
              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                {{ modalConfig.title }}
              </h3>
              <button
                (click)="close()"
                class="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <ng-container *ngComponentOutlet="modalConfig.content">
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit, OnDestroy {
  modalConfig: ModalConfig | null = null;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modal$.subscribe(config => {
      this.modalConfig = config;
    });
  }

  ngOnDestroy() {
    // Clean up any subscriptions if needed
  }

  close() {
    this.modalService.close();
  }
}
