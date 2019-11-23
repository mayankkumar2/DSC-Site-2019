let emailValue = '';
let emailValidity = false;
let FCMToken = '';
let recaptchaToken = '';
let messaging = firebase.messaging();

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function submitEmailwithToken(){
    fetch('https://recruitments.dscvit.com/notifs/', {
            method:'POST',
            crossDomain:true,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        })
        .then(function (response) {
            if(response.status === 200){
                cookieIs = 1;
            }
        })
        .then(function (responseJSON){
            console.log(responseJSON);
        })
    }
}

function submitEmail(){
    
    if(emailValidity){
        messaging.requestPermission()
        .then((permission) => {
            console.log('Notification permission granted.');
            return messaging.getToken();
        })
        .then((token) => {
            FCMToken = token;
            localStorage.setItem('userNotificationTokenDSC', FCMToken);
        });
    }
    else{
        console.log('Invalid Email')
    }
}

if(localStorage.getItem('userNotificationTokenDSC')===null){
    FCMToken = generateToken();
    localStorage.setItem('userNotificationTokenDSC', FCMToken);
}else{
    FCMToken = localStorage.getItem('userNotificationTokenDSC');
}

function generateToken() {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < 16; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

//Click scroll actions
$(document).ready(function () {


    $("#get-updates").click((e) => {
            
        grecaptcha.ready(() => {

                grecaptcha.execute('6LdiJ8QUAAAAAFCiBqwvhGOI2Ho3v-EFD73PAiBn', { action: '/' }).then(async (token) => {

                    let body = {
                        "g-recaptcha-response": token, "email": emailValue
                    }

                    console.table(body)
                    console.log(token)
                    recaptchaToken = token;

                    let resp = await fetch("/updates", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })

                    submitEmail();
                    
                    let reply = await resp.json()


                    if (reply.status === false) {
                        alert("Captcha Not Verified")
                    } else if (reply.err != null) {
                        console.log(reply.err)
                        if (reply.err === "Already responded")
                            alert(reply.err)
                    } else {

                        console.log(reply)

                    }

                });
        });

    });

    document.getElementById('email').addEventListener("input", function() {
        emailValue = $("#email").val();

        if(validateEmail(emailValue)){
            $('#email').addClass('text-field-true');
            $('#email').removeClass('text-field-false');
            emailValidity = true;
        }
        else{
            $('#email').removeClass('text-field-true');
            $('#email').addClass('text-field-false');
            emailValidity = false;
        }
        
    });

    checkDark();

    $('#dark-light-toggle').click(function(){
        toggleDark();
        checkDark();
    })

    // Scroll Clicks
    $("#home").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#home-scroll").offset().top
        }, 600);
    });

    $(".navbar-dsc-logo").click(function () {
        $('html, body').animate({
            scrollTop: $("#home-scroll").offset().top
        }, 600);
    });

    $("#home-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#home-scroll").offset().top
        }, 600);
    });

    $("#down-arrow").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);
    })

    $("#our-work").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);

    });

    $("#our-work-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);

    });

    $("#team").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#team-scroll").offset().top
        }, 1200);

    });

    $("#team-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#team-scroll").offset().top
        }, 1200);

    });

    $("#updates").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#updates-scroll").offset().top
        }, 1800);

    });

    $("#updates-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#updates-scroll").offset().top
        }, 1800);

    });

    $("#contact").click(function () {
        $('.main-menu').fadeOut(200)
        $('html, body').animate({
            scrollTop: $("#contact-scroll").offset().top
        }, 2100);

    });

    $("#contact-desk").click(function () {
        $('html, body').animate({
            scrollTop: $("#contact-scroll").offset().top
        }, 2100);

    });

    // Open Menu
    $('#menu-open').click(function () {
        $('.main-menu').fadeIn(100);
    })

    // Close Menu
    $('#menu-close').click(function () {
        $('.main-menu').fadeOut(100);
    })

    $(window).on('scroll', function () {

        var LogoMark = $(".main-text-holder-heading").offset().top;

        if ($(this).scrollTop() > LogoMark) {
            if (!$('.navbar').hasClass('navbar-scrolled')) {
                $('.navbar').addClass('navbar-scrolled');
            }
        } else {
            if ($('.navbar').hasClass('navbar-scrolled')) {
                $('.navbar').removeClass('navbar-scrolled');
            }
        }
    });
})

var toggleDark = function(){
    if(!$('body').hasClass('dark')){
        localStorage.setItem('dark',true);
    }
    else{
        localStorage.setItem('dark',false);
    }
}

var checkDark = function (){

    var dark = localStorage.getItem('dark');

    if(dark==='true'){
        $('body').addClass('dark');
        $('.dark-light-toggle').children().text('I want light mode');
    }
    else{
        $('body').removeClass('dark');
        $('.dark-light-toggle').children().text('I want dark mode');
    }

}