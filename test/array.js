// Filter => Mang => findAll
// Find => Obj => FindOne
// Map => Mang moi
// FindIndex => index (neu khong co index = -1)
// Some => Bolean => Neu duyet item dung dk
// Every > Bolean => tat ca item dung dk (neuco 1 cai sai la tra ve fale)

// const input = [{
//   name: 'toan',
//   age: 15,
// },
// {
//   name: 'tung',
//   age: 25,
// }];

const filterInput = [{
  name: 'toan',
  age: 15,
},
{
  name: 'tung',
  age: 25,
}];

const newArray = filterInput
  .filter((item) => item.age > 20)
  .map((item) => ({
    ...item,
    age: item.age + 1,
  })).find((item) => item.age > 25);

console.log(newArray);
