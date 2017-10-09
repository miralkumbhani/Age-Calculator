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
const getZodiacSign = (day, month) => {
    return new Promise((resolve, reject) => {
        let zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
        let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
        let zName = (day > last_day[month]) ? zodiacName[month * 1 + 1] : zodiacName[month];
        resolve(zName);
        //reject(false);
    });
};

const displayCountdown = (finalTime) => {
    // console.log("displayCountdown", finalTime);
    let initialTime = new Date().getTime();
    let diffInTime = finalTime - initialTime;

    let days = Math.floor(diffInTime / dayInMilli);
    let hours = Math.floor((diffInTime % (dayInMilli)) / (1000 * 60 * 60));
    let minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);
    // console.log("diff in time:", diffInTime);
    let countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;
    // console.log("countdownString", countdownString);
    $('#countdown').html(countdownString)
}

//function for the countdown time for birthday (CHECK)
const getCountdownTime = (nextBirthDate) => {
    setInterval(() => {
        displayCountdown(nextBirthDate);
    }, 1000);
};

const getZodiacData = () =>
    new Promise((resolve, reject) => {
        $.getJSON("./zodiac.json").done((data) => {
            resolve(data);
        }).fail((err) => {
            console.log('error while parsing json', err);
            reject(false);
        });
    });

//function for getting zodiac details
const getZodiacDetails = (z, zname) => {
    return new Promise((resolve, reject) => {
        let zArray = z;
        let zodiacName = zname;
        return zArray.find(function(z) {
            if (z.zsign === zname) {
                resolve(z);
            }
        });
    });
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
const getDataDiff = (formName) => {
    let diff = (formName === 'firstForm') ? false : true;
    // console.log(' sdv', document[formName].start_date.value);

    let startDate = document[formName].start_date.value;
    let startMonth = document[formName].start_month.value;
    let startYear = document[formName].start_year.value;
    let startDay = new Date(`${startMonth}-${startDate}-${startYear}`);
    let endDay = new Date();

    // console.log("startDay", startDay);
    if (diff) {
        let endDate = document.secondForm.end_date.value;
        let endMonth = document.secondForm.end_month.value;
        let endYear = document.secondForm.end_year.value;
        endDay = new Date(`${endMonth}-${endDate}-${endYear}`);
    }

    getDiffTime(startDay, endDay, diff);
}

const getDiff = (sd, ed, what) => {
    let output;
    switch (what) {
        case 'year':
            output = ed.getFullYear() - sd.getFullYear();
            break;
        case 'month':
            output = (ed.getMonth() - sd.getMonth());
            break;
        case 'week':
            let selectTime = ed.getTime();
            let userTime = sd.getTime();
            let diffTime = Math.abs(selectTime - userTime);
            output = Math.floor(diffTime / (dayInMilli * 7));
            break;
        case 'day':
            output = Math.floor((ed - sd) / dayInMilli);
            break;
        default:
    }

    // diffrence in what
    return output;
};

const getZodiacInfo = (initial_date) => {
    return getZodiacData().then((result) => {
        console.log("result 1", result);
        let birthDate = initial_date.getDate();
        let birthMonth = initial_date.getMonth();
        let zodiac_info = result;
        getZodiacSign(birthDate, birthMonth).then((result) => {
            console.log("result 2", result);
            getZodiacDetails(zodiac_info, result).then((result) => {
                console.log("result 3", result);
                $('#zodiac_name').html(result.zsign);
                $('#zodiac_birthrange').html(result.birthrange);
                $('#zodiac_attributes').html(result.attribute);
            });
        }).catch((err) => {
            console.log("Promise 1 was rejected", err);
        });
    }).catch((err) => {
        console.log("Promise 2 was rejected", err);
    });
};

const display = (initial_date, final_date, diff, diffYears, diffMonths, diffWeeks, diffDays) => {
    if (diff) {
        $('#user_date').html(initial_date);
        $('#today_date').html(final_date);
        $('#user_ageYears').html(diffYears);
        $('#user_ageMonths').html(diffMonths);
        $('#user_ageWeeks').html(diffWeeks);
        $('#user_ageDays').html(diffDays);
    } else {
        $('#start_date').html(initial_date);
        $('#end_date').html(final_date);
        $('#diff_years').html(diffYears);
        $('#diff_months').html(diffMonths);
        $('#diff_weeks').html(diffWeeks);
        $('#diff_days').html(diffDays);
    }

}

//one common function for getting Age Diff and Time Diff
const getDiffTime = (initial_date, final_date, diff) => {
    // console.log('getDiffTime==>', initial_date, final_date, op);
    let current_birthday = initial_date;
    let start_year = current_birthday.getFullYear();
    let next_birthday = new Date(initial_date); // necessary step to make Date object again
    next_birthday.setFullYear(start_year + 1);
    // console.log("next_birthday", current_birthday, next_birthday, start_year);
    let end_year = final_date.getFullYear();

    if (isFinite(initial_date) && isFinite(final_date)) {
        if (end_year >= start_year) {
            //for calculating diff in years
            // let diffInYears = getDiff(sd, ed, 'year');
            let diffYears = getDiff(initial_date, final_date, 'year');
            Promise.resolve(diffYears).then((result) => {
                let diffYears = result;
                let diffMonths = diffYears * 12 + getDiff(initial_date, final_date, 'month');
                let diffWeeks = getDiff(initial_date, final_date, 'week');
                let diffDays = getDiff(initial_date, final_date, 'day');
                display(initial_date, final_date, diff, diffYears, diffMonths, diffWeeks, diffDays);
            });
            getTrueAge(initial_date);
            getCountdownTime(next_birthday);
            //the result is giving JSON array as output
            getZodiacInfo(current_birthday);
        } else {
        alert('The Selected Year should be greater than the Birth year');
        return false;
    }
} else {
    alert('Invalid Date, try again.');
    return false;
}
};