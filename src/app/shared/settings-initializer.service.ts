import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from './settings';
import { SettingsService } from './settings.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingsInitializerService {
  constructor(private http: HttpClient, private settings: SettingsService) {}

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<Settings>('assets/settings.json').pipe(
        tap(data => this.settings.settings = data)
      ).subscribe({
        next: () => resolve(),
        error: err => reject(err)
      });
    });
  }
}
