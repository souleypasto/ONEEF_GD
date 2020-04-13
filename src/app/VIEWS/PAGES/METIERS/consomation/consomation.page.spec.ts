import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsomationPage } from './consomation.page';

describe('ConsomationPage', () => {
  let component: ConsomationPage;
  let fixture: ComponentFixture<ConsomationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsomationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
