var cl = console.log.bind(console);
cl('online')

//add years to select
$(document).ready(function() {
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

    //phone input added mask
    $(":input").inputmask();
    $("#cname0").inputmask({ "mask": "(999) 999-9999" });

    //email mask
    $('#email').inputmask({
        mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
        greedy: false,
        onBeforePaste: function(pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                casing: "lower"
            }
        }
    });
});

// Get the modal
var modal = $('#myModal');
// modal.css("display", "block");
$('.close').click(function(e) {
    modal.css("display", "none");
});;

// When the user clicks anywhere outside of the modal, close it
$(window).click(function(e) {
    if ($(event.target).attr('id') == 'myModal') {
        cl('test')
        modal.css("display", "none");
    }
});

//reset color on focus
$('input').focus((e) => $(e.target).css("background-color", ""));


$('#invoice_form_submit_btn').click(function(e) {
    e.preventDefault();
    //clean up on new submit
    //clear prior red css
    $.each($('input'), function(index, input) {
        value = $(input);
        value.attr('type') === 'text' || value.attr('type') === 'number' || value.attr('type') === 'tel' ? value.css("background-color", "") : ''
    });
    //empty previous errors
    $('#errorContianer').empty();
    console.log('Validating...');
    //nit obj
    var formObj = {
        firstname: $('#fname'),
        lastName: $('#cname'),
        email: $('#email'),
        lastName0: $('#cname0'),
        /**phone!**/
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
    //error ol to add to modal
    var errMsg = $('<ol>');
    var hasErrors = false;
    $('input').each(function(index, element) {
        var input = $(element);
        if (input.attr('type') === 'text' || input.attr('type') === 'tel' || input.attr('type') === 'number') {
            // cl(index, input.val())
            //check if empty
            if (!input.val()) {
                hasErrors = true;
                input.css("background-color", "#ff9999");
                errMsg.append($('<li>').text(`${input.attr('name')} cannot be empty`));
            }
        }
    });
    /**validation ends--check results**/
    if (hasErrors)
        $('#errorContianer').append(errMsg),
        modal.css("display", "block")
    else
        $('#invoice_form').submit();
    cl('post it!');
});

// function mask(input, e) {
//     // cl(input.value);
//     var tel = '',
//         val = input.value.replace(/[^\d]*/g, '').split(''),
//         len = val.length;

//     for (var i = 0; i < len; i++) {
//         switch (i) {
//             case 2:
//             case 5:
//                 val[i] = val[i] + '-'
//                 break;
//         }
//         tel = tel + val[i]
//     }
//     input.value = tel;
// }

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}