export default class Sudoku {
  constructor(index, value) {
    this.index = index;
    this.value = value;
    this.sudokuSolved = [
      8, 7, 1, 5, 4, 3, 9, 2, 6, 3, 4, 9, 6, 2, 7, 8, 5, 1, 2, 5, 6, 1, 9, 8, 4,
      7, 3, 5, 9, 8, 2, 6, 1, 7, 3, 4, 7, 6, 4, 8, 3, 5, 2, 1, 9, 1, 3, 2, 9, 7,
      4, 6, 8, 5, 4, 2, 7, 3, 1, 9, 5, 6, 8, 9, 1, 5, 7, 8, 6, 3, 4, 2, 6, 8, 3,
      4, 5, 2, 1, 9, 7,
    ];
  }

  static sudokuPuzzle = [
    8, 0, 1, 5, 0, 3, 9, 0, 6, 0, 0, 9, 0, 0, 7, 8, 5, 0, 2, 5, 0, 1, 0, 0, 4,
    7, 0, 5, 0, 0, 0, 6, 1, 7, 0, 4, 7, 6, 4, 8, 3, 0, 0, 0, 0, 0, 3, 2, 0, 0,
    0, 0, 0, 0, 0, 2, 0, 0, 1, 9, 5, 0, 0, 0, 0, 5, 0, 0, 0, 3, 0, 2, 0, 0, 0,
    4, 5, 2, 1, 9, 7,
  ];

  checkTheValue() {
    if (this.value === this.sudokuSolved[this.index]) {
      Sudoku.sudokuPuzzle[this.index] = this.value;
      return "Correct";
    } else {
      return "Wrong";
    }
  }

  handleWin() {
    if (!Sudoku.sudokuPuzzle.includes(0)) {
      if (
        JSON.stringify(Sudoku.sudokuPuzzle) ===
        JSON.stringify(this.sudokuSolved)
      ) {
        return "You Win!";
      }
    }
  }
}

// let s = new Sudoku(0, 8);
// s.checkTheValue();
// s.handleWin()

// let t = new Sudoku(80, 7);
// t.checkTheValue();
// t.handleWin()
