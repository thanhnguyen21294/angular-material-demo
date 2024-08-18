import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { map, of, mergeMap, from, toArray } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  child?: PeriodicElement[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    child: [
      {
        name: 'child1',
        position: 101,
        symbol: 'c1',
        weight: 3.123,
      },
    ],
  },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',
    child: [
      {
        name: 'child2',
        position: 202,
        symbol: 'c2',
        weight: 3.123,
      },
    ],
   },
];

const KEY_NAME_JSON = {
  'position': 'Vi tri',
  'name': 'Ten',
  'weight': 'Nang',
  'symbol': 'Ky hieu'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, CommonModule, MatCheckboxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-material-demo';
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  keyNameJson = KEY_NAME_JSON;
  mapData: PeriodicElement[] = [];
  selection = new SelectionModel<PeriodicElement>(true, []);

  ngOnInit(): void {
    from(this.dataSource).pipe(mergeMap(data => {
      if(data.child) {
        return from([data, ...data.child])
      }
      return from([data]);
    }), toArray()).subscribe(res => {
      this.mapData = res;
    })
  }

  showKey() {
    console.log(KEY_NAME_JSON['name'])
  }

  checkSelection() {
    console.log(this.selection.selected)
  }
}
