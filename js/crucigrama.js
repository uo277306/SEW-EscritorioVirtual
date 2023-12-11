class Crucigrama {
    constructor() {
        this.board = this.initBoard();
        this.columns = 9;
        this.rows = 11;
        this.init_time;
        this.end_time;
        this.boardMatrix = Array.from({ length: this.rows }, () => Array(this.columns));
        this.selectedCell = { row: -1, column: -1 };

        this.start();
        this.addEventListeners();
    }

    initBoard() {
        const random = Math.floor(Math.random() * 3);

        switch (random) {
            case 0:
                return '4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16';
            case 1:
                return '12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32';
            case 2:
                return '4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72';
            default:
                break;
        }
    }

    start() {
        const boardArray = this.board.replace(new RegExp(`\\.`, 'g'), '0').replace(new RegExp(`\\#`, 'g'), '-1').split(',');
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.boardMatrix[i][j] = boardArray[i * this.columns + j];
            }
        }
    }

    paintMathword() {
        const mainElement = $('main');

        this.boardMatrix.forEach((row, i) => {
            row.forEach((column, j) => {
                const paragraph = $('<p>');

                if (column == 0) {
                    paragraph.attr('data-state', 'clickable');
                    paragraph.text("");
                    paragraph.on("click", this.handleClick.bind(paragraph, this, i, j));
                } else if (column == -1) {
                    paragraph.attr('data-state', 'empty');
                    paragraph.text("");
                } else {
                    paragraph.text(column);
                    paragraph.attr('data-state', 'blocked');
                }

                mainElement.append(paragraph);
            });
        });

        this.init_time = new Date();
    }

    handleClick(crucigram, row, column) {
        const paragraphs = document.getElementsByTagName('p');
        // Eliminar las celdas seleccionadas antes
        for (let i = 0; i < paragraphs.length; i++) {
            const paragraph = paragraphs[i];
            if (paragraph.dataset.state === 'clicked') {
                paragraph.dataset.state = 'clickable';
            }
        }

        this.attr('data-state', 'clicked');
        crucigram.selectedCell = { row, column }
    }

    check_win_condition() {
        let didWin = true;
        this.boardMatrix.forEach(row => {
            row.forEach((column) => {
                if (column == 0) {
                    didWin = false;
                }
            });
        });
        return didWin;
    }

    calculate_date_difference() {
        return new Date(this.end_time - this.init_time).toTimeString().split(" ")[0];
    }

    introduceElement(valorIntroducido) {
        let expression_row = true;
        let expression_col = true;

        const paragraphs = document.getElementsByTagName('p');

        for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
            const paragraph = paragraphs[paragraphIndex];
            if (paragraph.dataset.state === 'clicked') {
                paragraph.textContent = valorIntroducido;
                this.boardMatrix[this.selectedCell.row][this.selectedCell.column] = valorIntroducido;

                // Horizontal
                let i = 1;
                let rightCellValue = this.boardMatrix[this.selectedCell.row][this.selectedCell.column + i];

                while (rightCellValue != -1 && rightCellValue != undefined) {
                    if (rightCellValue == "=") {
                        const first_number = this.boardMatrix[this.selectedCell.row][this.selectedCell.column + i - 3];
                        const expression = this.boardMatrix[this.selectedCell.row][this.selectedCell.column + i - 2];
                        const second_number = this.boardMatrix[this.selectedCell.row][this.selectedCell.column + i - 1];
                        const result = this.boardMatrix[this.selectedCell.row][this.selectedCell.column + i + 1];

                        if (first_number != 0 && expression != 0 && second_number != 0 && result != 0) {
                            const mathExpression = [first_number, expression, second_number].join('');
                            if (eval(mathExpression) != result) {
                                expression_row = false;
                            }
                        }

                    }
                    i++;
                    rightCellValue = this.boardMatrix[this.selectedCell.row][this.selectedCell.column + i];
                }


                // Vertical
                let j = 1;
                let bottomCellValue = this.boardMatrix[this.selectedCell.row + j][this.selectedCell.column];

                while (bottomCellValue != -1 && bottomCellValue != undefined) {
                    if (bottomCellValue == "=") {
                        const first_number = this.boardMatrix[this.selectedCell.row + j - 3][this.selectedCell.column];
                        const expression = this.boardMatrix[this.selectedCell.row + j - 2][this.selectedCell.column];
                        const second_number = this.boardMatrix[this.selectedCell.row + j - 1][this.selectedCell.column];
                        const result = this.boardMatrix[this.selectedCell.row + j + 1][this.selectedCell.column];

                        if (first_number != 0 && expression != 0 && second_number != 0 && result != 0) {
                            const mathExpression = [first_number, expression, second_number].join('');
                            if (eval(mathExpression) != result) {
                                expression_col = false;
                            }
                        }
                    }
                    j++;
                    bottomCellValue = this.boardMatrix[this.selectedCell.row + j][this.selectedCell.column];
                }


                if (expression_row && expression_col) {
                    paragraph.dataset.state = 'correct';
                } else {
                    paragraph.textContent = "";
                    this.boardMatrix[this.selectedCell.row][this.selectedCell.column] = 0;
                    
                    paragraph.dataset.state = 'clickable';
                    alert('El número introducido no es correcto');
                }
            }
        }

        if (this.check_win_condition()) {
            this.end_time = new Date();

            alert(`Has tardado ${this.calculate_date_difference()} en completar el crucigrama`);
        }
    }

    addEventListeners() {
        window.addEventListener('keydown', event => {
            const allowedKeys = /[1-9+\-*/]/;
            if (allowedKeys.test(event.key)) {
                if (this.selectedCell.row != -1 && this.selectedCell.column != -1) {
                    this.introduceElement(event.key);
                } else {
                    alert('Debes tener una celda seleccionada para introducir un número');
                }
            } else {
                event.preventDefault();
            }
        });
    }
}

