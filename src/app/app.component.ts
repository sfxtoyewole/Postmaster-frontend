import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Set the default language to use when translations are not available
    this.translate.setDefaultLang('en');
    // Set the current language to use (you can also get the user's language preference here)
    this.translate.use('en');
  }
}
