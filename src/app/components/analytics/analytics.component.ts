import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataStateService } from '../../services/data-state.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  country = '';
  stats: any;
  jobStats: any;
  job ='';
  countryForJob = '';
  countryForDept='';
  departmentCountrys: Record<string, number> = {};
  countries: string[] = [];
  jobTitles: string[] = [];
  departments: string[] = [];



  constructor(private api: ApiService,private dataStateApi: DataStateService) {}

  ngOnInit() {
    this.dataStateApi.data$.subscribe(data => {
       //  STORE DATA HERE
      this.countries = data.countries;
      this.jobTitles = data.job_titles;
      this.departments = data.departments;
      console.log('Analytics Data:', data);
    });
  }

  fetchCountryBySalary() {
    this.api.getSalaryByCountry(this.country)
      .subscribe((data: any) => {
        this.stats = data;
        console.log(this.stats)
      });
  }

  fetchCountryJobBySalary() {
    this.api.getSalaryByJob(this.countryForJob , this.job)
      .subscribe((data: any) => {
        console.log('Job stats:', data);
        this.jobStats = data;
        console.log(this.jobStats.avg_salary)
      });
  }


  fetchDepartmentCountry() {   
    if (!this.countryForDept) return;
    this.api.getDepartmentBreakdownByCountry(this.countryForDept)
      .subscribe((data: any) => {
        console.log('Department API response:', data);
        this.departmentCountrys = data;
      });
  }   
  
}
