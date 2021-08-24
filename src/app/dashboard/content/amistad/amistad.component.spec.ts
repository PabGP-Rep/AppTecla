import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmistadComponent } from './amistad.component';

describe('AmistadComponent', () => {
  let component: AmistadComponent;
  let fixture: ComponentFixture<AmistadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmistadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmistadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
