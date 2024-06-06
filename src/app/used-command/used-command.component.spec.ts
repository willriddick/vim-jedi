import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedCommandComponent } from './used-command.component';

describe('UsedCommandComponent', () => {
  let component: UsedCommandComponent;
  let fixture: ComponentFixture<UsedCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsedCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsedCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
