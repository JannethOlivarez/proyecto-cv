import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    readonly lang = signal<Lang>('es');

    constructor(private translate: TranslateService) {
        translate.addLangs(['es', 'en']);
        translate.setDefaultLang('es');
        translate.use('es');
    }

    setLang(next: Lang) {
        this.lang.set(next);
        this.translate.use(next);
    }
}
