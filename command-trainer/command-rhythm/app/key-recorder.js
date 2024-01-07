'use client'

import { useState, useEffect } from "react"
import {convertToFrame} from "./frame.js"

function saveAsJson(path, obj) {
    const fileName = path;
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {type: "application/json"});
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

export default function KeyRecorder() {
    const [recording, toggleButtonState] = useState(false);
    const [start_time, setTime] = useState(Date.now());
    const [keySequence, appendKeySequence] = useState([]);
    
    function handleClick() {
        // reset state
        if (recording){
            // save before resetting
            saveAsJson(Date.now(), keySequence);
            setTime(Date.now());
            appendKeySequence([]);

        }
        toggleButtonState(!recording);
    }

    function handleKeyPress(event) {
        //appendKeySequence(prevKey => [...prevKey, event.key])
        const timeElapsed = Date.now() - start_time;
        const frame = convertToFrame(timeElapsed);
        appendKeySequence(
            prevState => ([...prevState, 
                {
                    'timeElapsed': timeElapsed, 
                    'key': event.key,
                    'frame': frame
                }
            ])
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
        <button onClick={handleClick}>
            {recording ? 'Stop' : 'Start'}
        </button>
        <h2>Key Sequence</h2>
        <div>
            {keySequence.map((dc) => (
                <tr>
                    <td>{dc.frame}F</td>
                    <td>{dc.key}</td>
                </tr>
            ))}
        </div>
    </div>
}