import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeScannerService } from '../../services/barcode-scanner.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Manual Input -->
      <div class="flex items-center space-x-2">
        <input
          type="text"
          [(ngModel)]="manualBarcode"
          (keyup.enter)="processManualBarcode()"
          placeholder="Enter barcode manually"
          class="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
        <button
          (click)="processManualBarcode()"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enter
        </button>
      </div>

      <!-- Camera Scanner -->
      <div class="relative">
        <video
          #videoElement
          class="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg"
          [class.hidden]="!isCameraActive"
        ></video>
        <div
          *ngIf="!isCameraActive"
          class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <button
            (click)="startScanner()"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Camera
          </button>
        </div>
        <div
          *ngIf="isCameraActive"
          class="absolute inset-0 flex items-center justify-center"
        >
          <div class="w-48 h-48 border-2 border-indigo-500 rounded-lg"></div>
        </div>
      </div>

      <!-- Error Message -->
      <div *ngIf="error" class="text-red-600 dark:text-red-400 text-sm">
        {{ error }}
      </div>
    </div>
  `
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  manualBarcode = '';
  isCameraActive = false;
  error = '';

  constructor(
    private barcodeScannerService: BarcodeScannerService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.barcodeScannerService.barcode$.subscribe(barcode => {
      this.processBarcode(barcode);
    });
  }

  ngOnDestroy() {
    this.stopScanner();
  }

  async startScanner() {
    try {
      this.error = '';
      await this.barcodeScannerService.initializeScanner(this.videoElement.nativeElement);
      this.isCameraActive = true;
    } catch (error) {
      this.error = 'Failed to start camera. Please check camera permissions.';
      console.error('Error starting scanner:', error);
    }
  }

  async stopScanner() {
    try {
      await this.barcodeScannerService.stopScanner();
      this.isCameraActive = false;
    } catch (error) {
      console.error('Error stopping scanner:', error);
    }
  }

  processManualBarcode() {
    if (this.manualBarcode.trim()) {
      this.barcodeScannerService.processBarcode(this.manualBarcode.trim());
      this.manualBarcode = '';
    }
  }

  private processBarcode(barcode: string) {
    // Close the modal and process the barcode
    this.modalService.close();
    // TODO: Handle the barcode (e.g., add product to cart)
    console.log('Scanned barcode:', barcode);
  }

  static showScanner(modalService: ModalService) {
    modalService.open({
      title: 'Scan Barcode',
      content: BarcodeScannerComponent,
      size: 'md'
    });
  }
}
