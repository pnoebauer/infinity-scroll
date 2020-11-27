const imageContainer = document.getElementById('image-container');



// Unsplash API
const count = 10;
const apiKey = 'f8SOZoqQ5RDjP2ht-2tzENmSAeagyW03DZcXsGsJPkE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray = [];

// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    // Loop through returned photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const anchorTag = document.createElement('a');
        anchorTag.setAttribute('href', photo.links.html);
        anchorTag.setAttribute('target', '_blank');
        // Create <img> for photo
        const imageTag = document.createElement('img');
        imageTag.setAttribute('src', photo.urls.regular);
        imageTag.setAttribute('alt', photo.alt_description);
        imageTag.setAttribute('title', photo.alt_description);
        // Put <img> inside <a>, then put both inside the imageContainer
        anchorTag.appendChild(imageTag);
        imageContainer.appendChild(anchorTag);
    })
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

//On load
getPhotos();