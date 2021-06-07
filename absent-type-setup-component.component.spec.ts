import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentTypeSetupComponentComponent } from './absent-type-setup-component.component';

describe('AbsentTypeSetupComponentComponent', () => {
  let component: AbsentTypeSetupComponentComponent;
  let fixture: ComponentFixture<AbsentTypeSetupComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentTypeSetupComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentTypeSetupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
