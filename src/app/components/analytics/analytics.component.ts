import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  country = '';
  stats: any;

  constructor(private api: ApiService) {}

  fetch() {
    this.api.getSalaryByCountry(this.country)
      .subscribe((data: any) => {
        this.stats = data;
      });
  }
}
