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

function possibilitiesCheck() {

  var possibilities = new Array(9);
  var columns = new Array(9);
  var square3X3 = new Array(9);

  for (var insideDimension=0; insideDimension<9; insideDimension++) {
    columns[insideDimension] = [];
    possibilities[insideDimension] = [];
    square3X3[insideDimension] = [];
  }

  // Make column by turn array side way
  var rowI = 0;
  var columnJ = 0;

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
  ////^^^^^^^^^^^^^^^////

  function addPossibilityCheckRow(row,i) {
    if (soduku[row].indexOf(i) === -1) {
      return i;
    }
  }

  function addPossibilityCheckColumn(row,i) {
    if (columns[row].indexOf(i) === -1) {
      // console.log(i + " not found in row " + row);
      return i;
    }
  }

  function addPossibilityCheckSquare(rowx,ix) {
    if (square3X3[rowx].indexOf(i) === -1) {
      // console.log(ix + " not found in square " + rowx);
      return ix;
    }
  }

  for (var row=0; row<9; row++) {
    for (var column=0; column<9; column++ ) {
      if (soduku[row][column] === 0) {
        // possibilities[(row*9)+column] = [];
        possibilities[row][column] = [];
        for (var i=1; i<=9; i++) {
          possibilities[row][column].push(addPossibilityCheckRow(row,i));
          possibilities[row][column].push(addPossibilityCheckColumn(column,i));
          possibilities[row][column].push(addPossibilityCheckSquare((Math.floor(row/3)*3 + Math.floor(column/3)),i));

        }
      }
    }
  }
}

function sodukuSolver() {
// var possibilities = new Array(81);

    var reducePoss = new Array(9);
    var reducePoss1 = new Array(9);

    for (var insideDimension=0; insideDimension<9; insideDimension++) {
      reducePoss[insideDimension] = [];
      reducePoss1[insideDimension] = [];
    }

    // possibilities.forEach( function(e) { console.log(e) });

    function print(e) {
      console.log(e);
    }



    //Make 3X3
    // var rowI = 0;
    // var columnJ = 0;
    // var squareK = 0;
    //
    // function make3X3(e) {
    //   square3X3[squareK][columnJ] = e;
    //   columnJ++;
    //   if (columnJ%3 === 0) {
    //     rowI++;
    //     columnJ = 0;
    //     squareK++;
    //
    //   }
    // }
    //
    // for (var row=0; row<9; row++) {
    //   soduku[row].forEach(makeColumn);
    // }
    //^^^^^^^^^^^^^^^////


    function make3x3() {
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
              // console.log(soduku[i][j]);
              // console.log("i is " + i);
              // console.log("j is " + j);
              // console.log("y is " + y);
              square3X3[z][zz] = (soduku[i][j]);
              zz++;
            }
            // console.log("---");
          }
          y+=3;
          z++;
          zz=0;
        }
        x+=3;
        y=0;
      }
    };

    make3x3();

    possibilitiesCheck();

    function removeUndefined(e) {
      if(e != undefined ) {
        return true;
      }
    }

    var row = 0;
    var column = 0;
    for (var row = 0; row<9; row++) {
      for (var column = 0; column<9; column++ ) {
        if (soduku[row][column] === 0) {
          reducePoss[row][column] = possibilities[row][column].sort().filter( function(e,index) { if (e === possibilities[row][column].sort()[index+2]) { return true } } );
          reducePoss1[row][column] = reducePoss[row][column].filter(removeUndefined);

        }
      }
    }

    for (var row = 0; row<9; row++) {
      for (var column = 0; column<9; column++ ) {
        if (soduku[row][column] === 0) {
          if (reducePoss1[row][column].length === 1) {
            soduku[row][column] = reducePoss1[row][column][0];
            console.log("Filled in a " + reducePoss1[row][column][0] );
          }
        }
      }
    }
}

sodukuSolver();
soduku.forEach( function(e) { console.log(e) });


sodukuSolver();
soduku.forEach( function(e) { console.log(e) });

sodukuSolver();
soduku.forEach( function(e) { console.log(e) });
// console.log("---");
// reducePoss1.forEach( function(e) { console.log(e) });
// console.log("---");
// possibilities.forEach( function(e) { console.log(e) });
// console.log("---");
sodukuSolver();
soduku.forEach( function(e) { console.log(e) });
console.log("---");
sodukuSolver();
soduku.forEach( function(e) { console.log(e) });
console.log("---");
sodukuSolver();
soduku.forEach( function(e) { console.log(e) });
