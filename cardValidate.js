function CCValidationWithType(cardNumber) {
    var response = {
        valid: false,
        type: "Invalid"
    };

    var cardNumberWithoutDashes = cardNumber.split("-").join("");
    if (cardNumberWithoutDashes.length > 16 || cardNumberWithoutDashes.length < 14) {
        response.type = "Not a Credit Card Number";
        return response;
    }

    var regExpressions = {
        "Visa": /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/,
        // Visa: length 16, prefix 4, dashes optional.
        "MasterCard": /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/,
        // Mastercard: length 16, prefix 51-55, dashes optional.
        "Discover": /^6011-?\d{4}-?\d{4}-?\d{4}$/,
        // Discover: length 16, prefix 6011, dashes optional.
        "American Express": /^3[4,7]\d{13}$/,
        // American Express: length 15, prefix 34 or 37.
        "Diners": /^3[0,6,8]\d{12}$/ // Diners: length 14, prefix 30, 36, or 38.
    };

    for (var cardType in regExpressions) {
        var exp = regExpressions[cardType];
        if (exp.test(cardNumber)) {
            response.type = cardType;
            break;
        } else {
            response.type = "Invalid Card #";
        }
        continue;
    }

    // Checksum ("Mod 10")
    // Add even digits in even length strings or odd digits in odd length strings.
    var checksum = 0;
    for (var i = (2 - (cardNumberWithoutDashes.length % 2)); i <= cardNumberWithoutDashes.length; i += 2) {
        checksum += parseInt(cardNumberWithoutDashes.charAt(i - 1));
    }
    // Analyze odd digits in even length strings or even digits in odd length strings.
    for (var i = (cardNumberWithoutDashes.length % 2) + 1; i < cardNumberWithoutDashes.length; i += 2) {
        var digit = parseInt(cardNumberWithoutDashes.charAt(i - 1)) * 2;
        if (digit < 10) {
            checksum += digit;
        } else {
            checksum += (digit - 9);
        }
    }
    if ((checksum % 10) == 0) {
        response.valid = true;
    } else {
        response.valid = false;
        response.type = "Invalid Card #";
    }
    return response;
}
CCslots = $('#digit1,#digit2,#digit3,#digit4');
CCslots.change(function () {
    if (CCslots.val() == "") {
        CCslots.removeClass("error");
        $("#type").text("");
        return false;
    }
    var stringCC = $('#digit1').val() + $('#digit2').val() + $('#digit3').val() + $('#digit4').val()
    var validationResult = CCValidationWithType(stringCC);
    var digitsall = "#digit1,#digit2,#digit3,#digit4";
    var cardType = $('#cardTypeOut');
    cl(validationResult);
    if (validationResult.valid) {
        redGreen($(digitsall), true),
            redGreen(cardType, true);
    } else {
        redGreen($(digitsall), false),
            redGreen(cardType, true);
    }
    cardType.val(validationResult.type);
});

//check CC date not expired
$('#expirationYear,#expirationMonth').change(function (event) {
    var mm = $('#expirationMonth');
    var yy = $('#expirationYear');
    var validDate = true;
    var month;
    if (mm.val() < 10) {
        month = String(0 + mm.val());
    }

    var expDate = new Date();
    expDate = expDate.setFullYear(yy.val(), month, 1)
    var today = new Date();
    if (
        isNaN(expDate) ||
        expDate < today
    ) {
        validDate = false;
        cl('Expired!')
        redGreen(mm, false),
            redGreen(yy, false);
    }

    if (validDate)
        redGreen(mm, true),
        redGreen(yy, true);
    else
        redGreen(mm, false),
        redGreen(yy, false);

});

/////////////