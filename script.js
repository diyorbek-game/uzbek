// Created by Alhaaz

// Created by Alhaaz

// Created by Gulshan Mahawar

// Created by Alhaaz

// Created by Kim 반테

window.onload = function() {
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 300);
};

function startGame() {
alert("Ballar:\n❤️: 15 ball\n💣: -15 ball\n💔: -10 ball\n❤️‍🩹:10 ball\n\nBarmoqlaringizni sudrab chelakdagi narsalarni to'plang va malikangizni saqlash uchun satrni to'ldirishga harakat qiling. Sizda 5 ta hayot bor Omad tilaymiz!")

document.getElementById('bg_audio').play(); document.getElementById("game_bg_img").style.display = "inline-block";
    
    var quotes = ["I could search my whole life<br> through and never find another you.", "To the world, <br>you may be one person,<br> but to me, you are the world." , "You are the missing piece<br> I’ve been trying to find.", "I wish I could<br> turn back the clock.<br> I'd find you sooner and<br> love you longer.", "I never knew how much love<br> my heart could hold until<br> I met you.", "When I saw you,<br> I fell in love,<br> and you smiled because you knew.", "Loving you is like breathing-<br>I can’t stop and<br> don’t want to."
    ]
    
    let quoteIndex = 1;
    
    function changeQuote(){
        document.getElementById('quote').innerHTML = quotes[quoteIndex++ % quotes.length];
    }
    
    let canvas = document.getElementById("container");
    let ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let playerX = canvas.width / 2 - 45;
    let playerY = canvas.height - 150;
    let playerSize = 90;
    let gameWon = false;
    
    let life = 5;
    let barX = 15;
    let barY = 120;
    let barHeight = 50;
    let barWidth = 0;
    let barLimit = canvas.width - 30;

    let hearts = [], bombs = [], brokenHearts = [], coverHearts = [];
    let particles = [];

    function createObject(array, speed) {
        array.push({
            x: Math.random() * (canvas.width - 50),
            y: -50,
            sy: Math.random() * 4 + speed
        });
    }

    function updateObjects(array, imgSrc, size, barEffect, lifeEffect) {
        for (let i = 0; i < array.length; i++) {
            let obj = array[i];

            let img = new Image();
            img.src = imgSrc;
            ctx.drawImage(img, obj.x, obj.y, size, size);
            
            obj.y += obj.sy;
            
            if (obj.y > canvas.height) array.splice(i--, 1);

            if (
                obj.x < playerX + playerSize - 10 &&
                obj.x + size > playerX + 10 &&
                obj.y < playerY + playerSize - 50 &&
                obj.y + size > playerY + 50
            ) {
                array.splice(i--, 1);
                barWidth += barEffect;
                hayot -= lifeEffect;
            }
        }
    }

    let heartInter = setInterval(() => {
        if (Math.random() > 0.5) createObject(hearts, 2);
    }, 1000);
    
    let bombInter = setInterval(() => {
        if (Math.random() > 0.5) createObject(bombs, 2);
    }, 2000);
    
    let brohInter = setInterval(() => {
        if (Math.random() > 0.5) createObject(brokenHearts, 2);
    }, 1000);
    
    let coverhInter = setInterval(() => {
        if (Math.random() > 0.5) createObject(coverHearts, 2);
    }, 2000);

    function createFirework(x, y) {
        for (let i = 0; i < 20; i++) {
            let size = Math.random() * 20 + 10;
            let speedX = (Math.random() - 0.5) * 5;
            let speedY = (Math.random() - 0.5) * 5;
            particles.push({ x, y, size, speedX, speedY });
        }
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            ctx.font = `${p.size}px Arial`;
            ctx.fillText('❤️', p.x, p.y);

            p.x += p.speedX;
            p.y += p.speedY;
            p.size *= 0.97;
            p.speedY += 0.05;
            
            if (p.size < 5) particles.splice(i--, 1);
        }
        requestAnimationFrame(drawFireworks);
    }

    canvas.addEventListener("touchmove", (e) => {
        if (!gameWon) {
            playerX = e.touches[0].clientX - playerSize / 2;
            playerX = Math.max(0, Math.min(canvas.width - playerSize, playerX));
        }
    });

    function gameLoop() {
        if (gameWon) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let playerImg = new Image();
        playerImg.src = "https://i.ibb.co/V065F2nh/1738426408437.png";
        ctx.drawImage(playerImg, playerX, playerY, playerSize, playerSize);

        updateObjects(hearts, "https://i.ibb.co/mVNmMp4F/1738428158997.png", 50, 10, 0);
        updateObjects(bombs, "https://i.ibb.co/5xwLsZh5/595582.png", 50, -15, 1);
        updateObjects(brokenHearts, "https://i.ibb.co/4g48DSKb/1738488914007.png", 50, -10, 1);
        updateObjects(coverHearts, "https://i.ibb.co/Dh00H9b/Broken-Heart-20-683x1024.png", 65, 5, 0);

        ctx.font = "20px Arial";
        ctx.fillText("Life: " + '❤️'.repeat(life), 10, 40);

        // Bar Structure
        ctx.beginPath();
        ctx.rect(barX, barY, barLimit, barHeight);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(barX, barY, Math.max(barWidth, 0), barHeight);
        ctx.fillStyle = "#5959ff";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
if(life <= 0){
    hearts = bombs = brokenHearts = coverHearts = [];
            clearInterval(heartInter);
            clearInterval(bombInter);
            clearInterval(coverhInter);
            clearInterval(brohInter);
               document.getElementById('sec2').style.display = 'none';
    document.getElementById('section1').style.display = 'none';
    
    document.getElementById('sec3').style.display = 'block';
    document.body.style.background = 'none';
    document.body.style.backgroundColor = '#000';
}
        if (barWidth >= barLimit) {
            gameWon = true;
            
            hearts = bombs = brokenHearts = coverHearts = [];
            clearInterval(heartInter);
            clearInterval(bombInter);
            clearInterval(coverhInter);
            clearInterval(brohInter);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
           document.getElementById('quote').style.display = 'inline-block'; document.getElementById('game_bg_img').remove();
           
            document.getElementById('after_win_img').style.display = 'inline-block';
            
            document.body.style.background = 'none';
    document.body.style.backgroundColor = 'black';
    
    document.getElementById('thankText').style.display = 'inline-block';
    
    
    setTimeout(function () {
    const h1 = document.querySelector('h1');
    h1.classList.add('wiggle', 'center-h1');
    const canvas = document.getElementById('confetti-canvas')
    const jsConfetti = new JSConfetti({ canvas })

    function triggerConfetti() {
      jsConfetti.addConfetti({ emojis: ['🌸'] })
      jsConfetti.addConfetti({ emojis: ['💗'], emojiSize: 100, confettiNumber: 10 });
    }


    triggerConfetti();


    setInterval(triggerConfetti, 4000);
  }, 4000);
    
            
            setInterval(changeQuote, 5000);
            
            setInterval(() => {
                createFirework(Math.random() * canvas.width, Math.random() * (canvas.height / 2));
            }, 1000);
            drawFireworks();
            return;
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}