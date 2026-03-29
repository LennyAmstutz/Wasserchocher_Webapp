import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sponsoren } from './sponsoren';

describe('Sponsoren', () => {
  let component: Sponsoren;
  let fixture: ComponentFixture<Sponsoren>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sponsoren],
    }).compileComponents();

    fixture = TestBed.createComponent(Sponsoren);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
