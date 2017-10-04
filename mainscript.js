const currDate = new Date();
const dayInMilli = 1000 * 60 * 60 * 24;

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

//function to display the output properly
const maybePluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

//function to calculate the zodiac sign based on birth date
const zodiac = function(day, month) {
    let zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (day > last_day[month]) ? zodiacName[month * 1 + 1] : zodiacName[month];
};

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

//function to get zodiac data from json
const getZodiacData = function() {
    return $.getJSON("./zodiac.json").done(function(data) {
        return data;
    }).fail(function(err) {
        console.log('error while parsing json', err);
        return false;
    });
};

//function for getting zodiac details
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

/* ====================================================================================================== */
//one common function for getting Age Diff and Time Diff
function getDiffTime(initial_date, final_date, op) {
    let userSDate = initial_date;
    let userEDate = final_date;
    let add_on = op;
    let end_year = final_date.getFullYear();
    let start_year = initial_date.getFullYear();

    if (isFinite(userSDate) && isFinite(userEDate)) {
        if (end_year > start_year) {
            //for calculating diff in years
            let diffYears = userEDate.getFullYear() - userSDate.getFullYear();
            //for calculating diff in months
            let diffMonths = (diffYears) * 12 + (userEDate.getMonth() - userSDate.getMonth());
            //for calculating diff in weeks
            let selectTime = userEDate.getTime();
            let userTime = userSDate.getTime();
            let diffTime = Math.abs(selectTime - userTime);
            let diffWeeks = Math.floor(diffTime / (dayInMilli * 7));
            //for calculating diff in days
            let diffDays = Math.floor((userEDate - userSDate) / dayInMilli);

            if (add_on === true) {
                $('#today_date').html(currDate);
                $('#user_date').html(userSDate);
                $('#user_ageYears').html(diffYears);
                $('#user_ageMonths').html(diffMonths);
                $('#user_ageWeeks').html(diffWeeks);
                $('#user_ageDays').html(diffDays);
                getTrueAge(userSDate);
                getCountdownTime(userSDate);
                let z_sign = zodiac(userSDate.getDate(), userSDate.getMonth());
                let zodiac_info = [];
                getZodiacData().then((d) => {
                    zodiac_info = d;
                    let displayZodiac = getZodiacDetails(zodiac_info, z_sign);
                    $('#zodiac_name').html(displayZodiac.zsign);
                    $('#zodiac_birthrange').html(displayZodiac.birthrange);
                    $('#zodiac_attributes').html(displayZodiac.attribute);
                });
            } else if (add_on === false) {
                $('#start_date').html(userSDate);
                $('#end_date').html(userEDate);
                $('#diff_years').html(diffYears);
                $('#diff_months').html(diffMonths);
                $('#diff_weeks').html(diffWeeks);
                $('#diff_days').html(diffDays);
            }
        }
    } else {
        alert('The Selected Year should be greater than the Birth year');
        return false;
    }
} else {
    alert('Invalid Date, try again.');
    return false;
}