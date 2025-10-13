import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSearch } from './youtube-search';

describe('YoutubeSearch', () => {
  let component: YoutubeSearch;
  let fixture: ComponentFixture<YoutubeSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
