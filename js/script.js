let canvas = document.getElementById("snake");
/*Trata o projeto como um plano 2D*/
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
/*Tamanho da cobrinha*/
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
/*Criar a direção do movimento da cobrinha*/
let direction = "right";
/*Cria a comida numa posição aleatória
Math.floor tira o decimal e deixa o número inteiro para a posição*/
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;
let background = new Image();
background.src = "/img/snake-bg.jpg";
let foodicon = new Image();
foodicon.src = "/img/food.png";
let snakeicon = new Image();
snakeicon.src = "/img/snake.png";

function criarBG() {
    /*Desenha o retângulo*/
    context.drawImage(background, 0, 0, 16 * box, 16 * box);
    /*context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);*/
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.drawImage(snakeicon, snake[i].x, snake[i].y, box, box);
        /*context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);*/
    }
}

function drawFood(){
    context.drawImage(foodicon, food.x, food.y, box, box);
    /*context.fillStyle = "yellow";*/
    /*context.fillRect(food.x, food.y, box, box);*/
}
/*Captura o comando do teclado*/
document.addEventListener('keydown', update);
/*Condicional para impedir o movimento oposto da cobrinha*/
function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    /*Permitir a cobrinha atravessar as bordas da tela*/
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    /*Game over*/
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            document.getElementById('game-over').innerHTML = "Game Over!";
        }
    }
    /*Iniciar o BG e a cobrinha*/
    criarBG();
    criarCobrinha();
    drawFood();
    /*Posição inicial da cobrinha*/
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    /*Cria o movimento da cobrinha*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    /*Remove a comida e gera uma nova comida*/
    if(snakeX != food.x || snakeY != food.y){
        /*Retirar o último elemento do array*/
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
        document.getElementById('score').innerHTML = score;
    }
    
    /*Criar a cabeça da cobra*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

/*Refresh no game para não travar*/
let jogo = setInterval(iniciarJogo, 100);