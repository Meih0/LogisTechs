// formHandler.js
console.log("formHandler.js is loaded and running");
// Import Firestore instance from firebaseConfig.js
import { db } from './firebaseConfig.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
// Declare global variables for latitude and longitude
window.latitude = "N/A";
window.longitude = "N/A";
// Function to handle form submission and fetch data from Firestore
async function showOutput(event) {
    event.preventDefault(); // Prevent form from submitting
    console.log("Form submitted"); // Log when form is submitted
    const customerNumber = document.getElementById('customerNumber').value;
    console.log("Customer Number Input: ", customerNumber);
    try {
        const docRef = doc(db, "Customers", customerNumber);
        console.log("Document Reference: ", docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document Data: ", docSnap.data());
            const data = docSnap.data();
            var lat = latitude;
            var lon = longitude;
            window.latitude = data.latitude || "N/A";
            window.longitude = data.longitude || "N/A";
            // Update the display for latitude and longitude
            document.getElementById('latlong-display').innerHTML = `
                <strong>Latitude:</strong> ${window.latitude} <br>
                <strong>Longitude:</strong> ${window.longitude}
            `;
            
            console.log("FORM",latitude, longitude);
            // After updating the latitude and longitude, reload Google Maps
            loadGoogleMaps();  // Call this after you get the coordinates
        } else {
            console.log("No document found for customer number: ", customerNumber);
            document.getElementById('latlong-display').textContent = "No customer found with that number.";
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
        document.getElementById('latlong-display').textContent = "Error retrieving customer data. Check the console for details.";
    }
}


// Attach showOutput to the window object so it's accessible globally
window.showOutput = showOutput;