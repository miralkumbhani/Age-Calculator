'use strict';

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

$(document).ready(function() {
    $('.tabcontent').eq(0).show();

    let age_day = _setDay();
    $('#date_label').html(age_day.join(''));

    let age_month = _setMonth();
    $('#month_label').html(age_month.join(''));

    let age_year = _setYear();
    $('#year_label').html(age_year.join(''));

    const currDate = new Date();
    const dayInMilli = 1000 * 60 * 60 * 24;

    $('.tab').on('click', '.tablinks', function() {
        let display = $(this).data('display');
        let index = $(this).index();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#tab_data').children().hide();
        $('#tab_data').children('#' + display).show();
        //event.preventDefault;
    });

    //function to calculate the zodiac sign based on birth date
    const zodiac = function(day, month) {
        let zodiacName = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
        let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
        return (day > last_day[month]) ? zodiacName[month * 1 + 1] : zodiacName[month];
    };

    const zodiacArray = [{
                zsign: "Aries",
                birthrange: "March 21 - April 19",
                attribute: "Aries are fire signs and those born under this element are regarded in astrology as adventurous, active and outgoing. It won't matter where you go or how remote or unusual it is - from the Outback to the Antarctic - you can be sure that an Aries has been there before you (or at the very least you will meet one along the way!) Aries is a uniquely naive sign. Although they are independent, outgoing and assertive they are also surprisingly trusting, often innocently walking into the lion's den at times. No matter what upheaval, challenge or triumph they confront - an Aries has a wonderful ability to bounce back. Their faith in life and the future remains untouched by hardship. Their gift is that they are always children at heart and the world is always a magical place for them. Many famous sports people are born under this sign. Aries is regarded as the most physical sign and because of its Mar's rulership; it is also one of the most highly charged masculine energy signs in astrology. No wonder women born under Aries are forceful, dynamic and aggressive, and as a result these Aries women frequently find themselves with dilemmas surrounding their romantic relationships. For them, a man has to be a 'real man' to deal with an Aries woman, otherwise she intimidates him. And conversely for the Aries male, a woman has to be a real woman to deal with him, because he is looking for many balancing component traits (his true feminine side) in his partner. She has to run the gamut in his support system, from the Aries man's best friend, true companion, through to his muse, and yet she must never ever answer him back!"
            },
            {
                zsign: "Cancer",
                birthrange: "June 21 - July 22",
                attribute: "Those born under the sign of Cancer, ruled by the mysterious Moon, are one of the zodiac's enigmas. It is fair to say that most Cancers are a bundle of contradictions. Compassionate and caring with friends, family and lovers, yet they can cut to the bone with their jealous remarks and ever-changing moods. Endearingly eccentric on one hand, and on the other, insecure about how others see them. Like their astrological symbol - the Crab - Cancers can appear hard and insensitive on the outside. However, for those of us who know and love a Moon Child, we understand that deep below lies a softness and sensitivity that makes them so very special."
            },
            {
                zsign: "Taurus",
                birthrange: "April 20 - May 20",
                attribute: "Underneath their cool, calm and collected exterior, Taureans differ greatly from all the other signs of the zodiac. Taureans manage to discreetly stay apart from the crowd, even though they have a well earned reputation for being socialisers. They will let others get close, but only so close as they want them. Some claim that trying to get your point across to a Taurean, should they not want to hear you, is rather similar to talking to the trees, they simply won't budge. And, there is no such thing as an open-book Taurean. Their feelings, fears and desires often run far deeper than anyone around them would guess. Like the butterfly that chooses to remain hidden in its cocoon until it is ready and prepared to emerge, so the true Taurean spirit remains hidden behind a veneer of day-to-day activities. That's why Taureans are sometimes regarded as snobby, withdrawn, boring, or even sulky."
            },
            {
                zsign: "Gemini",
                birthrange: "May 21 - June 20",
                attribute: "In ancient Greek mythology, Gemini's ruler - Mercury, was the light-footed messenger of the gods who darted back and forth across the heavens delivering news - which might explain why those born under the sign of the 'Twins' are always on the move; thirsty for knowledge and new experiences. Terminally curious and sometimes even mischievous, Geminis are multi-faceted souls who enjoy knowing a little bit of everything but generally not too much about one particular subject. It's just that variety is the spice of their lives!"
            },
            {
                zsign: "Capricorn",
                birthrange: "December 22 - January 19",
                attribute: "The sign of the high roller, Capricorn is regarded as the zodiac top, but also quiet, life and business achievers. But, there are two very different types of Capricorns. The first is represented by the mountain goat, always climbing higher and higher; never content until reaching the top. The second is the garden goat, with little adventurous spirit or ambition-happy to remain within a small domain, refusing to budge unless it is pushed. Either type of Capricorn, however, is patient and persevering. They reach their goals because they know the longest journey commences with a single step and that the first step is always the most difficult."
            },
            {
                zsign: "Sagittarius",
                birthrange: "November 22 - December 21",
                attribute: "Ruled by the benefic planet Jupiter, Sagittarians possess a natural exuberance, sense of adventure and love of life that makes them one of the most optimistic zodiac signs of all. Like their astrological symbol - the Archer - Sagittarians are renowned for aiming their sights towards whatever it is they find alluring - a love partner, dream job, vacation - and making it their own. They believe that anything is possible - and because of this belief system, Sagittarians are adept at seeking out their very own pot of gold at the end of the rainbow."
            },
            {
                zsign: "Pisces",
                birthrange: "February 19 - March 20",
                attribute: "Mysterious and alluring individuals, most Pisces are extremely talented, but even though they are gifted in many ways, they still manage to spend most of their lives battling confusing conditions. Pisces is the sign symbolised by the image of two fish. Their symbol depicts one fish heading upward, the other pulling downward. This mirrors how Pisceans are frequently torn between two pathways in life, or actually do live two very different existences at the same time."
            },
            {
                zsign: "Aquarius",
                birthrange: "January 20 - February 18",
                attribute: "Special note for Aquarians: At the Dawn of the Age of Aquarius, at this time, ready or not, your sign is regarded as the zodiac's leader. You are the trendsetter for the future and because of this high responsibility, many under born your sign will be undergoing at this time, the pressure of personal change (particularly in your values and what makes you content and happy). Yours has always been a philanthropic sign. Now more than ever these qualities will be highlighted."
            },
            {
                zsign: "Scorpio",
                birthrange: "October 23 - November 21",
                attribute: "Reputed to be the most powerful sign of the zodiac, Scorpios lead fate filled lives and have intense and dramatic personal relationships. Even as children Scorpios are often found to be wise beyond their years. Many astrologers call this the sign of the oldest souls. Old and wise beyond the average, Scorpios often know all the answers, except sometimes; they too often have difficulty finding what they need to develop their own happiness."
            },
            {
                zsign: "Virgo",
                birthrange: "August 23 - September 22",
                attribute: "Virgos are often put down badly by many astrologers and written up as being fussy and narrow-minded. But when a Virgo shines, there is practically no sign to match their inner light. An in-tune Virgo is a treat to meet. When a Virgo is confident within themselves they are the most successful, structured and creative of all the signs."
            },
            {
                zsign: "Libra",
                birthrange: "September 23 - October 22",
                attribute: "Every adolescent Libran's fantasy is to find the Prince or Princess of their dreams. As their lives unfold, the experiences, false starts, dramas, broken hearts and disillusionment they encounter seeking this personal Holy Grail, often shapes their futures in the most extra-ordinary manner. Love and love-lost makes a big difference to the Libran although their often happy-go-lucky appearance against all kinds of odds may not reveal this as fact."
            },
            {
                zsign: "Leo",
                birthrange: "July 23 - August 22",
                attribute: "People born under the sign of Leo are natural born leaders. They are dramatic, creative self-confident, dominant and extremely difficult to resist. They can achieve anything they want, whether it's about work or time spent will family and friends."
            }
        ];

    //function to display the output properly
    const maybePluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

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

    //function to get zodiac name, birth-range and attributes
    const getZodiacInfo = function(z_sign) {
        let selected_zodiac = zodiacArray.find(function(zodiac) {
            if (zodiac.zsign === z_sign) {
                return zodiac;
            }
        });
        return selected_zodiac;
    };

    /* ========================= FOR TAB1: Birth Date Age Calculator =========================== */
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

    $(document).on('click', 'button#getAge', function() {
        getAge();
    });

    //function to calculate the age in years, days and months
    function getAge() {
        let u_date = $('#date_label').val();
        let u_month = $('#month_label').val();
        let u_year = $('#year_label').val();

        let userDateString = `${u_month}-${u_date}-${u_year}`;
        let userDate = new Date(userDateString);

        if (isFinite(userDate)) {
            //code for calculating age in years
            let user_diffYears = currDate.getFullYear() - userDate.getFullYear();
            //code for calculating age in months
            let user_diffMonths = user_diffYears * 12 + (currDate.getMonth() - userDate.getMonth());
            //code for calculating age in days
            let user_diffDays = Math.floor((currDate - userDate) / dayInMilli);

            $('#today_date').html(currDate);
            $("#user_date").html(userDate);
            $("#user_ageYears").html(user_diffYears);
            $("#user_ageMonths").html(user_diffMonths);
            $("#user_ageDays").html(user_diffDays);
            getTrueAge(userDate);
            getCountdownTime(userDate);
            let z_sign = zodiac(userDate.getDate(), userDate.getMonth());
            let zodiac_info = getZodiacInfo(z_sign);
            $('#zodiac_name').html(zodiac_info.zsign);
            $('#zodiac_birthrange').html(zodiac_info.birthrange);
            $('#zodiac_attributes').html(zodiac_info.attribute);
        } else {
            alert('Invalid Date, try again.');
            return false;
        }
    }

    /* =========================== FOR TAB2: Different Dates Age Calculator ======================= */
    $('#start_date_label').html(age_day.join(''));
    $('#start_month_label').html(age_month.join(''));
    $('#start_year_label').html(age_year.join(''));

    $('#end_date_label').html(age_day.join(''));
    $('#end_month_label').html(age_month.join(''));
    $('#end_year_label').html(age_year.join(''));

    $(document).on('click', 'button#getDiff', function() {
        getDateDiff();
    });

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

        //debugger;
        if (isFinite(userSDate) && isFinite(userEDate)) {
            if (end_year > start_year) {
                let select_diffYears = userEDate.getFullYear() - userSDate.getFullYear();
                let select_diffMonths = (select_diffYears) * 12 + (userEDate.getMonth() - userSDate.getMonth());
                let select_diffDays = Math.floor((userEDate - userSDate) / dayInMilli);

                $('#start_date').html(userSDate);
                $('#end_date').html(userEDate);
                $('#diff_years').html(select_diffYears);
                $('#diff_months').html(select_diffMonths);
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
});