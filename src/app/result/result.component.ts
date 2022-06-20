import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { LoanData } from '../loanData';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit,OnChanges {
  mortgageData:any;
  monthlyPayment=0;
  totalMonthly=0;
  totalInterest=0;
  @Input() loanData!:LoanData;
  constructor(private calculator: CalculatorService) {}
  ngOnChanges(): void {
    this.calculator.calculate(this.loanData).subscribe(data=>{
      this.mortgageData=data;
      this.monthlyPayment=Math.ceil(this.mortgageData[0].monthlyPayment);
      this.totalMonthly=Math.ceil(this.mortgageData[0].totalMonthlyPayment);
      this.totalInterest=Math.ceil(this.mortgageData[0][2].totalInterest)
    });
    
  }

  ngOnInit(): void {}
}
