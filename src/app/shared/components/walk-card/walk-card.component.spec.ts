import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkCardComponent } from './walk-card.component';

describe('WalkCardComponent', () => {
  let component: WalkCardComponent;
  let fixture: ComponentFixture<WalkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
