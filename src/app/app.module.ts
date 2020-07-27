import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID, Inject } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { TokenInterceptor } from './shared/token.interceptor';
import { SettingsInitializerService } from './shared/settings-initializer.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: SettingsInitializerService) => {
        return () => initService.init();
      },
      deps: [SettingsInitializerService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(LOCALE_ID) locale: string) {
    registerLocaleData(localeDe);
    registerLocaleData(localeFr);

    console.log('DEBUG – Current Locale:', locale);
  }
}
