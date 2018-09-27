import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModalFactoryComponent } from './book-modal-factory.component';

describe('BookModalFactoryComponent', () => {
  let component: BookModalFactoryComponent;
  let fixture: ComponentFixture<BookModalFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookModalFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookModalFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
