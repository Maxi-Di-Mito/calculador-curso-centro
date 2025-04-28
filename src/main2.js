import Alpine from 'alpinejs';
import dayjs from "dayjs";
import { getText, updateLanguage } from './translate.js';

const calculationTable = [
  null,// 0 años
  null,// 1 años
  null,// 2 años
  null,// 3 años
  "PED1",// 4 años
  "PED2",// 5 años
  "ED1",// 6 años
  "ED2",// 7 años
  "ED3",// 8 años
  "ED4",// 9 años
  "ER1",// 10 años
  "ER2",// 11 años
  "ER3",// 12 años
  "AC",// 13 años
];

const cutOffset = {
  "ARG": 6, // junio/julio
  "BOL": 8, // abril/mayo
  "BRA": 6, // junio/julio
  "URG": 8, // abril/mayo
  "CHI": 9, // marzo/abril
  "PAR": 12, // todo el año
};


Alpine.data('context', () => ({
  language: 'es',
  thisYear: null,
  course: null,
  nextCourse: null,
  nextCourseYear: null,
  country: "ARG",
  dayInput: null,
  monthInput: null,
  yearInput: null,
  handleSubmit() {
    const today = dayjs();
    let date = dayjs();
    const monthValue = +this.monthInput - 1;// from calendar month number to 0 based index for dayjs
    date = date.set('date', this.dayInput).set('month', monthValue).set('year', this.yearInput);

    if (date.year() < 2008) {
      alert("Fecha fuera de rango");
      return this.clearResults();
    }

    const offset = cutOffset[this.country];
    const schoolAge = Math.abs(date.add(offset, 'month').get('year') - today.get('year'));

    if (schoolAge >= calculationTable.length) {
      alert("Fecha fuera de rango");
      return this.clearResults();
    }

    this.course = calculationTable[schoolAge];
    this.thisYear = today.get('year');
    this.nextCourse = calculationTable.find((c, index) => index > schoolAge && c !== null);
    this.nextCourseYear = today.get('year') + calculationTable.findIndex(e => e === this.nextCourse) - schoolAge;
  },
  updateLanguage() {
    updateLanguage(this.language);
  },
  get currentCourse() {
    if (this.course) {
      return getText('currentCourse', { year: this.thisYear, course: this.course });
    }
    return null;
  },
  get nextCourseText() {
    if (this.nextCourse) {
      const text = getText('nextCourse', { year: this.nextCourseYear, course: this.nextCourse });
      return text;
    }
    return null;
  },
  clearResults() {
    this.course = null;
    this.thisYear = null;
    this.nextCourse = null;
    this.nextCourseYear = null;
  },

}));
Alpine.start();
