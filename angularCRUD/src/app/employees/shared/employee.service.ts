import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import {Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList : Employee[];

  constructor(private http : Http) {
    this.selectedEmployee = new Employee();
   }

  postEmployee = (emp : Employee) => {
    var dataObject = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Access-Control-Allow-Origin' : '*'});
    var requestOptions = new RequestOptions({ method : RequestMethod.Post, headers : headerOptions });

    return this.http.post('api/employees', dataObject, requestOptions).map (x=>x.json());
  } 

  putEmployee = (id : number, emp : Employee) => {
    var dataObject = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type' : 'application/json', 'Access-Control-Allow-Origin' : '*'});
    var requestOptions = new RequestOptions({ method : RequestMethod.Put, headers : headerOptions });

    return this.http.put('api/employees/'+ id , dataObject, requestOptions).map (x=>x.json());
  } 

  getEmployees = () => {
    
    this.http.get('api/employees')
    .map((data:Response)=>{
      return data.json() as Employee[];
    }).toPromise().then(x=> this.employeeList = x);
  }

  deleteEmployee = (id : number)  => {
    return this.http.delete('api/employees/'+id).map(x=>x.json());
  }
}
