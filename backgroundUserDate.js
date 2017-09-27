'use strict'

function getUserDate(){
    let dateArray = [];
    for(let j = 1; j < 32; j++){
        dateArray.push(j);
    }
    let dateDropdown = $('#date_label');
    $.each(dateArray, function(i, idx){
        dateDropdown.append(`<option value="${i+1}">${idx}</option>`);
    });
}

function getUserMonth(){
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthDropdown = $('#month_label');
    $.each(monthArray, function(id, idx){
        monthDropdown.append(`<option value="${id+1}">${idx}</option>`);
    });
}

function getUserYear(){
    let yearArray = [];
    let endYear = new Date().getFullYear();
    for(let j = endYear; j > 0; j--){
        yearArray.push(j);
    }
    let yearDropdown = $('#year_label');
    $.each(yearArray, function(id, idx){
        yearDropdown.append(`<option value="${id}">${idx}</option>`);
    });
}

$(document).ready(function(){
    $('.tab-content').eq(0).show();
    getUserDate();
    getUserMonth();
    getUserYear();

    const currDate = new Date();
    const zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    const dayInMilli = 1000 * 60 * 60 * 24;

    $('.tab').on('click', 'tablinks', function(){
        let display = $(this).data('display');
        let index = $(this).index();
        $(this).siblings().removeClass('active');

    });
});
