console.log("mapScript.js is loaded");

// Access the global variables
console.log('LAT', window.latitude);  // This should output the latitude
console.log('LONG', window.longitude);  // This should output the longitude

if (typeof googleMapsApiKey === 'undefined') {
    console.error("googleMapsApiKey is not defined. Ensure apiKeys.js is loaded correctly.");
} else {
    console.log("Google Maps API key found:", googleMapsApiKey);
}

// Load Google Maps function
function loadGoogleMaps() {
    console.log("Loading Google Maps with API key:", googleMapsApiKey);
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
        existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    script.onerror = function () {
        console.error("Failed to load the Google Maps script.");
    };
}

// Initialize the Google Map - make sure this is globally accessible by attaching it to the window object
window.initMap = function() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 21.433813070380037, lng: 39.21710404232605 }  // Default location
    });
    
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    // Use the global variables for latitude and longitude
    const origin = { lat: 21.434927121763877, lng: 39.21677542419057 };  // Example origin
    const destination = { lat: parseFloat(window.latitude), lng: parseFloat(window.longitude) };

    // Check if lat/lng values are valid
    if (isNaN(destination.lat) || isNaN(destination.lng)) {
        console.error("Invalid latitude or longitude values. Map cannot be rendered.");
        return;
    }

    const request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: new Date(),
            trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    directionsService.route(request, (response, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            console.error('Directions request failed due to ' + status);
        }
    });
};

// Add a form submission listener to trigger Google Maps update
document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("Form submitted");

    // Wait 1 second before loading the Google Map to allow the latitude and longitude to be set
    setTimeout(function() {
        console.log('LAT:', window.latitude);  // This should output the latitude
        console.log('LONG:', window.longitude);  // This should output the longitude
        
        console.log("Form submitted, reloading Google Maps...");
        loadGoogleMaps();
    }, 1000);  // 1 second delay
});
