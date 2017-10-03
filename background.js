'use strict';

// @return array = [1,...31]
function _setDay() {
    let dateArray = [];
    for (let j = 1; j < 32; j++) {
        dateArray.push(j);
    }
    let dateDropdown = [];
    $.each(dateArray, function(i, idx) {
        dateDropdown.push(`<option value="${i+1}">${idx}</option>`);
    });
    return dateDropdown;
}

//@return array = [January, ...December]
function _setMonth() {
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthDropdown = [];
    $.each(monthArray, function(i, idx) {
        monthDropdown.push(`<option value="${i+1}">${idx}</option>`);
    });
    return monthDropdown;
}

//@return array = [currentYear,....0]
function _setYear() {
    let yearArray = [];
    let endYear = new Date().getFullYear();
    for (let j = endYear; j > 1599; j--) {
        yearArray.push(j);
    }
    let yearDropdown = [];
    $.each(yearArray, function(i, idx) {
        yearDropdown.push(`<option value="${idx}">${idx}</option>`);
    });
    return yearDropdown;
}

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
        //event.preventDefault;
    });

    //function to calculate the zodiac sign based on birth date
    const zodiac = function(day, month) {
        let zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
        let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
        return (day > last_day[month]) ? zodiacName[month * 1 + 1] : zodiacName[month];
    };

    //function to display the output properly
    const maybePluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

    //function for the countdown time for birthday
    const getCountdownTime = function(inputDate) {
        //function to get the countdown to next birthday
        let userDate = inputDate;
        let dlDay = userDate.getDate();
        let dlMon = userDate.getMonth();
        let dlYr = currDate.getFullYear() + 1;

        let deadline = new Date();
        deadline.setDate(dlDay);
        deadline.setMonth(dlMon);
        deadline.setYear(dlYr);

        let interval = setInterval(function() {
            let currentTime = new Date().getTime();
            let countdownTime = new Date(deadline).getTime();
            let diffInTime = countdownTime - currentTime;

            let days = Math.floor(diffInTime / dayInMilli);
            let hours = Math.floor((diffInTime % (dayInMilli)) / (1000 * 60 * 60));
            let minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);

            if (diffInTime > 0) {
                let countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;
                $('#countdown').html(countdownString);
            } else {
                clearInterval(interval);
                $('#countdown').html("EXPIRED");
            }
        }, 1000);
    };

    //function to get zodiac name, birth-range and attributes
    const getZodiacData = function() {
        return $.getJSON("./zodiac.json").done(function(data) {
            return data;
        }).fail(function(err) {
            console.log('error while parsing json', err);
            return false;
        });
    };

    function getZodiacDetails(z, zname) {
        let zArray = z;
        let zodiacName = zname;
        let selected_array = zArray.find(function(z) {
            if (z.zsign === zname) {
                return z;
            }
        });
        return selected_array;
    }

    /* ========================= FOR TAB1: Birth Date Age Calculator =========================== */
    //function to get complete age from today
    function getTrueAge(inputDate) {
        let userDate = inputDate;
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

    $(document).on('click', 'button#getAge', function() {
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

    //function to calculate the age between two dates
    function getDateDiff() {
        let start_date = $('#start_date_label').val();
        let start_month = $('#start_month_label').val();
        let start_year = $('#start_year_label').val();

        let userSDateString = `${start_month}-${start_date}-${start_year}`;
        let userSDate = new Date(userSDateString);

        let end_date = $('#end_date_label').val();
        let end_month = $('#end_month_label').val();
        let end_year = $('#end_year_label').val();

        let userEDateString = `${end_month}-${end_date}-${end_year}`;
        let userEDate = new Date(userEDateString);

        //debugger;
        if (isFinite(userSDate) && isFinite(userEDate)) {
            if (end_year > start_year) {
                let select_diffYears = userEDate.getFullYear() - userSDate.getFullYear();
                let select_diffMonths = (select_diffYears) * 12 + (userEDate.getMonth() - userSDate.getMonth());
                let selectTime = userEDate.getTime();
                let userTime = userSDate.getTime();
                let diffTime = Math.abs(selectTime - userTime);
                let select_diffWeeks = Math.floor(diffTime / (dayInMilli * 7));
                let select_diffDays = Math.floor((userEDate - userSDate) / dayInMilli);

                $('#start_date').html(userSDate);
                $('#end_date').html(userEDate);
                $('#diff_years').html(select_diffYears);
                $('#diff_months').html(select_diffMonths);
                $('#diff_weeks').html(select_diffWeeks);
                $('#diff_days').html(select_diffDays);
            } else {
                alert('The Selected Year should be greater than the Birth year');
                return false;
            }
        } else {
            alert('Invalid Date, try again.');
            return false;
        }
    }
});