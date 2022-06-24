import { useEffect, useState, useContext } from "react";
import { CommonContext } from "../contexts/CommonContext";
import HiraganaList from "./../configs/hiragana";

const Component = () => {
    const { setActiveChar, setCharListVisibility} = useContext(CommonContext);
    const [hiraganaChars, setHiraganaChars] = useState([])
    const [playSound, setPlaySound] = useState(false);

    useEffect(() => {
        let chars = HiraganaList.filter(x => x.name.toLowerCase().indexOf("small") === -1).filter(x => x.romanization !== "");
        setHiraganaChars(chars)
        //console.log(chars)
    }, [])

    return <div id="charlist-container">
        <ul id="char-list">
            {hiraganaChars.map((c,k) => <li className={playSound ? "sound": ""} onClick={() => {
                if(playSound) {                    
                    document.getElementById(`audio_${c.hex}`).currentTime = 0
                    document.getElementById(`audio_${c.hex}`).play();
                } else {
                    setActiveChar(k);
                    setCharListVisibility(false)
                }
            }} key={k}>
                {c.char !== null 
                    ? <>
                        <span className="jp">{c.char}</span>
                        {!playSound && <span className="eng">{c.romanization}</span>}
                        <audio id={`audio_${c.hex}`} src={`/mp3/${c.romanization}.mp3`}/>
                    </>
                    : <></>
                }
            </li>)}
        </ul>
        {playSound 
            ? <button onClick={() => setPlaySound(false)}>Sound: On</button> 
            : <button onClick={() => setPlaySound(true)}>Sound: Off</button>}
    </div>
}

export default Component;