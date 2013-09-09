window.onload = function() {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  
  var score = 0;
  var level = 0;
  var direction = 0;
  var snake = new Array(3);
  var active = true;
  var speed = 500;
  
  var arena = new Array(20);
  for (var i = 0; i < arena.length; i++) {
    arena[i] = new Array(20);
  }
  
  canvas.width = 204;
  canvas.height = 224;
  
  $('body').append(canvas);
  
  arena = generateSnake(arena);
  arena = generateFood(arena);
  getGame();
  
  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 38 && direction !== 3) {
    direction = 2; // Up
    } else if (e.keyCode === 40 && direction !== 2) {
    direction = 3; // Down
    } else if (e.keyCode === 37 && direction !== 0) {
    direction = 1; // Left
    } else if (e.keyCode === 39 && direction !== 1) {
    direction = 0; // Right
    }
  });
 
  function getGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
for (var i = snake.length - 1; i >= 0; i--) {
  if (i === 0) {
    switch(direction) {
      case 0: // Right
        snake[0] = { x: snake[0].x + 1, y: snake[0].y }
      break;
      case 1: // Left
        snake[0] = { x: snake[0].x - 1, y: snake[0].y }
      break;
      case 2: // Up
        snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
      break;
      case 3: // Down
        snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
      break;
    }
     
    if (snake[0].x < 0 ||
      snake[0].x >= 20 ||
      snake[0].y < 0 ||
      snake[0].y >= 20) {
      showGameOver();
      return;
    }
     
    if (arena[snake[0].x][snake[0].y] === 1) {
      score += 10;
      arena = generateFood(arena);
       
      snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
      arena[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;
       
      if ((score % 100) == 0) {
        level += 1;
      }
    } else if (arena[snake[0].x][snake[0].y] === 2) {
      showGameOver();
      return;
    }
     
    arena[snake[0].x][snake[0].y] = 2;
  } else {
    if (i === (snake.length - 1)) {
      arena[snake[i].x][snake[i].y] = null;
    }
     
    snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
    arena[snake[i].x][snake[i].y] = 2;
  }
}
    
    getArena();
    for (var x = 0; x < arena.length; x++) {
      for (var y = 0; y < arena[0].length; y++) {
        if (arena[x][y] === 1) {
          ctx.fillStyle = '#8C8C6E';
          ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
        } else if (arena[x][y] === 2) {
          ctx.fillStyle = '#002000';
          ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
        }
      }
    }
    
    if (active) {
      setTimeout(getGame, speed - (level * 50));
    }
  }
  
  function getArena() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#002000';
    
    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);
    
    ctx.rect(3,21,canvas.width - 6,canvas.height - 26);
    ctx.fillStyle = '#BEDC91';
    ctx.fill();
  
    ctx.fillStyle = '#002000';
    ctx.font = '12px Helvetica';
    ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
  }
  
  function generateFood(arena) {
    var rndX = Math.round(Math.random() * 19);
    var rndY = Math.round(Math.random() * 19);
    while (arena[rndX][rndY] === 2) {
      rndX = Math.round(Math.random() * 19);
      rndY = Math.round(Math.random() * 19);
    }
    arena[rndX][rndY] = 1;
    return arena;
  }
  
  function generateSnake(arena) {
    var rndX = Math.round(Math.random() * 19);
    var rndY = Math.round(Math.random() * 19);
 
    while ((rndX - snake.length) < 0) {
      rndX = Math.round(Math.random() * 19);
    }
    for (var i = 0; i < snake.length; i++) {
      snake[i] = { x: rndX - i, y: rndY };
      arena[rndX - i][rndY] = 2;
    }
    
    return arena;
  }
  
  function showGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = '#002000';
    ctx.font = '16px Helvetica';
    ctx.fillText('Game Over!', ((canvas.width / 2) - (ctx.measureText('Game Over!').width / 2)), 50); 
    ctx.font = '12px Helvetica';
    ctx.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (ctx.measureText('Your Score Was: ' + score).width / 2)), 70);
  }
};