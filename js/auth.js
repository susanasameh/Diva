 // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
        import {
            getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            onAuthStateChanged
        } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyB62d8FtJeTUfcbFCs0HhzLMgf32CD82yk",
            authDomain: "diva-cd2d3.firebaseapp.com",
            projectId: "diva-cd2d3",
            storageBucket: "diva-cd2d3.appspot.com",
            messagingSenderId: "752108842622",
            appId: "1:752108842622:web:1fa4612b85904fcd1e722f"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        // Initialize Authentication
        const auth = getAuth(app);

        //Prevent default form submission to avoid page reload
        document.getElementById('signupForm').addEventListener('submit', function (e) {
                e.preventDefault();
                createAccount();
            });

        //Add client-side validation for email, password, and phone number
            function validateEmail(email) {
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return re.test(email);
                }

                function validatePassword(password) {
                    return password.length >= 8;
                }

                function validatePhone(phone) {
                    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                    return re.test(phone);
                }

        //identify createAccount function in window object to can use
        window.createAccount = createAccount;

        // createAccount function
        async function createAccount() {
                const regeEmail = document.getElementById("regeEmail").value;
                const regePass = document.getElementById("regePass").value;
                const regeName = document.getElementById("regeName").value;
                const regePhone = document.getElementById("regePhone").value;

                if (!validateEmail(regeEmail)) {
                    document.getElementById("wrongEmail").textContent = "Invalid email format";
                    document.getElementById("wrongEmail").style.display = "block";
                    return;
                }

                if (!validatePassword(regePass)) {
                    document.getElementById("wrongPass").textContent = "Password must be at least 8 characters long";
                    document.getElementById("wrongPass").style.display = "block";
                    return;
                }

                if (regePhone && !validatePhone(regePhone)) {
                    document.getElementById("wrongPhone").textContent = "Invalid phone number format";
                    document.getElementById("wrongPhone").style.display = "block";
                    return;
                }

            try {
                await createUserWithEmailAndPassword(auth, regeEmail, regePass);
                // Handle successful account creation
                console.log("Account created successfully");

                // Reset form fields
                document.getElementById("regeEmail").value = "";
                document.getElementById("regePass").value = "";
                document.getElementById("regeName").value = "";
                document.getElementById("regePhone").value = "";

                //using location
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                       location.assign('../login.html')     
                    }
                })
            
            
                } catch (error) {
                    // Handle errors here
                    console.error("Error creating account:", error.message);
                }
            }


            document.getElementById('signinForm').addEventListener('submit', function (e) {
                    e.preventDefault();
                    signIn();
                });

                async function signIn() {
                    const signEmail = document.getElementById("signEmail").value;
                    const signPass = document.getElementById("signPass").value;

                    try {
                        await signInWithEmailAndPassword(auth, signEmail, signPass);
                        console.log("Signed in successfully");
                    } catch (error) {
                        console.error("Error signing in:", error.message);
                    }
                }


                // Export the functions
                export { createAccount, signIn };
    


                const container = document.getElementById('container');
                const registerBtn = document.getElementById('register');
                const loginBtn = document.getElementById('login');

                registerBtn.addEventListener('click', () => {
                    container.classList.add("active");
                });

                loginBtn.addEventListener('click', () => {
                    container.classList.remove("active");
                });