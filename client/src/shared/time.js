export function timeconversion(time) {
    let timeArray = time.split(":")
    let isAm = true
    if(timeArray[0]>=12){
        if(timeArray[0]>12)
            timeArray[0]= timeArray[0]-12
        isAm= false
    }
    else if (timeArray[0]=="00"){
        timeArray[0]= 12
    }
    let convertedtime = timeArray.join(":")
    if (isAm) convertedtime = `${convertedtime} AM`
    else convertedtime = `${convertedtime} PM`
    return convertedtime

}

