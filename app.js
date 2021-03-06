'user strict';

// here i make the arryy to save the product inside and make it global
let products = [];

// adding user data to the local storage and make the data string 
function formattedProduct() {

    let formattedData = JSON.stringify(products);
    //console.log('formattedData', formattedData)
    localStorage.setItem('products', formattedData);
}

// herer i make the data back to original format to use it in chart and ul list
function normalizeData() {
    let stringifiedData = localStorage.getItem('products');
    // test stringifiedData
    console.log('string', stringifiedData);

    // checking normal data 
    let normData = JSON.parse(stringifiedData);
    console.log('norm', normData);

    if (normData !== null) {
        products = normData;
    }

    // showRuslt()
}



// define arrays
let productsItem = [];
let productsVotes = [];
let productsShown = [];
let currentShow = [];

// console.log(productsItem);
// making constructor with function
function Mall(name, source) {
    this.name = name;
    this.source = source;
    this.vote = 0;
    this.shown = 0;
    products.push(this);
    productsItem.push(this.name);




}
// adding the items with imgs
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

//calling imgs from html file 
let leftImg = document.getElementById('left-img');
let centerImg = document.getElementById('center-img');
let rightImg = document.getElementById('right-img');

let img = document.getElementById('img');

// function to make random number between ( 0 - 1 )
function getRandomIndex() {
    return Math.floor(Math.random() * products.length);
}

getRandomIndex();

//console.log(getRandomIndex)


// giving the image index from the past function
let leftImgIndex;
let centerImgIndex;
let rightImgIndex;
// array to prevent it from dublication at the next attration
let shownImg = [];
shownImg = [leftImgIndex, rightImgIndex, centerImgIndex];

// the render function for the attration img and call it with deffrent index number
function render() {

    leftImgIndex = getRandomIndex();
    centerImgIndex = getRandomIndex();
    rightImgIndex = getRandomIndex();

    do {
        leftImgIndex = getRandomIndex();
        centerImgIndex = getRandomIndex();
        rightImgIndex = getRandomIndex();
    }
    while (leftImgIndex === rightImgIndex ||
        leftImgIndex == centerImgIndex || centerImgIndex == rightImgIndex ||
        shownImg.includes(leftImgIndex) ||
        shownImg.includes(rightImgIndex) ||
        shownImg.includes(centerImgIndex))

    shownImg = [leftImgIndex, rightImgIndex, centerImgIndex];

    leftImg.src = products[leftImgIndex].source;
    centerImg.src = products[centerImgIndex].source;
    rightImg.src = products[rightImgIndex].source;

    //console.log(currentShow);

    // shown number
    products[leftImgIndex].shown++;
    products[centerImgIndex].shown++;
    products[rightImgIndex].shown++;


}

currentShow = [leftImgIndex, centerImgIndex,
    rightImgIndex

];
//console.log('current', currentShow);

render();


let maxAttempts = 0;

// making the attmpts can entered by user and its defult by 25
function round() {

    maxAttempts = document.getElementById('roundsResult').value;
    console.log(maxAttempts)
}


let userAttempCounter = 0;


//old work
// leftImg.addEventListener('click', selctor);
// centerImg.addEventListener('click', selctor);
// rightImg.addEventListener('click', selctor);


// we replace all img with main img div
img.addEventListener('click', selctor);

// adding the event and increse the counter of voting 
function selctor(event) {


    userAttempCounter++;
    if (userAttempCounter <= maxAttempts) {
        if (event.target.id === 'leftImg') {
            products[leftImgIndex].vote = products[leftImgIndex].vote + 1

            // console.log(maxAttempts);
        } else if (event.target.id === 'centerImg') {
            products[centerImgIndex].vote = products[centerImgIndex].vote + 1
        } else {
            products[rightImgIndex].vote = products[rightImgIndex].vote + 1
        }
        render();
    } else {
        //old work
        // leftImg.removeEventListener('click', selctor);
        // centerImg.removeEventListener('click', selctor);
        // rightImg.removeEventListener('click', selctor);

        // we replace all img with main img div
        img.removeEventListener('click', selctor);
        for (let i = 0; i < products.length; i++) {

            productsVotes.push(products[i].vote);
            productsShown.push(products[i].shown);
        }
    }
    formattedProduct();
}

// showing the result
function res() {
    let result = document.getElementById('result');
    let list;
    for (let i = 0; i < products.length; i++) {
        list = document.createElement('li');
        result.appendChild(list);
        list.textContent = `${products[i].name} Earned ${products[i].vote} Votes`
    }

}

function showRuslt() {
    chart();
    res();
}
//console.log(products);
// ============================= chart ===========================================



// making the chart 
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    ctx.canvas.width = '1340';
    ctx.canvas.height = '400';
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsItem,
            datasets: [{
                data: productsVotes,
                label: '# of Votes',
                backgroundColor: [
                    'rgb(0, 0, 0)'
                ],
                borderColor: [
                    'rgb(0, 0, 0)'
                ],
                borderWidth: 1
            }, {
                data: productsShown,
                label: '# of shown',
                backgroundColor: [
                    'rgb(255, 255, 0)'
                ],
                borderColor: [
                    'rgb(255, 255, 0)'

                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

normalizeData();