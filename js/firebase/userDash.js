import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  // query,
  // getDocs,
  // where,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

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
// Initialize Firestore
const firestore = getFirestore(app);
// Initialize storage
const storage = getStorage(app);



// import { showUsers, deleteUser, updateUser } from "./firebaseConfig";

// to fetch data in front side
function fetchUsers() {
  onSnapshot(collection(firestore, "User"), function (snapshot) {
    var users = [];
    for (const doc of snapshot.docs) {
      users.push({ id: doc.id, ...doc.data() });
    }
  showUsers(users);
    
  });
}
fetchUsers();

//showUser Function

function showUsers(users) {
  var tbody = document.getElementById("userTbody");
  tbody.innerHTML = "";
  for (const user of users) {
    tbody.innerHTML += `
                          <tr>
                              <td>${user.id}</td>
                              <td>${user.Name}</td>
                              <td>${user.Email}</td>
                              <td>${user.phone}</td>
                               <td><img src="${user.ImageURL}" alt="Product Image" width="70" ></td>
                              <td>${user.Country}</td>                             
                              <td><button class="btn btn-danger" onClick="deleteUser('${user.id}')">Delete</button></td>
                              <td><button class="btn btn-success" onClick="updatetUser('${user.id}', '${user.Name}', '${user.Email}', '${user.phone}', '${user.Country}', '${user.ImageURL}')">Edit</button></td>
                               
                          </tr>
                      `;
     
  }
}

// Delete user function
        window.deleteUser = deleteUser
        async function deleteUser(id) {
            var isAgree = confirm("Are you sure you want to delete ?")
            if (isAgree) {
                try {
                  await deleteDoc(doc(firestore, 'User', id))
                } catch (error) {
                    console.log(error);
                }
          }
          
        }

      // Update user function (make form visible and pre-fill fields)
/// Update user function (make form visible and pre-fill fields)
window.updatetUser = updatetUser;
function updatetUser(id, name, email, phone, country, imageURL) {
  // Show the modal
  document.getElementById("modalWrapper").style.display = "flex";
  document.body.classList.add("modal-active");
  // document.getElementById("main").style.display = "none";
  // document.getElementById("sideNav").style.display = "none";

  // Pre-fill the form with user data
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone; // Fix: phone (lowercase "p")

  document.getElementById("country").value = country;
  document.getElementById("imgPreview").src = imageURL;
}

// Handle form submission
document.getElementById("updateUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Get updated values from the form
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const country = document.getElementById("country").value;
  
  // Handle the image upload if a new image is selected
  const fileInput = document.getElementById("fileInput").files[0];
  let imageURL = document.getElementById("imgPreview").src; // Default to current image
  
  try {
    // If a new image is uploaded, upload it to Firebase Storage
    if (fileInput) {
      const imageRef = ref(storage, `users/${id}/${fileInput.name}`);
      await uploadBytes(imageRef, fileInput);
      imageURL = await getDownloadURL(imageRef);
    }

    // Update the user document in Firestore
    const userDocRef = doc(firestore, "User", id);
    await updateDoc(userDocRef, {
      Name: name,
      Email: email,
      phone: phone,
      Country: country,
      ImageURL: imageURL // Update the image URL if changed
    });
    
    alert("User updated successfully!");

    // Hide the modal and reset the form
    document.getElementById("modalWrapper").style.display = "none";
    document.body.classList.remove("modal-active");
    
    // Optionally, refresh the users list to show updated data
    // fetchUsers();
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update user.");
  }
});


export { deleteUser, updatetUser };
