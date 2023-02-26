const listColor = {
  '1': 'xanh',
  '2': 'đỏ',
  '3': 'tím',
  'NO_COLOR': 'kong ton tai',
};

function getColor(colorId) {
  return listColor[colorId] || listColor.NO_COLOR;
}

getColor();

/*
Nhap so a,b
Neu a=1 => a+b*1
Neu a=2 => a+b*4
Neu a=3 => a+b*8
Neu a# => 0
*/

const listTin = {
  '1': function (a, b) {
    return a + b * 1;
  },
  '2': function (a, b) {
    return a + b * 4;
  },
  '3': function (a, b) {
    return a + b * 8;
  },
  'NO_TIN': 0,
};

function add(a, b) {
  const tinhtoan = listTin[a];
  return tinhtoan ? tinhtoan(a, b) : listColor.NO_TIN;
}

console.log(add(1, 10));
