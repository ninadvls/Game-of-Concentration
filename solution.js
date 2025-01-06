//Nina Davalos

/* 
* makes the image dissappear after 1 second
*/
function dissappear(imgID) {
setTimeout(function () {
    $('#'+imgID).one().attr('src','blank.jpg');
}, 1000);
}

// invoke shuffleImages() to make random placement
// of hidden images
shuffleImages();

/* 
* showImage() shows hidden images for a blank cell
* the user clicked
* changes the SRC attr for the image w/ the ID so its the
* url returned by getImage()
* @param id for the image element in the cell
*/
function showImage(imgID){
    $('#'+imgID).one().attr('src', getImage(imgID));
}

/* 
* hideImage() hides image with blank.jpg
* @param id for the image element in the cell
*/
function hideImage(imgID) {
    $('#'+imgID).one().attr('src','blank.jpg');

}

/* 
* invokes processClick when an img is clicked
* attaches eventhandlers and uses .each to go through each img
*/
$(document).ready(function() {
    $('img[data-role="trigger"]').each(function(){
        var imgID = $(this).attr('id');
        $(this).on('click', function(){
            processClick(imgID);
        });
    });
});

//global variables
let click= 1;
let clickID;
let tries= 0;
let matches= 0;

//updates the tries and matches as the user clicks
function update(){
    $('#tries').text(tries);
    $('#matches').text(matches);
}

/*
* processClick should record and display status of game
* should take in the id of the cell image
* differentiates first and second clicks from each other
*/
function processClick(cellID) {
    if(click == 1) {
        showImage(cellID);
        clickID = cellID;
        click = 2;
    } else {
        showImage(cellID);
        setTimeout(function() {
            //update tries
            tries=tries+1;
            if (getImage(clickID) == getImage(cellID)) {
                $('#msg').text("match!");
                //update matches
                matches=matches+1;
            } else{
                $('#msg').text("no match!");
                hideImage(clickID);
                hideImage(cellID);
            }
            //call on update to keep track of tries/matches
            update();

            //if the user wins
            if (matches == 8){
                $('#msg').text("you won!");
            }
            click = 1;

            //clears the message after a second
            setTimeout(function(){
                $('#msg').text("");
            }, 1000);
        },1000);
    }
}

/* 
* should let user start a new game clicking the button
* invokes previous functions, updates global vars, and changes cells to blank
*/
function startNewGame(){
    shuffleImages();
    //reset global vars
    click=1;
    clickID;
    tries=0;
    matches=0;
    update();
    //make text go blank
    $('#msg').text("");
    //make all cells blank again
    $('[data-role="trigger"]').attr('src','blank.jpg');
}

//starts new game when button is clicked
$(document).ready(function(){
    $('#startNewGameButton').on('click', startNewGame);
});
