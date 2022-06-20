import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoanData } from './loanData';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  calculate(loanData:LoanData) :Observable<any>{
    let balance=loanData.homePrice-loanData.deposit;
    const monthlyInterest=loanData.interest/12;
    const months=loanData.years*12;
    const VATAXRATE=0.01098;
    let monthlyTax=(loanData.homePrice*VATAXRATE)/12;
    let monthlyPMI=loanData.homePrice*0.2>loanData.homePrice-balance ? (balance*0.005)/12:0;
    let monthlyPayment=balance*((monthlyInterest*Math.pow(1+monthlyInterest,months))/(Math.pow(1+monthlyInterest,months)-1))+loanData.additional;
    let totalMonthlyPayment=monthlyPayment+loanData.hoa+monthlyTax+monthlyPMI;
    let totalInterestPaid=0;
    let totalMonths=0;
    
    let data:any=[];
    data.push({
      'monthlyPayment':monthlyPayment,
      'totalMonthlyPayment':totalMonthlyPayment,
    });
    
    for(let i=1;i<months && balance>=0;i++){
      let interestPayment=monthlyInterest*balance;
      let principalPayment=monthlyPayment-interestPayment;
      totalInterestPaid+=interestPayment;
      totalMonths++;
      data.push({
        'interest':Math.ceil(interestPayment),
        'principal':Math.ceil(principalPayment),
        'balance':Math.ceil(balance)
      })
      balance-=principalPayment;
    };
    data[0][2]={'totalInterest':totalInterestPaid}
    

     
    return of(data)
  }
}
