// b_day, b_month, b_year : Day, Month and Year of Birth
// t_day, t_month, t_year : Day, Month and Year Currently
// currDate : current Date & Time
// dob : Date of Birth
// userSDate : Date selected by user    (End Date)
// userBDate : Birth Date of user       (Start Date)
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

/* =========================== FOR TAB2: Different Dates Age Calculator ======================= */

//function to display the days (birth date) for select-list
function fetchBDate(){
    var myArray = [];
    for(var j = 1; j < 32; j++){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label4");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the months (birth date) for select-list
function fetchBMonth(){
    var myArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var key = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
    var dropdown = document.getElementById("label5");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], key[i]);
    }
}


//function to display the years (birth date) for select-list
function fetchBYear(){
    var myArray = [];
    for(var j = 2017; j > 1900; j--){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label6");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the days (selected date) for select-list
function fetchSDate(){
    var myArray = [];
    for(var j = 1; j < 32; j++){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label7");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the months (selected date) for select-list
function fetchSMonth(){
    var myArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var key = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
    var dropdown = document.getElementById("label8");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], key[i]);
    }
}


//function to display the years (selected date) for select-list
function fetchSYear(){
    var myArray = [];
    for(var j = 2017; j > 1919; j--){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label9");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the output of the age calculator
function displayResult(currDate, years, numOfMon, diffDays, daysRemain){

    document.getElementById("getDate2").innerHTML = currDate;      //code for today's date

    document.getElementById("ageYears2").innerHTML = years;        //code for age in years

    document.getElementById("ageMonths2").innerHTML = numOfMon;    //code for age in months

    document.getElementById("ageDays2").innerHTML = diffDays;      //code for age in days
}


//function to calculate the age between two dates
function getAgeDiff(){
    var b_day = parseInt(document.forms[1].txtBday2.value, 10);
    var b_month = parseInt(document.forms[1].txtBmo2.value, 10);
    var b_year = parseInt(document.forms[1].txtByr2.value, 10);

    let userBDateString = `${b_month}-${b_day}-${b_year}`;
    let userBDate = new Date(userBDateString);

    var s_day = parseInt(document.forms[1].txtSday.value, 10);
    var s_month = parseInt(document.forms[1].txtSmon.value, 10);
    var s_year = parseInt(document.forms[1].txtSyr.value, 10);


    let userSDateString = `${s_month}-${s_day}-${s_year}`;
    let userSDate = new Date(userSDateString);

    if(isFinite(userBDate) && isFinite(userSDate)){
        if(s_year > b_year){
            //code for calculating age in years
            var years = userSDate.getUTCFullYear() - userBDate.getUTCFullYear();

            //code for calculating age in months
            var numOfMon = (userSDate.getUTCFullYear() - userBDate.getUTCFullYear()) * 12 + (userSDate.getMonth() - userBDate.getMonth())

            //code for calculating age in days
            var diffDays = Math.floor((userSDate - userBDate) / cal);
        }

        else{
            alert('The Selected Year should be greater than the Birth year');
            return false;
        }
    }
    else {
        alert('Invalid Date, try again.');
        return false;
    }

    //function call to display the output of age calculator
    displayResult(currDate, years, numOfMon, diffDays);

    //function call for zodiac sign
    var z_sign = zodiac(userBDate.getDay(), userBDate.getMonth());
    alert(z_sign);

    //function to get the countdown to next birthday
    var dlDay = userBDate.getDate();
    var dlMon = userBDate.getMonth();
    var dlYr = userSDate.getFullYear() + 1;

    var deadline = new Date();
    deadline.setDate(dlDay);
    deadline.setMonth(dlMon);
    deadline.setYear(dlYr);

    var countDownDate = new Date(deadline).getTime();

    var x = setInterval(function(){
        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown2").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
        if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown2").innerHTML = "EXPIRED";
        }
    }, 1000);
}


//function to calculate age from today (What is my age?)
function getDataAgeDiff(){
    var b_day = parseInt(document.forms[1].txtBday2.value, 10);
    var b_month = parseInt(document.forms[1].txtBmo2.value, 10);
    var b_year = parseInt(document.forms[1].txtByr2.value, 10);

    let userBDateString = `${b_month}-${b_day}-${b_year}`;
    let userBDate = new Date(userBDateString);

    var s_day = parseInt(document.forms[1].txtSday.value, 10);
    var s_month = parseInt(document.forms[1].txtSmon.value, 10);
    var s_year = parseInt(document.forms[1].txtSyr.value, 10);


    let userSDateString = `${s_month}-${s_day}-${s_year}`;
    let userSDate = new Date(userSDateString);

    var days, ageYears, ageMonths, ageDays;

    days = Math.ceil((userSDate - userBDate) / (cal) + 30);

    //years calculation from today
    ageYears = Math.floor(days / 365);

    //months calculation from today
    var diffMonth = userSDate.getMonth() - userBDate.getMonth();
    if(diffMonth >= 0){
        ageMonths = userSDate.getMonth() - userBDate.getMonth();
    }
    else if(diffMonth < 0){
        ageMonths = 12 - Math.abs((userSDate.getMonth() - userBDate.getMonth()));
    }

    //days calculation from today
    var diffDay = userSDate.getDate() - userBDate.getDate();
    var y = userBDate.getFullYear();

    if(userBDate.getMonth() == 1 || userBDate.getMonth() == 2) {
        var conValue = confirm("If date entered is greater than 29 (for leap year) or 28 for FEBRUARY month, the age will be calculated automatically considering 1st March of the concerned year! Do you wish to continue?");
        if(conValue == true){
            if( (0 == y % 4) && (0 != y % 100) || (0 == y % 400)){
                ageDays = 29 - Math.abs(diffDay);
            }
            else{
                ageDays = 28 - Math.abs(diffDay);
            }
        }
        else if(conValue == false)
            return false;
    }
    if(diffDay < 0){
        ageMonths--;
        ageDays = 31 - Math.abs(diffDay);
    }
    if(diffDay >= 0){
        ageDays = diffDay;
    }

    //function call for displaying the total age from today
    var id = "demo2";
    getHumanReadableDate(id, ageYears, ageMonths, ageDays);
}

});
