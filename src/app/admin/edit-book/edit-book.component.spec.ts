import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EditBookComponent } from './edit-book.component';
import { SettingsService } from 'src/app/shared/settings.service';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{
        provide: SettingsService,
        useValue: { settings: { apiUrl: 'apiUrl' }}
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
