import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BrowserMultiFormatReader, Result } from '@zxing/library';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
  private scanner: BrowserMultiFormatReader | null = null;
  private barcodeSubject = new Subject<string>();
  barcode$ = this.barcodeSubject.asObservable();

  constructor() {}

  async initializeScanner(videoElement: HTMLVideoElement): Promise<void> {
    try {
      this.scanner = new BrowserMultiFormatReader();
      await this.scanner.decodeFromVideoDevice(null, videoElement, (result: Result | null) => {
        if (result) {
          this.barcodeSubject.next(result.getText());
        }
      });
    } catch (error) {
      console.error('Error initializing barcode scanner:', error);
      throw error;
    }
  }

  async stopScanner(): Promise<void> {
    if (this.scanner) {
      await this.scanner.reset();
      this.scanner = null;
    }
  }

  // For manual barcode input
  processBarcode(barcode: string) {
    this.barcodeSubject.next(barcode);
  }
}
