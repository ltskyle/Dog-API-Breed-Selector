// Base API URL to fetch list of all dog breeds
const apiUrl = 'https://dog.ceo/api/breeds/list/all'

// Event listener to run when the document content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the Select2 dropdown enhancement library on breed selector
    $('#breedSelect').select2({
        placeholder: 'Select dog breed(s)',
        allowClear: true,
    })
    // Fetch and populate the breeds into the dropdown
    fetchBreeds()
})

/**
 * Fetch the list of all dog breeds and populate the dropdown options.
 */
function fetchBreeds() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const breeds = data.message
            const select = document.getElementById('breedSelect')
            for (const breed in breeds) {
                const option = document.createElement('option')
                option.value = breed
                // Set the display text with the first letter capitalized
                option.textContent =
                    breed.charAt(0).toUpperCase() + breed.slice(1)
                select.appendChild(option)
            }
        })
}

/**
 * Load images for the selected dog breeds.
 */
function loadImages() {
    // Get the selected breeds from the dropdown
    const selectedBreeds = Array.from($('#breedSelect').select2('data')).map(
        (data) => data.id
    )
    const gallery = document.getElementById('imageGallery')
    gallery.innerHTML = '' // Clear any existing images in the gallery

    // For each selected breed, fetch and display their images
    selectedBreeds.forEach((breed) => {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)
            .then((response) => response.json())
            .then((data) => {
                const breedSection = document.createElement('div')
                breedSection.className = 'breed-section'

                // Add breed name above the images
                const breedHeader = document.createElement('h3')
                breedHeader.textContent =
                    breed.charAt(0).toUpperCase() + breed.slice(1)
                gallery.appendChild(breedHeader)

                // Create a container for the breed images
                const breedContainer = document.createElement('div')
                breedContainer.className = 'breed-container'

                // Add each image to the container
                data.message.forEach((imageUrl) => {
                    const img = document.createElement('img')
                    img.src = imageUrl
                    breedContainer.appendChild(img)
                })

                breedSection.appendChild(breedContainer)
                gallery.appendChild(breedSection)
            })
    })
}

/**
 * Load images for a randomly selected dog breed.
 */
function loadRandomBreedImages() {
    // Get all available breed options from the dropdown
    const breedOptions = Array.from(
        document.getElementById('breedSelect').options
    ).map((opt) => opt.value)

    // Randomly select one breed
    const randomBreed =
        breedOptions[Math.floor(Math.random() * breedOptions.length)]

    const gallery = document.getElementById('imageGallery')
    gallery.innerHTML = '' // Clear any existing images

    // Fetch and display images for the randomly selected breed
    fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random/5`)
        .then((response) => response.json())
        .then((data) => {
            const breedSection = document.createElement('div')
            breedSection.className = 'breed-section'

            // Add breed name above the images
            const breedHeader = document.createElement('h3')
            breedHeader.textContent =
                randomBreed.charAt(0).toUpperCase() + randomBreed.slice(1)
            gallery.appendChild(breedHeader)

            // Create a container for the breed images
            const breedContainer = document.createElement('div')
            breedContainer.className = 'breed-container'

            // Add each image to the container
            data.message.forEach((imageUrl) => {
                const img = document.createElement('img')
                img.src = imageUrl
                breedContainer.appendChild(img)
            })

            breedSection.appendChild(breedContainer)
            gallery.appendChild(breedSection)
        })
}
