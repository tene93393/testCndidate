import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWordFormComponent } from './ReportWordForm.component';

describe('SendSubjectReportComponent', () => {
  let component: ReportWordFormComponent;
  let fixture: ComponentFixture<ReportWordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportWordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
