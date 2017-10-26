(function() {
    'use strict';

    const DAY_IN_MS = 1000 * 60 * 60 * 24;

    const ZODIAC_LIST = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    const ZODIAC_DAY = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    const LAST_DAY_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let startDate, endDate, diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds, countdown;

    let startDay, startMonth, startYear;
    let endDay, endMonth, endYear;

    let numOfDays;

    const _calculate = function() {
        console.log('inside constructor');
        this.endDate = new Date();
    };

    _calculate.prototype = {
        //function to get data for calculating the time diff (setting startDate, endDate )
        getDifference: function(formName) {
            if (this.countdown) {
                clearInterval(this.countdown);
            }
            // other form name is 'secondForm'
            let diff = (formName === 'firstForm') ? false : true;
            let startDay = document[formName].start_date.value;
            let startMonth = document[formName].start_month.value;
            let startYear = document[formName].start_year.value;
            this.startDate = new Date(`${startMonth}-${startDay}-${startYear}`);
            // destructor assignement
            [this.startDay, this.startMonth, this.startYear] = [this.startDate.getDate(), this.startDate.getMonth(), this.startDate.getFullYear()]; //because only startDay, startMonth, startYear will return 'string'
            [this.endDay, this.endMonth, this.endYear] = [this.endDate.getDate(), this.endDate.getMonth(), this.endDate.getFullYear()];

            if (diff) {
                let endDay = document[formName].end_date.value;
                let endMonth = document[formName].end_month.value;
                let endYear = document[formName].end_year.value;
                this.endDate = new Date(`${endMonth}-${endDay}-${endYear}`);
                [this.endDay, this.endMonth, this.endYear] = [this.endDate.getDate(), this.endDate.getMonth(), this.endDate.getFullYear()];
            }
            // display age difference in various unit
            this.setDifference(diff);
        },

        //one common function for getting Age Calculator and Date Calculator
        //@returns diffYears, diffMonths, diffWeeks, diffDays, diffHours, diffMinutes, diffSeconds
        //@param boolean diff=[true|false] false = TAB-1 (birth day) and true = TAB-2 (date diff)
        setDifference: function(diff) {
            if (isFinite(this.startDate) && isFinite(this.endDate)) {
                //for calculating diff in years
                Promise.resolve(this.differenceIn('year')).then((result) => {
                    this.diffYears = result;
                    this.diffMonths = (result * 12) + this.differenceIn('month');
                    this.diffWeeks = this.differenceIn('week');
                    this.diffDays = this.differenceIn('day');
                    this.diffHours = this.differenceIn('hour');
                    this.diffMinutes = this.differenceIn('minute');
                    this.diffSeconds = this.differenceIn('second');
                    this.display(diff);
                });
                //display total age in  `X years, Y months, Z days` format
                this.ageBetweenDate(diff);
                //for function calls only for TAB-1
                if (diff === false) {
                    // display countdown in `(290 days 5 hours 7 minutes 16 seconds)` format
                    let next_birthday = new Date(this.startDate); // necessary step to make new variable of Date object
                    next_birthday.setFullYear(this.endYear + 1);
                    this.getCountdownTime(next_birthday);
                    //@returns JSON array as output
                    this.getZodiacInfo();
                }
            } else {
                alert('Please select date and try again.');
                return false;
            }
        },

        //function for calculating the age in years, months, weeks, days, hours, minutes, seconds (switch case)
        differenceIn: function(what) {
            let output;
            //for giving correct output even if the date is given in reverse order
            let diffDate = this.endDate - this.startDate;
            //if startyear < endyear : diffDate, else if startyear > endyear : -diffDate
            diffDate = (diffDate >= 0) ? diffDate : -diffDate;
            this.numOfDays = Math.floor(diffDate / DAY_IN_MS);
            switch (what) {
                case 'year':
                    output = Math.abs(this.endYear - this.startYear);
                    break;
                case 'month':
                    output = Math.abs(this.endMonth - this.startMonth);
                    break;
                case 'week':
                    output = this.numOfDays * 7;
                    break;
                case 'day':
                    output = this.numOfDays;
                    break;
                case 'hour':
                    output = this.numOfDays * 24;
                    break;
                case 'minute':
                    output = this.numOfDays * 24 * 60;
                    break;
                case 'second':
                    output = this.numOfDays * 24 * 60 * 60;
                default:
            }
            return output;
        },

        //function to display the output (displays age in cards)
        display: function(diff) {
            $('.section_output').show();
            if (diff) {
                //for TAB-2 diff = true
                $('#date_start').html(this.startDate);
                $('#date_end').html(this.endDate);
                $('#diff_years').html(this.diffYears);
                $('#diff_months').html(this.diffMonths);
                $('#diff_weeks').html(this.diffWeeks);
                $('#diff_days').html(this.diffDays);
                $('#diff_hours').html(this.diffHours);
                $('#diff_minutes').html(this.diffMinutes);
                $('#diff_seconds').html(this.diffSeconds);
            } else {
                //for TAB-1 diff = false
                $('#user_date').html(this.startDate);
                $('#today_date').html(this.endDate);
                $('#user_ageYears').html(this.diffYears);
                $('#user_ageMonths').html(this.diffMonths);
                $('#user_ageWeeks').html(this.diffWeeks);
                $('#user_ageDays').html(this.diffDays);
                $('#user_ageHours').html(this.diffHours);
                $('#user_ageMinutes').html(this.diffMinutes);
                $('#user_ageSeconds').html(this.diffSeconds);
            }
        },

        //function to get complete age from today
        ageBetweenDate: function(diff) {
            let ageInYears, ageInMonths, ageInDays;

            if (this.endYear > this.startYear) {
                ageInYears = this.endYear - this.startYear;
                if (this.endMonth < this.startMonth) {
                        ageInYears--;
                        ageInMonths = 12 - Math.abs(this.endMonth - this.startMonth);
                    if (this.startDay > this.endDay) {
                        ageInMonths = (12 - Math.abs(this.endMonth - this.startMonth)) - 1;
                        ageInDays = LAST_DAY_MONTH[this.endMonth + 1] - (this.startDay - this.endDay);
                    } else if (this.startDay < this.endDay) {
                        ageInDays = this.endDay - this.startDay;
                    } else {
                        ageInDays = 0;
                    }
                }
                if (this.endMonth === this.startMonth) {
                    if (this.startDay > this.endDay) {
                        ageInYears--;
                        ageInMonths = 11;
                        ageInDays = LAST_DAY_MONTH[this.endMonth + 1] - (this.startDay - this.endDay);
                    } else if (this.startDay < this.endDay) {
                        ageInMonths = 0;
                        ageInDays = this.endDay - this.startDay;
                    } else {
                        ageInMonths = 0;
                        ageInDays = 0;
                    }
                }
                if (this.endMonth > this.startMonth) {
                    ageInMonths = (this.endMonth - this.startMonth);
                    if (this.startDay < this.endDay) {
                        ageInDays = this.endDay - this.startDay;
                    } else if (this.startDay > this.endDay) {
                        ageInMonths = (this.endMonth - this.startMonth) -1;
                        ageInDays = LAST_DAY_MONTH[this.endMonth + 1] - (this.startDay - this.endDay);
                    } else {
                        ageInDays = 0;
                    }
                }
            }

            // else if(this.endYear < this.startYear){
            //     ageInYears = Math.abs(this.endYear - this.startYear);
            //     let startDDay, startDMonth, startDYear, endDDay, endDMonth, endDYear;
            //     [startDDay, startDMonth, startDYear] = [this.endDay, this.endMonth, this.endYear];
            //     [endDDay, endDMonth, endDYear] = [this.startDay, this.startMonth, this.startYear];
            //     if (endDMonth < startDMonth) {
            //             ageInYears--;
            //             ageInMonths = 12 - Math.abs(endDMonth - startDMonth);
            //         if (startDDay > endDDay) {
            //             ageInDays = LAST_DAY_MONTH[endDMonth + 1] - (startDDay - endDDay);
            //         } else if (startDDay < endDDay) {
            //             ageInDays = endDDay - startDDay;
            //         } else {
            //             ageInDays = 0;
            //         }
            //     }
            //     if (endDMonth === startDMonth) {
            //         if (startDDay > endDDay) {
            //             ageInYears--;
            //             ageInMonths = 11;
            //             ageInDays = LAST_DAY_MONTH[endDMonth + 1] - (startDDay - endDDay);
            //         } else if (startDDay < endDDay) {
            //             ageInMonths = 0;
            //             ageInDays = endDDay - startDDay;
            //         } else {
            //             ageInMonths = 0;
            //             ageInDays = 0;
            //         }
            //     }
            //     if (endDMonth > startDMonth) {
            //         ageInMonths = (endDMonth - startDMonth) + 1;
            //         if (startDDay < endDDay) {
            //             ageInDays = endDDay - startDDay;
            //         } else if (startDDay > endDDay) {
            //             ageInDays = LAST_DAY_MONTH[endDMonth + 1] - (startDDay - endDDay);
            //         } else {
            //             ageInDays = 0;
            //         }
            //     }
            // }

            // adding suffix s based on number of day, month and year
            let dayString = this.maybePluralize(ageInDays, 'day');
            let monthString = this.maybePluralize(ageInMonths, 'month');
            let yearString = this.maybePluralize(ageInYears, 'year');
            let totalAge = `${yearString}, ${monthString}, ${dayString}`;
            // console.log("totalAge", totalAge);
            if (diff === false) {
                $('#user_todayAge').html(totalAge);
            } else {
                $('#diff_todayAge').html(totalAge);
            }
        },

        //function to display the output properly
        maybePluralize: function(count, noun, suffix = 's') {
            return (`${count} ${noun}${count !== 1 ? suffix : 's'}`);
        },

        //function for the countdown time for birthday @param Date next_birthday
        getCountdownTime: function(next_birthday) {
            console.log("inside countdown time");
            // assignment is necessary to cancel the interval on next submit
            this.countdown = setInterval(() => {
                this.displayCountdown(next_birthday);
            }, 1000);
        },

        //displays the countdown for next birthday @param next_bithday : Date object
        displayCountdown: function(next_birthday) {
            let currentTime = new Date().getTime();
            let nextBirthdayTime = next_birthday.getTime();
            let diffInTime = nextBirthdayTime - currentTime;
            let days = Math.floor(diffInTime / DAY_IN_MS);
            let hours = Math.floor((diffInTime % (DAY_IN_MS)) / (1000 * 60 * 60));
            let minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);
            let countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;
            $('#countdown').html(countdownString);
        },

        //function for the details of the particular zodiac (@return zodiac name, birth-range, attributes)
        getZodiacInfo: function() {
            return this.fetchZodiacData().then((result) => {
                let zodiac_info = result;
                this.getZodiacSign().then((result) => {
                    let zodiac_sign = result;
                    this.getZodiacDetail(zodiac_info, zodiac_sign).then((result) => {
                        $('#zodiac_name').html(result.zsign);
                        $('#zodiac_birthrange').html(result.birthrange);
                        $('#zodiac_attributes').html(result.attribute);
                    }).catch((err) => {
                        console.error("Error while fetching zodiac details.", err);
                    })
                });
            }).catch((err) => {
                console.error("Error while fetching JSON data.", err);
            });
        },

        //@return complete array of object in JSON from .json file
        fetchZodiacData: function() {
            return new Promise((resolve, reject) => {
                $.getJSON("./zodiac.json").done((data) => {
                    resolve(data);
                }).fail((err) => {
                    console.error('error while parsing json', err);
                    reject(false);
                });
            });
        },

        //function to calculate the zodiac sign based on birth date (@return one Zodiac Sign Name as per user's birthdate)
        getZodiacSign: function() {
            return new Promise((resolve) => {
                let zodiac_name = (this.startDay > ZODIAC_DAY[this.startMonth]) ? ZODIAC_LIST[this.startMonth * 1 + 1] : ZODIAC_LIST[this.startMonth];
                resolve(zodiac_name);
            });
        },

        //function for getting zodiac details (@return the object of the particular zodiac ) {name:'', sign:'', attribute:''}
        getZodiacDetail: function(z_info, z_sign) {
            return new Promise((resolve) => {
                return z_info.find((zodiac) => {
                    if (zodiac.zsign === z_sign) {
                        resolve(zodiac);
                    }
                });
            });
        }
    };

    window._cal = new _calculate();
})();