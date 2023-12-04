class Sudoku {
    constructor() {
        this.tableroString = this.inicializarTablero();
        this.filas = 9;
        this.columnas = 9;
        this.tablero = Array.from({ length: this.filas }, () => Array(this.columnas));
        this.isSelectedCell = false;
        this.selectedCell = { row: -1, column: -1 };

        this.start();
        this.addEventListeners();
    }

    start() {
        const splitTablero = this.tableroString.replace(new RegExp(`\\.`, "g"), "0").match(new RegExp(`.{1,9}`, "g")) || [];
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                this.tablero[i][j] = splitTablero[i][j];
            }
        }
    }

    createStructure() {
        const main = document.querySelector("main");

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const paragraph = document.createElement("p");
                if (this.tablero[i][j] === "0") {
                    paragraph.onclick = this.onCellClick.bind(paragraph, this, i, j);
                } else {
                    paragraph.textContent = this.tablero[i][j];
                    paragraph.dataset.state = "blocked";
                }

                main.appendChild(paragraph);
            }
        }
    }

    paintSudoku() {
        this.createStructure();
    }

    onCellClick(sudoku, row, column) {
        const paragraphs = document.getElementsByTagName("p");
        // Eliminar las celdas seleccionadas antes
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraph = paragraphs[i];
            if (paragraph.dataset.state === "clicked") {
                delete paragraph.dataset.state;
            }
        }

        this.dataset.state = "clicked";

        sudoku.isSelectedCell = true;
        sudoku.selectedCell = { row, column }
    }

    introduceNumber(numeroIntroducido) {
        if (this.validRow(numeroIntroducido)
            && this.validColumn(numeroIntroducido)
            && this.validSquare(numeroIntroducido)) {

            const paragraphs = document.getElementsByTagName("p");
            // Eliminar manejador de eventos y poner estado a correcto
            for (let i = 0; i < paragraphs.length; i++) {
                const paragraph = paragraphs[i];
                if (paragraph.dataset.state === "clicked") {
                    paragraph.dataset.state = "correct";
                    paragraph.onclick = null;
                    paragraph.textContent = numeroIntroducido;
                }
            }
        }

        // checkSudokuCmplmeted);
    }

    validRow(number) {
        return !this.tablero[this.selectedCell.row].includes(number);
    }

    validColumn(number) {
        for (let i = 0; i < 9; i++) {
            if (this.tablero[i][this.selectedCell.column] === number) {
                return false;
            }
        }
        return true;
    }

    validSquare(number) {
        const squareStartRow = Math.floor(this.selectedCell.row / 3) * 3;
        const squareStartColumn = Math.floor(this.selectedCell.column / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.tablero[squareStartRow + i][squareStartColumn + j] === number) {
                    return false;
                }
            }
        }

        return true;
    }


    inicializarTablero() {
        const random = Math.floor(Math.random() * 3);

        switch (random) {
            case 0:
                return "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
            case 1:
                return "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7";
            case 2:
                return "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984";
            default:
                break;
        }
    }

    addEventListeners() {
        window.addEventListener("keydown", event => {
            if (event.key >= "0" && event.key <= "9") {
                if (this.isSelectedCell) {
                    this.introduceNumber(event.key);
                } else {
                    alert("Debes tener una celda seleccionada para introducir un número");
                }
            } else {
                event.preventDefault();
            }
        });
    }
}
