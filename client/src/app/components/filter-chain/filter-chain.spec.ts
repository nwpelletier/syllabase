import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChain } from './filter-chain';

describe('FilterChain', () => {
  let component: FilterChain;
  let fixture: ComponentFixture<FilterChain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterChain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterChain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
