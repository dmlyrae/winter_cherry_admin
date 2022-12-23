function iteratorCreator() {
  this.length = 0;
  this[Symbol.iterator] = function*() {
    let i = 0;
    while (i < this.length) {
      if (!this[i]) continue;
      let el = this[i];
      yield el;
    }
  };
}

const obj = new iteratorCreator();
obj[1] = "apple";
obj[11] = "banana";
obj[90] = "strawberry";
for (let x of obj) {
  console.log(x);
}
