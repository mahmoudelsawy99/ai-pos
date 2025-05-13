import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  description: string;
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {
  private shortcuts: KeyboardShortcut[] = [];
  private subscription: Subscription;

  constructor() {
    this.subscription = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(event => {
          const shortcut = this.shortcuts.find(s =>
            s.key.toLowerCase() === event.key.toLowerCase() &&
            s.ctrlKey === event.ctrlKey &&
            s.altKey === event.altKey &&
            s.shiftKey === event.shiftKey
          );
          return !!shortcut;
        })
      )
      .subscribe(event => {
        event.preventDefault();
        const shortcut = this.shortcuts.find(s =>
          s.key.toLowerCase() === event.key.toLowerCase() &&
          s.ctrlKey === event.ctrlKey &&
          s.altKey === event.altKey &&
          s.shiftKey === event.shiftKey
        );
        if (shortcut) {
          shortcut.action();
        }
      });
  }

  registerShortcut(shortcut: KeyboardShortcut) {
    this.shortcuts.push(shortcut);
  }

  unregisterShortcut(shortcut: KeyboardShortcut) {
    const index = this.shortcuts.findIndex(s =>
      s.key === shortcut.key &&
      s.ctrlKey === shortcut.ctrlKey &&
      s.altKey === shortcut.altKey &&
      s.shiftKey === shortcut.shiftKey
    );
    if (index !== -1) {
      this.shortcuts.splice(index, 1);
    }
  }

  getShortcuts(): KeyboardShortcut[] {
    return [...this.shortcuts];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
