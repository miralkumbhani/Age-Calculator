'use strict';

$(document).ready(() => {
    $('.tabcontent').eq(0).show();
    // works on top tabs to switch between tabs
    $('.tab').on('click', '.tablinks', function() {
        let display = $(this).data('display');
        let index = $(this).index();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#tab_data').children().hide();
        $('#tab_data').children('#' + display).show();
    });

    // Promise.all will resolve when all promise resolved
    Promise.all([_setDay, _setMonth, _setYear]).then( (result) => {
        // console.log("result", result);
        //creating date option list
        let dayList = result[0].join('');
        $('.start-date').html(dayList);
        //creating month option list
        let monthList = result[1].join('');
        $('.start-month').html(monthList);
        //creating year option list
        let yearList = result[2].join('');
        $('.start-year').html(yearList);
    }).catch((err) => {
        console.log('one of promise rejected', err);
    });
});