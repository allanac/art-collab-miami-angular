import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreHomeComponent } from './explore-home.component';

describe('ExploreHomeComponent', () => {
  let component: ExploreHomeComponent;
  let fixture: ComponentFixture<ExploreHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
