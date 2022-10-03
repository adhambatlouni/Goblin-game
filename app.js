// Create canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = () => {
    bgReady = true;
};
bgImage.src = 'images/background.png';

// Hero image
let heroReady = false;
let heroImage = new Image();
heroImage.onload = () => {
    heroReady = true;
};
heroImage.src = 'images/hero.png';

// Monsters Image
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = () => {
    monsterReady = true;
};
monsterImage.src = 'images/monster.png';

// Obstacles Images
let obstacleReady = false;
let obstacleImage = new Image();
obstacleImage.onload = () => {
    obstacleReady = true;
};
obstacleImage.src = 'images/obstacle.jpg';

let obstacle1Ready = false;
let obstacle1Image = new Image();
obstacle1Image.onload = () => {
    obstacle1Ready = true;
};
obstacle1Image.src = 'images/obstacle.jpg';

let obstacle2Ready = false;
let obstacle2Image = new Image();
obstacle2Image.onload = () => {
    obstacle2Ready = true;
};
obstacle2Image.src = 'images/obstacle.jpg';

// Game Objects
let hero = {
    speed: 256,
    x: 0,
    y: 0
};

let monster = {
    x: 0,
    y: 0
};

let obstacle = {
    x: 90,
    y: 90,
};

let obstacle1 = {
    x: 300,
    y: 190,
};

let obstacle2 = {
    x: 100,
    y: 290,
};

let monsterCaught = 0;

// Handle keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the hero catches the monster
let reset = () => {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //Throw the monsters somewhere on the screen
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));

    obstacle.x = 30 + (Math.random() * (canvas.width - 60));
    obstacle.y = 30 + (Math.random() * (canvas.height - 60));

    obstacle1.x = 17 + (Math.random() * (canvas.width - 34));
    obstacle1.y = 17 + (Math.random() * (canvas.height - 34));

    obstacle2.x = 24 + (Math.random() * (canvas.width - 48));
    obstacle2.y = 24 + (Math.random() * (canvas.height - 48));

}

// Update game objects
let update = (modifier) => {

    if(38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if(40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if(37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if(39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }
    if(hero.x > 512) {
        hero.x = 0;
    }
    if(hero.y < 0) {
        hero.x = 512;
    }
    if(hero.y > 480) {
        hero.y = 0;
    }
    if(hero.y < 0) {
        hero.y = 480;
    }

    // Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monsterCaught;
        reset();
    }

	if (
		hero.x <= (obstacle.x + 30)
		&& obstacle.x <= (hero.x + 30)
		&& hero.y <= (obstacle.y + 30)
		&& obstacle.y <= (hero.y + 30)
	) {
		reset();
    }

    if (
		hero.x <= (obstacle1.x + 17)
		&& obstacle1.x <= (hero.x + 17)
		&& hero.y <= (obstacle1.y + 17)
		&& obstacle1.y <= (hero.y + 17)
	) {
		reset();
    }

    if (
		hero.x <= (obstacle2.x + 24)
		&& obstacle2.x <= (hero.x + 24)
		&& hero.y <= (obstacle2.y + 24)
		&& obstacle2.y <= (hero.y + 24)
	) {
		reset();
    }
};

// Draw everything
let render = () => {
    if(bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if(heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if(monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    if(obstacleReady) {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y);
    }

    if(obstacle1Ready) {
        ctx.drawImage(obstacle1Image, obstacle1.x, obstacle1.y);
    }

    if(obstacle2Ready) {
        ctx.drawImage(obstacle2Image, obstacle2.x, obstacle2.y);
    }

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monsterCaught, 32, 32);
};

// The main game loop
let main =  () => {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
let then = Date.now();
reset();
main();

//CSIS_gamename_name_2022100301.zip