import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule, FormsModule)
  ]
});
