const canvas  = document.querySelector('#game')
const canvasContext = canvas.getContext('2d');

// console.log(collisionArr);

canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 50;

const offset = {
    x: 0,
    y: 50,
}

// canvasContext.fillRect(0, 0, canvas.width, canvas.height);
const collisionMap = [];
const boundaries = [];

const image = new Image();
image.src = './metaverse-new.png';

const playerImage = new Image();
playerImage.src = './character.png';

for( let i=0; i<collisionArr.length; i+=30 ){
    collisionMap.push(collisionArr.slice(i, 30+i));
}

// console.log(collisionMap);

class Boundary {
    constructor({position}){

        this.position = position;
        const scalingFactor = 1.8;
        this.width = 16  * scalingFactor;
        this.height = 16 * scalingFactor;
    }

    // todo: Understand this code below to scale the boundary to the size of the image

    // const aspectRatio = image.width / image.height;
    //     // Calculate new width and height while maintaining the aspect ratio
    //     const newWidth = canvas.width * 1.8; // Or any scaling factor
    //     const newHeight = newWidth / aspectRatio; 
    //     canvasContext.imageSmoothingEnabled = false;
    //     canvasContext.drawImage(this.image, this.position.x, this.position.y, image.width, image.height, 0, 0, newWidth, newHeight); //todo: this line is very imp to understand

    draw(){
        canvasContext.fillStyle = 'red';
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if( symbol === 4437 ){
            boundaries.push(new Boundary({
            position: {
                x: j * 28.8 + offset.x,
                y: i * 28.8 + offset.y,
            }
            }))
        }
    })
})

console.log("boundaries array: ", boundaries);

class Sprite {
    constructor({
        position,
        image,
    }){
        this.position = position;
        this.image = image;
    }

    draw(){
        //RENDERING THE BACKGROUND
        const aspectRatio = image.width / image.height;
        // Calculate new width and height while maintaining the aspect ratio
        const newWidth = canvas.width * 1.8; // Or any scaling factor
        const newHeight = newWidth / aspectRatio; 
        canvasContext.imageSmoothingEnabled = false;
        canvasContext.drawImage(this.image, this.position.x, this.position.y, image.width, image.height, 0, 0, newWidth, newHeight);
    }

}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const animatePlayerWalking = () => {

    window.requestAnimationFrame(animatePlayerWalking);

    background.draw();

    // ADDING THE COLLISION BOUNDARIES
    boundaries.forEach(boundary => {
        boundary.draw();
    })

    //RENDERING THE CHARACTER ON THE UI
    canvasContext.imageSmoothingEnabled = false;
    canvasContext.drawImage(
        playerImage, 
        0, // x coordinate to start crop
        0, // y coordinate to start crop
        playerImage.width/24, // crop width
        playerImage.height, // crop height
        canvas.width/2 - playerImage.width/24, 
        canvas.height/2 - playerImage.height/2, 
        playerImage.width/6, // multiplying the height and width with a factor of 4
        playerImage.height*4,
    );

    if( keys.w.pressed && lastKey === 'w' ){
        background.position.y -= 0.7;
    }
    else if( keys.a.pressed && lastKey === 'a' ){
        background.position.x -= 0.7; 
    }
    else if( keys.s.pressed && lastKey === 's' ){
        background.position.y += 0.7;
    }
    else if( keys.d.pressed && lastKey === 'd' ){
        background.position.x += 0.7;
    }

}

animatePlayerWalking();

let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            console.log("w pressed");
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            console.log("a pressed");
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            console.log('s pressed');
            break;
        case 'd': 
            keys.d.pressed = true;
            lastKey = 'd';
            console.log('d pressed');
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':   
            keys.w.pressed = false;
            console.log("w released");
            break;
        case 'a':   
            keys.a.pressed = false;
            console.log("a released");
            break;
        case 's':   
            keys.s.pressed = false;
            console.log("s released");
            break;
        case 'd':   
            keys.d.pressed = false;
            console.log("d released");
            break;
    }
})
