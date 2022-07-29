 var gameArea = document.getElementById("gameArea");

 var bugImage = new Image(40, 38);
 bugImage.src = "Media/bug.png";
 var splatImg = new Image(40, 30);
 splatImg.src = "Media/splat.png";
 var pointImg = new Image(40, 30);
 pointImg.src = "Media/points.png";
 var sound = new Audio("Media/splat.mp3");
 var interval = 2000;
 var points = 0;
 var bug = {};
 var x = 0;
 var y = 0;
 
 var canvas = document.createElement("canvas");
 canvas.setAttribute("id", "canvas");
 var ctx = canvas.getContext("2d");
 canvas.width = 800;
 canvas.height = 600;
 canvas.style.border = "solid";
 var bgReady = false;
 var bgImage = new Image();
 bgImage.onload = function () {
     bgReady = true;
 };
 bgImage.src = "Media/background.jpg";
 gameArea.appendChild(canvas);
 
 function bugPosition() {
     bug.x = 10 + (Math.random() * (canvas.width - 50));
     bug.y = 10 + (Math.random() * (canvas.height - 50));
 }
 
 var render = function () {
     score.innerHTML = "Score: " + points;
     if (bgReady) {
         ctx.drawImage(bgImage, 0, 0);
         bugPosition();
     ctx.drawImage(bugImage, bug.x, bug.y);
     }
 }
 
 function splat() {
     sound.play();
     score.innerHTML = "Score: " + points;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.drawImage(bgImage, 0, 0);
     ctx.drawImage(splatImg, bug.x, bug.y);
     ctx.drawImage(pointImg, bug.x, bug.y - 40);
     clearInterval(timer);
     interval -= 100;
     timer = setInterval(render, interval);
 }
 
 function resetSpeed() {
     clearInterval(timer);
     interval = 2000;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     render();
     timer = setInterval(render, interval);
 }
 
 function resetGame() {
     clearInterval(timer);
     interval = 2000;
     points = 0;
     score.innerHTML = "Score: " + points;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     render();
     timer = setInterval(render, interval);
     
 }
 
     canvas.addEventListener('click', function (event) {
         var rect = canvas.getBoundingClientRect();
         x = event.clientX - rect.left;
         y = event.clientY - rect.top;
         if (x >= bug.x && x <= bug.x + bugImage.width && y >= bug.y && y <= bug.y + bugImage.height) {
             points += 10;
             splat();
         }
     }, false);
 
 var timer = setInterval(render, interval);