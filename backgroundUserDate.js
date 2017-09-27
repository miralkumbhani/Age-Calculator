'use strict';

// making default date month and year
//function to display days for select-list
function fetchDate(){
    let dateArray = [];
    for(let j = 1; j < 32; j++){
        dateArray.push(j);
    }
    let dateLabel = $('#date_label');
    // console.log("dateLabel", dateLabel);
    $.each(dateArray, function(i,idx){
        // adding +1 as array index start from 0
        dateLabel.append(`<option value="${i+1}">${idx}</option>`);
    });
}

//function to display months for select-list
function fetchMonth(){
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthDropdown = $("#month_label");
    $.each(monthArray, function(i, idx){
        // console.log('each i', idx);
        monthDropdown.append(`<option value="${i+1}">${idx}</option>`);
    });
}

//function to display years for the select-list
function fetchYear(){
    let yearArray = [];
    let endYear = new Date().getYear(); // return 117 : new JS feature
    for(let j = endYear; j > 0; j--){
        yearArray.push(1900 + j);
    }
    // console.log("yearArray", yearArray);
    let yearDropdown = $("#year_label");
    $.each(yearArray, function(i, idx){
        yearDropdown.append(`<option value="${idx}">${idx}</option>`);
    });
}

$(document).ready(function () {
$('.tabcontent').eq(0).show();
fetchDate();
fetchMonth();
fetchYear();

const currDate = new Date();
const zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
console.log("currDate", currDate);


const dayInMili = 1000 * 60 * 60 * 24;

$('.tab').on('click', '.tablinks', function() {
    // console.log('tab clicked');
    let display = $(this).data('display');
    // console.log("content", content);
    let index = $(this).index();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('#tab_content').children().hide();
    $('#tab_content').children('#' + display).show();
    // event.preventDefault;
});
/* ========================== FOR TAB1: Birth Date Age Calculator ============================= */
//function to display the output of age calculator
const display = function(currDate, years, numOfMon, diffDays) {
    $("#getDate").html(currDate);
    $("#ageYears").html(years);
    $("#ageMonths").html(numOfMon);
    $("#ageDays").html(diffDays);
};
//function to calculate the zodiac sign based on birth date
// @return
function zodiac(day, month){
    let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (day > last_day[month]) ? zodiac[month*1 + 1] : zodiac[month];
}

$(document).on('click', 'button#get_age', function () {
    getAge();
});

//function to calculate the age in years, days and months
function getAge()
{
    let u_date = $('#date_label').val();
    let u_month = $('#month_label').val();
    let u_year = $('#year_label').val();

    let userDateString = `${u_month}-${u_date}-${u_year}`;
    console.log("userDateString", userDateString);
    let userDate = new Date(userDateString);
    console.log("userDate", userDate);

    $("#todayDate").html(currDate);

    if(isFinite(userDate)) {
        //code for calculating age in years
        var diffYears = currDate.getUTCFullYear() - userDate.getUTCFullYear();
        //code for calculating age in months
        var diffMonths = diffYears * 12 + (currDate.getMonth() - userDate.getMonth());
        //code for calculating age in days
        var diffDays = Math.floor((currDate - userDate) / dayInMili);
        $("#userDate").html(userDate);
        $("#ageYears").html(diffYears);
        $("#ageMonths").html(diffMonths);
        $("#ageDays").html(diffDays);
        getTrueAge(userDate);
        getCountdownTime(userDate);
    }
    else {
        alert('Invalid Date, try again.');
        return false;
    }

    //function call for displaying the output of age calculator
    // display(currDate, years, numOfMon, diffDays);

    //function call for zodiac sign
    //var z_sign = zodiac(userDate.getDay(), userDate.getMonth());
}

const getCountdownTime = function (inputDate) {
 //function to get the countdown to next birthday
    let userDate = inputDate;
    let dlDay = userDate.getDate();
    let dlMon = userDate.getMonth();
    let dlYr = currDate.getFullYear() + 1;

    let deadline = new Date();
    console.log("deadline", deadline);
    deadline.setDate(dlDay);
    deadline.setMonth(dlMon);
    deadline.setYear(dlYr);

    let interval = setInterval(function() {
        let currentTime = new Date().getTime();
        console.log("currentTime", currentTime);
        let countdownTime = new Date(deadline).getTime();
        console.log("countdownTime", countdownTime);
        let diffInTime = countdownTime - currentTime;

        let days = Math.floor(diffInTime / dayInMili);
        let hours = Math.floor((diffInTime % (dayInMili)) / (1000 * 60 * 60));
        let minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);

        let countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;
        if(diffInTime > 0){
            $('#countdown').html(countdownString);
        } else {
            clearInterval(interval);
            $('#countdown').html("EXPIRED");
        }
    }, 1000);
};

function getTrueAge(inputDate){
    console.log("getTrueAge", inputDate);
    let userDate = inputDate;
    let ageYears, ageMonths, ageDays;
    //days calculation from today
    let totalDays = Math.floor((currDate - userDate) / dayInMili);
    // console.log("totalDays", totalDays);
    //years calculation from today
    ageYears = Math.floor(totalDays / 365);
    // console.log("ageYears", ageYears);
    //months calculation from today
    var diffMonth = currDate.getMonth() - userDate.getMonth();
    if(diffMonth >= 0){
        ageMonths = currDate.getMonth() - userDate.getMonth();
    } else {
        ageMonths = 12 - Math.abs((currDate.getMonth() - userDate.getMonth()));
    }
    //days calculation from today
    let diffDay = currDate.getDate() - userDate.getDate();
    let currentYear = userDate.getFullYear();
    if(diffDay >= 0){
        ageDays = diffDay;
    } else {
        ageMonths--;
        ageDays = 31 - Math.abs(diffDay);
    }

    let dayString = maybePluralize(ageDays, 'day');
    // console.log("dayString", dayString);
    let monthString = maybePluralize(ageMonths, 'month');
    // console.log("monthString", monthString);
    let yearString = maybePluralize(ageYears, 'year');
    // console.log("yearString", yearString);
    let totalAge = `${yearString}, ${monthString}, ${dayString}`;
    // console.log("total Age: ", totalAge);
    $('#fullAge').html(totalAge);
}

const maybePluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;