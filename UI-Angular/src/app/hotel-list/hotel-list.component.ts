import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HotelService } from '../hotel.service';
import { MatDialog } from '@angular/material';
import { ViewHotelComponent } from '../view-hotel/view-hotel.component';

export interface Hotel {
  name: string,
  host_name: string,
  neighbourhood_group: string,
  neighbourhood: string,
  latitude: string,
  longitude: string,
  room_type: string,
  price: number
}

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  displayedColumns: string[] = ["name", "host_name", "neighbourhood_group", "neighbourhood",
    "latitude",
    "room_type", "price", "view"];
  dataSource: MatTableDataSource<Hotel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private hs: HotelService,
    private dialog: MatDialog) {

    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.hs.getHotels().subscribe((data: any[]) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewHotel(row: Hotel) {
    const dialogRef = this.dialog.open(ViewHotelComponent, {
      width: '800px',
      data: row,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getUrl(row: Hotel) {
    return `https://www.google.com/maps/search/?api=1&query=${row.latitude},${row.longitude}`
  }
}

// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
