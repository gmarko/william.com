import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialTestComponent } from './tutorial-test.component';

describe('TutorialTestComponent', () => {
  let component: TutorialTestComponent;
  let fixture: ComponentFixture<TutorialTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
