import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spenden } from './spenden';

describe('Spenden', () => {
  let component: Spenden;
  let fixture: ComponentFixture<Spenden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spenden],
    }).compileComponents();

    fixture = TestBed.createComponent(Spenden);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
