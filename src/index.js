module.exports = function solveSudoku(matrix) {
  // your solution
  var options = [];

  solveSimple(matrix);

  if (solved(matrix)) {    
    return matrix;
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (matrix[i][j] == 0) {
        options = getOptions(matrix, i, j);
        for (var k = 0; k < options.length; k++) {
        matrix[i][j] = options[k];
        solveSudoku(matrix);
        if (solved(matrix)) {          
          return matrix;
        }          
          matrix[i][j] = 0;
        }
      }
    }
  }  

  return matrix;
}

function getOptions(matrix, row, col) {
  var dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var k = 0; k < 9; k++) {
    if (matrix[row][k] > 0) {
      if (dummy.indexOf(matrix[row][k]) !== -1) {
        dummy.splice(dummy.indexOf(matrix[row][k]), 1);
      }
    }
  }

  for (k = 0; k < 9; k++) {
    if (matrix[k][col] > 0) {
      if (dummy.indexOf(matrix[k][col]) !== -1) {
        dummy.splice(dummy.indexOf(matrix[k][col]), 1);
      }
    }
  }

  var lStart = Math.floor(row/3)*3;
  var mStart = Math.floor(col/3)*3;

  for (var l = lStart; l < lStart+3; l++) {
    for (var m = mStart; m < mStart+3; m++){
      if (matrix[l][m] > 0) {
        if (dummy.indexOf(matrix[l][m]) !== -1) {
          dummy.splice(dummy.indexOf(matrix[l][m]), 1);
        }
      }
    }
  }


  return dummy;
}

function zeros(matrix){
  var z = 0;

  for (var l=0; l<9; l++) {
    for (var m=0; m<9; m++){
      if (matrix[l][m] === 0) z++;
    }
  }

  return z;
}

function solved(matrix) {
  if (zeros(matrix) == 0) return true;
  return false;
}

function solveSimple(matrix) {
  var cond = 1;
  var flag = 0;

  while (cond) {
    flag = zeros(matrix);

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (matrix[i][j] == 0) {
          options = getOptions(matrix, i, j);
          if (options.length == 1) {            
            matrix[i][j] = options[0];
          }
          if (solved(matrix)) return matrix;
        }
      }
    }

    if (flag === zeros(matrix)) cond = 0;
  }

  return matrix;
}