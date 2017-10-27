(function() {
    'use strict';

    const INTERVAL = 1000; // in milliseconds
    const DAY_IN_MS = 1000 * 60 * 60;

    let ageFind, startDate, endDate, diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds, countdown;

    let startDay, startMonth, startYear;
    let endDay, endMonth, endYear;

    const _calculate = function() {
        // console.log('inside constructor');
        this.endDate = new Date();
        this.ageFind = true; // for first tab
    };

    _calculate.prototype = {
        //function to get data for calculating the time diff (setting startDate, endDate )
        init: function(formName) {
            // console.log("getDifference");
            if (this.countdown) {
                clearInterval(this.countdown);
            }
            // other form name is 'secondForm'
            this.ageFind = (formName === 'firstForm') ? true : false;
            let startDay = document[formName].start_date.value;
            let startMonth = document[formName].start_month.value;
            let startYear = document[formName].start_year.value;
            this.startDate = new Date(`${startMonth}-${startDay}-${startYear}`);
            // console.log("this.startDate", this.startDate);

            if (!this.ageFind) {
                let endDay = document[formName].end_date.value;
                let endMonth = document[formName].end_month.value;
                let endYear = document[formName].end_year.value;
                this.endDate = new Date(`${endMonth}-${endDay}-${endYear}`);
            }
            // console.log("this.endDate", this.endDate);
            if(this.isValidDate()) {
                 // console.log("new endDate", this.endDate);
                 // console.log("new startDate", this.startDate);
                 this.calculateDifference();
            }
        },

        isValidDate: function() {
            // console.log("validateDate", this.startDate, this.endDate);
             if (isFinite(this.startDate) && isFinite(this.endDate)) {
                var [startTimeStamp, endTimeStamp] = [this.startDate.getTime(), this.endDate.getTime()];
                // console.log("startTimeStamp, endTimeStamp", startTimeStamp, endTimeStamp);
                // exchange the date if `end date` is smaller than `start date`
                if (endTimeStamp < startTimeStamp) {
                    [this.startDate, this.endDate] = [this.endDate, this.startDate];
                }
                return true;
             } else {
                alert('Please select appropriate date and try again.');
                return false;
            }
        },

        //one common function for getting Age Calculator and Date Calculator
        //@returns diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds
        //@param boolean diff=[true|false] false = TAB-1 (birth day) and true = TAB-2 (date diff)
        calculateDifference: function() {
                [this.startDay, this.startMonth, this.startYear] = [this.startDate.getDate(), this.startDate.getMonth(), this.startDate.getFullYear()];
                [this.endDay, this.endMonth, this.endYear] = [this.endDate.getDate(), this.endDate.getMonth(), this.endDate.getFullYear()];
                //for calculating diff in years
                Promise.resolve(this.differenceIn('year')).then((result) => {
                    this.diffYears = result;
                    this.diffMonths = (result * 12) + this.differenceIn('month');
                    this.diffWeeks = this.differenceIn('week');
                    this.diffDays = this.differenceIn('day');
                    this.diffHours = this.differenceIn('hour');
                    this.diffMinutes = this.differenceIn('minute');
                    this.diffSeconds = this.differenceIn('second');
                    this.displayDifference();
                    this.displayRelativeDifference();
                });
                // display differnece between the start date and end date in X days Y months and Z years
                if (this.ageFind) {
                    this.nextBirthdayCountdown();
                    this.displayZodiacInfo();
                }
        },

        //function for calculating the age in years, months, weeks, days, hours, minutes, seconds (switch case)
        differenceIn: function(what) {
            let output;
            //for giving correct output even if the date is given in reverse order
            let [endTime, startTime] = [this.endDate.getTime(), this.startDate.getTime()];
            let numOfDays = Math.floor((endTime - startTime) / DAY_IN_MS);
            // console.log("numOfDays", numOfDays);
            switch (what) {
                case 'year':
                    output = this.endYear - this.startYear;
                    break;
                case 'month':
                    output = this.endMonth - this.startMonth;
                    break;
                case 'week':
                    output = Math.floor(numOfDays / 7);
                    break;
                case 'day':
                    output = numOfDays;
                    break;
                case 'hour':
                    output = numOfDays * 24;
                    break;
                case 'minute':
                    output = numOfDays * 24 * 60;
                    break;
                case 'second':
                    output = numOfDays * 24 * 60 * 60;
                default:
            }
            return output;
        },

        //function to display the output (displays age in cards)
        displayDifference: function() {
            $('.section_output').show();
            $('.start-date').html(this.startDate);
            $('.end-date').html(this.endDate);
            // display difference
            $('.diff-years').html(this.diffYears);
            $('.diff-months').html(this.diffMonths);
            $('.diff-weeks').html(this.diffWeeks);
            $('.diff-days').html(this.diffDays);
            $('.diff-hours').html(this.diffHours);
            $('.diff-minutes').html(this.diffMinutes);
            $('.diff-seconds').html(this.diffSeconds);
        },

        //function to get complete age from today
        displayRelativeDifference: function() {
            // console.log("calculateRelativeDifference");
            let ageInDays;
            let totalDays = Math.floor((this.endDate - this.startDate) / DAY_IN_MS);
            let ageInYears = Math.floor(totalDays / 365);
            let diffMonths = this.endMonth - this.startMonth;
            let ageInMonths = (diffMonths >= 0) ? diffMonths : 12 - diffMonths;
            let diffDays = this.endDay - this.startDay;
            if (diffDays >= 0) {
                ageInDays = diffDays;
            } else {
                ageInMonths--;
                ageInDays = 31 - diffDays;
            }
            // adding suffix s based on number of day, month and year
            let dayString = this.maybePluralize(ageInDays, 'day');
            let monthString = this.maybePluralize(ageInMonths, 'month');
            let yearString = this.maybePluralize(ageInYears, 'year');
            let totalAge = `${yearString}, ${monthString}, ${dayString}`;
            // console.log("totalAge", totalAge);
            if (this.ageFind && this.startDay === this.endDay && this.startMonth === this.endMonth) {
                alert("It's your birthday today, Happy Birthday!!!");
            }
            $('.user_relativeAge').html(totalAge);
        },

        //function to display the output properly
        maybePluralize: function(count, noun, suffix = 's') {
            return (`${count} ${noun}${count !== 1 ? suffix : ''}`);
        },

        //calculate countdown time for next birthday on interval of every second
        nextBirthdayCountdown: function() {
            // console.log("inside countdown time");
             let next_birthday = new Date(this.startDate); // necessary step to make new variable of Date object
             if (this.startMonth > this.endMonth) {
                next_birthday.setFullYear(this.endYear);
             } else {
                next_birthday.setFullYear(this.endYear + 1);
             }
            // assignment is necessary to cancel the interval on next submit
            this.countdown = setInterval(() => {
                this.displayCountdown(next_birthday);
            }, INTERVAL);
        },

        // display countdown in `(290 days 5 hours 7 minutes 16 seconds)` format
        displayCountdown: function(next_birthday) {
            let currentTime = new Date().getTime();
            let next_birthday_time = next_birthday.getTime();
            let diffInTime = next_birthday_time - currentTime;
            let days = Math.floor(diffInTime / DAY_IN_MS);
            let hours = Math.floor((diffInTime % (DAY_IN_MS)) / (1000 * 60 * 60));
            let minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);

            let countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;
            $('#countdown').html(countdownString);
        },

        // ===========Zodiac information ====================
        //function for the details of the particular zodiac (@return zodiac name, birth-range, attributes)
        displayZodiacInfo: function() {
            this.getZodiacDetail().then((result) => {
                $('#zodiac_name').html(result.name);
                $('#zodiac_birthrange').html(result.birthrange);
                $('#zodiac_attributes').html(result.attribute);
            });
        },

        //@return complete array of object in JSON from .json file
        fetchZodiacList: function() {
            return new Promise((resolve, reject) => {
                $.getJSON("./zodiac.json").done((data) => {
                    resolve(data);
                }).fail((err) => {
                    // console.error('error while parsing json', err);
                    reject(false);
                });
            });
        },

        //function for getting zodiac details (@return the object of the particular zodiac ) {name:'', sign:'', attribute:''}
        getZodiacDetail: function() {
            return this.fetchZodiacList().then((result) => {
                let zodiac_info = result;
                let z_day_list = result.day; // return array
                // console.log("z_day_list", z_day_list);
                z_day_list = [...z_day_list, z_day_list[0]];
                // console.log("z_day_list", z_day_list);
                let z_list = result.info
                var z_name_list = [];
                z_list.map((z) => {
                    z_name_list.push(z.name);
                });
                z_name_list = [...z_name_list, z_name_list[0]];
                // console.log("z_name_list", z_name_list);
                let z_sign = (this.startDay > z_day_list[this.startMonth]) ? z_name_list[this.startMonth * 1 + 1] : z_name_list[this.startMonth];
                return new Promise((resolve) => {
                    return z_list.find((zodiac) => {
                        if (zodiac.name === z_sign) {
                            resolve(zodiac);
                        }
                    });
                });
            }).catch((err) => {
                console.error("Error while fetching JSON data.", err);
            });
        }
    };

    window._cal = new _calculate();
})();