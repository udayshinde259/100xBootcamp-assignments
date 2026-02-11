// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs")
function callback(err){
    if(err){
        console.log(err);
    }else{
        console.log("the file has been written sucessfully");
    }
}
fs.writeFile("a.txt", "this is next line", callback);