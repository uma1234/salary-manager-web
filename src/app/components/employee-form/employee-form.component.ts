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
  fieldErrors: any = null;

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

        // clear errors on success
        this.fieldErrors = {};
      },

      error: (err) => {
        console.log('FULL ERROR:', err);

        // ⭐ directly map Rails errors
        this.fieldErrors = err.error?.errors || {};
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


