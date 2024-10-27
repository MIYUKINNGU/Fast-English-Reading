function fontchange() {
    let fontsize = document.getElementById("font");
    let centence = document.getElementById("centence");
    let pixel = document.getElementById("pixel");
    pixel.innerText = `${fontsize.value}px`
    centence.style.fontSize = `${fontsize.value}px`;
}

function speedbar() {
    let speedbar = document.getElementById("speedbar");
    let speed = document.getElementById("speed");
    let v = 185*(speed.value-70)/430+15;
    if (v <= 15) v = 15;
    if (v >= 200) v = 200;
    speedbar.style.width = `${v}px`
    switch (Math.ceil(v/50)) {
        case 0:
        case 1:
            speedbar.style.backgroundColor = "#22CC22";
            break;
        case 2:
            speedbar.style.backgroundColor = "#E0E022";
            break;
        case 3:
            speedbar.style.backgroundColor = "#CC8855";
            break;
        case 4:
            speedbar.style.backgroundColor = "#AA3300";
            break;
    }
}

let Isrunning = false;

function stop() {
    Isrunning = false;
}
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
async function trying() {
    Isrunning = true;
    let centence = document.getElementById("centence");
    let text = document.getElementById("text").value;
    let speed = document.getElementById("speed").value;
    let tl = text.replaceAll(/[!]\s/g,"!! ").replaceAll(/[.]\s/g,".! ").replaceAll(/[?]\s/g,"?! ").replaceAll(/[:]\s/g,":! ").split(/[!]\s/g).map((v)=>v.split(/\s/g))
    for (let I = 0; I < tl.length; I++) {
        let value = tl[I];
        let i = 0;
        let displaytext = " ";
        value = value.filter((v)=>v!="")
        for (let j = 0; j < value.length; j++) {
            if (!Isrunning) return;
            let v = value[j];
            displaytext += v + " ";
            i++;
            if (i==7) {
                centence.innerText = displaytext;
                console.log(displaytext);
                await sleep(i * 60000/speed);
                displaytext = ""
                i = 0;
            }
        };
        if (i != 0) {centence.innerText = displaytext; await sleep(Math.max(i * 60000/speed, 150));}
    };
    centence.innerText = "終わりです。";
}
