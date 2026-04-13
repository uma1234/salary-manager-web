import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DataStateService } from '../../services/data-state.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

employee: any = {
  first_name: '',
  last_name: '',
  email:'',
  job_title: '',
  country: '',
  salary: 0,
  department: ''
};
  // employee: any = {};

  countries: string[] = [];
  jobTitles: string[] = [];
  departments: string[] = [];

 constructor(private api: ApiService, private datastateApi: DataStateService) {}

 ngOnInit() {
    this.api.selectedEmployee.subscribe((emp) => {
      if (emp) {
        this.employee = { ...emp };
      }
    });

    // ADD THIS (fetch dropdown data)
   this.datastateApi.data$.subscribe(data => {
      if (data) {
        this.countries = data.countries;
        this.jobTitles = data.job_titles;
        this.departments = data.departments;
      }
    });

  }

   
  submit() {
    this.api.addEmployee(this.employee).subscribe({
      next: () => {
        alert('Employee Added');
        this.employee = {
          first_name: '',
          last_name: '',
          email: '',
          job_title: '',
          country: '',
          salary: 0,
          department: ''
        };
      },
      error: (err) => {
        console.log(' FULL ERROR:', err);
        console.log(' ERROR STATUS:', err.status);
        console.log('ERROR MESSAGE:', err.message);
        console.log(' ERROR BODY:', err.error);

        alert('Failed to add employee');
      }
    });
  }

   edit(emp: any) {
    this.employee = { ...emp }; // fill form
  }

  update() {
    this.api.updateEmployee(this.employee.id, this.employee)
      .subscribe(() => {
        alert('Employee Updated');
        this.reset();
      });
  }

  reset() {
    this.employee = {};
  }
}


