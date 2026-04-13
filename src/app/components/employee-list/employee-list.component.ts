import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  
   employees: any[] = [];
   page = 1;
  pageSize = 10;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getEmployees(this.page).subscribe((data: any) => {
      this.employees = data;
    });
  }

  nextPage() {
    this.page++;
    this.load();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }


    // ✅ EDIT
  editEmployee(emp: any) {
    console.log('Edit clicked:', emp);

    // send data to form using shared service
    this.api.selectedEmployee.next(emp);
  }

  // ✅ DELETE
  deleteEmployee(id: number) {
    console.log('Delete clicked:', id);

    if (confirm('Are you sure you want to delete?')) {
      this.api.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee Deleted');
          this.load(); // reload table
        },
        error: (err) => {
          console.error(err);
          alert('Delete failed');
        }
      });
    }
  }


}



