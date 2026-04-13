import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { DataStateService } from './services/data-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'salary-manager-web';

   constructor(
    private dataService: DataService,
    private dataState: DataStateService
  ) {}

  ngOnInit() {

    //  API called ONCE here
    this.dataService.getData().subscribe({
      next: (res) => {
        this.dataState.setData(res); // store in memory
      },
      error: (err) => {
        console.error('Data API failed', err);
      }
    });
  }
}
