import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService : EmployeeService, private toastr : ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployees();
  }

  showForEdit = (emp: Employee) => {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  deleteEmployee = (emp: Employee) => {
    if(confirm('Are you sure want to delete employee ?'))
      {
        this.employeeService.deleteEmployee(emp.EmployeeId).subscribe(data=>{
          this.employeeService.getEmployees();
          this.toastr.warning('Employee deleted successfully!!');
        });
      }
  }
}
