export function convertToFrame(time_elapsed_in_millisecond) {
    /*
    convert time (ms) to frame.
    */
    const FPS = 60;
    var frame = (time_elapsed_in_millisecond / 1000) * FPS
    
    return Math.floor(frame)
}