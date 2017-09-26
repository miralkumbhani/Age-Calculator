'use strict';

const currDate = new Date();
const cal = 1000 * 60 * 60 * 24;
var zodiac = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];

/* ========================== FOR TAB1: Birth Date Age Calculator ============================= */
//function to display days for select-list
function fetchDate(){
    let dateArray = [];
    for(let j = 1; j < 32; j++){
        dateArray.push(j);
    }
    let dateDropdown = $('#date_label');
    $.each(dateArray, function(i,idx){
        // adding +1 as array index start from 0
        dateDropdown.append(`<option value="${i+1}">${idx}</option>`);
    });
}

//function to display months for select-list
function fetchMonth(){
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthDropdown = $("#month_label");
    $.each(monthArray, function(i, idx){
        // console.log('each i', idx);
        monthDropdown.append(`<option value="${i+1}">${idx}</option>`);
    });
}

//function to display years for the select-list
function fetchYear(){
    let yearArray = [];
    let endYear = new Date().getYear(); // return 117 : new JS feature
    for(let j = endYear; j > 0; j--){
        yearArray.push(1900 + j);
    }
    console.log("yearArray", yearArray);
    let yearDropdown = $("#year_label");
    $.each(yearArray, function(i, idx){
        yearDropdown.append(`<option value="${idx}">${idx}</option>`);
    });
}

//function to display the output of age calculator
const display = function(currDate, years, numOfMon, diffDays)
{
    $("#getDate").html(currDate);
    $("#ageYears").html(years);
    $("#ageMonths").html(numOfMon);
    $("#ageDays").html(diffDays);
};

//function to calculate the zodiac sign
function zodiac(day, month){
    let last_day = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
        return (day > last_day[month]) ? zodiac[month*1 + 1] : zodiac[month];
}


function zodiacData(z_sign){
    $('.zsigndisplay').html(z_sign);
    let birthrange, attribute;
    let zodiac = [{
            zsign: "Aries",
            birthrange: "March 21 - April 19",
            attribute: "Aries are fire signs and those born under this element are regarded in astrology as adventurous, active and outgoing. It won't matter where you go or how remote or unusual it is - from the Outback to the Antarctic - you can be sure that an Aries has been there before you (or at the very least you will meet one along the way!) Aries is a uniquely naive sign. Although they are independent, outgoing and assertive they are also surprisingly trusting, often innocently walking into the lion's den at times. No matter what upheaval, challenge or triumph they confront - an Aries has a wonderful ability to bounce back. Their faith in life and the future remains untouched by hardship. Their gift is that they are always children at heart and the world is always a magical place for them. Many famous sports people are born under this sign. Aries is regarded as the most physical sign and because of its Mar's rulership; it is also one of the most highly charged masculine energy signs in astrology. No wonder women born under Aries are forceful, dynamic and aggressive, and as a result these Aries women frequently find themselves with dilemmas surrounding their romantic relationships. For them, a man has to be a 'real man' to deal with an Aries woman, otherwise she intimidates him. And conversely for the Aries male, a woman has to be a real woman to deal with him, because he is looking for many balancing component traits (his true feminine side) in his partner. She has to run the gamut in his support system, from the Aries man's best friend, true companion, through to his muse, and yet she must never ever answer him back!"
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
            zsign:"Cancer",
            birthrange: "June 21 - July 22",
            attribute: "Those born under the sign of Cancer, ruled by the mysterious Moon, are one of the zodiac's enigmas. It is fair to say that most Cancers are a bundle of contradictions. Compassionate and caring with friends, family and lovers, yet they can cut to the bone with their jealous remarks and ever-changing moods. Endearingly eccentric on one hand, and on the other, insecure about how others see them. Like their astrological symbol - the Crab - Cancers can appear hard and insensitive on the outside. However, for those of us who know and love a Moon Child, we understand that deep below lies a softness and sensitivity that makes them so very special."
        },
        {
            zsign: "Leo",
            birthrange: "July 23 - August 22",
            attribute: "People born under the sign of Leo are natural born leaders. They are dramatic, creative self-confident, dominant and extremely difficult to resist. They can achieve anything they want, whether it's about work or time spent will family and friends."
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
            zsign: "Scorpio",
            birthrange: "October 23 - November 21",
            attribute: "Reputed to be the most powerful sign of the zodiac, Scorpios lead fate filled lives and have intense and dramatic personal relationships. Even as children Scorpios are often found to be wise beyond their years. Many astrologers call this the sign of the oldest souls. Old and wise beyond the average, Scorpios often know all the answers, except sometimes; they too often have difficulty finding what they need to develop their own happiness."
        },
        {
            zsign: "Sagittarius",
            birthrange: "November 22 - December 21",
            attribute: "Ruled by the benefic planet Jupiter, Sagittarians possess a natural exuberance, sense of adventure and love of life that makes them one of the most optimistic zodiac signs of all. Like their astrological symbol - the Archer - Sagittarians are renowned for aiming their sights towards whatever it is they find alluring - a love partner, dream job, vacation - and making it their own. They believe that anything is possible - and because of this belief system, Sagittarians are adept at seeking out their very own pot of gold at the end of the rainbow."
        },
        {
            zsign: "Capricorn",
            birthrange: "December 22 - January 19",
            attribute: "The sign of the high roller, Capricorn is regarded as the zodiac top, but also quiet, life and business achievers. But, there are two very different types of Capricorns. The first is represented by the mountain goat, always climbing higher and higher; never content until reaching the top. The second is the garden goat, with little adventurous spirit or ambition-happy to remain within a small domain, refusing to budge unless it is pushed. Either type of Capricorn, however, is patient and persevering. They reach their goals because they know the longest journey commences with a single step and that the first step is always the most difficult."
        },
        {
            zsign: "Aquarius",
            birthrange: "January 20 - February 18",
            attribute: "Special note for Aquarians: At the Dawn of the Age of Aquarius, at this time, ready or not, your sign is regarded as the zodiac's leader. You are the trendsetter for the future and because of this high responsibility, many under born your sign will be undergoing at this time, the pressure of personal change (particularly in your values and what makes you content and happy). Yours has always been a philanthropic sign. Now more than ever these qualities will be highlighted."
        },
        {
            zsign: "Pisces",
            birthrange: "February 19 - March 20",
            attribute: "Mysterious and alluring individuals, most Pisces are extremely talented, but even though they are gifted in many ways, they still manage to spend most of their lives battling confusing conditions. Pisces is the sign symbolised by the image of two fish. Their symbol depicts one fish heading upward, the other pulling downward. This mirrors how Pisceans are frequently torn between two pathways in life, or actually do live two very different existences at the same time."
        }   ]
 // find method in JQuery
}

