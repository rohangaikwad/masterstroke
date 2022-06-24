import { useContext, useEffect, useRef, useState } from "react";
import { CommonContext } from "../contexts/CommonContext";
import FaIcon, { Icons } from "./FaIcon";

const Character = () => {

    const {activeChar, setActiveChar, hiragana, setCharListVisibility} = useContext(CommonContext);
    const [svgDoc, setSvgDoc] = useState(null);
    const [svgReady, setSvgReady] = useState(false);
    console.log(hiragana[activeChar])

    useEffect(() => {
        fetch(`kanjivg/0${hiragana[activeChar].hex}.svg`)
        .then(r => r.text())
        .then(x => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(x, "image/svg+xml");
            //console.log(doc)
            setSvgDoc(doc.children[0]);
            setSvgReady(true)
            window.svgdoc = doc
        })
    }, [activeChar])

    useEffect(() => {

    }, [svgDoc])

    const navChar = (x) => {
        let newChar = activeChar + x;
        newChar %= hiragana.length;
        newChar = Math.max(0, newChar);
        setActiveChar(newChar);
    }

    const SVGElem = () => {
        let msPerLengthUnit = 0.01;//0.01;
        let totalLength = 0;

        let paths = [...svgDoc.children[0].querySelectorAll("path")].map(p => {
            let length = p.getTotalLength();
            p.actualLength = length;
            p.delay = totalLength;
            totalLength += length;
            return p;
        });

        let pauseTime = totalLength * 0.2;
        totalLength += pauseTime * paths.length;

        paths = paths.map((p,i) => {
            p.dashArray = `${totalLength - p.delay - (pauseTime * i)} ${totalLength}`;
            p.length = totalLength - p.delay;
            return p;
        });

        return <svg xmlns="http://www.w3.org/2000/svg" 
            width={svgDoc.getAttribute("width")}
            height={svgDoc.getAttribute("height")}
            viewBox={svgDoc.getAttribute("viewBox")}>
            <g id="paths">
                {paths.map((p,i) => <path data-al={p.actualLength} style={{ strokeDashoffset: totalLength, strokeDasharray: p.dashArray, animationDuration: `${totalLength * msPerLengthUnit}s`}} key={i} d={p.getAttribute("d")} />)}
            </g>
        </svg>
    }

    const audioRef = useRef(null);
    const playSound = () => {
        console.log(audioRef.current)
        audioRef.current.play();
    }

    return <>
        {activeChar !== null 
        ? <div id="character">
            <div className="char-display" onClick={() => setCharListVisibility(true)}>
                {/* {hiragana[activeChar].char} */}
                {svgReady && <SVGElem />}
            </div>
            <div className="prev-next">
                <div className="prev" onClick={() => navChar(-1)}>&lt;</div>

                <div className="variants">
                    {new Array(3).fill(0).map((v,i) => <div key={i}>{hiragana[activeChar].char}</div>)}
                </div>

                <div className="next" onClick={() => navChar(1)}>&gt;</div>
            </div>
            <div className="sound">
                <FaIcon icon={Icons.volume} click={playSound} />
                <audio ref={audioRef} src={`/mp3/${hiragana[activeChar].romanization}.mp3`} />
                <div className="romanization">{hiragana[activeChar].romanization}</div>
            </div>
        </div> 
        : <div>null</div>}
    </>
}

export default Character;