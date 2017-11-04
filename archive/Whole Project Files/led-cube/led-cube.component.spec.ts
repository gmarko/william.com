import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedCubeComponent } from './led-cube.component';

describe('LedCubeComponent', () => {
  let component: LedCubeComponent;
  let fixture: ComponentFixture<LedCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
