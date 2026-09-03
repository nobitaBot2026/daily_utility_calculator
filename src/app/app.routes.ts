import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then(m => m.HomeComponent)
  },

  {
    path: 'students/percentage',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'percentage' }
  },

  {
    path: 'students/cgpa',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'cgpa' }
  },

  {
    path: 'students/attendance',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'attendance' }
  },

  {
    path: 'students/age',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'age' }
  },

  {
    path: 'daily-life/emi',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'emi' }
  },

  {
    path: 'daily-life/gst',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'gst' }
  },

  {
    path: 'daily-life/discount',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'discount' }
  },

  {
    path: 'job/salary',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'salary' }
  },

  {
    path: 'shopkeeper/profit-loss',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'profit' }
  },

  {
    path: 'tools/unit-converter',
    loadComponent: () =>
      import('./pages/calculator.component').then(m => m.CalculatorComponent),
    data: { type: 'unit' }
  },

  {
    path: '**',
    redirectTo: ''
  }
];