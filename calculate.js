(function() {
    'use strict';

    const INTERVAL = 1000; // in milliseconds
    const DAY_IN_MS = 1000 * 60 * 60 * 24;

    let ageFind, startDate, endDate, diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds, countdown;

    let startDay, startMonth, startYear;
    let endDay, endMonth, endYear;

    const _calculate = function() {
        // console.log('inside constructor');
        this.endDate = new Date();
        this.ageFind = true; // for first tab
    };

    _calculate.prototype = {
        //function to get data for calculating the time diff (setting startDate, endDate)
        init: function(formName) {
            // console.log("getDifference");
            if (this.countdown) {
                clearInterval(this.countdown);
            }
            $('#zodiac-data').hide();
            $('#countdown-data').hide();
            // other form name is 'secondForm'
            this.ageFind = (formName === 'firstForm') ? true : false;
            let fd = new FormData(document.getElementById(formName));
            let startDay = fd.get('start_date');
            let startMonth = fd.get('start_month');
            let startYear = fd.get('start_year');
            // create Date('MM-DD-YYYY') object
            this.startDate = new Date(`${startMonth}-${startDay}-${startYear}`);
            // console.log("this.startDate", this.startDate);

            if (!this.ageFind) {
                let endDay = fd.get('end_date');
                let endMonth = fd.get('end_month');
                let endYear = fd.get('end_year');
                this.endDate = new Date(`${endMonth}-${endDay}-${endYear}`);
            }

            this.calculateDifference();
        },

        isValidDate: function() {
            // console.log("validateDate", this.startDate, this.endDate);

            let self = this;
            return new Promise(function(resolve, reject) {
                // console.log('inside promise');
                if (isFinite(self.startDate) && isFinite(self.endDate)) {
                    var [startTimeStamp, endTimeStamp] = [self.startDate.getTime(), self.endDate.getTime()];
                    // console.log("startTimeStamp, endTimeStamp", startTimeStamp, endTimeStamp);
                    // swap the date if `end date` is smaller than `start date`
                    if (endTimeStamp < startTimeStamp) {
                        [self.startDate, self.endDate] = [self.endDate, self.startDate];
                    }
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        },

        //common function for getting Age Calculator and Date Calculator
        //@returns diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds
        //@param boolean diff=[true|false] false = TAB-1 (birth day) and true = TAB-2 (date diff)
        calculateDifference: async function() {
            try {
                let isValid = await this.isValidDate();
                // console.log("isValid", isValid);
                // console.log("new endDate", this.endDate);
                // console.log("new startDate", this.startDate);
                [this.startDay, this.startMonth, this.startYear] = [this.startDate.getDate(), this.startDate.getMonth(), this.startDate.getFullYear()];
                [this.endDay, this.endMonth, this.endYear] = [this.endDate.getDate(), this.endDate.getMonth(), this.endDate.getFullYear()];
                this.diffYears = await Promise.resolve(this.differenceIn('year'));
                this.diffMonths = this.differenceIn('month');
                this.diffWeeks = this.differenceIn('week');
                this.diffDays = this.differenceIn('day');
                this.diffHours = this.differenceIn('hour');
                this.diffMinutes = this.differenceIn('minute');
                this.diffSeconds = this.differenceIn('second');
                this.displayDifference();
                this.displayRelativeDifference();
                if (this.ageFind) {
                    this.nextBirthdayCountdown();
                    this.displayZodiacInfo();
                }
            } catch (e) {
                throw new Error('Invalid Date');
            }
        },

        //function for calculating the age in years, months, weeks, days, hours, minutes, seconds (switch case)
        differenceIn: function(what) {
            let output;
            //for giving correct output even if the date is given in reverse order
            let [endTime, startTime] = [this.endDate.getTime(), this.startDate.getTime()];
            let numOfDays = Math.floor((endTime - startTime) / DAY_IN_MS);
            console.log("numOfDays", numOfDays);
            switch (what) {
                case 'year':
                    output = Math.trunc(numOfDays / 365);
                    break;
                case 'month':
                    output = (this.diffYears * 12) + Math.ceil((numOfDays - (this.diffYears * 365)) / 31) ;
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
            if (this.ageFind) {
                $('#diff-input').hide();
                $('#birthdate-input').show();
            } else {
                $('#birthdate-input').hide();
                $('#diff-input').show();
            }
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
            let ageInDays = 0,
                ageInMonths = 0,
                ageInYears = 0;
            let totalDays = Math.floor((this.endDate - this.startDate) / DAY_IN_MS);
            // console.log("this.endDate, this.startDate", this.endDate, this.startDate);
            if (totalDays > 365) {
                ageInYears = Math.floor(totalDays / 365);
            }
            let diffMonths = this.endDate.getMonth() - this.startDate.getMonth();
            // if month difference is negative than substract from 12
            ageInMonths = (diffMonths >= 0) ? diffMonths : 12 + diffMonths;
            let diffDays = this.endDay - this.startDay;
            console.log("diffDays", diffDays);
            if (diffDays >= 0) {
                ageInDays = diffDays;
            } else {
                ageInMonths--;
                ageInDays = 31 + diffDays;
            }

            // adding suffix s based on number of day, month and year
            let dayString = this.maybePluralize(ageInDays, 'day');
            let monthString = this.maybePluralize(ageInMonths, 'month');
            let yearString = this.maybePluralize(ageInYears, 'year');
            let totalAge = `${yearString}, ${monthString}, ${dayString}`;
            // console.log("totalAge", totalAge);
            if (this.ageFind && this.startDay === this.endDay && this.startMonth === this.endMonth) {
                alert("Today is your Birthday, Happy Birthday!!!");
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
            $('#countdown-data').show();
            $('#countdown').html(countdownString);
        },

        // =========== Zodiac information ========== //
        //function for the details of the particular zodiac (@return zodiac name, birth-range, attributes)

        displayZodiacInfo: async function() {
            try {
                $('#zodiac-data').show();
                let result = await this.getZodiacDetail();
                $('#zodiac_name').html(result.name);
                $('#zodiac_birthrange').html(result.birthrange);
                $('#zodiac_attributes').html(result.attribute);
            } catch (e) {
                throw new Error('Error while fetching zodiac detail.');
            }
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
        getZodiacDetail: async function() {
            let zodiac_list = await this.fetchZodiacList();
            let z_day_list = zodiac_list.day; // return array
            // console.log("z_day_list", z_day_list);
            z_day_list = [...z_day_list, z_day_list[0]];
            // console.log("z_day_list", z_day_list);
            let z_list = zodiac_list.info
            let z_name_list = [];
            z_list.map((z) => {
                z_name_list.push(z.name);
                console.log("z_name_list", z_name_list);
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
        }
    };

    window._cal = new _calculate();
})();