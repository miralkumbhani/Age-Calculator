(function() {
    'use strict';

    let startDate, endDate, diffYears, diffMonths, diffWeeks, diffDays, next_birthday, diff, birthDay, birthMonth, zodiac_info, zodiac_sign;
    const currDate = new Date();
    const dayInMilli = 1000 * 60 * 60 * 24;

    const _calculate = function() {
        console.log("Inside constructor");
    };

    _calculate.prototype = {
        //function to get data for calculating the time diff (returns startDate, endDate, diff)
        getDifference: function(formName) {
            $('.section_output').show();
            // other form name is 'secondForm'
            this.diff = (formName === 'firstForm') ? false : true;

            let startDay = document[formName].start_date.value;
            let startMonth = document[formName].start_month.value;
            let startYear = document[formName].start_year.value;
            this.startDate = new Date(`${startMonth}-${startDay}-${startYear}`);
            this.endDate = new Date();

            if (this.diff) {
                let endDay = document[formName].end_date.value;
                let endMonth = document[formName].end_month.value;
                let endYear = document[formName].end_year.value;
                this.endDate = new Date(`${endMonth}-${endDay}-${endYear}`);
            }
            this.setDifference();
        },

        //one common function for getting Age Diff and Time Diff (returns diffYears, diffMonths, diffWeeks, diffDays)
        setDifference: function() {
            let current_birthday = this.startDate;
            let start_year = this.startDate.getFullYear();
            let end_year = this.endDate.getFullYear();
            this.next_birthday = new Date(this.startDate); // necessary step to make Date object again
            this.next_birthday.setFullYear(end_year + 1);

            if (isFinite(this.startDate) && isFinite(this.endDate)) {
                if (end_year >= start_year) {
                    //for calculating diff in years
                    this.diffYears = this.calculateDifference('year');
                    Promise.resolve(this.diffYears).then((result) => {
                        this.diffYears = result;
                        this.diffMonths = this.diffYears * 12 + this.calculateDifference('month');
                        this.diffWeeks = this.calculateDifference('week');
                        this.diffDays = this.calculateDifference('day');
                        this.display();
                    });
                    //returns total age (29 years, 5 months, 3 days)
                    this.getTrueAge();
                    //returns the countdown time for next birthday (290 days 5 hours 7 minutes 16 seconds)
                    this.getCountdownTime(next_birthday);
                    //returns JSON array as output
                    this.getZodiacInfo();
                } else {
                    alert('The Selected Year should be greater than the Birth year');
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
                    output = this.endDate.getFullYear() - this.startDate.getFullYear();
                    break;
                case 'month':
                    output = (this.endDate.getMonth() - this.startDate.getMonth());
                    break;
                case 'week':
                    let selectTime = this.endDate.getTime();
                    let userTime = this.startDate.getTime();
                    this.diffTime = Math.abs(selectTime - userTime);
                    output = Math.floor(this.diffTime / (dayInMilli * 7));
                    break;
                case 'day':
                    output = Math.floor((this.endDate - this.startDate) / dayInMilli);
                    break;
                default:
            }
            return output;
        },

        //function to display thte output (displays age in cards or output)
        display: function() {
            if (this.diff) {
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
            let totalDays = Math.floor((currDate - this.startDate) / dayInMilli);
            //years calculation from today
            ageYears = Math.floor(totalDays / 365);
            //months calculation from today
            let diffMonth = currDate.getMonth() - this.startDate.getMonth();
            if (diffMonth >= 0) {
                ageMonths = currDate.getMonth() - this.startDate.getMonth();
            } else {
                ageMonths = 12 - Math.abs((currDate.getMonth() - this.startDate.getMonth()));
            }
            //days calculation from today
            let diffDay = currDate.getDate() - this.startDate.getDate();
            let currentYear = this.startDate.getFullYear();
            if (diffDay >= 0) {
                ageDays = diffDay;
            } else {
                ageMonths--;
                ageDays = 31 - Math.abs(diffDay);
            }

            let dayString = this.maybePluralize(ageDays, 'day');
            let monthString = this.maybePluralize(ageMonths, 'month');
            let yearString = this.maybePluralize(ageYears, 'year');
            let totalAge = `${yearString}, ${monthString}, ${dayString}`;
            $('#user_todayAge').html(totalAge);
        },

        //function to display the output properly
        maybePluralize: function(count, noun, suffix = 's') {
            return (`${count} ${noun}${count !== 1 ? suffix : 's'}`);
        },

        //function for the countdown time for birthday
        getCountdownTime: function() {
            setInterval(() => {
                this.displayCountdown(this.next_birthday);
            }, 1000);
        },

        //displays the countdown for next birthday
        displayCountdown: function() {
            let timeDiff = this.next_birthday - currDate;
            let initialTime = new Date().getTime();
            let diffInTime = this.next_birthday - initialTime;

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
                this.birthDay = this.startDate.getDate();
                this.birthMonth = this.startDate.getMonth();
                this.zodiac_info = result;
                this.getZodiacSign().then((result) => {
                    this.zodiac_sign = result;
                    this.getZodiacDetails().then((result) => {
                        $('#zodiac_name').html(result.zsign);
                        $('#zodiac_birthrange').html(result.birthrange);
                        $('#zodiac_attributes').html(result.attribute);
                    });
                });
            }).catch((err) => {
                console.log("Error while fetching JSON Data.", err);
            });
        },

        //function that fecthes data from JSON (returns complete 'object' from JSON)
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
            let day = this.birthDay;
            let month = this.birthMonth;
            return new Promise((resolve, reject) => {
                let zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
                let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
                let zName = (day > last_day[month]) ? zodiacName[month * 1 + 1] : zodiacName[month];
                resolve(zName);
            });
        },

        //function for getting zodiac details (returns the object of the particular zodiac sign name)
        getZodiacDetails: function() {
            let zodiacArray = this.zodiac_info;
            let zodiacSign = this.zodiac_sign;
            return new Promise((resolve, reject) => {
                return zodiacArray.find(function(zodiacArray) {
                    if (zodiacArray.zsign === zodiacSign) {
                        resolve(zodiacArray);
                    }
                });
            });
        }
    }

    window._cal = new _calculate();
})();