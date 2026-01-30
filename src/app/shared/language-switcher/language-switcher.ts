import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Lang } from '../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private langService = inject(LanguageService);

  currentLang = this.langService.lang;
  isSpanish = computed(() => this.currentLang() === 'es');

  toggleLang(lang?: Lang) {
    const next = lang || (this.currentLang() === 'es' ? 'en' : 'es');
    this.langService.setLang(next);
  }
}
