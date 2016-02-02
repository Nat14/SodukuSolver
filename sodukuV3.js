var soduku =
    [[0, 6, 0, 1, 0, 4, 0, 5, 0],
    [0, 0, 8, 3, 0, 5, 6, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 1],
    [8, 0, 0, 4, 0, 7, 0, 0, 6],
    [0, 0, 6, 0, 0, 0, 3, 0, 0],
    [7, 0, 0, 9, 0, 1, 0, 0, 4],
    [5, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 7, 2, 0, 6, 9, 0, 0],
    [0, 4, 0, 5, 0, 8, 0, 7, 0]];

var columns = new Array(9);
var square3X3 = new Array(9);
var possibilities = new Array(9);



function createTwoDimensionArray(arr) {
  for (var insideDimension=0; insideDimension<9; insideDimension++) {
    arr[insideDimension] = [];
  }
}

function makeColumnArray() {
  var rowI = 0;
  var columnJ = 0;

  createTwoDimensionArray(columns);

  function makeColumn(e) {
    columns[columnJ][rowI] = e;
    columnJ++;
    if (columnJ%9 === 0) {
      rowI++;
      columnJ = 0;
    }
  }

  for (var row=0; row<9; row++) {
    soduku[row].forEach(makeColumn);
  }
}

function create3X3Array() {

  createTwoDimensionArray(square3X3);

    var x = 0;
    var y = 0;
    var z = 0;
    var zz = 0;

    for(var l = 0; l<3; l++) {
      for (var k=0; k<3; k++) {
        var xStop = 3+x;
        for(i=x; i < xStop; i++) {
          var yStop = 3+y;
          for(j=y; j < yStop; j++) {
            square3X3[z][zz] = (soduku[i][j]);
            zz++;
          }
        }
        y+=3;
        z++;
        zz=0;
      }
      x+=3;
      y=0;
    }
}

function possibilitiesCheck() {

  createTwoDimensionArray(possibilities);

  function addPossibilities(rowx, columnx, squarex, ix) {
    if ((soduku[rowx].indexOf(i) === -1) && (columns[columnx].indexOf(i) === -1) && (square3X3[squarex].indexOf(i) === -1)) {
      return ix;
    }
  }

  for (var row=0; row<9; row++) {
    for (var column=0; column<9; column++ ) {
      if (soduku[row][column] === 0) {
        possibilities[row][column] = [];
        for (var i=1; i<=9; i++) {
          if (addPossibilities(row, column, (Math.floor(row/3)*3 + Math.floor(column/3)), i) != undefined) {
            possibilities[row][column].push(i);
          }

        }
      }
    }
  }
}

function sodukuSolver() {

    makeColumnArray();
    create3X3Array();
    possibilitiesCheck();
    for (var row = 0; row<9; row++) {
      for (var column = 0; column<9; column++ ) {
        if (soduku[row][column] === 0) {
          if (possibilities[row][column].length === 1) {
            soduku[row][column] = possibilities[row][column][0];
            console.log("Filled in a " + possibilities[row][column][0] );

            //cannot fill in if it has same number twice on the reducePossibility
          }
        }
      }
    }
}

function print(e) {
  console.log(e);
}

var total = 0;

function totalNumber(e) {
  total = total + parseInt(e);
}

function compareTotal() {

  for (var i = 0; i < 9; i++) {
    soduku[i].forEach(totalNumber)
  }
  console.log(total);
}


//copy from http://blog.andrewray.me/how-to-clone-a-nested-array-in-javascript/
function arrayClone( arr ) {

    var i, copy;

    if( Array.isArray( arr ) ) {
        copy = arr.slice( 0 );
        for( i = 0; i < copy.length; i++ ) {
            copy[ i ] = arrayClone( copy[ i ] );
        }
        return copy;
    } else if( typeof arr === 'object' ) {
        throw 'Cannot clone array containing an object!';
    } else {
        return arr;
    }
}
///^^^///

function runningSolver() {
  var zeroPosition = 0;
  while ((soduku.join().split(',').sort().lastIndexOf("0") != -1) && (soduku.join().split(',').sort().lastIndexOf("0") != zeroPosition)) {
    zeroPosition = soduku.join().split(',').sort().lastIndexOf("0");
    console.log(zeroPosition);
    sodukuSolver();
    console.log("---");
    soduku.forEach(print);
  }
}

var startSoduku = [];
startSoduku = arrayClone(soduku);
runningSolver();
var saveSoduku = [];
saveSoduku = arrayClone(soduku);
var savePossibilities = [];
savePossibilities = arrayClone(possibilities);

for (var pp = 0; pp<9; pp++) {
  for (var p = 0; p<9; p++) {
    if (savePossibilities[pp][p] != undefined) {
      var numberToTry = savePossibilities[pp][p];

      for (var x = 0; x < numberToTry.length; x++) {
        soduku[pp][p] = numberToTry[x];
        console.log("tttttttry " + numberToTry[x]);
        runningSolver();
        compareTotal();
        if (total === 405) {
          break;
        }
        total = 0;
        columns = new Array(9);
        square3X3 = new Array(9);
        possibilities = new Array(9);
        soduku = arrayClone(saveSoduku);
      }
    }
    if (total === 405) {
      break;
    }
  }
  if (total === 405) {
    break;
  }
}

console.log("*** Soduku to solve ***");
saveSoduku.forEach(print)
console.log("*** Solved!!! ***");
soduku.forEach(print);
