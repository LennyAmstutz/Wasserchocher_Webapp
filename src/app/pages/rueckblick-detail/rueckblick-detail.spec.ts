import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RueckblickDetail } from './rueckblick-detail';

describe('RueckblickDetail', () => {
  let component: RueckblickDetail;
  let fixture: ComponentFixture<RueckblickDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RueckblickDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(RueckblickDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
