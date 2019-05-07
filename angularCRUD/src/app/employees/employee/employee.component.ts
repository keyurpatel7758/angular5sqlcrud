import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService, private toastr : ToastrService) { }

  ngOnInit() {
    this.onResetClick(null);
  }

  onResetClick(form : NgForm){
    if(form != null)
      form.reset();
    console.log('in ResetForm');
    this.employeeService.selectedEmployee = {
      EmployeeId : null,
      Code : '',
      FirstName : '',
      LastName : '',
      Office : '',
      Position : ''
    };
  }

  onSubmitClick(form : NgForm){
    if(form.value.EmployeeId == null)
      {
        this.employeeService.postEmployee(form.value)
        .subscribe(data=>{
          this.onResetClick(form);
          this.employeeService.getEmployees();
          this.toastr.success('Employee added successfully!!', 'Employee Register');
        });
      }
      else{
        this.employeeService.putEmployee(form.value.EmployeeId, form.value)
        .subscribe(data=> {
          this.onResetClick(form);
          this.employeeService.getEmployees();
          this.toastr.info('Employee updated successfully!!', 'Employee Register');
        })
      }
  }
}
