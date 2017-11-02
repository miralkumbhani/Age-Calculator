/*eslint-disable no-console*/
"use strict";
(function() {
const TODAY = new Date();
document.getElementById("today").innerHTML = TODAY;
// document.getElementById("output").style.display = 'none';
$(document).ready(() => {
    $('.tabcontent').children('.input-form').eq(0).show();
    // works on top tabs to switch between tabs
    $('ul.tab').on('click', 'li', function() {
        // console.log("display", $(this));
        let tab_text = $(this).children('button').text();
        $('.tab-title').html(tab_text);
        $('#output').hide();
        let idx =  $(this).index();
        $(this).siblings().children().removeClass('active');
        $(this).children(':button').addClass('active');
        $('.tabcontent').children('.input-form').hide();
        $('.tabcontent').children('.input-form').eq(idx).show();
    });
});

 // let tab_header = ?'Age Calculator' : 'Date Difference'

const _displayCurrentDate = () => {
    setInterval(() => {
        document.getElementById('today').innerHTML = new Date();
    }, 1000);
};

_displayCurrentDate();

// generator method
function* range(start, end, step = 1) {
    while (start <= end) {
        yield start;
        start += step;
    }
}

// @return array = [1,...31]
let _setDay = new Promise((resolve) => {
    let dateArray = Array.from(range(1, 31));
    let dateList = [];
    $.each(dateArray, function(i, idx) {
        dateList.push(`<option value="${i+1}"  >${idx}</option>`);
    });
    resolve(dateList);
});

//@return array = [January, ...December]
let _setMonth = new Promise((resolve) => {
    const monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthList = [];
    $.each(monthNameArray, function(i, idx) {
        monthList.push(`<option value="${i+1}" >${idx}</option>`);
    });
    // console.log("monthList", monthList);
    resolve(monthList);
});

//@return array = [currentYear,....0]
let _setYear = new Promise((resolve) => {
    let startYear = 1947;
    let endYear = new Date().getFullYear();
    const yearArray = Array.from(range(startYear, endYear));
    // console.log("yearArray", yearArray);
    let yearList = [];
    $.each(yearArray.reverse(), function(i, idx) {
        yearList.push(`<option value="${idx}" >${idx}</option>`);
    });
    // console.log("yearList", yearList);
    resolve(yearList);
});



const populateData = async () => {
    try {
        let [dayList, monthList, yearList] = await Promise.all([_setDay, _setMonth, _setYear]);
        // let today = _getTodayDate();
        // console.log("today", today);
        $('.select-date').append(dayList.join('')).prop('selectedIndex', 0);
        $('.select-month').append(monthList.join('')).prop('selectedIndex', 0);
        $('.select-year').append(yearList.join('')).prop('selectedIndex', 0);
    } catch (e) {
        throw new Error('some promise not resolved', e);
    }
};

populateData();

})();