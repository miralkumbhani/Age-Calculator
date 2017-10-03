'use strict';

$(document).ready(function() {
    $('.tabcontent').eq(0).show();

    let age_day = _setDay();
    $('#date_label').html(age_day.join(''));

    let age_month = _setMonth();
    $('#month_label').html(age_month.join(''));

    let age_year = _setYear();
    $('#year_label').html(age_year.join(''));

    const currDate = new Date();
    const dayInMilli = 1000 * 60 * 60 * 24;

    $('.tab').on('click', '.tablinks', function() {
        let display = $(this).data('display');
        let index = $(this).index();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#tab_data').children().hide();
        $('#tab_data').children('#' + display).show();
    });

    /* ========================= FOR TAB1: Birth Date Age Calculator =========================== */
    //function to get complete age from today
    function getTrueAge(inputDate) {
        let userDate = inputDate;
        console.log(userDate);
        let ageYears, ageMonths, ageDays;
        //days calculation from today
        let totalDays = Math.floor((currDate - userDate) / dayInMilli);
        //years calculation from today
        ageYears = Math.floor(totalDays / 365);
        //months calculation from today
        var diffMonth = currDate.getMonth() - userDate.getMonth();
        if (diffMonth >= 0) {
            ageMonths = currDate.getMonth() - userDate.getMonth();
        } else {
            ageMonths = 12 - Math.abs((currDate.getMonth() - userDate.getMonth()));
        }
        //days calculation from today
        let diffDay = currDate.getDate() - userDate.getDate();
        let currentYear = userDate.getFullYear();
        if (diffDay >= 0) {
            ageDays = diffDay;
        } else {
            ageMonths--;
            ageDays = 31 - Math.abs(diffDay);
        }

        let dayString = maybePluralize(ageDays, 'day');
        let monthString = maybePluralize(ageMonths, 'month');
        let yearString = maybePluralize(ageYears, 'year');
        let totalAge = `${yearString}, ${monthString}, ${dayString}`;
        $('#user_todayAge').html(totalAge);
    }

    $(document).on('click', 'button.button', function() {
        getAge();
    });

    //function to calculate the age in years, days and months
    function getAge() {
        let u_date = $('#date_label').val();
        let u_month = $('#month_label').val();
        let u_year = $('#year_label').val();

        let userDateString = `${u_month}-${u_date}-${u_year}`;
        let userDate = new Date(userDateString);

        if (isFinite(userDate)) {
            //code for calculating age in years
            let user_diffYears = currDate.getFullYear() - userDate.getFullYear();
            //code for calculating age in months
            let user_diffMonths = user_diffYears * 12 + (currDate.getMonth() - userDate.getMonth());
            //code for calculating age in days
            let user_diffDays = Math.floor((currDate - userDate) / dayInMilli);
            //code for calculating age in weeks
            let currTime = currDate.getTime();
            let userTime = userDate.getTime();
            let diffTime = Math.abs(currTime - userTime);
            let user_ageWeeks = Math.floor(diffTime / (dayInMilli * 7));

            $('#today_date').html(currDate);
            $("#user_date").html(userDate);
            $("#user_ageYears").html(user_diffYears);
            $("#user_ageMonths").html(user_diffMonths);
            $('#user_ageWeeks').html(user_ageWeeks);
            $("#user_ageDays").html(user_diffDays);
            getTrueAge(userDate);
            getCountdownTime(userDate);
            let z_sign = zodiac(userDate.getDate(), userDate.getMonth());
            let zodiac_info = [];
            getZodiacData().then((d) => {
                zodiac_info = d;
                let displayZodiac = getZodiacDetails(zodiac_info, z_sign);
                $('#zodiac_name').html(displayZodiac.zsign);
                $('#zodiac_birthrange').html(displayZodiac.birthrange);
                $('#zodiac_attributes').html(displayZodiac.attribute);
            });
        } else {
            alert('Invalid Date, try again.');
            return false;
        }
    }

    /* =========================== FOR TAB2: Different Dates Age Calculator ======================= */
    $('#start_date_label').html(age_day.join(''));
    $('#start_month_label').html(age_month.join(''));
    $('#start_year_label').html(age_year.join(''));

    $('#end_date_label').html(age_day.join(''));
    $('#end_month_label').html(age_month.join(''));
    $('#end_year_label').html(age_year.join(''));

    $(document).on('click', 'button#getDiff', function() {
        getDateDiff();
    });


});