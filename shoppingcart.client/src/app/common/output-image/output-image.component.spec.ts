import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputImageComponent } from './output-image.component';

describe('OutputImageComponent', () => {
  let component: OutputImageComponent;
  let fixture: ComponentFixture<OutputImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutputImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
