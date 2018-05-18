import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextModelingComponent } from './context-modeling.component';

describe('ContextModelingComponent', () => {
  let component: ContextModelingComponent;
  let fixture: ComponentFixture<ContextModelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextModelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextModelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
