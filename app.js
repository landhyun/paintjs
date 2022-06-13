const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 디폴트 라인 색상
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //디폴트 라인 너비

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

// 움직임 감지 및 라인 만들기
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //마우스를 가져다댈 시
    // path를 만들어 마우스의 x, y좌표로 넣기 [마우스를 움직이는 모든 순간(마우스 시작점)마다 path 생성]
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    // 클릭 시
    // x, y좌표 위에 라인 생성. 마우스를 움직이는 동안 항상 발생
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 옵션 override | 디폴트 라인 너비에서 해당 target의 value로 변경
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;  // 옵션 override | 디폴트 라인 색상에서 해당 target의 backgroundcolor로 변경
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    // 마우스 우클릭 방지
    event.preventDefault;
}

function onMouseUp(event) {
    stopPainting()
}

function handleSaveClick() {
    const image = canvas.toDataURL(); // type 미기재 시 디폴트 png 저장
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJSresult🌈"; //PaintJSresult🌈.png파일로 다운로드
    link.click();   
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", handleCanvasClick);
    canvas.addEventListener("cilck", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//jsColor div 클릭 시 해당 div의 style을 array로 출력
Array.from(colors).forEach(lineColor => lineColor.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}    

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}