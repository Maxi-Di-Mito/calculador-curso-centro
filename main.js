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

const calculateButton = document.getElementById("calculate-button");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

calculateButton.onclick = () => {
  const today = dayjs();
  let date = dayjs();
  date = date.set('date', dayInput.value).set('month', monthInput.value).set('year', yearInput.value);

  if (date.year() < 2008) {
    return alert("Fecha fuera de rango");
  }

  const schoolAge = Math.abs(date.add(6, 'month').get('year') - today.get('year'));

  if (schoolAge >= calculationTable.length) {
    return alert("Fecha fuera de rango");
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
