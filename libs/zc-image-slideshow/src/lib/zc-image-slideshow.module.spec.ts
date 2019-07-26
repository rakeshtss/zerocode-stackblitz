import { async, TestBed } from '@angular/core/testing';
import { ZcImageSlideshowModule } from './zc-image-slideshow.module';

describe('ZcImageSlideshowModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcImageSlideshowModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcImageSlideshowModule).toBeDefined();
  });
});
