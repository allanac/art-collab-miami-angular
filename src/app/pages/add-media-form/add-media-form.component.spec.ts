import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediaFormComponent } from './add-media-form.component';

describe('AddMediaFormComponent', () => {
  let component: AddMediaFormComponent;
  let fixture: ComponentFixture<AddMediaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMediaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMediaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
