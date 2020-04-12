import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePumpPage } from './change-pump.page';

describe('ChangePumpPage', () => {
  let component: ChangePumpPage;
  let fixture: ComponentFixture<ChangePumpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePumpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePumpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
