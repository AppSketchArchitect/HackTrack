/*export function getDurations(startDate, endDate){ //Function to get the duration with each dimensions (Hours, Minutes, Seconds ...)
    const diffTime = new Date(endDate) - new Date(startDate);
    
    let seconds = diffTime / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;

    days = Math.ceil(days);
    hours = Math.ceil(hours) - 24*days;
    minutes = Math.ceil(minutes) - 24*60*days - 60*hours;
    seconds = Math.ceil(seconds) - 24*60*60*days - 60*60*hours - 60*minutes;

    let result = [];

    if(days > 0) result.push(`${days} jour${days > 1 ? 's' : ''}`);
    if(hours > 0) result.push(`${hours} heure${hours > 1 ? 's' : ''}`);
    if(minutes > 0) result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if(seconds > 0) result.push(`${seconds} seconde${seconds > 1 ? 's' : ''}`);

    result.join(', ');
    
    return {
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days,
        formatted: result
    };
}*/

//Function to format a date
export function getFormattedDate(currentDate){

    const date = new Date(currentDate);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return {
        formatted: date.toLocaleDateString() + " à " + hours + ":" + minutes
    }
}