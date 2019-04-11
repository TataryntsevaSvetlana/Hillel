
// Index.html - менять нельзя
// При необходимости можно внести изменил в styles.css. Но учтите что предварительно элемент не должен выглядеть как поле. Все изменения в оформление должна вносить наша функция.

// Реализовать функцию конструктор BallGame.
// Мы в нее переделаем:
//  аргумент 1: DOM-элемент, который нужно трансформировать и превратить в поле
//  аргумент 2: высота поля
//  аргумент 3: ширина поля

// Условия
//  трансформировать переданный элемент в поле
//  добавить мяч
//  мяч должен периодически двигаться в одном из 4 направлений
//  если мяч уходит за границу поля, он появляется с противоположной стороны
//  пользователь может управлять мячиком с клавиатуры
//   (пробел - пауза, мяч останавливается, еще раз пробел, мяч продолжает движение
//   стрелки - меняется направление движения на соответствующее)

const ARROWS_CODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

const DIRECTIONS = {
    LEFT: 'LEFT',
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN'
}

function BallGame(el, height, width){
    this.el = el;
    this.height = height;
    this.width = width;

    this.init = function() {
        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.el.style.position = 'relative';

        this.createBall();
        this.attachBall();
        this.runGame();
    }

    this.createBall = function() {
        const ball = document.createElement('div');
        ball.style.width = '5px';
        ball.style.height = '5px';
        ball.style.backgroundColor = 'blue';
        ball.style.position = 'absolute';

        this.ball = ball;
    }

    this.attachBall = function() {
        this.el.appendChild(this.ball);
    }

    this.runGame = function() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case ARROWS_CODES.RIGHT: {
                    this.moveBall(DIRECTIONS.RIGHT);
                    break;             
                }
                case ARROWS_CODES.LEFT: {
                    this.moveBall(DIRECTIONS.LEFT);          
                    break;
                }
                case ARROWS_CODES.UP: {
                    this.moveBall(DIRECTIONS.UP);                    
                    break;
                }
                case ARROWS_CODES.DOWN: {
                    this.moveBall(DIRECTIONS.DOWN);                    
                    break;
                }
            }
          
        });
    }

    this.moveBall = function(direction) {

        switch (direction) {
            case DIRECTIONS.RIGHT: {

                this.setTimeout = setTimeout(() => {
                    let newPosition = parseInt(this.ball.style.left || 0) + 1 + 'px';
                    if (this.ball.style.left === '395px') {
                        newPosition = this.ball.style.left = '0px';
                    }
                    this.ball.style.left = newPosition ;
                }, 100)
                break;

            }
            case DIRECTIONS.LEFT: {
                this.setTimeout = setTimeout(() => {

                    let newPosition = parseInt(this.ball.style.left || 395) - 1 + 'px';
                    if (this.ball.style.left === '0px') {
                        newPosition = this.ball.style.left = '395px';
                    }
                    this.ball.style.left = newPosition ;
                }, 1000)
                break;
                
            }
        }
    }
}



const game = new BallGame(
    document.getElementById('container'),
    400,
    400
);

game.init();
