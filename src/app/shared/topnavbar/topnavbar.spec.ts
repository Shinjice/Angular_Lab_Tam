import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topnavbar } from './topnavbar';

describe('Topnavbar', () => {
  let component: Topnavbar;
  let fixture: ComponentFixture<Topnavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Topnavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Topnavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
