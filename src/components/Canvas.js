import { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import {fabric} from 'fabric';
import { CommonContext } from "../contexts/CommonContext";

let timeoutId = 0;
const Component = () => {

    const {activeChar, hiragana} = useContext(CommonContext);

    const canvas = useRef(null);
    const [fidelity, setFidelity] = useState(.75);
    const [boxSize, setBoxSize] = useState(120);
    const rows = useRef(Math.floor(window.innerHeight/boxSize));
    const cols = useRef(Math.ceil(window.innerWidth/boxSize));

    const [cssRows, setCssRows] = useState(rows.current);
    const [cssCols, setCssCols] = useState(cols.current);

    useEffect(() => {
        // init canvas
        let container = document.getElementById("canvas-container");
        let w = container.clientWidth * fidelity;
        let h = container.clientHeight * fidelity;

        canvas.current = new fabric.Canvas('c', { preserveObjectStacking: true, width: w, height: h, backgroundColor: "transparent", isDrawingMode: true });
        canvas.current.freeDrawingBrush.color = getComputedStyle(document.querySelector(':root')).getPropertyValue("--clr-2").trim()
        canvas.current.freeDrawingBrush.color = "#fff"
        canvas.current.freeDrawingBrush.width = 4 * fidelity
        UpdateCanvas();
        window.addEventListener('resize', () => {
            cols.current = Math.ceil(window.innerWidth/boxSize);
            rows.current = Math.floor(window.innerHeight/boxSize);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                UpdateCanvas();
            }, 250)
        });
    }, [])

    useEffect(() => {
        UpdateCanvas();
    }, [fidelity, activeChar, boxSize]);

    const UpdateCanvas = () => {
        let container = document.getElementById("canvas-container");
        let w = container.clientWidth * fidelity;
        let h = container.clientHeight * fidelity;

        canvas.current.clear();        
        canvas.current.setDimensions({width:w, height:h});
        canvas.current.backgroundColor = "transparent";
        canvas.current.renderAll();

        let fs = w > h ? h/(rows.current * 1.1) : w/(cols.current * 1.15);
        setCssCols(cols.current);
        setCssRows(rows.current);

        for(let x = 0; x < cols.current; x++) {
            for(let y = 0; y < rows.current; y++) {
                canvas.current.add(new fabric.Text(hiragana[activeChar].char, {
                    selectable: false, eventable: false,
                    fontWeight: 'normal', textAlign: 'left',
                    top: (h/rows.current) * (0.5 + y), 
                    left: (w/cols.current) * (0.5 + x),
                    originX: 'center', originY: 'center', fontSize: fs, fontFamily: "Kokoro",
                    opacity: 1/(x+1),
                    fill: getComputedStyle(document.querySelector(':root')).getPropertyValue("--clr-4").trim()
                }));
            }
        }
    }

    return <div id="canvas-container">
        <div className="lines rows light">
            {new Array(cssRows * 2 - 1).fill(0).map((i,k) => <div key={k} />)}
        </div>
        <div className="lines cols light">
            {new Array(cssCols * 2 - 1).fill(0).map((i,k) => <div key={k} />)}
        </div>
        <canvas id="c"></canvas>
    </div>
}

export default Component;