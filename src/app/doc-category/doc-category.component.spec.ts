import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCategoryComponent } from './doc-category.component';

describe('DocCategoryComponent', () => {
  let component: DocCategoryComponent;
  let fixture: ComponentFixture<DocCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
