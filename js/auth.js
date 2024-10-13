 // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
        import {
            getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            onAuthStateChanged,
            updateProfile
        } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
           
        import {
          getFirestore,
          addDoc,
          collection,
          onSnapshot,
          deleteDoc,
          doc,
          updateDoc
        } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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
        // Initialize Firestore
        const firestore = getFirestore(app);
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
              // await createUserWithEmailAndPassword(auth, regeEmail, regePass);
              // // Handle successful account creation
              // console.log("Account created successfully");
              // Create user account
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                regeEmail,
                regePass
              );
              const user = userCredential.user;

              // Update user profile
              await updateProfile(user, {
                displayName: regeName.value,
              });

              //save data in firestore
              window.saveUsers = saveUsers;
              async function saveUsers() {
                var userId = document.getElementById("userId").value;
                const regeEmail = document.getElementById("regeEmail").value;
                const regePass = document.getElementById("regePass").value;
                const regeName = document.getElementById("regeName").value;
                const regePhone = document.getElementById("regePhone").value;

                var User = {
                  Name: regeName,
                  Email: regeEmail,
                  Phone: regePhone,
                  Password: regePass,
                };

                if (userId == "") {
                  //! save
                  var res = await addDoc(
                    collection(firestore, "User"),
                    product
                  );
                  // console.log(res.id);
                  clear();
                } else {
                  //! update
                  updateDoc(doc(firestore, "User", id), user);
                  clear();
                }
              }

              // Store additional user data in Firestore
              // await setDoc(doc(firestore, "users", user.uid), {
              // name: regeName.value,
              // email: regeEmail.value,
              // phone: regePhone.value,
              // });

              // Create user document in Firestore
              // const userData = {
              // name: regeName.value || "", // Use an empty string if regeName is undefined
              // email: regeEmail.value,
              // phone: regePhone.value || "", // Use an empty string if regePhone is undefined
              // };

              // await setDoc(doc(Firestore, "users", user.uid), userData);

              console.log("Account created successfully", user);

              // Reset form fields
              function clear() {
                document.getElementById("regeEmail").value = "";
                document.getElementById("regePass").value = "";
                document.getElementById("regeName").value = "";
                document.getElementById("regePhone").value = "";
              }

              //Delete User
                window.deleteUser = deleteUser;
                document.addEventListener("DOMContentLoaded", function () {
                   async function deleteUser(userId) {
                     var isAgree = confirm("Are you sure you want to delete ?");
                     if (isAgree) {
                       try {
                         await deleteDoc(doc(firestore, "User", userId));
                       } catch (error) {
                         console.log(error);
                       }
                     }
                   }
                });
             

              //update User
              window.updateUser = updateUser;
              function updateUser(
                userId,
                regeName,
                regeEmail,
                regePhone,
                regePass
              ) {
                document.getElementById("id").value = userId;
                document.getElementById("regeName").value = regeName;
                document.getElementById("regeEmail").value = regeEmail;
                document.getElementById("regePhone").value = regePhone;
                document.getElementById("regePass").value = regePass;
              }

              //using location
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  location.assign("../login.html");
                }
              });
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
                export {
                  createAccount,
                  signIn,
                  saveUsers,
                  deleteUser,
                  updateUser,
                };
    


                const container = document.getElementById('container');
                const registerBtn = document.getElementById('register');
                const loginBtn = document.getElementById('login');

                registerBtn.addEventListener('click', () => {
                    container.classList.add("active");
                });

                loginBtn.addEventListener('click', () => {
                    container.classList.remove("active");
                });