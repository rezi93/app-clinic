import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCategoryComponent } from './doctor-category.component';

describe('DoctorCategoryComponent', () => {
  let component: DoctorCategoryComponent;
  let fixture: ComponentFixture<DoctorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
