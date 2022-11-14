import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/shared/employee.Model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  desgList :any;

  constructor(public empService:EmployeeService) { }

  ngOnInit(): void {
    this.empService.getDesignation().subscribe(data =>
      {
       this.desgList=this.empService.listDesignation=data;
      })
  }


  submit(form:NgForm){

    //console.log("");
    this.empService.employeeData.isMarried=form.value.isMarried==true?1:0;
    this.empService.employeeData.isActive=form.value.isActive==true?1:0;
    if(this.empService.employeeData.id==0)
      this.insertEmployee(form);
    else
    this.updateEmployee(form);


  }
  insertEmployee(myForm:NgForm)
  {
      this.empService.saveEmployee().subscribe(d=>{
       this.resetEmployee(myForm);
       this.refreshData();
      console.log('saved successfully')

      })
  }
  updateEmployee(myForm:NgForm){
    this.empService.updateEmployee().subscribe(d=>{
      this.resetEmployee(myForm);
      this.refreshData();
      console.log("updated")
    })

  }

  resetEmployee(myForm:NgForm)
  {
     myForm.form.reset();
     this.empService.employeeData=new Employee();
  }

  refreshData(){
    this.empService.getEmployees().subscribe(res=>{
      this.empService.listEmployee=res;
     })
  }



}
