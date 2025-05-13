import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogService, AuditLogEntry } from '../../services/audit-log.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Audit Log</h3>
        <button
          (click)="clearLogs()"
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Clear Logs
        </button>
      </div>

      <!-- Log Entries -->
      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Timestamp</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">User</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Action</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Details</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">IP Address</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            <tr *ngFor="let entry of logs">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 dark:text-gray-400 sm:pl-6">
                {{ entry.timestamp | date:'medium' }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ entry.userName }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ entry.action }}
              </td>
              <td class="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                <pre class="whitespace-pre-wrap">{{ entry.details | json }}</pre>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ entry.ipAddress }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AuditLogComponent implements OnInit {
  logs: AuditLogEntry[] = [];

  constructor(
    private auditLogService: AuditLogService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.auditLogService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }

  clearLogs() {
    if (confirm('Are you sure you want to clear all audit logs?')) {
      this.auditLogService.clearLogs();
    }
  }

  static showLogs(modalService: ModalService) {
    modalService.open({
      title: 'Audit Log',
      content: AuditLogComponent,
      size: 'xl'
    });
  }
}
