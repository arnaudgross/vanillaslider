/* --- VARIABLES --- */

const buttonToggle = document.querySelector('button#toggle-carousel');
const buttonPrevious = document.querySelector('button#previous-photo');
const buttonNext = document.querySelector('button#next-photo');
const buttonRandom = document.querySelector('button#random-photo');
const buttonFullscreen = document.querySelector('button#toggle-fullscreen');

const imgList = document.querySelectorAll('.diaporama > img');
const thumbsList = document.querySelectorAll('.thumbnails > img');
let imgCurrentKey = 0;

let isCarouselPlaying = isCarouselRandom = isCarouselFullscreen = false;

let carouselTimer;

/* --- FUNCTIONS --- */

function selectImage(imgKey)
{
    for(img of imgList)
    {
        img.classList.remove('visible');
    }

    for(thumb of thumbsList)
    {
        thumb.classList.remove('selected');
    }

    imgList[imgKey].classList.add('visible');
    thumbsList[imgKey].classList.add('selected');
}

function getRandomImage()
{
    let keysList = []

    // Remove current image from the list
    for(let k in Object.keys(imgList))
    {
        if(k != imgCurrentKey)
        {
            keysList.push(k);
        }
    }

    // Return a random key
    return keysList[Math.floor(Math.random() * keysList.length)];
}

function nextImage()
{
    // random image if needed
    if(isCarouselRandom)
    {
        imgCurrentKey = getRandomImage();
    }
    // back to first element if it's the last image
    else if(imgCurrentKey == (imgList.length - 1))
    {
        imgCurrentKey = 0;
    }
    // go to next image otherwise
    else
    {
        imgCurrentKey++;
    }

    selectImage(imgCurrentKey);
}

function previousImage()
{
    // random image if needed
    if(isCarouselRandom)
    {
        imgCurrentKey = getRandomImage();
    }
    // jump to last image if it's the first one
    else if(imgCurrentKey == 0)
    {
        imgCurrentKey = imgList.length - 1;
    }
    // previous image otherwise
    else
    {
        imgCurrentKey--;
    }

    selectImage(imgCurrentKey);
}

function carouselToggle()
{
    // Stop carousel
    if(isCarouselPlaying)
    {
        isCarouselPlaying = false;
        buttonToggle.classList.remove('fa-pause');
        buttonToggle.classList.add('fa-play');

        window.clearInterval(carouselTimer);
    }
    // Start carousel
    else
    {
        isCarouselPlaying = true;
        buttonToggle.classList.add('fa-pause');
        buttonToggle.classList.remove('fa-play');

        carouselTimer = setInterval(function()
        {
            nextImage();
        }, 1000);
    }
}

function carouselRandomize()
{
    // Stop random
    if(isCarouselRandom)
    {
        isCarouselRandom = false;
        buttonRandom.classList.add('fa-random');
        buttonRandom.classList.remove('fa-long-arrow-right');
    }
    // Start random
    else
    {
        isCarouselRandom = true;
        buttonRandom.classList.remove('fa-random');
        buttonRandom.classList.add('fa-long-arrow-right');
    }
}

function carouselKeyNavigation(event)
{
    switch(event.which)
    {
        // right key
        case 39:
            event.preventDefault();
            nextImage();
            break;

        // left key
        case 37:
            event.preventDefault();
            previousImage();
            break;

        // space bar
        case 32:
            event.preventDefault();
            carouselToggle();
            break;

        // exit key
        case 32:
            event.preventDefault();
            carouselToggle();
            break;
    }
}

function toggleFullScreen()
{
    // Stop fullscreen
    if(isCarouselFullscreen)
    {
        isCarouselFullscreen = false;
        buttonFullscreen.classList.add('fa-expand');
        buttonFullscreen.classList.remove('fa-compress');

        document.querySelector('.diaporama').exitFullscreen();
    }
    // Start fullscreen
    else
    {
        isCarouselFullscreen = true;
        buttonFullscreen.classList.remove('fa-expand');
        buttonFullscreen.classList.add('fa-compress');

        document.querySelector('.diaporama').requestFullscreen();
    }
}

function selectThumb()
{
    selectImage([].indexOf.call(thumbsList, this));
}

/* --- LISTENERS --- */

buttonToggle.addEventListener('click', carouselToggle);
buttonNext.addEventListener('click', nextImage);
buttonPrevious.addEventListener('click', previousImage);
buttonRandom.addEventListener('click', carouselRandomize);
buttonFullscreen.addEventListener('click', toggleFullScreen);

document.addEventListener('keydown', carouselKeyNavigation);

for(thumb of thumbsList)
{
    thumb.addEventListener('click', selectThumb);
}