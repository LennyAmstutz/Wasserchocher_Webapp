import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPreview } from './gallery-preview';

describe('GalleryPreview', () => {
  let component: GalleryPreview;
  let fixture: ComponentFixture<GalleryPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
