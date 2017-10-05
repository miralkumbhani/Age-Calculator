'use strict';

const currDate = new Date();
const dayInMilli = 1000 * 60 * 60 * 24;

// @return array = [1,...31]
let _setDay = new Promise((resolve, reject) => {
    let dateArray = [];
    for (let j = 1; j < 32; j++) {
        dateArray.push(j);
    }
    let dateList = [];
    $.each(dateArray, function(i, idx) {
        dateList.push(`<option value="${i+1}">${idx}</option>`);
    });
    resolve(dateList);
    // let rr = {rj:'this is gone'};
    // reject(rr);
});

//@return array = [January, ...December]
let _setMonth = new Promise((resolve, reject) => {
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthList = [];
    $.each(monthArray, function(i, idx) {
        monthList.push(`<option value="${i+1}">${idx}</option>`);
    });
    resolve(monthList);
});

//@return array = [currentYear,....0]
let _setYear = new Promise((resolve, reject) => {
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

//function to display the output properly
const maybePluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

//function to calculate the zodiac sign based on birth date
const zodiac = (day, month) => {
    let zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (day > last_day[month]) ? zodiacName[month * 1 + 1] : zodiacName[month];
};

//function for the countdown time for birthday (CHECK)
const getCountdownTime = (inputDate) => {
    //function to get the countdown to next birthday
     let userDate = inputDate;
    // let dlDay = userDate.getDate();
    // let dlMon = userDate.getMonth();
    // let dlYr = currDate.getFullYear() + 1;

    // let deadline = new Date();
    // deadline.setDate(dlDay);
    // deadline.setMonth(dlMon);
    // deadline.setYear(dlYr);

    let [x, y, z] = [userDate.getDate(), userDate.getMonth(), currDate.getFullYear() + 1];
    console.log("x, y, z:", x, y, z);
    let countdownTime = new Date(x, y, z).getTime();
    // let countdownTime = new Date(deadline).getTime();

    let interval = setInterval(function() {
        let currentTime = new Date().getTime();

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

//function to get zodiac data from json
const getZodiacData = () => {
    return $.getJSON("./zodiac.json").done((data) => {
        return data;
    }).fail( (err) => {
        console.log('error while parsing json', err);
        return false;
    });
};

//function for getting zodiac details
const getZodiacDetails = (z, zname) => {
    let zArray = z;
    let zodiacName = zname;
    let selected_array = zArray.find(function(z) {
        if (z.zsign === zname) {
            return z;
        }
    });
    return selected_array;
}

//function to get complete age from today
const getTrueAge = (inputDate) => {
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

//function to get data for calculating the time diff
const getDataDiff = (formName, addon) => {
    let form_name = formName;
    let add_on = addon;

    if (add_on === true && form_name === 'firstForm') {
        let startDate = document.firstForm.start_date.value;
        let startMonth = document.firstForm.start_month.value;
        let startYear = document.firstForm.start_year.value;

        let userSDateString = `${startMonth}-${startDate}-${startYear}`;
        let userSDate = new Date(userSDateString);

        let userEDate = currDate;

        getDiffTime(userSDate, userEDate, add_on);
    } else if (add_on === false && form_name === 'secondForm') {
        let startDate = document.secondForm.start_date.value;
        let startMonth = document.secondForm.start_month.value;
        let startYear = document.secondForm.start_year.value;

        let endDate = document.secondForm.end_date.value;
        let endMonth = document.secondForm.end_month.value;
        let endYear = document.secondForm.end_year.value;

        let userSDateString = `${startMonth}-${startDate}-${startYear}`;
        let userSDate = new Date(userSDateString);

        let userEDateString = `${endMonth}-${endDate}-${endYear}`;
        let userEDate = new Date(userEDateString);

        getDiffTime(userSDate, userEDate, add_on);
    }
}

//one common function for getting Age Diff and Time Diff
const getDiffTime = (initial_date, final_date, op) => {
    let userStartDate = initial_date;
    let userEndDate = final_date;
    let add_on = op;
    let end_year = final_date.getFullYear();
    let start_year = initial_date.getFullYear();

    if (isFinite(userStartDate) && isFinite(userEndDate)) {
        if (end_year >= start_year) {
            //for calculating diff in years
            let diffYears = userEndDate.getFullYear() - userStartDate.getFullYear();
            //for calculating diff in months
            let diffMonths = (diffYears) * 12 + (userEndDate.getMonth() - userStartDate.getMonth());
            //for calculating diff in weeks
            let selectTime = userEndDate.getTime();
            let userTime = userStartDate.getTime();
            let diffTime = Math.abs(selectTime - userTime);
            let diffWeeks = Math.floor(diffTime / (dayInMilli * 7));
            //for calculating diff in days
            let diffDays = Math.floor((userEndDate - userStartDate) / dayInMilli);

            if (add_on === true) {
                $('#today_date').html(currDate);
                $('#user_date').html(userStartDate);
                $('#user_ageYears').html(diffYears);
                $('#user_ageMonths').html(diffMonths);
                $('#user_ageWeeks').html(diffWeeks);
                $('#user_ageDays').html(diffDays);
                getTrueAge(userStartDate);
                getCountdownTime(userStartDate);
                let z_sign = zodiac(userStartDate.getDate(), userStartDate.getMonth());
                let zodiac_info = [];
                getZodiacData().then((d) => {
                    zodiac_info = d;
                    let displayZodiac = getZodiacDetails(zodiac_info, z_sign);
                    $('#zodiac_name').html(displayZodiac.zsign);
                    $('#zodiac_birthrange').html(displayZodiac.birthrange);
                    $('#zodiac_attributes').html(displayZodiac.attribute);
                });
            } else if (add_on === false) {
                $('#start_date').html(userStartDate);
                $('#end_date').html(userEndDate);
                $('#diff_years').html(diffYears);
                $('#diff_months').html(diffMonths);
                $('#diff_weeks').html(diffWeeks);
                $('#diff_days').html(diffDays);
            }
        } else {
            alert('The Selected Year should be greater than the Birth year');
            return false;
        }
    } else {
        alert('Invalid Date, try again.');
        return false;
    }
}