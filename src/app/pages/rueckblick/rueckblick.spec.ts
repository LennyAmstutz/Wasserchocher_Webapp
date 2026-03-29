import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rueckblick } from './rueckblick';

describe('Rueckblick', () => {
  let component: Rueckblick;
  let fixture: ComponentFixture<Rueckblick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rueckblick],
    }).compileComponents();

    fixture = TestBed.createComponent(Rueckblick);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
