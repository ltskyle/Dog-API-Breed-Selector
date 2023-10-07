const apiUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', function () {
    $('#breedSelect').select2({
        placeholder: 'Enter breed(s)',
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
        // Check if breed has sub-breeds
        if (breeds[breed].length > 0) {
            for (const subBreed of breeds[breed]) {
                const option = document.createElement('option')
                option.value = `${breed}-${subBreed}` // e.g., "bulldog-boston"
                option.textContent = capitalizeFirstLetter(
                    `${breed} ${subBreed}`
                )
                select.appendChild(option)
            }
        } else {
            // If no sub-breeds, simply add the breed
            const option = document.createElement('option')
            option.value = breed
            option.textContent = capitalizeFirstLetter(breed)
            select.appendChild(option)
        }
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
        const [mainBreed, subBreed] = breed.split('-')
        let response

        if (subBreed) {
            response = await fetch(
                `https://dog.ceo/api/breed/${mainBreed}/${subBreed}/images/random/5`
            )
        } else {
            response = await fetch(
                `https://dog.ceo/api/breed/${mainBreed}/images/random/5`
            )
        }

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

    const [mainBreed, subBreed] = randomBreed.split('-')
    let response

    if (subBreed) {
        response = await fetch(
            `https://dog.ceo/api/breed/${mainBreed}/${subBreed}/images/random/5`
        )
    } else {
        response = await fetch(
            `https://dog.ceo/api/breed/${mainBreed}/images/random/5`
        )
    }

    const data = await response.json()
    gallery.appendChild(createBreedSection(randomBreed, data.message))
}
