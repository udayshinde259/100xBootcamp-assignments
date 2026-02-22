// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

let i = 10;

function counter(){
    if((i>0)){
        console.log("print after 1 sec");
        i--; 
    } 
    setTimeout(counter, 1000);

}