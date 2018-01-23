import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVillagerComponent } from './create-villager.component';

describe('CreateVillagerComponent', () => {
  let component: CreateVillagerComponent;
  let fixture: ComponentFixture<CreateVillagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVillagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVillagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
