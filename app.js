'user strict';

// here i make the arryy to save the product inside and make it global
let products = [];

// making constructor with function
function Mall(name, source) {
    this.name = name;
    this.source = source;
    this.vote = 0;
    products.push(this);

}

new Mall('bag', 'img/bag.jpg');
new Mall('banana', 'img/banana.jpg');
new Mall('bathroom', 'img/bathroom.jpg');
new Mall('boots', 'img/boots.jpg');
new Mall('breakfast', 'img/breakfast.jpg');
new Mall('bubblegum', 'img/bubblegum.jpg');
new Mall('chair', 'img/chair.jpg');
new Mall('cthulhu', 'img/cthulhu.jpg');
new Mall('dog-duck', 'img/dog-duck.jpg');
new Mall('dragon', 'img/dragon.jpg');
new Mall('pen', 'img/pen.jpg');
new Mall('pet-sweep', 'img/pet-sweep.jpg');
new Mall('scissors', 'img/scissors.jpg');
new Mall('shark', 'img/shark.jpg');
new Mall('sweep', 'img/sweep.png');
new Mall('tauntaun', 'img/tauntaun.jpg');
new Mall('unicorn', 'img/unicorn.jpg');
new Mall('water-can', 'img/water-can.jpg');
new Mall('wine-glass', 'img/wine-glass.jpg');


//here i test the products array and see what inside 
//console.log(products);

let leftImg = document.getElementById('left-img');
let centerImg = document.getElementById('center-img');
let rightImg = document.getElementById('right-img');

function getRandomIndex() {
    return Math.floor(Math.random() * products.length);
}

getRandomIndex();

//console.log(getRandomIndex)

let leftImgIndex = getRandomIndex();
let centerImgIndex = getRandomIndex();
let rightImgIndex = getRandomIndex();


function render() {

    leftImgIndex = getRandomIndex();
    centerImgIndex = getRandomIndex();
    rightImgIndex = getRandomIndex();
    if (leftImgIndex === centerImgIndex) {
        centerImgIndex = getRandomIndex();
    } else if (leftImgIndex === rightImgIndex) {
        rightImgIndex = getRandomIndex();

    } else if (centerImgIndex === rightImgIndex) {

        rightImgIndex = getRandomIndex();
    }else{

        leftImg.src = products[leftImgIndex].source;
        rightImg.src = products[rightImgIndex].source;
        centerImg.src = products[centerImgIndex].source;
    }
    
}

render();


let maxAttempts = 25;
let userAttempCounter = 0;



leftImg.addEventListener('click', selctor);
centerImg.addEventListener('click', selctor);
rightImg.addEventListener('click', selctor);


function selctor(event) {

    userAttempCounter++;
    if (userAttempCounter <= maxAttempts) {
        if (event.target.id === 'leftImg') {
            products[leftImgIndex].vote = products[leftImgIndex].vote + 1

        } else if (event.target.id === 'centerImg') {
            products[centerImgIndex].vote = products[centerImgIndex].vote + 1
        } else {
            products[rightImgIndex].vote = products[rightImgIndex].vote + 1
        }
        render();
    }
        else {
    leftImg.removeEventListener('click', selctor);
    centerImg.removeEventListener('click', selctor);
    rightImg.removeEventListener('click', selctor);


    // let btn = document.getElementById('submit')
    // YourResult.addEventListener('submit', submitter);

    // function submitter (event) {
    //     event.preventDefault();


let result = document.getElementById('result');
let list ; 
for (let i = 0; i < products.length; i++) {
    list = document.createElement('li');
    result.appendChild(list);
    list.textContent= `${products[i].name} Earned ${products[i].vote} Votes`
} 
// }
}

}