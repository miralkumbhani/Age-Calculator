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

    // @return array = [1,...31]
    let _setDay = new Promise((resolve) => {
        let dateArray = [];
        for (let j = 1; j < 32; j++) {
            dateArray.push(j);
        }
        let dateList = [];
        $.each(dateArray, function(i, idx) {
            dateList.push(`<option value="${i+1}">${idx}</option>`);
        });
        resolve(dateList);
    });

    //@return array = [January, ...December]
    let _setMonth = new Promise((resolve) => {
        let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthList = [];
        $.each(monthArray, function(i, idx) {
            monthList.push(`<option value="${i+1}">${idx}</option>`);
        });
        resolve(monthList);
    });

    //@return array = [currentYear,....0]
    let _setYear = new Promise((resolve) => {
        let yearArray = [];
        let endYear = new Date().getFullYear();
        for (let j = endYear; j > 1857; j--) {
            yearArray.push(j);
        }
        let yearList = [];
        $.each(yearArray, function(i, idx) {
            yearList.push(`<option value="${idx}">${idx}</option>`);
        });
        resolve(yearList);
    });

    // Promise.all will resolve when all promise resolved
    Promise.all([_setDay, _setMonth, _setYear]).then((result) => {
        // console.log("result", result);
        //creating date option list
        let dayList = result[0].join('');
        $('.select-date').append(dayList);
        //creating month option list
        let monthList = result[1].join('');
        $('.select-month').append(monthList);
        //creating year option list
        let yearList = result[2].join('');
        $('.select-year').append(yearList);
    }).catch((err) => {
        console.log('one of promise rejected', err);
    });
});