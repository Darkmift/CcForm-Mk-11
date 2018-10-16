var cl = console.log.bind(console);
cl('online')

//add years to select
$(document).ready(function () {
    console.log("doc ready!");
    var x = new Date();
    var currentYear = x.getFullYear();
    for (let index = 0; index < 50; index++) {
        var optionYear = $('<option>', {
            value: currentYear + index,
            text: currentYear + index
        })
        $('#expirationYear').append(optionYear)
    }

    //add masking rule to phone
    $(":input").inputmask();
    formObj.phone.inputmask({
        "mask": "(999) 999-9999"
    });
});

//init objform for ease of use
var formObj = {
    firstname: $('#fname'),
    lastName: $('#cname'),
    email: $('#email'),
    phone: $('#phone'),
    address1: $('#adr'),
    cityname: $('#city'),
    statecode: $('#state'),
    zipCode: $('#zip'),
    /**CC INFO**/
    ccn: $('#ccn'),
    cvv: $('cvv'),
    expirationMonth: $('#expirationMonth'),
    expirationYear: $('#expirationYear')
};

///disable autocoplete
// $('invoice_form').attr("autocomplete", "off");



///check for number length
formObj.phone.blur(function (event) {
    cl($(this).val());
    var lenghtFlag = $(this).val().replace(/[()-\s_]+/g, '').length;
    if (lenghtFlag != 10)
        redGreen($(this), false);
    else
        redGreen($(this), true);
});


///Email input code
formObj.email.blur(function (e) {
    e.preventDefault();
    console.log(isEmail($(this).val()));
    if (isEmail($(this).val()))
        redGreen($(this), true);
    else
        redGreen($(this), false);
});




////HELPERs
//validate email format
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
//add green or red border
function redGreen(input, correct) {
    if (correct) {
        input.removeClass("errorRed"),
            input.addClass("successsGreen");
    } else {
        input.removeClass("successsGreen"),
            input.addClass("errorRed");
    }
}