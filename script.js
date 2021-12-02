function reverseString(str){
    var charList = str.split("");
    const reverseList = charList.reverse();
    return reverseList.join("");
}

function isPalindrome(str){
    const reversedString = reverseString(str);
    if(str === reversedString){
        return true;
    }
    else{
        return false;
    }
}

function convertDateToString(date){
    var dateStr = {day: "",month: "",year: ""};
    if(date.day<10){
        dateStr.day = "0" + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = "0" + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function convertDateToAllFormats(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    var convertedDates = [ddmmyyyy, mmddyyyy, yyyymmdd, mmddyy, ddmmyy, yymmdd];
    return convertedDates;
}

function checkPalindromeForAllDates(date){
    var flag = false;
    var listOfDates = convertDateToAllFormats(date);
    for(let i = 0; i<listOfDates.length; i++){
        if(isPalindrome(listOfDates[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++
    }
    return{
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date){
    var c = 0;
    var nextDate = getNextDate(date);

    while(1){
        c++;
        var isPalindrome = checkPalindromeForAllDates(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [c, nextDate];
}

const dateInput = document.querySelector("#date-input");
const showBtn = document.querySelector("#show-btn");
const output = document.querySelector("#output");

function clickHandler(){
    var bdayStr = dateInput.value;
    if(bdayStr !== ""){
        var listOfDate  = bdayStr.split("-");
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0]),
        };

        var isPalindrome = checkPalindromeForAllDates(date);

        if(isPalindrome){
            output.innerText = "Yay! Your birthday is a palindrome";
        }
        else{
            var [c, nextDate] = getNextPalindromeDate(date);
            output.innerText = "The next palindrome date is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+", you missed by "+c+" days!";

        }
    }
}

showBtn.addEventListener("click" , clickHandler);