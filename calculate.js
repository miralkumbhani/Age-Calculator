(function() {
    'use strict';

    const currDate = new Date();
    const dayInMilli = 1000 * 60 * 60 * 24;

    let startDate, endDate, diffYears, diffMonths, diffWeeks, diffDays;

    let zodiac_list, zodiac_day;
    let startDay, startMonth, startYear;
    let endDay, endMonth, endYear;

    const _calculate = function() {
        this.endDate = currDate;
        this.zodiac_list = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
        this.zodiac_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    };

    _calculate.prototype = {
        //function to get data for calculating the time diff (setting startDate, endDate )
        getDifference: function(formName) {
            $('.section_output').show();
            // other form name is 'secondForm'
            let diff = (formName === 'firstForm') ? false : true;
            let startDay = document[formName].start_date.value;
            let startMonth = document[formName].start_month.value;
            let startYear = document[formName].start_year.value;
            this.startDate = new Date(`${startMonth}-${startDay}-${startYear}`);
            // destructor assignement
            [this.startDay, this.startMonth, this.startYear] = [startDay, startMonth, startYear];
            [this.endDay, this.endMonth, this.endYear] = [this.endDate.getDate(), this.endDate.getMonth(), this.endDate.getFullYear()];

            if (diff) {
                let endDay = document[formName].end_date.value;
                let endMonth = document[formName].end_month.value;
                let endYear = document[formName].end_year.value;
                [this.endDay, this.endMonth, this.endYear] = [endDay, endMonth, endYear];
                this.endDate = new Date(`${endMonth}-${endDay}-${endYear}`);
            }
            // display age difference in various unit
            this.setDifference(diff);
        },

        //one common function for getting Age Diff and Time Diff (returns diffYears, diffMonths, diffWeeks, diffDays)
        setDifference: function(diff) {
            let current_birthday = this.startDate;
            if (isFinite(this.startDate) && isFinite(this.endDate)) {
                if (this.endYear >= this.startYear) {
                    //for calculating diff in years
                    this.diffYears = this.calculateDifference('year');
                    Promise.resolve(this.diffYears).then((result) => {
                        this.diffYears = result;
                        this.diffMonths = this.diffYears * 12 + this.calculateDifference('month');
                        this.diffWeeks = this.calculateDifference('week');
                        this.diffDays = this.calculateDifference('day');
                        this.display(diff);
                    });
                    //display total age in  `X years, Y months, Z days` format
                    this.getTrueAge();
                    // display countdown in `(290 days 5 hours 7 minutes 16 seconds)` format
                    let next_birthday = new Date(this.startDate); // necessary step to make Date object again
                    next_birthday.setFullYear(this.endYear + 1);
                    this.getCountdownTime(next_birthday);
                    //returns JSON array as output
                    this.getZodiacInfo();
                } else {
                    alert('The selected year must be greater than the birth year');
                    return false;
                }
            } else {
                alert('Invalid Date, try again.');
                return false;
            }
        },

        //function for calculating the age in years, months, weeks, days (switch case)
        calculateDifference: function(what) {
            let output;
            switch (what) {
                case 'year':
                    output = this.endYear - this.startYear;
                    break;
                case 'month':
                    output = this.endMonth - this.startMonth;
                    break;
                case 'week':
                    let selectTime = this.endDate.getTime();
                    let userTime = this.startDate.getTime();
                    let diffTime = Math.abs(selectTime - userTime);
                    output = Math.floor(diffTime / (dayInMilli * 7));
                    break;
                case 'day':
                    output = Math.floor((this.endDate - this.startDate) / dayInMilli);
                    break;
                default:
            }
            return output;
        },

        //function to display thte output (displays age in cards or output)
        display: function(diff) {
            if (diff) {
                //for tab-2 diff = true
                $('#start_date').html(this.startDate);
                $('#end_date').html(this.endDate);
                $('#diff_years').html(this.diffYears);
                $('#diff_months').html(this.diffMonths);
                $('#diff_weeks').html(this.diffWeeks);
                $('#diff_days').html(this.diffDays);
            } else {
                //for tab-1 diff = false
                $('#user_date').html(this.startDate);
                $('#today_date').html(this.endDate);
                $('#user_ageYears').html(this.diffYears);
                $('#user_ageMonths').html(this.diffMonths);
                $('#user_ageWeeks').html(this.diffWeeks);
                $('#user_ageDays').html(this.diffDays);
            }
        },

        ////function to get complete age from today
        getTrueAge: function() {
            let ageYears, ageMonths, ageDays;
            //days calculation from today
            let totalDays = Math.floor((this.endDate - this.startDate) / dayInMilli);
            //years calculation from today
            ageYears = Math.floor(totalDays / 365);
            //months calculation from today
            let diffMonths = this.endMonth - this.startMonth;
            // console.log("diffMonth", diffMonth);
            ageMonths = (diffMonths >=0) ? diffMonths : 12 - diffMonths;
            //days calculation from today
            let diffDays = this.endDay - this.startDay;
            // console.log("diffDays", diffDays);
            if (diffDays >= 0) {
                ageDays = diffDays;
            } else {
                ageMonths--;
                ageDays = 31 - diffDays;
            }
            // adding suffix s based on number of day, month and year
            let dayString = this.maybePluralize(ageDays, 'day');
            let monthString = this.maybePluralize(ageMonths, 'month');
            let yearString = this.maybePluralize(ageYears, 'year');
            let totalAge = `${yearString}, ${monthString}, ${dayString}`;
            console.log("totalAge", totalAge);
            $('#user_todayAge').html(totalAge);
        },

        //function to display the output properly
        maybePluralize: function(count, noun, suffix = 's') {
            return (`${count} ${noun}${count !== 1 ? suffix : 's'}`);
        },

        //function for the countdown time for birthday
        getCountdownTime: function(next_birthday) {
            setInterval(() => {
                this.displayCountdown(next_birthday);
            }, 1000);
        },

        //displays the countdown for next birthday @param next_bithday : Date object
        displayCountdown: function(next_birthday) {
            // let timeDiff = next_birthday - this.endDate;
            // console.log("timeDiff", timeDiff);
            let currentTime = new Date().getTime();
            let nextBirthdayTime = next_birthday.getTime();
            // console.log("initialTime", initialTime, this.endDate.getTime());
            let diffInTime = nextBirthdayTime - currentTime;
            // console.log("diffInTime", diffInTime_, diffInTime);

            let days = Math.floor(diffInTime / dayInMilli);
            let hours = Math.floor((diffInTime % (dayInMilli)) / (1000 * 60 * 60));
            let minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);
            let countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;
            $('#countdown').html(countdownString);
        },

        //function for the details of the particular zodiac (returns zodiac name, birth-range, attributes)
        getZodiacInfo: function() {
            return this.getZodiacData().then((result) => {
                let zodiac_info = result;
                this.getZodiacSign().then((result) => {
                    let zodiac_sign = result;
                    this.getZodiacDetail(zodiac_info, zodiac_sign).then((result) => {
                        $('#zodiac_name').html(result.zsign);
                        $('#zodiac_birthrange').html(result.birthrange);
                        $('#zodiac_attributes').html(result.attribute);
                    }).catch((err) => {
                        console.error('error while fetching zodiac detail', err);
                    })
                });
            }).catch((err) => {
                console.error("Error while fetching JSON data.", err);
            });
        },

        // returns complete array of object in JSON from .json file
        getZodiacData: function() {
            return new Promise((resolve, reject) => {
                $.getJSON("./zodiac.json").done((data) => {
                    resolve(data);
                }).fail((err) => {
                    console.log('error while parsing json', err);
                    reject(false);
                });
            });
        },

        //function to calculate the zodiac sign based on birth date (returns one Zodiac Sign Name as per user's birthdate)
        getZodiacSign: function() {
            return new Promise((resolve, reject) => {
                let zodiac_name = (this.startDay > this.zodiac_day[this.startMonth]) ? this.zodiac_list[this.startMonth * 1 + 1] : this.zodiac_list[this.startMonth];
                resolve(zodiac_name);
            });
        },

        //function for getting zodiac details (returns the object of the particular zodiac ) {name:'', sign:'', attribute:''}
        getZodiacDetail: function(z_info, z_sign) {
            return new Promise((resolve, reject) => {
                return z_info.find((zodiac) => {
                    if (zodiac.zsign === z_sign) {
                        resolve(zodiac);
                    }
                });
            });
        }
    }

    window._cal = new _calculate();
})();