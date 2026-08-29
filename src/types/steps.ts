export interface Step {
  num: string;
  title: string;
  text: string;
}

export const STEPS: Step[] = [
  { num: '01', title: 'Choose your route', text: 'Enter pickup and drop locations.' },
  { num: '02', title: 'Select your schedule', text: 'Choose the days and pickup time that fit your routine.' },
  { num: '03', title: 'Pick your vehicle', text: 'Sedan, Executive, SUV or Van — your call.' },
  { num: '04', title: 'Subscribe once', text: 'One fixed monthly price, no repeat bookings.' },
  { num: '05', title: 'Ride every day', text: 'Your scheduled ride arrives automatically.' },
];
