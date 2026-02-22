// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs");

let content = fs.readFileSync("a.txt", "utf-8");

let arr = content.split(" ");

let removeSpace = [];

for(let i=0;i<arr.length; i++){
    if(arr[i]){
        removeSpace.push(arr[i]);
    }
}

let finalStr = removeSpace.join(" ");

fs.writeFileSync("a.txt", finalStr);