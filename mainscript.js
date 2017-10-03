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