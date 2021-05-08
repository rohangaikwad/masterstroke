let letters = [];
let activeLetter = 0;
let count = 0;

var font1 = new FontFaceObserver('Noto Sans', { weight: 400 });
var font2 = new FontFaceObserver('Noto Serif JP', { weight: 200 });
var font3 = new FontFaceObserver('Noto Serif JP', { weight: 300 });
var font4 = new FontFaceObserver('Noto Serif JP', { weight: 400 });
var font5 = new FontFaceObserver('Noto Serif JP', { weight: 500 });
var font6 = new FontFaceObserver('Noto Serif JP', { weight: 600 });
var font7 = new FontFaceObserver('Noto Serif JP', { weight: 700 });
var font8 = new FontFaceObserver('Noto Serif JP', { weight: 900 });
var font10 = new FontFaceObserver('Noto Sans JP', { weight: 100 });
var font11 = new FontFaceObserver('Noto Sans JP', { weight: 300 });
var font12 = new FontFaceObserver('Noto Sans JP', { weight: 400 });
var font13 = new FontFaceObserver('Noto Sans JP', { weight: 500 });
var font14 = new FontFaceObserver('Noto Sans JP', { weight: 700 });
var font15 = new FontFaceObserver('Noto Sans JP', { weight: 900 });

Promise.all([
    font1.load('a'), font2.load('あ'), font3.load('あ'), font4.load('あ'), font5.load('あ'), font6.load('あ'), font7.load('あ'), font8.load('あ')
]).then(function () {
    console.log('Font is available');
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
});

let jpFont = 'Noto Serif JP';
let fontWeight = 900;

let notoSansLoaded = false;
notosans.addEventListener('click', () => {
    if(!notoSansLoaded) {
        Promise.all([
            font10.load('あ'), font11.load('あ'), font12.load('あ'), font13.load('あ'), font14.load('あ'), font15.load('あ')
        ]).then(function () {
            notoSansLoaded = true;
            jpFont = 'Noto Sans JP';
            drawLetter();
        });
    } else {
        jpFont = 'Noto Sans JP';
        drawLetter();
    }
});

notoserif.addEventListener('click', () => {
    jpFont = 'Noto Serif JP';
    drawLetter();
});


// font1.load('a').then(() => {
//     font2.load('あ').then(() => {
//         font3.load('あ').then(() => {
            
//         });
//     })
// })






let x = 3;
let y = 4.3;

let originalResolution = 500;
let scale = 0.5;
let resolution = originalResolution * scale;
let w = resolution * x;
let h = resolution * y;

var canvas = new fabric.Canvas('c', { preserveObjectStacking: true, width: w, height: h, backgroundColor: "#fff", isDrawingMode: true });

resHandle.addEventListener('change', (evt) => {
    console.log(evt.target.value);
    scale = parseFloat(evt.target.value);
    resolution = originalResolution * scale;
    w = resolution * x;
    h = resolution * y;    
    canvas.setDimensions({width:w, height:h});
    canvas.freeDrawingBrush.width = 4 * scale;
    drawLetter();
})


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

let boxCountH = 8;
boxMinus.addEventListener('click', () => {
    boxCountH--;
    boxCountH = Math.max(5, boxCountH);
    drawLetter();
})
boxPlus.addEventListener('click', () => {
    boxCountH++;
    drawLetter();
})

weights.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (evt) => {
        fontWeight = evt.target.innerText;
        drawLetter();
    })
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
        height: 0.1 * w,
        left: 0.05 * w,
        top: 0.05 * w,
        fill: 'transparent', stroke: '#000', strokeWidth: 4 * scale, rx: 10 * scale, ry: 10 * scale
    }))

    canvas.add(new fabric.Text(letter.char, {
        selectable: false, eventable: false,
        fontWeight: 'normal', textAlign: 'left', fontFamily: jpFont, fontWeight: fontWeight,
        top: 0.005 * w + 0.1 * w, left: 0.05 * w + 0.1 * w, originX: 'center', originY: 'center', fontSize: 100 * scale
    }));

    canvas.add(new fabric.Rect({
        selectable: false, eventable: false,
        width: 0.2 * w,
        height: 0.1 * w,
        left: 0.3 * w,
        top: 0.05 * w,
        fill: 'transparent', stroke: '#000', strokeWidth: 4 * scale, rx: 10 * scale, ry: 10 * scale
    }))

    canvas.add(new fabric.Text(letter.romanization, {
        selectable: false, eventable: false,
        fontWeight: 'normal', textAlign: 'left', fontFamily: 'Noto Sans',
        top: 0.005 * w + 0.1 * w, left: 0.3 * w + 0.1 * w, originX: 'center', originY: 'center', fontSize: 120 * scale
    }));

    canvas.add(new fabric.Rect({
        selectable: false, eventable: false,
        width: 0.4 * w,
        height: 0.1 * w,
        left: 0.55 * w,
        top: 0.05 * w,
        fill: 'transparent', stroke: '#000', strokeWidth: 4 * scale, rx: 10 * scale, ry: 10 * scale
    }))

    canvas.add(new fabric.Text(letter.name.toLowerCase(), {
        selectable: false, eventable: false, backgroundColor: '#fff',
        fontWeight: 'normal', textAlign: 'left', fontFamily: 'Noto Sans',
        top: 0.005 * w + 0.1 * w, left: 0.55 * w + 0.2 * w, originX: 'center', originY: 'center', fontSize: 40 * scale
    }));

    // 18 x 21

    let letterBoxContainerH = 1.15 * w;
    let letterBoxContainerW = 0.9 * w;
    let boxCountV = Math.floor((letterBoxContainerH * boxCountH) / letterBoxContainerW);

    // vertical lines
    for (let ii = 0; ii <= boxCountH; ii++) {
        canvas.add(new fabric.Rect({
            selectable: false, eventable: false,
            left: 0.05 * w + (letterBoxContainerW / boxCountH * ii),
            top: w * 0.2,
            width: 4 * scale,
            height: 1.15 * w,
            fill: '#ccc'
        }));
    }

    // horizontal lines
    for (let ii = 0; ii <= boxCountV; ii++) {
        canvas.add(new fabric.Rect({
            selectable: false, eventable: false,
            left: 0.05 * w,
            top: w * 0.2 + (letterBoxContainerH / boxCountV * ii),
            width: 0.9 * w,
            height: 4 * scale,
            fill: '#ccc'
        }));
    }


    // horizontal lines
    for (let ii = 0; ii < boxCountV; ii++) {
        for (let jj = 0; jj < boxCountH; jj++) {
            canvas.add(new fabric.Text(letter.char, {
                selectable: false, eventable: false,
                fontWeight: 'normal', textAlign: 'left', fontFamily: jpFont,
                left: 0.05 * w + (letterBoxContainerW / boxCountH * jj) + (letterBoxContainerW / boxCountH) / 2, opacity: 0.1, fontWeight: fontWeight,
                top: w * 0.2 + (letterBoxContainerH / boxCountV * ii) + (letterBoxContainerH / boxCountV) / 2, originX: 'center', originY: 'center', fontSize: 700 / boxCountH * scale
            }));
        }
    }
}

down.addEventListener('click', () => {
    canvas.getElement().toBlob(function (blob) {
        saveAs(blob, letters[activeLetter].romanization + '_' + fontWeight);
    });
});




clearEl.addEventListener('click', () => drawLetter());



if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = '#000';
    //canvas.freeDrawingBrush.source = canvas.freeDrawingBrush;
    canvas.freeDrawingBrush.width = 4 * scale;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 2,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: '#000',
    });
}