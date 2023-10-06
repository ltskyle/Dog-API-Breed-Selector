const apiUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', function () {
    $('#breedSelect').select2({
        placeholder: 'Select dog breed(s)',
        allowClear: true,
    })
    fetchBreeds()
})

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

async function fetchBreeds() {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const breeds = data.message
    const select = document.getElementById('breedSelect')
    for (const breed in breeds) {
        const option = document.createElement('option')
        option.value = breed
        option.textContent = capitalizeFirstLetter(breed)
        select.appendChild(option)
    }
}

function createBreedSection(breed, imageUrls) {
    const breedSection = document.createElement('div')
    breedSection.className = 'breed-section'

    const breedHeader = document.createElement('h3')
    breedHeader.textContent = capitalizeFirstLetter(breed)
    breedSection.appendChild(breedHeader)

    const breedContainer = document.createElement('div')
    breedContainer.className = 'breed-container'
    imageUrls.forEach((imageUrl) => {
        const img = document.createElement('img')
        img.src = imageUrl
        breedContainer.appendChild(img)
    })
    breedSection.appendChild(breedContainer)

    return breedSection
}

async function loadImages() {
    const selectedBreeds = Array.from($('#breedSelect').select2('data')).map(
        (data) => data.id
    )
    const gallery = document.getElementById('imageGallery')
    gallery.innerHTML = ''
    for (const breed of selectedBreeds) {
        const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images/random/5`
        )
        const data = await response.json()
        gallery.appendChild(createBreedSection(breed, data.message))
    }
}

async function loadRandomBreedImages() {
    const breedOptions = Array.from(
        document.getElementById('breedSelect').options
    ).map((opt) => opt.value)
    const randomBreed =
        breedOptions[Math.floor(Math.random() * breedOptions.length)]
    const gallery = document.getElementById('imageGallery')
    gallery.innerHTML = ''
    const response = await fetch(
        `https://dog.ceo/api/breed/${randomBreed}/images/random/5`
    )
    const data = await response.json()
    gallery.appendChild(createBreedSection(randomBreed, data.message))
}
