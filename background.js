'use strict';

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
    });

    $(document).on('click', 'button.funButton', function() {
        //something happens and add_on gets a code based on either form name or button click
        if (add_on === true) {
            let start_date = document.firstForm.start_date.value;
            let start_month = document.firstForm.start_month.value;
            let start_year = document.firstForm.start_year.value;

            let userSDateString = `${start_month}-${start_date}-${start_year}`;
            let userSDate = new Date(userSDateString);

            let userEDate = currDate;
        } else if (add_on === false) {
            let start_date = document.secondForm.start_date.value;
            let start_date = document.secondForm.start_month.value;
            let start_year = document.secondForm.start_year.value;

            let end_date = document.secondForm.end_date.value;
            let end_month = document.secondForm.end_month.value;
            let end_year = document.secondForm.end_year.value;

            let userSDateString = `${start_month}-${start_date}-${start_year}`;
            let userSDate = new Date(userSDateString);

            let userEDateString = `${end_month}-${end_date}-${end_year}`;
            let userEDate = new Date(userEDateString);
        }
        getDiffTime(userSDate, userEDate, add_on); //add_on=true for Age Diff, add_on=false for Time Diff
    });


    /* ========================= FOR TAB1: Birth Date Age Calculator =========================== */
    $(document).on('click', 'button.funButton', function() {
        //getAge(fd, sd , true);
    });

    /* =========================== FOR TAB2: Different Dates Age Calculator ======================= */
    $(document).on('click', 'button#getDiff', function() {
        //getDateDiff(fd, sd, false);
    });
});