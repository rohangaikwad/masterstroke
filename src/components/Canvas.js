import { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import {fabric} from 'fabric';
import { CommonContext } from "../contexts/CommonContext";

const Component = () => {

    const {activeChar, hiragana} = useContext(CommonContext);

    const canvas = useRef(null);
    const [fidelity, setFidelity] = useState(.75);

    const boxSize = 120;
    const [cols, setCols] = useState(Math.ceil(window.innerWidth/boxSize));
    const [rows, setRows] =useState(Math.floor(window.innerHeight/boxSize))

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
    }, [])

    useEffect(() => {
        console.log("render");
        UpdateCanvas();
    }, [fidelity, activeChar])

    const UpdateCanvas = () => {
        let container = document.getElementById("canvas-container");
        let w = container.clientWidth * fidelity;
        let h = container.clientHeight * fidelity;

        canvas.current.clear();
        canvas.current.backgroundColor = "transparent";
        canvas.current.renderAll();

        let fs = w > h ? h/(rows*1.25) : w/(cols*1.25)

        for(let x = 0; x < 2; x++) {
            for(let y = 0; y < rows; y++) {
                canvas.current.add(new fabric.Text(hiragana[activeChar].char, {
                    selectable: false, eventable: false,
                    fontWeight: 'normal', textAlign: 'left',
                    top: (h/rows) * (0.5 + y), 
                    left: (w/cols) * (0.5 + x),
                    originX: 'center', originY: 'center', fontSize: fs, fontFamily: "Kokoro",
                    opacity: x === 0 ? 1 : 0.4,
                    fill: getComputedStyle(document.querySelector(':root')).getPropertyValue("--clr-4").trim()
                }));
            }
        }
    }

    return <div id="canvas-container">
        <div className="lines rows light">
            {new Array(rows*2 - 1).fill(0).map((i,k) => <div key={k} />)}
        </div>
        <div className="lines cols light">
            {new Array(cols*2 - 1).fill(0).map((i,k) => <div key={k} />)}
        </div>
        <canvas id="c"></canvas>
    </div>
}

export default Component;