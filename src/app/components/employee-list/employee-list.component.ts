import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: any[] = [];
  filteredEmployees: any[] = [];   // ✅ REQUIRED FOR TEMPLATE

  page = 1;
  pageSize = 10;
  searchTerm: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  // LOAD DATA (with search + pagination from backend)
  load() {
    this.api.getEmployees(this.page, this.searchTerm).subscribe((data: any) => {
      this.employees = data;
      this.filteredEmployees = data; //for UI
    });
  }

  // SEARCH BUTTON CLICK
  searchEmployees() {
    this.page = 1;
    this.load();
  }

  // CLEAR BUTTON
  clearSearch() {
    this.searchTerm = '';
    this.page = 1;
    this.load();
  }

  // NEXT PAGE
  nextPage() {
    this.page++;
    this.load();
  }

  // PREVIOUS PAGE
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }

  // EDIT
  editEmployee(emp: any) {
    console.log('Edit clicked:', emp);
    this.api.selectedEmployee.next(emp);
  }

  // DELETE
  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.api.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee Deleted');
          this.load();
        },
        error: (err) => {
          console.error(err);
          alert('Delete failed');
        }
      });
    }
  }
}