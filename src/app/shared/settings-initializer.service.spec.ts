import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Settings } from './settings';

import { SettingsInitializerService } from './settings-initializer.service';
import { SettingsService } from './settings.service';

describe('SettingsInitializerService', () => {
  let service: SettingsInitializerService;
  let httpMock: HttpTestingController;
  let settingsService: SettingsService;

  const testSettings: Settings = {
    apiUrl: 'apiUrl',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SettingsInitializerService);
    httpMock = TestBed.inject(HttpTestingController);
    settingsService = TestBed.inject(SettingsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize settings', (done) => {
    service.init().then(() => {
      expect(settingsService.settings).toEqual(testSettings);
      done();
    });

    const request = httpMock.expectOne('assets/settings.json');
    expect(request.request.method).toBe('GET');
    request.flush(testSettings);
  });

  it('should not initialize settings if get settings.json failed', (done) => {
    service
      .init()
      .then(() => {
        done.fail(new Error('this was expected to fail'));
      })
      .catch(() => {
        expect(settingsService.settings).toBeUndefined();
        done();
      });

    const request = httpMock.expectOne('assets/settings.json');
    expect(request.request.method).toBe('GET');
    request.flush(testSettings, {
      status: 500,
      statusText: 'Some Weird Server Error',
    });
  });
});
