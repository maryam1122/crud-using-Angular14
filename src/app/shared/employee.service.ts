import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Designation, Employee } from './employee.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private myhttp:HttpClient) { }
  employeeUrl:string = 'https://localhost:7283/api/Employee';
  designationUrl:string ='https://localhost:7283/api/Designation';

  listEmployee : Employee[] =[];// for whole list of employees
  listDesignation : Designation[] =[];

  employeeData:Employee = new Employee(); //for post data / Insert data in a single type object

   saveEmployee(){
      return this.myhttp.post(this.employeeUrl,this.employeeData)
   }
   updateEmployee(){
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`,this.employeeData)
   }

   getEmployees():Observable<Employee[]>{
    return this.myhttp.get<Employee[]>(this.employeeUrl)
   }

   getDesignation():Observable<Designation[]>{
    return this.myhttp.get<Designation[]>(this.designationUrl)
   }

   deleteEmployee(id:number)
   {
    return  this.myhttp.delete(`${this.employeeUrl}/${id}`)
   }


}
