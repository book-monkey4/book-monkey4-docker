import { Injectable } from '@angular/core';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings;
}
