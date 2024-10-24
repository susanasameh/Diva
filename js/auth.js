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
    


             

//--------------------------------------
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
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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
const auth = getAuth(app);
const firestore = getFirestore(app);

// Prevent default form submission to avoid page reload
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  createAccount();
});

// Client-side validation functions
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

// Create account function
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
    const userCredential = await createUser WithEmailAndPassword(auth, regeEmail, regePass);
    const user = userCredential.user;

    await updateProfile(user, { displayName: regeName });

    await saveUser Data(user.uid, regeName, regeEmail, regePhone);
    console.log("Account created successfully", user);
    clearForm();
  } catch (error) {
    console.error("Error creating account:", error.message);
  }
}

// Save user data to Firestore
async function saveUser Data(userId, name, email, phone) {
  const userData = {
    Name: name,
    Email: email,
    Phone: phone,
  };
  await addDoc(collection(firestore, "User "), userData);
}

// Clear form fields
function clearForm() {
  document.getElementById("regeEmail").value = "";
  document.getElementById("regePass").value = "";
  document.getElementById("regeName").value = "";
  document.getElementById("regePhone").value = "";
}

// Sign in function
document.getElementById('signinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  signIn();
});

async function signIn() {
  const signEmail = document.getElementById("signEmail").value;
  const signPass = document.getElementById("signPass").value;

  try {
    await signInWithEmail AndPassword(auth, signEmail, signPass);
    console.log("Signed in successfully");
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
}

// Delete user function
async function deleteUser(userId) {
  var isAgree = confirm("Are you sure you want to delete ?");
  if (isAgree) {
    try {
      await deleteDoc(doc(firestore, "User ", userId));
    } catch (error) {
      console.log(error);
    }
  }
}

// Update user function
async function updateUser(userId, name, email, phone) {
  const userData = {
    Name: name,
    Email: email,
    Phone: phone,
  };
  await updateDoc(doc(firestore, "User ", userId), userData);
}

// Image upload functionality
const imageInputContainer = document.querySelector('.image-input-container');
const defaultPictureRadios = document.querySelectorAll('input[name="profile-picture"][type="radio"]');
const uploadPictureInput = document.querySelector('input[type="file"][name="profile-picture"]');
const submitButton = document.querySelector('#submit-picture');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const selectedPicture = getSelectedPicture();
  if (selectedPicture) {
    storePictureInFirestore(selectedPicture);
  } else {
    alert('Please select a picture ');
  }
});

function getSelectedPicture() {
  for (const radio of defaultPictureRadios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  if (uploadPictureInput.files.length > 0) {
    return uploadPictureInput.files[0];
  }
  return null;
}

async function storePictureInFirestore(picture) {
  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  await db.collection('users').doc(userId).set({
    profilePicture: picture,
  }, { merge: true });
  console.log('Profile picture updated successfully!');
}

// Toggle container functionality
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
  container.classList.remove("active");
});


//----------------------------------------------
const imageInput = document.getElementById('imageInput');

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const fileType = file.type;
  const fileSize = file.size;

  if (!fileType.match('image.*')) {
    alert('Only image files are allowed');
    return;
  }

  if (fileSize > 1024 * 1024 * 5) {
    alert('Image file size should not exceed 5MB');
    return;
  }

  // Image input is valid, proceed to upload and store in Firestore
  uploadImageToFirestore(file);
});

async function uploadImageToFirestore(file) {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`images/${file.name}`);
  const uploadTask = imageRef.put(file);

  uploadTask.on('state_changed', (snapshot) => {
    // Handle upload progress
  }, (error) => {
    // Handle upload error
  }, async () => {
    // Handle successful upload
    const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();

    // Store image URL in Firestore along with other user data
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      imageUrl: imageUrl,
    };

    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    await db.collection('users').doc(userId).set(userData);
  });
}