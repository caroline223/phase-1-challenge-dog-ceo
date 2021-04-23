console.log('%c HI', 'color: firebrick')

let newDogArr = [];
        
function fetchImages () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl) 
    .then(function(response){
        return response.json(); //response.json() is also considered an asychronous function that also returns a promise
    })
    .then(function(json) {
        return developImg(json.message)
    });
}

//Iterate over array of image urls
//for each url, create an image element
//set the source of the image equal to the url
//append the image to the page

function developImg(images) {
   const imgAdd = document.getElementById('dog-image-container')
    images.forEach(function(image) {
        const newImg = document.createElement("img")
        newImg.src = image
        newImg.width = 300
        newImg. height = 300
        imgAdd.appendChild(newImg) //append the image to the page 
    });  
}


function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        return developBreeds(json);
    })
}

function developBreeds(breeds) {
    const imgBreed = document.getElementById('dog-breeds')
    
    breedTags = Object.keys(breeds.message)
    breedTags.forEach(breed => {
      newDogArr.push(breed);
      const liTag = document.createElement('li')
      liTag.innerText = breed
      imgBreed.appendChild(liTag)
    });
}

function filterDogs(letter) {
    const imgBreed = document.getElementById('dog-breeds')
    
    let childBreed = imgBreed.lastElementChild;
    while(childBreed) {
        imgBreed.removeChild(childBreed)
        childBreed = imgBreed.lastElementChild;
    }

    let filter = newDogArr.filter(breed => breed.startsWith(letter))
    filter.forEach(breed => {
        const liTag = document.createElement('li')
        liTag.innerText = breed
        imgBreed.appendChild(liTag)
    })
}

document.addEventListener('DOMContentLoaded', function(){
   
    const imgBreed = document.getElementById('dog-breeds');
    const ulChild = imgBreed.children;
    const select = document.getElementById('breed-dropdown');

    select.addEventListener('change', function(event) {
        filterDogs(event.target.value);
    })

    imgBreed.addEventListener('click', function(event) {
        event.target.style.color = 'orange';
    });
   
   
   
    fetchImages();
    fetchBreeds();
})

//if the code references the DOM, you want to be sure that the DOM is loaded before execution