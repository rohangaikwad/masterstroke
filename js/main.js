let letters = [];
let activeLetter = 0;
let count = 0;

fetch('/data/hiragana.json')
    .then(data => data.json())
    .then(data => {
        let d = data.filter(l => l.name.toLowerCase().indexOf('small') == -1);
        letters = d;
        count = d.length;
        drawLetter();
        console.log(d);
    })
    .catch(err => console.log(err));


let x = 3;
let y = 4.3;

let size = 500;
let w = size * x;
let h = size * y;

var canvas = new fabric.Canvas('c', { preserveObjectStacking: true, width: w, height: h, backgroundColor: "#fff", isDrawingMode: true });


next.addEventListener('click', () => {
    activeLetter++;
    activeLetter %= count;
    drawLetter();
})
prev.addEventListener('click', () => {
    activeLetter--;
    activeLetter = Math.max(0, activeLetter);
    drawLetter();
})

let drawLetter = () => {
    let letter = letters[activeLetter];
    console.log(letter);

    canvas.clear();
    canvas.backgroundColor = "#fff";
    canvas.renderAll();

    canvas.add(new fabric.Rect({
        selectable: false, eventable: false,
        width: 0.2 * w,
        height: 0.2 * w,
        left: 0.05 * w,
        top: 0.05 * w,
        fill: 'transparent', stroke: '#000', strokeWidth: 3, rx: 10, ry: 10
    }))

    canvas.add(new fabric.Text(letter.char, {
        selectable: false, eventable: false,
        fontWeight: 'normal', textAlign: 'left', fontFamily: 'Noto Sans',
        top: 0.05 * w + 0.1 * w, left: 0.05 * w + 0.1 * w, originX: 'center', originY: 'center', fontSize: 100
    }));

    canvas.add(new fabric.Rect({
        selectable: false, eventable: false,
        width: 0.2 * w,
        height: 0.2 * w,
        left: 0.3 * w,
        top: 0.05 * w,
        fill: 'transparent', stroke: '#000', strokeWidth: 3, rx: 10, ry: 10
    }))

    canvas.add(new fabric.Text(letter.romanization, {
        selectable: false, eventable: false,
        fontWeight: 'normal', textAlign: 'left', fontFamily: 'Noto Sans',
        top: 0.05 * w + 0.1 * w, left: 0.3 * w + 0.1 * w, originX: 'center', originY: 'center', fontSize: 120
    }));

    canvas.add(new fabric.Rect({
        selectable: false, eventable: false,
        width: 0.4 * w,
        height: 0.2 * w,
        left: 0.55 * w,
        top: 0.05 * w,
        fill: 'transparent', stroke: '#000', strokeWidth: 3, rx: 10, ry: 10
    }))

    canvas.add(new fabric.Text(letter.name.toLowerCase(), {
        selectable: false, eventable: false,
        fontWeight: 'normal', textAlign: 'left', fontFamily: 'Noto Sans',
        top: 0.05 * w + 0.1 * w, left: 0.55 * w + 0.2 * w, originX: 'center', originY: 'center', fontSize: 60
    }));

    // horizontal lines
    for (let ii = 0; ii < 22; ii++) {
        canvas.add(new fabric.Rect({
            selectable: false, eventable: false,
            left: 0.05 * w,
            top: w * 0.3 + (w * 0.05 * ii),
            width: 0.9 * w,
            height: 3,
            fill: '#ccc'
        }));
    }
    // vertical lines
    for (let ii = 0; ii < 19; ii++) {
        canvas.add(new fabric.Rect({
            selectable: false, eventable: false,
            left: 0.05 * w + (w * 0.05 * ii),
            top: w * 0.3,
            width: 3,
            height: 1.05 * w,
            fill: '#ccc'
        }));
    }


    // horizontal lines
    for (let ii = 0; ii < 21; ii++) {
        canvas.add(new fabric.Text(letter.char, {
            selectable: false, eventable: false,
            fontWeight: 'normal', textAlign: 'left', fontFamily: 'Noto Sans',
            left: 0.075 * w, opacity: (21 - ii) / 21,
            top: 0.025 * w + w * 0.3 + (w * 0.05 * ii), originX: 'center', originY: 'center', fontSize: 40
        }));
    }
}

setTimeout(() => {
    //saveImage();
}, 1000)

down.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'canvas.jpg';
    link.href = canvas.toDataURL({
        format: 'jpeg',
        quality: 1
    });
    link.click();
});




clearEl.addEventListener('click', () => drawLetter());



if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = '#000';
    //canvas.freeDrawingBrush.source = canvas.freeDrawingBrush;
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 3,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: '#000',
    });
}