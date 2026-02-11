// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)




setInterval(()=>{
    let now = new Date;

    let hour = now.getHours()+1;
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let ampm = hour >= 12 ?"PM":"AM"

    console.log(`${hour}:${min}:${sec} ${ampm}`);
}, 1000);

let i=10;
function counter() {
    if(i <= 0) return;
    let now = new Date;

    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();

    console.log(`${hour}:${min}:${sec}`);
    i--;
    
    setTimeout(counter ,1000);
    
}

counter();