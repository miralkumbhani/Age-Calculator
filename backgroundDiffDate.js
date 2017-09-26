/* =========================== FOR TAB2: Different Dates Age Calculator ======================= */

//function to display the days (birth date) for select-list
function fetchBDate(){
    var myArray = [];
    for(var j = 1; j < 32; j++){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label4");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the months (birth date) for select-list
function fetchBMonth(){
    var myArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var key = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
    var dropdown = document.getElementById("label5");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], key[i]);
    }
}


//function to display the years (birth date) for select-list
function fetchBYear(){
    var myArray = [];
    for(var j = 2017; j > 1900; j--){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label6");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the days (selected date) for select-list
function fetchSDate(){
    var myArray = [];
    for(var j = 1; j < 32; j++){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label7");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the months (selected date) for select-list
function fetchSMonth(){
    var myArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var key = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
    var dropdown = document.getElementById("label8");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], key[i]);
    }
}


//function to display the years (selected date) for select-list
function fetchSYear(){
    var myArray = [];
    for(var j = 2017; j > 1919; j--){
        myArray.push(j);
    }
    var dropdown = document.getElementById("label9");

    for(var i = 0; i < myArray.length; ++i){
        dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
}


//function to display the output of the age calculator
function displayResult(currDate, years, numOfMon, diffDays, daysRemain){

    document.getElementById("getDate2").innerHTML = currDate;      //code for today's date

    document.getElementById("ageYears2").innerHTML = years;        //code for age in years

    document.getElementById("ageMonths2").innerHTML = numOfMon;    //code for age in months

    document.getElementById("ageDays2").innerHTML = diffDays;      //code for age in days
}


//function to calculate the age between two dates
function getAgeDiff(){
    var b_day = parseInt(document.forms[1].txtBday2.value, 10);
    var b_month = parseInt(document.forms[1].txtBmo2.value, 10);
    var b_year = parseInt(document.forms[1].txtByr2.value, 10);

    let userBDateString = `${b_month}-${b_day}-${b_year}`;
    let userBDate = new Date(userBDateString);

    var s_day = parseInt(document.forms[1].txtSday.value, 10);
    var s_month = parseInt(document.forms[1].txtSmon.value, 10);
    var s_year = parseInt(document.forms[1].txtSyr.value, 10);


    let userSDateString = `${s_month}-${s_day}-${s_year}`;
    let userSDate = new Date(userSDateString);

    if(isFinite(userBDate) && isFinite(userSDate)){
        if(s_year > b_year){
            //code for calculating age in years
            var years = userSDate.getUTCFullYear() - userBDate.getUTCFullYear();

            //code for calculating age in months
            var numOfMon = (userSDate.getUTCFullYear() - userBDate.getUTCFullYear()) * 12 + (userSDate.getMonth() - userBDate.getMonth())

            //code for calculating age in days
            var diffDays = Math.floor((userSDate - userBDate) / cal);
        }

        else{
            alert('The Selected Year should be greater than the Birth year');
            return false;
        }
    }
    else {
        alert('Invalid Date, try again.');
        return false;
    }

    //function call to display the output of age calculator
    displayResult(currDate, years, numOfMon, diffDays);

    //function call for zodiac sign
    var z_sign = zodiac(userBDate.getDay(), userBDate.getMonth());
    alert(z_sign);

    //function to get the countdown to next birthday
    var dlDay = userBDate.getDate();
    var dlMon = userBDate.getMonth();
    var dlYr = userSDate.getFullYear() + 1;

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

        document.getElementById("countdown2").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
        if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown2").innerHTML = "EXPIRED";
        }
    }, 1000);
}


//function to calculate age from today (What is my age?)
function getDataAgeDiff(){
    var b_day = parseInt(document.forms[1].txtBday2.value, 10);
    var b_month = parseInt(document.forms[1].txtBmo2.value, 10);
    var b_year = parseInt(document.forms[1].txtByr2.value, 10);

    let userBDateString = `${b_month}-${b_day}-${b_year}`;
    let userBDate = new Date(userBDateString);

    var s_day = parseInt(document.forms[1].txtSday.value, 10);
    var s_month = parseInt(document.forms[1].txtSmon.value, 10);
    var s_year = parseInt(document.forms[1].txtSyr.value, 10);


    let userSDateString = `${s_month}-${s_day}-${s_year}`;
    let userSDate = new Date(userSDateString);

    var days, ageYears, ageMonths, ageDays;

    days = Math.ceil((userSDate - userBDate) / (cal) + 30);

    //years calculation from today
    ageYears = Math.floor(days / 365);

    //months calculation from today
    var diffMonth = userSDate.getMonth() - userBDate.getMonth();
    if(diffMonth >= 0){
        ageMonths = userSDate.getMonth() - userBDate.getMonth();
    }
    else if(diffMonth < 0){
        ageMonths = 12 - Math.abs((userSDate.getMonth() - userBDate.getMonth()));
    }

    //days calculation from today
    var diffDay = userSDate.getDate() - userBDate.getDate();
    var y = userBDate.getFullYear();

    if(userBDate.getMonth() == 1 || userBDate.getMonth() == 2) {
        var conValue = confirm("If date entered is greater than 29 (for leap year) or 28 for FEBRUARY month, the age will be calculated automatically considering 1st March of the concerned year! Do you wish to continue?");
        if(conValue == true){
            if( (0 == y % 4) && (0 != y % 100) || (0 == y % 400)){
                ageDays = 29 - Math.abs(diffDay);
            }
            else{
                ageDays = 28 - Math.abs(diffDay);
            }
        }
        else if(conValue == false)
            return false;
    }
    if(diffDay < 0){
        ageMonths--;
        ageDays = 31 - Math.abs(diffDay);
    }
    if(diffDay >= 0){
        ageDays = diffDay;
    }

    //function call for displaying the total age from today
    var id = "demo2";
    getHumanReadableDate(id, ageYears, ageMonths, ageDays);
}
