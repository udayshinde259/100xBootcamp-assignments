/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  let sortedStr = '';
  for(let char of str){
    if((char>='a' && char<='z') || (char>='A' && char<='Z') || (char>='0' && char<='9')){
      sortedStr+=char.toLowerCase();
    }
  }

  
  let start = 0;
  let end = sortedStr.length - 1;
  while(start < end){
    if(sortedStr[start] != sortedStr[end]){
      return false
    }
    start++;
    end--;
  }
    return true;
}

module.exports = isPalindrome;