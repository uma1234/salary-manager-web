import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  selectedEmployee = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}


  // getEmployees(page: number) {
  //   return this.http.get(`${this.baseUrl}/employees?page=${page}`);
  // }

  getEmployees(page: number, search: string) {
    let url = `${this.baseUrl}/employees?page=${page}`;

    // only add search if not empty
    if (search && search.trim() !== '') {
      url += `&search=${encodeURIComponent(search)}`;
    }

    return this.http.get(url);
  }

  addEmployee(data: any) {
    return this.http.post(`${this.baseUrl}/employees`, {
      employee: data
    });
  }

  updateEmployee(id: number, data: any) {
  return this.http.put(`${this.baseUrl}/employees/${id}`, {
    employee: data
  });
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

  getSalaryByCountry(country: string) {
    return this.http.get(
      `${this.baseUrl}/analytics/country?country=${country}`
    );
  }

  // getSalaryByJob(country: string, job: string) {
  //   return this.http.get(
  //     `${this.baseUrl}/analytics/job?country=${country}&job_title=${job}`
  //   );
  // }

   getDepartmentBreakdownByCountry(country: string) {
    return this.http.get(
      `${this.baseUrl}/analytics/department?country=${country}`
    );
  }
    getSalaryByJob(country: string, job: string) {
      return this.http.get(`${this.baseUrl}/analytics/job`, {
        params: {
          country: country,
          job_title: job
        }
      });
    }
}