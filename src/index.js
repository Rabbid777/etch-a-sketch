const input = document.querySelector(`input`);
const btn = document.querySelector(`button`);
btn.addEventListener(`click`, run);

function run(){
    let numberOfColumn = 0;
    clearContainer();

    if (!validateInput(input.value)) {
        input.placeholder = `Неправильный ввод`;
        input.value = ``;
    }
    else {
        numberOfColumn = input.value;
        input.placeholder = `Введите количество столбцов`;
        drawGrid(numberOfColumn);
    }

    input.focus();
}

function validateInput(playerValue) {
    return (playerValue && !isNaN(playerValue) && playerValue <= 300 && playerValue > 0);
}

function clearContainer() {
    if (document.querySelector(`.grid`)) {
        document.querySelector(`.grid`).remove();
        document.querySelector(`.output`).remove();
    }
}

function drawGrid(numberOfColumn) {
    let drawingArea = document.querySelector(`#drawing-area`);
    let grid = document.createElement(`div`);
    grid.classList.add(`grid`);
    drawingArea.appendChild(grid);

    let numberOfRows = Math.round(numberOfColumn * (2 / 3));
    grid.setAttribute(`style`, `grid-template-columns: repeat(${numberOfColumn}, 1fr); 
                                grid-template-rows: repeat(${numberOfRows}, 1fr);`);

    for(let i = 1; i <= numberOfColumn * numberOfRows; i++) {
        let div = document.createElement('div');
        div.addEventListener(`mouseover`,paintCell);
        grid.appendChild(div);
    }

    createOutputInfo(numberOfColumn,numberOfRows);
    createSaveImageButton();
}

function createOutputInfo(numberOfColumn, numberOfRows) {
    let span = document.createElement(`span`);
    span.classList.add(`output`);
    span.textContent=`Количество клеток: ${numberOfColumn*numberOfRows}  (${numberOfColumn}x ${numberOfRows}y)`;
    document.querySelector(`.header`).appendChild(span);
}

function createSaveImageButton(){
    let button = document.createElement(`button`);
    button.classList.add(`save-button`);
    button.textContent = `Сохранить изображение`;
    button.addEventListener(`click`, saveImage);
    document.querySelector(`.header`).appendChild(button);
}

function saveImage(e){
    html2canvas(document.querySelector("#drawing-area")).then(canvas => {
        let container = document.querySelector(`#canvas-container`);
        container.classList.toggle(`hide`);
        canvas.style.top = `${Math.floor((document.documentElement.clientHeight - canvas.height) / 2)}px`;
        canvas.style.left = `${Math.floor((document.documentElement.clientWidth - canvas.width) / 2) + 1}px`;
        createExitButton();
        container.appendChild(canvas);
    })
}

function createExitButton(){
    let button = document.createElement(`div`);
    button.classList.add(`exit-button`);
    button.innerHTML = `<img src = img/x-mark.png alt = 'exit'>`;
    button.addEventListener(`click`, returnToDraw);
    document.querySelector(`#canvas-container`).appendChild(button);
}

function returnToDraw(){
    let container = document.querySelector(`#canvas-container`);
    container.classList.toggle(`hide`);
    for (let child of container.childNodes){
        container.removeChild(child);
    }
}

function paintCell(e) {
    if(this.getAttribute(`style`)) {
        let colorsStr = this.getAttribute(`style`);
        let colors = colorsStr.slice(colorsStr.indexOf(`(`) + 1, colorsStr.indexOf(`)`)).split(`, `);
        let coefDim = 255 * 0.1;
        this.setAttribute(`style`, `background-color:rgb(${colors[0] - coefDim}, ${colors[1] - coefDim}, ${colors[2] - coefDim});`);
    }
    else {
        let colorRed = getRndInteger(0, 255);
        let colorGreen = getRndInteger(0, 255);
        let colorBlue = getRndInteger(0, 255);
        this.setAttribute(`style`,`background-color:rgb(${colorRed}, ${colorGreen}, ${colorBlue});`);
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}