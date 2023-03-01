function getFunc(state) {
  return (name) => `${state} -- ${name}`;
}

console.log({
  x: getFunc('sate')(('name')),
});
