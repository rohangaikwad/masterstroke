import { useEffect, useState, useContext } from "react";
import { CommonContext } from "../contexts/CommonContext";
import HiraganaList from "./../configs/hiragana";

const Component = () => {
    const { setActiveChar, setCharListVisibility} = useContext(CommonContext);
    const [hiraganaChars, setHiraganaChars] = useState([])

    useEffect(() => {
        let chars = HiraganaList.filter(x => x.name.toLowerCase().indexOf("small") === -1).filter(x => x.romanization !== "");
        setHiraganaChars(chars)
        //console.log(chars)
    }, [])

    return <div>
        <ul id="char-list">
            {hiraganaChars.map((c,k) => <li onClick={() => {
                setActiveChar(k);
                setCharListVisibility(false)
            }} key={k}>
                {c.char !== null 
                    ? <>
                        <span className="jp">{c.char}</span>
                        <span className="eng">{c.romanization}</span>
                    </>
                    : <></>
                }
            </li>)}
        </ul>
    </div>
}

export default Component;