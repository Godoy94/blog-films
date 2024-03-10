import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPostComponent } from './details-post.component';

describe('DetailsPostComponent', () => {
  let component: DetailsPostComponent;
  let fixture: ComponentFixture<DetailsPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPostComponent]
    });
    fixture = TestBed.createComponent(DetailsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
