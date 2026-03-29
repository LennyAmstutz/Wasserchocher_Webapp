import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorPreview } from './sponsor-preview';

describe('SponsorPreview', () => {
  let component: SponsorPreview;
  let fixture: ComponentFixture<SponsorPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
