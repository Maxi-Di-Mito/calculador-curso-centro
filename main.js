/* eslint-disable no-console */
import './style.css';
import dayjs from "dayjs";

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
  "ARG": 6, // junio/julio"
  "BOL": 8, // abril/mayo
  "URG": 8, // abril/mayo
  "CHI": 9, // marzo/abril
  "PAR": 0, // con el año
};

const form = document.getElementById("date-form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const countrySelect = document.getElementById("country");

form.onsubmit = (event) => {
  event.preventDefault();
  clearResults();
  const today = dayjs();
  let date = dayjs();
  const monthValue = +monthInput.value - 1;// from calendar month number to 0 based index for dayjs
  date = date.set('date', dayInput.value).set('month', monthValue).set('year', yearInput.value);

  const country = countrySelect.value;

  if (date.year() < 2008) {
    alert("Fecha fuera de rango");
    clearResults();
    return;
  }

  const offset = cutOffset[country];

  const schoolAge = Math.abs(date.add(offset, 'month').get('year') - today.get('year'));

  if (schoolAge >= calculationTable.length) {
    alert("Fecha fuera de rango");
    clearResults();
    return;
  }
  const course = calculationTable[schoolAge];
  const thisYear = today.get('year');
  const nextCourse = calculationTable.find((c, index) => index > schoolAge && c !== null);
  const nextCourseYear = today.get('year') + calculationTable.findIndex(e => e === nextCourse) - schoolAge;

  showResults({ thisYear, course, nextCourse, nextCourseYear });
};

function showResults(data) {
  const resultsWrap = document.getElementById('result');
  let html = `<span ${!data.course ? 'class="hidden"' : ''} >Este año ${data.thisYear} le toca: ${data.course}</span>`;
  html += `<span>En ${data.nextCourseYear} empieza: ${data.nextCourse}</span>`;
  resultsWrap.innerHTML = html;
}

function clearResults() {
  const resultsWrap = document.getElementById('result');
  resultsWrap.innerHTML = "";

}
