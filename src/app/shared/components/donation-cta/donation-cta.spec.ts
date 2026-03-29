import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCta } from './donation-cta';

describe('DonationCta', () => {
  let component: DonationCta;
  let fixture: ComponentFixture<DonationCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationCta],
    }).compileComponents();

    fixture = TestBed.createComponent(DonationCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
