import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorTier } from './sponsor-tier';

describe('SponsorTier', () => {
  let component: SponsorTier;
  let fixture: ComponentFixture<SponsorTier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorTier],
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorTier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
