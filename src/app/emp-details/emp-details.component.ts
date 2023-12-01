import { Component, Input, OnInit } from '@angular/core';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-details',
  standalone: true,
  imports: [],
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.css'
})
export class EmpDetailsComponent implements OnInit{

  constructor(private service:EmpServiceService){}
  employeelist:any=[];
  ModalTitle = "";
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  employeeData: any;

  message: any = ""

  ngOnInit(): void {
    this.refreshEmpList();
  }
  addClick() {
    this.emp = {
      EmployeeId: "0",
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
    this.employeeData = item;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmployeeList().subscribe(data => {
      // this.EmployeeList = data;

      this.employeelist = data.map(item => {
       return {
        EmployeeId: item.id,
        EmployeeName: item.name,
        Department : item.email,
        DateOfJoining : item.phone,
        PhotoFileName : item.website,
        PhotoFilePath : this.service.photoUrl + item.website
       }

      })    
    });
  }


  getChildData(data: any) {
    console.log('data: ', data)
    this.message = data
  }
}
