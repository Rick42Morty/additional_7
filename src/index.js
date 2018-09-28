module.exports = function solveSudoku(matrix) {
  // your solution
  solveSud(matrix);
  return matrix;
}

function solveSud(matrix) {

  if (noZeros(matrix)) return true;

  // находим координаты незаполненной клетки с наименьшим
  // количеством подходящих вариантов

  let x = 0;
  let y = 0;
  let options = [];
  let minLen = 9;
  let len = 0;

  for (let i = 0; i < 9; i++) {
    for (let j=0; j <9; j++) {
      if (matrix[i][j] == 0) {
        options = getOptions(matrix, i, j);
        if (options === false) return false;
        len = options.length;
        if (len < minLen) {
          minLen = len;
          x = i;
          y = j;
        }
      }
    }
  }

  options = getOptions(matrix, x, y);
  for (let k = 0; k < options.length; k++) {
    matrix[x][y] = options[k];
    if (solveSud(matrix)) return true;
    matrix[x][y] = 0;
  }

return false;  
}

function getOptions(matrix, row, col) {
  let dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let k = 0; k < 9; k++) {
    if (matrix[row][k] > 0) {
      if (dummy.indexOf(matrix[row][k]) !== -1) {
        dummy.splice(dummy.indexOf(matrix[row][k]), 1);
        if (dummy.length == 0) return false;
      }
    }
  }

  for (k = 0; k < 9; k++) {
    if (matrix[k][col] > 0) {
      if (dummy.indexOf(matrix[k][col]) !== -1) {
        dummy.splice(dummy.indexOf(matrix[k][col]), 1);
        if (dummy.length == 0) return false;
      }
    }
  }


  var lStart = Math.floor(row/3)*3;
  var mStart = Math.floor(col/3)*3;

  for (let l = lStart; l < lStart+3; l++) {
    for (let m = mStart; m < mStart+3; m++){
      if (matrix[l][m] > 0) {
        if (dummy.indexOf(matrix[l][m]) !== -1) {
          dummy.splice(dummy.indexOf(matrix[l][m]), 1);
          if (dummy.length == 0) return false;
        }
      }
    }
  }  
  return dummy;
}

function noZeros(matrix){

  for (let l=0; l<9; l++) {
    for (let m=0; m<9; m++){
      if (matrix[l][m] === 0) return false;
    }
  }

  return true;
}