console.log("mapScript.js is loaded");

if (typeof googleMapsApiKey === 'undefined') {
    console.error("googleMapsApiKey is not defined. Ensure apiKeys.js is loaded correctly.");
} else {
    console.log("Google Maps API key found:", googleMapsApiKey);
    loadGoogleMaps();
}

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

    script.onerror = function() {
        console.error("Failed to load the Google Maps script.");
    };
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 37.7749, lng: -122.4194 } // Center map on San Francisco
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    const origin = { lat: 37.419734, lng: -122.0827784 };
    const destination = { lat: 37.417670, lng: -122.079595 };

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
}

// Event listener for form submission
document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted, reloading Google Maps...");
    loadGoogleMaps();
});
