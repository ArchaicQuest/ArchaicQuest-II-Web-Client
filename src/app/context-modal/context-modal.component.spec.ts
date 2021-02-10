import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextModalComponent } from './context-modal.component';

describe('ContextModalComponent', () => {
  let component: ContextModalComponent;
  let fixture: ComponentFixture<ContextModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
