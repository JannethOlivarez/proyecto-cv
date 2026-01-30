import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LanguageSwitcher, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
