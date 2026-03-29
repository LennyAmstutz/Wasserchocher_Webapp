import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionIntro } from './section-intro';

describe('SectionIntro', () => {
  let component: SectionIntro;
  let fixture: ComponentFixture<SectionIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionIntro],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionIntro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
