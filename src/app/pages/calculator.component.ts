import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {

  private route = inject(ActivatedRoute);

  type = this.route.snapshot.data['type'] as string;

  result: any = null;
  error = '';

  cfg: any = {
    percentage: {
      title: 'Percentage Calculator',
      sub: 'Calculate percentage and marks in seconds.',
      fields: [
        ['value', 'Obtained marks', 500],
        ['total', 'Total marks', 600]
      ]
    },

    cgpa: {
      title: 'CGPA Calculator',
      sub: 'Convert CGPA into an approximate percentage.',
      fields: [
        ['cgpa', 'CGPA', 8.2],
        ['scale', 'Maximum CGPA', 10]
      ]
    },

    attendance: {
      title: 'Attendance Calculator',
      sub: 'Find your current attendance percentage.',
      fields: [
        ['attended', 'Classes attended', 42],
        ['total', 'Total classes', 50]
      ]
    },

    age: {
      title: 'Age Calculator',
      sub: 'Calculate your age from your date of birth.',
      fields: [
        ['dob', 'Date of birth(DD/MM/YYYY)', '1998-02-02']
      ]
    },

    emi: {
      title: 'EMI Calculator',
      sub: 'Calculate monthly EMI, interest and total payment.',
      fields: [
        ['principal', 'Loan amount (₹)', 500000],
        ['rate', 'Annual interest (%)', 11],
        ['years', 'Tenure (years)', 3]
      ]
    },

    gst: {
      title: 'GST Calculator',
      sub: 'Add GST to a price or remove GST from a final amount.',
      fields: [
        ['amount', 'Amount (₹)', 10000],
        ['rate', 'GST rate (%)', 18]
      ],
      mode: 'add'
    },

    discount: {
      title: 'Discount Calculator',
      sub: 'Calculate discount and final selling price.',
      fields: [
        ['price', 'Original price (₹)', 10000],
        ['discount', 'Discount (%)', 10]
      ]
    },

    salary: {
      title: 'Salary Calculator',
      sub: 'Get a simple monthly estimate from annual CTC.',
      fields: [
        ['ctc', 'Annual CTC (₹)', 600000],
        ['bonus', 'Annual bonus (₹)', 0]
      ]
    },

    profit: {
      title: 'Profit & Loss Calculator',
      sub: 'Calculate profit/loss and percentage.',
      fields: [
        ['cost', 'Cost price', 8000],
        ['selling', 'Selling price', 10000]
      ]
    },

    unit: {
      title: 'Unit Converter',
      sub: 'Convert common units instantly.',
      fields: [
        ['value', 'Value', 1],
        ['type', 'Conversion', 'km-m']
      ]
    }
  };

  inputs: any = {};

  constructor() {
    for (const field of this.c.fields) {
      this.inputs[field[0]] = field[2];
    }
  }

  get c() {
    return this.cfg[this.type] || this.cfg.percentage;
  }

  get values() {
    const values: any = {};

    for (const field of this.c.fields) {
      values[field[0]] = this.inputs[field[0]] ?? field[2];
    }

    return values;
  }

  calculate() {
    this.error = '';

    const v = this.values;
    const n = (value: any) => Number(value);

    try {

      switch (this.type) {

        case 'percentage': {
          const value = n(v.value);
          const total = n(v.total);

          if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) {
            throw new Error();
          }

          const percentage = (value / total) * 100;

          this.result = {
            main: percentage.toFixed(2) + '%',
            label: 'Percentage',
            rows: [
              ['Obtained', value],
              ['Total', total],
              ['Percentage', percentage.toFixed(2) + '%']
            ]
          };

          break;
        }

        case 'cgpa': {
          const cgpa = n(v.cgpa);
          const scale = n(v.scale);

          if (
            !Number.isFinite(cgpa) ||
            !Number.isFinite(scale) ||
            scale <= 0
          ) {
            throw new Error();
          }

          const percentage = (cgpa / scale) * 100;

          this.result = {
            main: percentage.toFixed(2) + '%',
            label: 'Approx. Percentage',
            rows: [
              ['CGPA', cgpa],
              ['Scale', scale],
              ['Percentage', percentage.toFixed(2) + '%']
            ]
          };

          break;
        }

        case 'attendance': {
          const attended = n(v.attended);
          const total = n(v.total);

          if (
            !Number.isFinite(attended) ||
            !Number.isFinite(total) ||
            total <= 0
          ) {
            throw new Error();
          }

          const attendance = (attended / total) * 100;

          this.result = {
            main: attendance.toFixed(2) + '%',
            label: 'Attendance',
            rows: [
              ['Attended', attended],
              ['Total', total],
              ['Attendance', attendance.toFixed(2) + '%']
            ]
          };

          break;
        }

        case 'age': {
          const dob = new Date(v.dob);
          const now = new Date();

          if (isNaN(dob.getTime()) || dob > now) {
            throw new Error();
          }

          let years = now.getFullYear() - dob.getFullYear();
          let months = now.getMonth() - dob.getMonth();

          if (months < 0) {
            years--;
            months += 12;
          }

          if (
            months === 0 &&
            now.getDate() < dob.getDate()
          ) {
            years--;
            months = 11;
          }

          this.result = {
            main: `${years} years ${months} months`,
            label: 'Your current age',
            rows: [
              ['Date of birth', v.dob],
              ['Calculated on', now.toLocaleDateString('en-IN')]
            ]
          };

          break;
        }

        case 'emi': {
          const principal = n(v.principal);
          const rate = n(v.rate);
          const years = n(v.years);

          if (
            !Number.isFinite(principal) ||
            !Number.isFinite(rate) ||
            !Number.isFinite(years) ||
            principal <= 0 ||
            rate < 0 ||
            years <= 0
          ) {
            throw new Error();
          }

          const monthlyRate = rate / 1200;
          const totalMonths = years * 12;

          const emi = monthlyRate
            ? principal *
              monthlyRate *
              Math.pow(1 + monthlyRate, totalMonths) /
              (Math.pow(1 + monthlyRate, totalMonths) - 1)
            : principal / totalMonths;

          const totalPayment = emi * totalMonths;
          const totalInterest = totalPayment - principal;

          this.result = {
            main: '₹' + Math.round(emi).toLocaleString('en-IN'),
            label: 'Monthly EMI',
            rows: [
              [
                'Loan amount',
                '₹' + principal.toLocaleString('en-IN')
              ],
              [
                'Total interest',
                '₹' + Math.round(totalInterest).toLocaleString('en-IN')
              ],
              [
                'Total payment',
                '₹' + Math.round(totalPayment).toLocaleString('en-IN')
              ]
            ]
          };

          break;
        }

        case 'gst': {
          const amount = n(v.amount);
          const rate = n(v.rate);

          if (
            !Number.isFinite(amount) ||
            !Number.isFinite(rate) ||
            amount < 0 ||
            rate < 0
          ) {
            throw new Error();
          }

          const tax = amount * rate / 100;
          const finalAmount = amount + tax;

          this.result = {
            main: '₹' + Math.round(finalAmount).toLocaleString('en-IN'),
            label: 'Price including GST',
            rows: [
              [
                'Base amount',
                '₹' + amount.toLocaleString('en-IN')
              ],
              [
                'GST',
                '₹' + tax.toFixed(2)
              ],
              [
                'Final amount',
                '₹' + finalAmount.toFixed(2)
              ]
            ]
          };

          break;
        }

        case 'discount': {
          const price = n(v.price);
          const discount = n(v.discount);

          if (
            !Number.isFinite(price) ||
            !Number.isFinite(discount) ||
            price < 0 ||
            discount < 0
          ) {
            throw new Error();
          }

          const saving = price * discount / 100;
          const finalPrice = price - saving;

          this.result = {
            main: '₹' + finalPrice.toFixed(2),
            label: 'Final price',
            rows: [
              [
                'Original price',
                '₹' + price.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ],
              [
                'Discount',
                '₹' + saving.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ],
              [
                'You pay',
                '₹' + finalPrice.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ]
            ]
          };

          break;
        }

        case 'salary': {
          const ctc = n(v.ctc);
          const bonus = n(v.bonus);

          if (
            !Number.isFinite(ctc) ||
            !Number.isFinite(bonus) ||
            ctc < 0 ||
            bonus < 0 ||
            bonus > ctc
          ) {
            throw new Error();
          }

          const monthlySalary = (ctc - bonus) / 12;

          this.result = {
            main: '₹' + Math.round(monthlySalary).toLocaleString('en-IN'),
            label: 'Estimated monthly salary',
            rows: [
              [
                'Annual CTC',
                '₹' + ctc.toLocaleString('en-IN')
              ],
              [
                'Annual bonus',
                '₹' + bonus.toLocaleString('en-IN')
              ],
              [
                'Monthly estimate',
                '₹' + Math.round(monthlySalary).toLocaleString('en-IN')
              ]
            ]
          };

          break;
        }

        case 'profit': {
          const cost = n(v.cost);
          const selling = n(v.selling);

          if (
            !Number.isFinite(cost) ||
            !Number.isFinite(selling) ||
            cost <= 0
          ) {
            throw new Error();
          }

          const profitLoss = selling - cost;
          const percentage = Math.abs(profitLoss) / cost * 100;

          this.result = {
            main: percentage.toFixed(2) + '%',
            label: profitLoss >= 0 ? 'Profit' : 'Loss',
            rows: [
              [
                'Cost price',
                '₹' + cost.toLocaleString('en-IN')
              ],
              [
                'Selling price',
                '₹' + selling.toLocaleString('en-IN')
              ],
              [
                'Profit/Loss',
                '₹' + profitLoss.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ]
            ]
          };

          break;
        }

        case 'unit': {
          const value = n(v.value);

          if (!Number.isFinite(value)) {
            throw new Error();
          }

          const output =
            v.type === 'km-m'
              ? value * 1000
              : value / 1000;

          this.result = {
            main: output.toLocaleString('en-IN'),
            label: v.type === 'km-m'
              ? 'Meters'
              : 'Kilometers',
            rows: [
              ['Input', value],
              [
                'Conversion',
                v.type === 'km-m'
                  ? '1 km = 1000 m'
                  : '1000 m = 1 km'
              ]
            ]
          };

          break;
        }

        default:
          throw new Error();
      }

    } catch (error) {
      this.result = null;
      this.error = 'Please enter valid values.';
    }
  }

  reset() {
    for (const field of this.c.fields) {
      this.inputs[field[0]] = field[2];
    }

    this.result = null;
    this.error = '';
  }

  copy() {
    if (!this.result) {
      return;
    }

    const text = `${this.c.title}: ${this.result.main} — ${this.result.label}`;

    navigator.clipboard?.writeText(text);
  }

  share() {
    if (!this.result || !navigator.share) {
      return;
    }

    navigator.share({
      title: this.c.title,
      text: `${this.c.title}: ${this.result.main}`
    });
  }
}