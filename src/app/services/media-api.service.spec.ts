import { TestBed, inject } from '@angular/core/testing';

import { MediaApiService } from './media-api.service';

describe('MediaApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaApiService]
    });
  });

  it('should be created', inject([MediaApiService], (service: MediaApiService) => {
    expect(service).toBeTruthy();
  }));
});
