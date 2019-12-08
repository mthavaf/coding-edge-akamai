import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-view-hotel',
  templateUrl: './view-hotel.component.html',
  styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent implements OnInit {

  reviews = [];
  constructor(public dialogRef: MatDialogRef<ViewHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hs: HotelService) { }

  ngOnInit() {
    this.hs.getHotelReviews(this.data.name).subscribe((data: any[]) => {
      this.reviews = data;
    });
  }

  getRange(num) {
    const arr = [];
    let count = 0;
    while (count != num) {
      arr.push('star');
      count++;
    };
    return arr;
  }

  addComment(comment, rating) {
    this.reviews.push({
      comment: comment,
      rating: rating
    });
  }

}
