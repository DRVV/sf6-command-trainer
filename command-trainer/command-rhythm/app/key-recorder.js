'use client'

import { useState, useEffect } from "react"

export default function KeyRecorder() {
    const [recording, toggleButtonState] = useState(false);
    const [start_time, setTime] = useState(0);
    const [keySequence, appendKeySequence] = useState([]);
    
    function handleClick() {
        if (recording){
            setTime(Date.now());
            appendKeySequence([]);
        }
        toggleButtonState(!recording);
    }

    function handleKeyPress(event) {
        //appendKeySequence(prevKey => [...prevKey, event.key])
        const timeElapsed = Date.now() - start_time;
        appendKeySequence(
            prevState => ({...prevState, timeElapsed: event.key})
        )
    }

    useEffect(
        () => {
            if (recording) {
                window.addEventListener('keypress', handleKeyPress)
            } else{ 
                window.removeEventListener('keypress', handleKeyPress)
            }

            return () => {
                window.removeEventListener('keypress', handleKeyPress)
            }
        }, [recording]
    )

    return <div>
        <h2>Toggle</h2>
        <button onClick={handleClick}>{recording ? 'Stop' : 'Start'}</button>
        <p>{keySequence.join(',')}</p>
    </div>
}