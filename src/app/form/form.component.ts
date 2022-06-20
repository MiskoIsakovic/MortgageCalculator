import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanData } from '../loanData';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  interestInput=3.5;


  formValidation=new FormGroup({
    HomePrice: new FormControl(0,[Validators.required,Validators.maxLength(10),Validators.minLength(5)]),
    Deposit: new FormControl(0,Validators.required),
    Interest: new FormControl(this.interestInput,Validators.required),
    Years: new FormControl(30,[Validators.required,Validators.min(0),Validators.max(30)]),
    HOA: new FormControl(0,Validators.required),
    Additional: new FormControl(0,Validators.required)
  });
 
  interestFormatted=this.interestInput/100;
  
  getLoanData():LoanData{
     return {
       'homePrice':+this.formValidation.get('HomePrice')?.value,
       'deposit':+this.formValidation.get('Deposit')?.value,
       'interest':this.interestFormatted,
       'years':+this.formValidation.get('Years')?.value,
       'hoa':+this.formValidation.get('HOA')?.value,
       'additional':+this.formValidation.get('Additional')?.value,
     }
  }

}
