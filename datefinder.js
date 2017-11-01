/*eslint-disable no-console*/
'use strict';
(function() {
    const INTERVAL = 1000; // in milliseconds
    const DAY_IN_MS = 1000 * 60 * 60 * 24;
    class dateFinder {
        constructor() {
            // console.log('this.startDate', this.startDate);
            this.startDate;
            this.endDate;
            this.differenceObj = {};
            this.ageFind = true; // for first tab
            this.countdown = null;
        }

        init(formName) {
            // console.log("init");
            if (this.countdown) {
                clearInterval(this.countdown);
            }
            // other form name is 'secondForm'
            $('.date-swap').hide();
            $('.date-input').show();
            this.ageFind = (formName === 'firstForm') ? true : false;
            let fd = new FormData(document.getElementById(formName));
            let form_startDay = fd.get('start_date');
            let form_startMonth = fd.get('start_month');
            let form_startYear = fd.get('start_year');
            // create Date('MM-DD-YYYY') object
            this.startDate = new Date(`${form_startMonth}-${form_startDay}-${form_startYear}`);
            // console.log("this.startDate", this.startDate);
            // edn date is current date in case of birthday calculation
            this.endDate = new Date();
            if (!this.ageFind) {
                let form_endDay = fd.get('end_date');
                let form_endMonth = fd.get('end_month');
                let form_endYear = fd.get('end_year');
                this.endDate = new Date(`${form_endMonth}-${form_endDay}-${form_endYear}`);
            }
            this.calculateDifference();
        }

        // check date are valid and if start date is greater than end date than swap the dates
        isValidDate() {
            // console.log("validateDate", this.startDate, this.endDate);
            let self = this;
            return new Promise(function(resolve, reject) {
                // console.log('inside promise', this.startDate, this.endDate, self.startDate, self.endDate);
                if (isFinite(self.startDate) && isFinite(self.endDate)) {
                    let [startTimeStamp, endTimeStamp] = [self.startDate.getTime(), self.endDate.getTime()];
                    // swap the date if `end date` is smaller than `start date`
                    if (endTimeStamp < startTimeStamp) {
                        // console.log('swap');
                        $('.date-swap').show();
                        [self.startDate, self.endDate] = [self.endDate, self.startDate];
                    }
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        }


        //one common function for getting Age Calculator and Date Calculator
        //@returns diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds
        //@param boolean diff=[true|false] false = TAB-1 (birth day) and true = TAB-2 (date diff)
        async calculateDifference() {
            // console.log('calculateDifference', this);
            try {
                await this.isValidDate();
                // console.log("isValid", isValid);
                // console.log("new endDate", this.endDate);
                // console.log("new startDate", this.startDate);
                [this.startDay, this.startMonth, this.startYear] = [this.startDate.getDate(), this.startDate.getMonth(), this.startDate.getFullYear()];
                [this.endDay, this.endMonth, this.endYear] = [this.endDate.getDate(), this.endDate.getMonth(), this.endDate.getFullYear()];

                let diffYears = this.differenceIn('year');
                let diffMonths = this.differenceIn('month');
                let diffWeeks = this.differenceIn('week');
                let diffDays = this.differenceIn('day');
                let diffHours = this.differenceIn('hour');
                let diffMinutes = this.differenceIn('minute');
                let diffSeconds = this.differenceIn('second');
                this.differenceObj = {diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds};
                this.displayDifference();
                this.displayRelativeDifference();
                if (this.ageFind) {
                    this.nextBirthdayCountdown();
                    this.displayZodiacInfo();
                }
            } catch (e) {
                throw new Error('Invalid Date', e);
            }
        }

        //function for calculating the age in years, months, weeks, days, hours, minutes, seconds (switch case)
        differenceIn(what) {
            let output;
            //for giving correct output even if the date is given in reverse order
            let [endTime, startTime] = [this.endDate.getTime(), this.startDate.getTime()];
            let numOfDays = Math.floor((endTime - startTime) / DAY_IN_MS);
            // console.log("numOfDays", numOfDays);
            switch (what) {
                case 'year':
                    output = Math.trunc(numOfDays / 365);
                    break;
                case 'month':
                    output = (Math.trunc(numOfDays/365) *12) + Math.trunc((numOfDays%365)/30);
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
                    break;
                default:
            }
            return output;
        }

        //function to display the output (displays age in cards)
        displayDifference() {
            // console.log("displayDifference", this.differenceObj);
            let fd_, sd_;
             if (this.ageFind) {
                fd_ = 'Birth Date';
                sd_ = 'Current Date';
            } else {
                fd_ = 'Start Date';
                sd_ = 'End Date';
                $('.zodiac').hide();
                $('.countdown').hide();
            }
            $('.first-date-text').html(fd_);
            $('.second-date-text').html(sd_);
            $('.output').show();
            $('#start-date').html(this.startDate);
            $('#end-date').html(this.endDate);
            // display difference
            $('.diff-years').html(this.differenceObj.diffYears);
            $('.diff-months').html(this.differenceObj.diffMonths);
            $('.diff-weeks').html(this.differenceObj.diffWeeks);
            $('.diff-days').html(this.differenceObj.diffDays);
            $('.diff-hours').html(this.differenceObj.diffHours);
            $('.diff-minutes').html(this.differenceObj.diffMinutes);
            $('.diff-seconds').html(this.differenceObj.diffSeconds);
        }

        //function to get complete age from today
        displayRelativeDifference() {
            // console.log("calculateRelativeDifference");
            let text = (this.ageFind) ? 'Your age today': 'Relative Diffrence between dates';
            $('.relative-age').html(text);
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
                alert("!!! Today is your Happy Birthday!!!");
            }
            $('#relative').html(totalAge);
        }

        //function to display the output properly
        maybePluralize(count, noun, suffix = 's') {
            return (`${count} ${noun}${count !== 1 ? suffix : ''}`);
        }

        //calculate countdown time for next birthday on interval of every second
        nextBirthdayCountdown() {
            // console.log("inside countdown time");
            $('.countdown').show();
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
        }



        // display countdown in `(290 days 5 hours 7 minutes 16 seconds)` format
        displayCountdown(next_birthday) {
            let currentTime = new Date().getTime();
            let next_birthday_time = next_birthday.getTime();
            let diffInTime = next_birthday_time - currentTime;
            let days = Math.floor(diffInTime / DAY_IN_MS);
            let hours = Math.floor((diffInTime % (DAY_IN_MS)) / (1000 * 60 * 60));
            let minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);

            let countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;
            $('#countdown').html(countdownString);
        }

        // ===========Zodiac information ====================
        //function for the details of the particular zodiac (@return zodiac name, birth-range, attributes)
        async displayZodiacInfo() {
            try {
                let result = await this.getZodiacDetail();
                $('.zodiac').show();
                $('#zodiac_name').html(result.name);
                $('#zodiac_birthrange').html(result.birthrange);
                $('#zodiac_attributes').html(result.attribute);
            } catch (e) {
                throw new Error('Error while fetching zodiac detail.');
            }
        }

        //@return complete array of object in JSON from .json file
        fetchZodiacList() {
            return new Promise((resolve, reject) => {
                $.getJSON("./zodiac.json").done((data) => {
                    resolve(data);
                }).fail((err) => {
                    console.error('error while parsing json', err);
                    reject(false);
                });
            });
        }

        //function for getting zodiac details (@return the object of the particular zodiac ) {name:'', sign:'', attribute:''}
        async getZodiacDetail() {
            let zoidac_list = await this.fetchZodiacList();
            let z_day_list = zoidac_list.day; // return array
            // console.log("z_day_list", z_day_list);
            z_day_list = [...z_day_list, z_day_list[0]];
            // console.log("z_day_list", z_day_list);
            let z_list = zoidac_list.info;
            let z_name_list = [];
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
        }
    }
    window._df = new dateFinder();
})();