


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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (!validateEmail(email)) {
        document.getElementById("wrongEmail").textContent = "Invalid email format";
        document.getElementById("wrongEmail").style.display = "block";
        return;
    }

    if (!validatePassword(password)) {
        document.getElementById("wrongPass").textContent = "Password must be at least 8 characters long";
        document.getElementById("wrongPass").style.display = "block";
        return;
    }

    if (phone && !validatePhone(phone)) {
        document.getElementById("wrongPhone").textContent = "Invalid phone number format";
        document.getElementById("wrongPhone").style.display = "block";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name
        });

        const userData = {
            name: name,
            email: email,
            phone: phone
        };

        await setDoc(doc(firestore, "users", user.uid), userData);

        console.log("Account created successfully", user);

        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";

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
function updateUser(userId, name, email, phone, password) {
  document.getElementById("id").value = userId;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("password").value = password;
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


  