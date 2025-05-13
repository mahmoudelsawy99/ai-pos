import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { KeyboardShortcutsService } from '../../services/keyboard-shortcuts.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-keyboard-shortcuts',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  {{ 'keyboard.shortcuts' | translate }}
                </h3>
                <div class="mt-4">
                  <div class="space-y-4">
                    <div *ngFor="let shortcut of shortcuts" class="flex items-center justify-between">
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{ shortcut.description | translate }}</span>
                      <div class="flex items-center space-x-2">
                        <kbd *ngIf="shortcut.ctrlKey" class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                          Ctrl
                        </kbd>
                        <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                          {{ shortcut.key.toUpperCase() }}
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              (click)="close()"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              {{ 'common.close' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class KeyboardShortcutsComponent implements OnInit {
  shortcuts: any[] = [];

  constructor(
    private modalService: ModalService,
    private keyboardShortcutsService: KeyboardShortcutsService
  ) {}

  ngOnInit() {
    this.shortcuts = this.keyboardShortcutsService.getShortcuts();
  }

  close() {
    this.modalService.close();
  }

  static showHelp(modalService: ModalService) {
    modalService.open({
      title: 'Keyboard Shortcuts',
      content: KeyboardShortcutsComponent,
      size: 'md'
    });
  }
}
