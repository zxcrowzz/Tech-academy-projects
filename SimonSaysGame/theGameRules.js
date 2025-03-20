/** The Game Rules **/

$(function() {
    var colors = $('#colors li');
    var mainColor = $('#main');
    var start = $('#start');
    var gameState = 'waiting';
    var gameSequence = [];
    var level = 1;
    var t;
    var flashNo;
    var clickedNo;

    setupLightSequence = function() {
        var randomNum = Math.floor(Math.random() * 4);
        gameSequence[level - 1] = randomNum;
        showLightSequence();
    };

    lightOn = function(no) {
        colors.eq(gameSequence[no]).addClass('on');
    };

    lightOff = function() {
        colors.removeClass('on');
    };

    showLightSequence = function() {
        lightOff();

        if (flashNo < level) {
            var on = setTimeout(function() {
                var off = setTimeout(function() {
                    showLightSequence();
                    flashNo++;
                }, 500);
                lightOn(flashNo);
            }, 500);
        } else {
            gameState = 'playing';
            $('body').addClass('playing');
            start.text('Your turn...');
            clearTimeout(on);
        }
    };

    // Click event for color blocks with fade effect
    colors.click(function() {
        if (gameState === 'playing') {
            var selectedSquare = $(this).index();

            if (gameSequence[clickedNo] === selectedSquare) {
                if (clickedNo === level - 1) {
                    gameState = 'waiting';
                    $('body').removeClass('playing');
                    start.text('WELL DONE. Go to the next level >');
                    level++;
                }

                var currentSquare = $(this);
                currentSquare.fadeOut(200).fadeIn(200); // Fade effect
                lightOn(clickedNo);
                
                var off = setTimeout(function() {
                    lightOff();
                    clickedNo++;
                }, 200);
            } else {
                gameState = 'waiting';
                $('body').removeClass('playing');
                start.text('GAME OVER. Try again!');
                $('body').removeClass('playing').addClass('game-over');
                gameSequence = [];
                level = 1;
            }
        }
    });

    // Initialization function with slide-in effect
    var init = function() {
        $('#level').text('Level ' + level);
        flashNo = 0;
        clickedNo = 0;
        $(this).text('Simon says...');
        $('body').removeClass('game-over');
        setupLightSequence();

        // Slide in effect for color squares
        colors.css({ position: 'relative', left: '-100px' })
              .animate({ left: '0px' }, 500);
    };

    start.click(init);
});
