import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIStateService } from '../../core/services/ui-state.service';
import data from '../../zdatos/datos.json';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private uiService = inject(UIStateService);
  isCollapsed = this.uiService.isSidebarCollapsed;
  personalData = data.datosPersonales;

  infoItems = [
    { label: 'sidebar.labels.email', value: this.personalData.email, icon: 'bi-envelope' },
    { label: 'sidebar.labels.phone', value: this.personalData.telefono, icon: 'bi-telephone' },
    { label: 'sidebar.labels.address', value: this.personalData.dirección, icon: 'bi-geo-alt' },
    { label: 'sidebar.labels.ci', value: this.personalData.ci, icon: 'bi-card-text' },
    { label: 'sidebar.labels.birthDate', value: this.personalData.fechaNacimiento, icon: 'bi-calendar-event' },
    { label: 'sidebar.labels.nationality', value: 'sidebar.values.ecuadorian', icon: 'bi-globe', translateValue: true },
    { label: 'sidebar.labels.civilStatus', value: 'sidebar.values.married', icon: 'bi-heart', translateValue: true },
    { label: 'sidebar.labels.languages', value: 'sidebar.values.english', icon: 'bi-translate', translateValue: true },
  ];

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  expand() {
    this.uiService.expandSidebar();
  }
}