$(document).ready(function () {
$('.tabcontent').eq(0).show();
fetchDate();
fetchMonth();
fetchYear();


//function to calculate the age in years, days and months
function getAge()
{
    let b_day = parseInt(document.forms[0].user_date.value, 10);
    let b_month = parseInt(document.forms[0].user_month.value, 10);
    let b_year = parseInt(document.forms[0].user_year.value, 10);
    let userDateString = `${b_month}-${b_day}-${b_year}`;
    let userDate = new Date(userDateString);

    if(isFinite(userDate)) {
        //code for calculating age in years
        let yearsDate = currDate.getUTCFullYear() - userDate.getUTCFullYear();

        //code for calculating age in months
        let monthsDate = (currDate.getUTCFullYear() - userDate.getUTCFullYear()) * 12 + (currDate.getMonth() - userDate.getMonth());

        //code for calculating age in days
        let daysDate = Math.floor((currDate - userDate) / cal);
    }
    else {
        alert('Invalid Date, try again.');
        return false;
    }

    //function call for displaying the output of age calculator
    display(currDate, yearsDate, monthsDate, daysDate);

    //function call for zodiac sign
    var z_sign = zodiac(userDate.getDay(), userDate.getMonth());
    alert(z_sign);
    zodiacData(z_sign);

    //function to get the countdown to next birthday
    var dlDay = userDate.getDate();
    var dlMon = userDate.getMonth();
    var dlYr = currDate.getFullYear() + 1;

    var deadline = new Date();
    deadline.setDate(dlDay);
    deadline.setMonth(dlMon);
    deadline.setYear(dlYr);

    var countDownDate = new Date(deadline).getTime();

    var x = setInterval(function(){
        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown1").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
        if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown1").innerHTML = "EXPIRED";
        }
    }, 1000);
}


//function to calculate age from today (What is my age today?)
function getDataAge(){

    var b_day = parseInt(document.forms[0].txtBday.value,10);
    var b_month = parseInt(document.forms[0].txtBmo.value, 10);
    var b_year = parseInt(document.forms[0].txtByr.value, 10);

    let userDateString = `${b_month}-${b_day}-${b_year}`;
    let userDate = new Date(userDateString);

    var days, ageYears, ageMonths, ageDays;

    //days calculation from today
    days = Math.floor((currDate - userDate) / cal);

    //years calculation from today
    ageYears = Math.floor(days / 365);

    //months calculation from today
    var diffMonth = currDate.getMonth() - userDate.getMonth();
    if(diffMonth >= 0){
        ageMonths = currDate.getMonth() - userDate.getMonth();
    }
    else if(diffMonth < 0){
        ageMonths = 12 - Math.abs((currDate.getMonth() - userDate.getMonth()));
    }

    //days calculation from today
    var diffDay = currDate.getDate() - userDate.getDate();
    var y = userDate.getFullYear();

    if(userDate.getMonth() == 1 || userDate.getMonth() == 2) {
        var conValue = confirm("If date entered is greater than 29 (for leap year) or 28 for FEBRUARY month, the age will be calculated automatically considering 1st March of the concerned year! Do you wish to continue?");
        if(conValue == true){
            if( (0 == y % 4) && (0 != y % 100) || (0 == y % 400)){
                ageDays = 29 - Math.abs(diffDay);
            }
            else{
                ageDays = 28 - Math.abs(diffDay);
            }
        }
        else if(conValue == false){
            return false;
        }
    }
    if(diffDay < 0){
        ageMonths--;
        ageDays = 31 - Math.abs(diffDay);
    }
    if(diffDay >= 0){
        ageDays = diffDay;
    }

    //function call for displaying the total age from today
    var id = "demo1";
    getHumanReadableDate(id, ageYears, ageMonths, ageDays);
}




/* ======================================= FOR TAB ============================================ */

//function to siplay the content and changing the content onClick of tabs

//function to open the tab when clicked
function openTab(evt, tabname){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}

/* ================================== TEXT EDITING FOR TITLE ================================== */

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

});