import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametragePage } from './parametrage.page';

describe('ParametragePage', () => {
  let component: ParametragePage;
  let fixture: ComponentFixture<ParametragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametragePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
