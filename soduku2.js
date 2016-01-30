var soduku =
    [[1, 6, 0, 1, 0, 4, 0, 5, 0],
    [0, 0, 8, 3, 0, 5, 6, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 1],
    [8, 0, 0, 4, 0, 7, 0, 0, 6],
    [0, 0, 6, 0, 0, 0, 3, 0, 0],
    [7, 0, 0, 9, 0, 1, 0, 0, 4],
    [5, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 7, 2, 0, 6, 9, 0, 0],
    [0, 4, 0, 5, 0, 8, 0, 7, 0]];


var square3X3 = [];

for (var insideDimension=0; insideDimension<9; insideDimension++) {
  square3X3[insideDimension] = [];
}

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
} ;




make3x3();
