import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: any;
  timestamp: Date;
  ipAddress?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private logs = new BehaviorSubject<AuditLogEntry[]>([]);
  logs$ = this.logs.asObservable();

  constructor() {
    // Load logs from localStorage on initialization
    const savedLogs = localStorage.getItem('auditLogs');
    if (savedLogs) {
      this.logs.next(JSON.parse(savedLogs));
    }
  }

  logAction(userId: string, userName: string, action: string, details: any) {
    const entry: AuditLogEntry = {
      id: this.generateId(),
      userId,
      userName,
      action,
      details,
      timestamp: new Date(),
      ipAddress: this.getClientIp()
    };

    const currentLogs = this.logs.value;
    this.logs.next([entry, ...currentLogs]);
    this.saveLogs();
  }

  getLogs(): Observable<AuditLogEntry[]> {
    return this.logs$;
  }

  clearLogs() {
    this.logs.next([]);
    this.saveLogs();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getClientIp(): string {
    // In a real application, you would get this from the server
    return '127.0.0.1';
  }

  private saveLogs() {
    localStorage.setItem('auditLogs', JSON.stringify(this.logs.value));
  }
}
