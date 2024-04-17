rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
start = document.getElementById('start')
closeBtn = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx= canvas.getContext('2d')
score= 0
brickRowCount = 9
brickColumnCount = 5



//Create ball properties
ball =
{
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

//create Paddle properties
paddle =
{
    x: canvas.width / 2 - 40,
    y: canvas.height -20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

//Create brick properties
brickInfo =
{
    w: 70,
    h: 20,
    padding: 10,
    offsetX : 45,
    offsetY: 60,
    visible: true
}

// create bricks
bricks = []
for(let i = 0; i < brickRowCount; i++)
{
    bricks[i] = []
    for (let j = 0; j <brickColumnCount; j++)
    {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] =
        {
            x,y, ...brickInfo
        }

    }
}

// Draw ball on canvas
function drawBall()
    {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
        ctx.fillStyle = '#344D2B'
        ctx.fill()
        ctx.closePath()

    }

    //draw paddle on canvas
function drawPaddle()
{
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#344D2B'
    ctx.fill()
    ctx.closePath()
}

// Draw score on canvas
function drawScore()
{
    ctx.font = '20px monospace'
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30)
}

// Draw bricks on canvas
function drawBricks()
{
    bricks.forEach(column => {
        column.forEach(brick =>
        {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#344D2B' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

console.log(bricks)

//Draw everyhting
function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}


function movePaddle()
{
    paddle.x = paddle.x + paddle.dx
    //wall detection
    if (paddle.x < 0){
        paddle.x = 0
    }
    if (paddle.x + paddle.w > canvas.width)
    {
        paddle.x = canvas.width - paddle.w
    }
}
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
document.addEventListener('keydown', reset)
function reset(e)
{
    if (e.key == " ")
    {
        showAllBricks()
        ball.x = canvas.width / 2
        ball.y = canvas.height / 2
        ball.dx = 4
        ball.dy = -4
        ball.speed = 4
        score = 0

    }

}
function keyDown(e)
{
    if (e.key == 'ArrowRight' || e.key == 'Right' )
    {
    paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e.key == 'Left')
    {
        paddle.dx = -paddle.speed
    }
}
function keyUp(e)
{
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key =='ArrowLeft' || e.key == 'Left')
    {
        paddle.dx = 0
    }
}

function moveBall()
{
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    // wall detection (top)
    if (ball.y + ball.size < 0)
    {
        ball.dy = - 1 * ball.dy
    }

    // wall detection (right)
    if (ball.x + ball.size > canvas.width)
    {
        ball.dx = - 1 * ball.dx
    }

    // wall detection bottom
    if (ball.y + ball.size > canvas.height)
    {
        ball.dy = -1 * ball.dy

        ball.speed = 0
        ball.dx = 0
        ball.dy = 0


    }


    // wall detection left
     // wall detection (right)
    if (ball.x + ball.size < 0)
    {
        ball.dx = - 1 * ball.dx
    }
       //paddle collision
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y +ball.size > paddle.y
        )
        {
            ball.dy = -1 * ball.speed
        }

        //Brick Collision
        bricks.forEach(column => {
            column.forEach(brick => {
                if (brick.visible) {
                    if (
                        ball.x - ball.size > brick.x &&
                        ball.x + ball.size < brick.x + brick.w &&
                        ball.y - ball.size < brick.y + brick.h &&
                        ball.y + ball.size > brick.y )
                        {
                        ball.dy = -1 * ball.dy
                        brick.visible = false
                        increaseScore()
                        }
                }
            })
        })

}

function increaseScore()
{
    score++
    if (score == brickRowCount * brickColumnCount)
    {
        score = 0
        showAllBricks()
    }
}

function showAllBricks()
{
    bricks.forEach(column =>
        {
            column.forEach(brick =>
                {
                    brick.visible = true
                })
        })
}
function update(pause)
{
    moveBall()
    draw()
    movePaddle()
    requestAnimationFrame(update)
}
update()
function 


draw()
rulesBtn.addEventListener('click', () =>{
    rules.classList.add('show')

})

closeBtn.addEventListener('click', () =>{
    rules.classList.remove('show')
})

reset