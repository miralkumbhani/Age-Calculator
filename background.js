'use strict';

$(document).ready(() => {
    $('.tabcontent').eq(0).show();

    // works on top tabs to switch between tabs
    $('.tab').on('click', '.tablinks', function() {
        $('.section_output').hide();
        let display = $(this).data('display');
        let index = $(this).index();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#tab_data').children().hide();
        $('#tab_data').children('#' + display).show();
    });
});

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
        // set first date auto selected
        let selected = (i === 0) ? "selected='true'" : "";
        dateList.push(`<option value="${i+1}" ${selected} >${idx}</option>`);
    });
    // console.log("dateList", dateList);
    resolve(dateList);
});

//@return array = [January, ...December]
let _setMonth = new Promise((resolve) => {
    const monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthList = [];
    $.each(monthNameArray, function(i, idx) {
        // set first month auto selected
        let selected = (i === 0) ? "selected='true'" : "";
        monthList.push(`<option value="${i+1}" ${selected} >${idx}</option>`);
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
    $.each(yearArray, function(i, idx) {
        // set current year auto selected
        let selected = (i === yearArray.length-1) ? "selected='true'" : "";
        yearList.push(`<option value="${idx}" ${selected} >${idx}</option>`);
    });
    // console.log("yearList", yearList);
    resolve(yearList);
});

const populateData = async() => {
    try {
        let [dayList, monthList, yearList] = await Promise.all([_setDay, _setMonth, _setYear]);
        $('.select-date').append(dayList.join(''));
        $('.select-month').append(monthList.join(''));
        $('.select-year').append(yearList.join(''));
    } catch (e) {
        throw new Error('some promise not resolved', e);
    };
};

populateData();