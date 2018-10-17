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
    cvv: $('#cvv'),
    expirationMonth: $('#expirationMonth'),
    expirationYear: $('#expirationYear')
};

//red if empty input on blur (CVV excluded)
$('input').blur(function (e) {
    e.preventDefault();
    if ($(this).attr('id') != 'cvv')
        $(this).val().length === 0 ? redGreen($(this), false) : redGreen($(this), true);
    else if ($(this).val().length < 3)
        redGreen($(this), false);
    else
        redGreen($(this), true);
});

// formObj.cvv.click(function (e) {
//     e.preventDefault();
//     cl($(this).val().length)
//     if ($(this).val().length < 3)
//         redGreen($(this), false);
//     else
//         redGreen($(this), true);
// });


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
formObj.statecode.blur(function (e) {
    e.preventDefault();
    cl($(this).val())
    if ($(this).val() != 'none')
        redGreen($(this), true);
    else
        redGreen($(this), false);
});

//allow numbers only in zip(prevent ./- etc)
formObj.zipCode.on("keypress keyup blur", function (e) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((e.which < 48 || e.which > 57)) {
        e.preventDefault();
    }
});
//limit input length
formObj.zipCode.on('keyup keypress keydown change', function () {
    limitText(this, 5)
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
//limit input lenght
function limitText(field, maxChar) {
    var ref = $(field),
        val = ref.val();
    if (val.length >= maxChar) {
        ref.val(function () {
            console.log(val.substr(0, maxChar))
            return val.substr(0, maxChar);
        });
    }
}