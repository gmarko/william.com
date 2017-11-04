import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitAngleModulationComponent } from './bit-angle-modulation.component';

describe('BitAngleModulationComponent', () => {
  let component: BitAngleModulationComponent;
  let fixture: ComponentFixture<BitAngleModulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitAngleModulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitAngleModulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
