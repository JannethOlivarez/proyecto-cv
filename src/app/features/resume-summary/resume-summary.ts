import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UIStateService } from '../../core/services/ui-state.service';
import data from '../../zdatos/datos.json';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-resume-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './resume-summary.html',
  styleUrl: './resume-summary.scss',
})
export class ResumeSummary {
  currentStep = signal(1);
  activePopover = signal<number | null>(null);
  isSticky = signal(false);
  expandedId = signal<number | null>(null);
  private uiService = inject(UIStateService);
  private scrollInterval: any;

  constructor() {
    effect(() => {
      const id = this.expandedId();
      this.stopAutoScroll();
      if (id !== null) {
        // Wait for DOM to render
        setTimeout(() => this.startAutoScroll(), 500);
      }
    });

    // Handle initial state if currentStep is 2
    if (this.currentStep() === 2 && this.workExperience.length > 0) {
      this.expandedId.set(this.workExperience[0].id);
    }
  }

  steps = [
    { id: 1, title: 'resume.steps.education' },
    { id: 2, title: 'resume.steps.experience' },
    { id: 3, title: 'resume.steps.courses' }
  ];

  courses = data.resumeSummary.courses;
  workExperience = data.resumeSummary.work_experience;
  education = data.resumeSummary.educacion;

  setStep(stepId: number) {
    this.currentStep.set(stepId);

    // Set default expansion for the first item in Step 2 (Work Experience)
    if (stepId === 2 && this.workExperience.length > 0) {
      this.expandedId.set(this.workExperience[0].id);
    } else {
      this.closeSummary();
    }

    this.closePopover();
  }

  showPopover(id: number) {
    if (!this.isSticky()) {
      this.activePopover.set(id);
    }
  }

  hidePopover() {
    if (!this.isSticky()) {
      this.activePopover.set(null);
    }
  }

  toggleSticky(id: number) {
    this.uiService.collapseSidebar();
    if (this.activePopover() === id && this.isSticky()) {
      this.closePopover();
    } else {
      this.activePopover.set(id);
      this.isSticky.set(true);
    }
  }

  closePopover() {
    this.activePopover.set(null);
    this.isSticky.set(false);
  }

  toggleSummary(id: number) {
    this.uiService.collapseSidebar();
    if (this.expandedId() === id) {
      this.closeSummary();
    } else {
      this.expandedId.set(id);
    }
  }

  closeSummary() {
    this.expandedId.set(null);
    this.stopAutoScroll();
  }

  scrollCarousel(direction: 'left' | 'right', event?: MouseEvent) {
    let container: HTMLElement | null = null;
    if (event) {
      const button = event.currentTarget as HTMLElement;
      container = button.parentElement?.querySelector('.tools-grid') as HTMLElement;
    } else {
      container = document.querySelector('.tools-grid') as HTMLElement;
    }

    if (container) {
      const scrollAmount = 150;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === 'right' && container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }

  startAutoScroll() {
    this.scrollInterval = setInterval(() => {
      this.scrollCarousel('right');
    }, 3000);
  }

  stopAutoScroll() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  getToolIcon(toolName: string): string {
    const normalized = toolName.toLowerCase().replace(/\s+/g, '');
    const iconMap: { [key: string]: string } = {
      'java': 'java-logo.png',
      'angular': 'angular_logo.png',
      'springboot': 'spring-logo.png',
      'spring': 'spring-logo.png',
      'springsecurity': 'spring-logo.png',
      'postgres': 'postgres-logo.png',
      'postgresql': 'postgres-logo.png',
      'postman': 'postman-logo.png',
      'git': 'git-logo.png',
      'node': 'nodejs-logo.jpg',
      'nodejs': 'nodejs-logo.jpg',
      'php': 'php-logo.png',
      'docker': 'docker-logo.png',
      'kubernetes': 'docker-logo.png',
      'axurerp': 'axure-logo.png',
      'trello': 'trello-logo.png',
      'mysql': 'mysql-logo.png',
      'oracle': 'oracle.png'
    };

    const icon = iconMap[normalized];
    return icon ? `assets/img/tecnologias/${icon}` : `assets/img/tecnologias/angular_logo.png`;
  }
}
