// Import the functions you need from the SDKs you need
import {
  initializeApp,
  setLogLevel
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

setLogLevel("debug");


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
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
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB62d8FtJeTUfcbFCs0HhzLMgf32CD82yk",
  authDomain: "diva-cd2d3.firebaseapp.com",
  projectId: "diva-cd2d3",
  storageBucket: "diva-cd2d3.appspot.com",
  messagingSenderId: "752108842622",
  appId: "1:752108842622:web:1fa4612b85904fcd1e722f",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Authentication
const auth = getAuth(app);
// Initialize Firestore
const firestore = getFirestore(app);

const storage = getStorage(app);

// File upload functionality
const imageInput = document.getElementById("image");
const uploadImageBtn = document.getElementById("uploadImage");

uploadImageBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];
  if (file) {
    // const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const metadata = { contentType: file.type };
    var storageRef = ref(storage, `uploaded_images/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(storageRef);
    const imgPrview = document.getElementById("profile-picture");
    imgPrview.src = imageURL;
  }

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      document.querySelector(".progress-bar").textContent = `${progress}%`;
    },
    (error) => {
      console.error("Error uploading file:", error.message);
      document.getElementById("wrongImage").textContent =
        "Failed to upload image";
      document.getElementById("wrongImage").style.display = "block";
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        await storeImageUrlInFirestore(downloadURL);
      } catch (error) {
        console.error("Error getting download URL:", error.message);
        document.getElementById("wrongImage").textContent =
          "Failed to retrieve image URL";
        document.getElementById("wrongImage").style.display = "block";
      }
    }
  );
}
  // });
);

// function updateImagePreview(file) {
//   const reader = new FileReader();
//   reader.onload = (event) => {
//     const imgElement = document.createElement("img");
//     imgElement.src = event.target.result;
//     document.body.appendChild(imgElement);
//   };
//   reader.readAsDataURL(file);
// }

async function storeImageUrlInFirestore(url) {
  try {
    const userId =
      auth.currentUser?.uid || document.getElementById("userId").value;
    if (!userId) {
      throw new Error("User ID is not available");
    }
    const userDataRef = doc(firestore, `users/${userId}`);
    await updateDoc(userDataRef, {
      imageUrl: url,
    });

    // Update the profile picture display
    // const profilePicture = document.getElementById("profile-picture");
    // if (profilePicture) {
    //   profilePicture.src = url;
    // }

    // Update the preview if an image file is selected
    const imageInput = document.getElementById("image");
    if (imageInput.files.length > 0) {
      updateImagePreview(imageInput.files[0]);
    }

    console.log("Image URL stored successfully");
    document.getElementById("wrongImage").textContent = "";
    document.getElementById("wrongImage").style.display = "none";
  } catch (error) {
      console.error("Error storing image URL:", error.message);
      document.getElementById("wrongImage").textContent =
        "Failed to store image URL";
      document.getElementById("wrongImage").style.display = "block";

      // try {
      //   const userId = auth.currentUser.uid;
      //   if (!userId) {
      //     throw new Error("User ID is not available");
      //   }

      //   const userDataRef = doc(firestore, "users", userId);

      //   await updateDoc(userDataRef, {
      //     imageUrl: url,
      //   });

      //   console.log("Image URL stored successfully");
      //   document.getElementById("wrongImage").textContent = "";
      //   document.getElementById("wrongImage").style.display = "none";
      // } catch (error) {
      //   console.error("Error storing image URL:", error.message);
      //   document.getElementById("wrongImage").textContent =
      //     "Failed to store image URL";
      //   document.getElementById("wrongImage").style.display = "block";
    }
  }


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


  // List of country names based on ISO 3166-1 alpha-2 standard
  const COUNTRY_LIST = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Côte d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Vietnam",
    "Yemen",
  ];
  function validateCountry(country) {
  const countryName = country.trim().toLowerCase();
  return COUNTRY_LIST.includes(countryName);
}
// document.getElementById("signupForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   await createAccount(e);
// });

async function createAccount(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!validateEmail(email)) {
    document.getElementById("wrongEmail").textContent = "Invalid email format";
    document.getElementById("wrongEmail").style.display = "block";
    return;
  }

  if (!validatePassword(password)) {
    document.getElementById("wrongPass").textContent =
      "Password must be at least 8 characters long";
    document.getElementById("wrongPass").style.display = "block";
    return;
  }

  if (phone && !validatePhone(phone)) {
    document.getElementById("wrongPhone").textContent =
      "Invalid phone number format";
    document.getElementById("wrongPhone").style.display = "block";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    // Create a batch
    const batch = writeBatch(firestore);

    // Add the user document to the batch
    const userRef = doc(firestore, "users", user.uid);
    batch.set(userRef, {
      name: name,
      email: email,
      phone: phone,
      imageUrl: imageUrl || "",
    });

    // Commit the batch
    await batch.commit();

    console.log("Account created successfully", user);

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";

    onAuthStateChanged(auth, (user) => {
      if (user) {
        location.assign("../login.html");
      }
    });
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      document.getElementById("wrongEmail").textContent =
        "Email already in use";
    } else if (error.code === "auth/weak-password") {
      document.getElementById("wrongPass").textContent = "Password too weak";
    } else if (error.code === "permission-denied") {
      document.getElementById("wrongEmail").textContent =
        "Missing or insufficient permissions";
    } else {
      document.getElementById("wrongEmail").textContent = error.message;
    }
    document.getElementById("wrongEmail").style.display = "block";
  }
}

// Make sure this function is defined earlier in your script
async function commitBatchWithRetry(batch) {
  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await batch.commit();
      console.log("Batch committed successfully");
      return true;
    } catch (error) {
      console.error(`Error committing batch: ${error.message}`);
      retries++;
      if (retries >= MAX_RETRIES) {
        throw new Error(`Failed to commit batch after ${MAX_RETRIES} attempts`);
      }
      // Wait for a short period before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
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
    location.assign("../admin/userDash.html");
  } catch (error) {
    console.error("Error signing in:", error.message);
    document.getElementById("wrongSignEmail").textContent = error.message;
    document.getElementById("wrongSignEmail").style.display = "block";
  }
}

// Delete User function
async function deleteUser(userId) {
  var isAgree = confirm("Are you sure you want to delete ?");
  if (isAgree) {
    try {
      await deleteDoc(doc(firestore, "users", userId));
      console.log("User deleted successfully");
      location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user");
    }
  }
}

// Update User function
function updateUser(userId, name, email, phone, country, password) {
  document.getElementById("id").value = userId;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("country").value = country;
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
