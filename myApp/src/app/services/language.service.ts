import {Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';
@Injectable({
    providedIn: 'root'
})
export class LanguageService {
  selected = '';
  constructor(public translate: TranslateService,
              public storage: Storage
) {}
setInitialAppLanguage()
{
    const language = this.translate.getBrowserLang();
    this.translate.setDefaultLang('en');

    this.storage.get(LNG_KEY).then(val => {
        if (val){
            this.setLanguage(val);
            this.selected = val;
        }
    });
}
setLanguage(lng){
this.translate.use(lng);
this.translate.setDefaultLang(lng);
this.selected = lng;
this.storage.set('LNG_KEY', lng);
}
}
