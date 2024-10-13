


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
           
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
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
// Initialize Authentication
const auth = getAuth(app);
// Initialize Firestore
const firestore = getFirestore(app);

// Validation functions
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

// Create Account function
async function createAccount(e) {
    e.preventDefault();

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
        const userCredential = await createUserWithEmailAndPassword(auth, regeEmail, regePass);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: regeName
        });

        const userData = {
            name: regeName,
            email: regeEmail,
            phone: regePhone
        };

        await setDoc(doc(firestore, "users", user.uid), userData);

        console.log("Account created successfully", user);

        document.getElementById("regeEmail").value = "";
        document.getElementById("regePass").value = "";
        document.getElementById("regeName").value = "";
        document.getElementById("regePhone").value = "";

        onAuthStateChanged(auth, (user) => {
            if (user) {
                location.assign('../login.html');
            }
        });
    } catch (error) {
        console.error("Error creating account:", error.message);
    }
}

// Sign In function
async function signIn(e) {
    e.preventDefault();

    const signEmail = document.getElementById("signEmail").value;
    const signPass = document.getElementById("signPass").value;

    try {
        await signInWithEmailAndPassword(auth, signEmail, signPass);
        console.log("Signed in successfully");
    } catch (error) {
        console.error("Error signing in:", error.message);
    }
}

// Delete User function
async function deleteUser(userId) {
    var isAgree = confirm("Are you sure you want to delete ?");
    if (isAgree) {
        try {
            await deleteDoc(doc(firestore, "users", userId));
        } catch (error) {
            console.log(error);
        }
    }
}

// Update User function
function updateUser(userId, regeName, regeEmail, regePhone, regePass) {
  document.getElementById("id").value = userId;
  document.getElementById("regeName").value = regeName;
  document.getElementById("regeEmail").value = regeEmail;
  document.getElementById("regePhone").value = regePhone;
  document.getElementById("regePass").value = regePass;
}

// Set up event listeners for the forms
document.getElementById("signupForm").addEventListener("submit", createAccount);
document.getElementById("signinForm").addEventListener("submit", signIn);

// Handle UI toggling for login and registration forms
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Export the functions for use in other modules
export { createAccount, signIn, deleteUser, updateUser };


  