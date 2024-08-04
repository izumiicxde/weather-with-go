export function timeconversion(time: string): string {
    // Split the input time string into hours and minutes
    let timeArray = time.split(":");
    let hour = parseInt(timeArray[0], 10); // Convert hour to a number
    const minutes = timeArray[1]; // Minutes remain a string
    
    let isAm = true;

    // Determine if it's AM or PM
    if (hour >= 12) {
        if (hour > 12) {
            hour -= 12; // Convert hour to 12-hour format
        }
        isAm = false; // PM
    } else if (hour === 0) {
        hour = 12; // Midnight case
    }

    // Format hour as two digits
    const formattedHour = hour.toString().padStart(2, '0');
    const convertedTime = `${formattedHour}:${minutes}`;

    // Append AM or PM
    return isAm ? `${convertedTime} AM` : `${convertedTime} PM`;
}
