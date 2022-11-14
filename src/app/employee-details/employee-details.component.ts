import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.Model';
import {EmployeeService} from '../shared/employee.service'

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
    responsedata:any;
  constructor(public empService: EmployeeService, public date:DatePipe ) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(data =>{
     this.responsedata=this.empService.listEmployee=data;

    })
  }
  populateEmployee(selectedEmployee:Employee){
    console.log(selectedEmployee);
    this.empService.employeeData= selectedEmployee;

  }
  delete(id:number){
   if(confirm('Are you really want to delete this record?'))
   {
     this.empService.deleteEmployee(id).subscribe(data=>{
      console.log("Record deleted");
      this.empService.getEmployees().subscribe(data =>{
        this.responsedata=this.empService.listEmployee=data;
      })
     })
   }

  }

}
