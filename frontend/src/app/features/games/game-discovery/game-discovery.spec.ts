import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDiscovery } from './game-discovery';

describe('GameDiscovery', () => {
  let component: GameDiscovery;
  let fixture: ComponentFixture<GameDiscovery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDiscovery],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDiscovery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
