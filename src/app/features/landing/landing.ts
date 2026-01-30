import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../shared/language-switcher/language-switcher';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, TranslateModule, LanguageSwitcher],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  protected isDarkMode = signal(false);


  toggleTheme() {
    this.isDarkMode.update(value => !value);
  }
}
