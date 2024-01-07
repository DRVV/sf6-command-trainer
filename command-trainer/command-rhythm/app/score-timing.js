
function getFrame(time_elapsed_in_millisecond) {
    /*
    convert time (ms) to frame.
    */
    const FPS = 60;
    var frame = (time_elapsed_in_millisecond / 1000) * FPS
    
    return Math.floor(frame)
}

function evaluateTimeDifference(time_difference) {
    if (time_difference < 3) {
        return 'Great'
    } else if (time_difference < 5) {
        return 'Good'
    } else {
        return 'Bad'
    }
}

function scoreInput(inputKey, inputTime, idealKeystrokes) {
    /*
    score key input timing.
    inputKey: string
    inputTime: float (msec)
    idealKeystrokes: List[key, frame]

    1. search idealKeystrokes for the nearest neibour frames in some window
    2. check if the key is the same
    3. check the time difference in frames
    4. returns bad/good/perfect enum
    */
    const BUFFER = 10;

    var inputFrame = getFrame(inputTime);
    // var subList = idealKeystrokes[inputFrame-BUFFER: inputFrame+BUFFER] 
    let startFrame = inputFrame - BUFFER
    let subList = idealKeystrokes.slice(startFrame, inputFrame + BUFFER);
    // var frame, key = subList[subList == inputKey]
    let relative_frame = subList.findIndex(key => key === inputKey);
    
    let enumString = ''
    if (relative_frame === -1) {
        // no keys found
        console.log('DEBUG: No keys found')
        enumString = 'Bad'
    } else {
        let global_frame = startFrame + relative_frame
        console.log(`Ideal Keys found at ${global_frame}`);
        console.log(`Input frame is ${inputFrame}`)
        enumString = evaluateTimeDifference(inputFrame - global_frame);
    }
    
    //return <h3>{enumString}</h3>;
    return enumString
}