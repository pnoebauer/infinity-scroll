const imageContainer = document.getElementById('image-container');

// Unsplash API
const count = 10;
const apiKey = 'f8SOZoqQ5RDjP2ht-2tzENmSAeagyW03DZcXsGsJPkE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;      //check if all images from the photosArray were loaded
let imagesLoaded = 0;   //number of images that were loaded from the current photosArray
let totalImages = 0;    //length of the photosArray
let photosArray = [];   //contains all photos objects within an array returned from the Unsplash API

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; //loader will only be shown at the very first API fetch request
    }
}

// Function to set all attributes for a given DOM element
function setAttributes(element, attributes) {
    // Loop through arttributes object
    for(const key in attributes) {
        // Set key and value of attribute
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
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
        // Event listener for image to show when is finished loading
        imageTag.addEventListener('load', imageLoaded);
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

// Check to see if scrolling near bottom of page occurs and then load more photos
window.addEventListener('scroll', () => {
    // Load when the scroll is 1000px from the bottom of the content
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        // Only load more images once the prior image download has finished
        if(ready) {
            ready = false;
            getPhotos();
        }
    }
})

//On load
getPhotos();