import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  
  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getHotels() {
    return this.http.get(`${this.baseUrl}/hotel`);
  }

  getHotelReviews(name: string) {
    return this.http.get(`${this.baseUrl}/comment/${name}`);
  }

}
