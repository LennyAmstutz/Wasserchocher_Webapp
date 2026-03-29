import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedEvent } from './featured-event';

describe('FeaturedEvent', () => {
  let component: FeaturedEvent;
  let fixture: ComponentFixture<FeaturedEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedEvent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedEvent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
