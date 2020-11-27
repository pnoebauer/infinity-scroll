const imageContainer = document.getElementById('image-container');

// Unsplash API
const count = 10;
const apiKey = 'f8SOZoqQ5RDjP2ht-2tzENmSAeagyW03DZcXsGsJPkE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray = [];

// Function to set all attributes for a given DOM element
function setAttributes(element, attributes) {
    // Loop through arttributes object
    for(const key in attributes) {
        // Set key and value of attribute
        element.setAttribute(key, attributes[key]);
        // console.log(key, attributes[key]);
    }
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    // Loop through returned photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const anchorTag = document.createElement('a');
        setAttributes(anchorTag, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const imageTag = document.createElement('img');
        setAttributes(imageTag, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
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