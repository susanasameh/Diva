const firebaseConfig = {
  apiKey: "AIzaSyBZuMW877HKqnWNsJlZsTVal5CaCs1E57M",
  authDomain: "test-d20b0.firebaseapp.com",
  projectId: "test-d20b0",
  storageBucket: "test-d20b0.appspot.com",
  messagingSenderId: "65990046308",
  appId: "1:65990046308:web:6ce540ec79290be5e7e571"
};

    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = firebaseApp.firestore();
    const auth = firebaseApp.auth();
    const storageRef = firebaseApp.storage().ref();
    

 
        function otpStage() {
            // document.getElementById('phone').disabled = true;
            // document.getElementById('otpDiv').style.display = 'block';
            // document.getElementById('otp').focus();
             document.getElementById('otp').style.display = 'block';
             document.getElementById('phone').style.display = 'none';
             document.getElementById('recaptcha-container').style.display = 'none';
             document.getElementById('login').style.display = 'none';
             document.getElementById('verify-btn').style.display = 'block';

            // document.getElementById('otpDiv').style.display = 'block';
            // document.getElementById('otp').focus();
            // window.confirmationResult = result;
            // alert("Hello " + phone)
            
        }
        function phoneStage() {
            // document.getElementById('phone').disabled = false;
            // document.getElementById('otpDiv').style.display = 'none';
            // document.getElementById('phone').focus();
             document.getElementById('phone').style.display = 'block';
             document.getElementById('otp').style.display = 'none';
             document.getElementById('recaptcha-container').style.display = 'block';
             document.getElementById('login').style.display = 'block';
             document.getElementById('verify-btn').style.display = 'none';
            
        }


        function login() {
            var phone = document.getElementById('phone').value;
            const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            auth.signInWithPhoneNumber(phone, recaptchaVerifier).then(result => {
                // console.log(result);
                window.confirmationResult = result;
                otpStage();
            } ).catch(e => {
                alert("error message " + e.message)
            })
            alert("Hello " + phone)


        function verify() {}
        //     var phone = document.getElementById('phone').value;
        //     var otp = document.getElementById('otp').value;
        //     if (phone.length == 10) {
        //         sendVerificationCode(phone);
        //     } else {
        //         alert("Please enter a valid 10-digit phone number.");
        //     }
        //     function sendVerificationCode(phone) {
        //         // Send verification code to the phone using Firebase Phone Auth
        //         var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        //             size: 'normal',
        //             callback: function(token) {
        //                 // SMS sent. Prompt user to enter the code from the message, then call:
        //                 // verifyPhoneNumberWithCode(phone, token);
        //             }
        //         });
        //         var phoneNumber = "+91" + phone;
        //         firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        //            .then(function(confirmationResult) {
        //                 // SMS sent. Display a verification code input field.
        //                 document.getElementById('otpDiv').style.display = 'block';
        //                 document.getElementById('phone').disabled = true;
        //                 document.getElementById('otp').focus();
        //                 window.confirmationResult = confirmationResult;
        //             }).catch(function(error) {
        //                 alert(error.message);
        //             });
        //     }
        //     function verifyPhoneNumberWithCode() {
        //         var code = document.getElementById('otp').value;
        //         confirmationResult.confirm(code).then(function(result) {
        //             // User signed in successfully.
        //             var user = result.user;
        //             alert("Login successful.");
        //             document.getElementById('phone').disabled = false;
        //             document.getElementById('otpDiv').style.display = 'none';
        //         }).catch(function(error) {
        //             // User couldn't sign in (bad verification code, etc.)
        //             alert(error.message);
        //         });
        //     }
        //     // Add event listeners to the icons in the header
        //     var headerIcons = document.querySelectorAll('.header.icons.icon');
        //     headerIcons.forEach(icon => {
        //         icon.addEventListener('click', function() {
        //             // Handle click event for each icon
        //             console.log('Icon clicked:', icon.textContent);
        //         });
        //     });
        //     // Add event listeners to the icons in the footer
        //     var footerIcons = document.querySelectorAll('.footer.icons.icon');
        //     footerIcons.forEach(icon => {
        //         icon.addEventListener('click', function() {
        //             // Handle click event for each icon
        //             console.log('Icon clicked:', icon.textContent);
        //         });
        //     });
        //     // Add event listeners to the dropdown menu items
        //     var dropdownMenus = document.querySelectorAll('.dropdown-menu a');
        //     dropdownMenus.forEach(menu => {
        //         menu.addEventListener('click', function() {
        //             // Handle click event for each dropdown menu item
        //             console.log('Dropdown menu item clicked:', menu.textContent);
        //         });
        //     });
        //     // Add event listeners to the search bar
        //     var searchBar = document.getElementById('searchBar');
        //     searchBar.addEventListener('keyup', function(event) {
        //         // Handle keyup event for the search bar
        //         var searchInput = event.target.value.toLowerCase();
        //         var searchResults = document.querySelectorAll('.search-results.result');
            
        // }
        // searchResults.forEach(result => {
        //     var title = result.querySelector('.title').textContent.toLowerCase();
        //     if (title.includes(searchInput)) {
        //         result.style.display = 'block';
        //     } else {
        //         result.style.display = 'none';
        //     }
        // });
        // // Add event listeners to the navigation links
        // var navLinks = document.querySelectorAll('.navbar.nav-link');
        // navLinks.forEach(link => {
        //     link.addEventListener('click', function() {
        //         // Handle click event for each navigation link
        //         console.log('Navigation link clicked:', link.textContent);
        //     });
        // });
        // // Add event listeners to the cards in the gallery
        // var galleryCards = document.querySelectorAll('.main.gallery.card');
        // galleryCards.forEach(card => {
        //     card.addEventListener('click', function() {
        //         // Handle click event for each card
        //         console.log('Card clicked:', card.querySelector('.name').textContent);
        //     });
        // });
        // // Add event listeners to the icons in the sidebar
        // var sidebarIcons = document.querySelectorAll('.sidebar.icons.icon');
        // sidebarIcons.forEach(icon => {
        //     icon.addEventListener('click', function() {
        //         // Handle click event for each icon
        //         console.log('Icon clicked:', icon.textContent);
        //     });
        // });
        // // Add event listeners to the icons in the footer
        // var footerIcons = document.querySelectorAll('.footer.icons.icon');
        // footerIcons.forEach(icon => {
        //     icon.addEventListener('click', function() {
        //         // Handle click event for each icon
        //         console.log('Icon clicked:', icon.textContent);
        //     });
        // });
        // // Add event listeners to the dropdown menu items
        // var dropdownMenus = document.querySelectorAll('.dropdown-menu a');
        // dropdownMenus.forEach(menu => {
        //     menu.addEventListener('click', function() {
        //         // Handle click event for each dropdown menu item
        //         console.log('Dropdown menu item clicked:', menu.textContent);
        //     });
        // });
        // // Add event listeners to the search bar
        // var searchBar = document.getElementById('searchBar');
        // searchBar.addEventListener('keyup', function(event) {
        //     // Handle keyup event for the search bar
        //     var searchInput = event.target.value.toLowerCase();
        //     var searchResults = document.querySelectorAll('.search-results.result');

        }