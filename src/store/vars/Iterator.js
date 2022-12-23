export default function iteratorCreator() {
  this.length = 0;
  this[Symbol.iterator] = function*() {
    let i = 0;
    let counter = 0;
    while (counter < this.length && i < Number.MAX_SAFE_INTEGER) {
      if (this[i]) {
        yield this[i];
        counter++;
      }
      i++;
    }
  };
  this.devour = (ar) => {
    const update = (sp) => {
      let ids = [];
      for (let r of this) {
        ids.push(r["id"]);
      }
      ids = ids.map((i) => +i);
      ids = ids.filter((i) => typeof i === "number");
      const idSp = Math.max(...ids) + 1;
      sp["id"] = idSp;
      this[idSp] = sp;
      this.length++;
    };
    ar.forEach((a) => {
      a["trashed"] = false;
      if (typeof a["id"] === "undefined") {
        update(a);
        return;
      }
      if (!this[a["id"]]) this.length++;
      this[a["id"]] = { ...a };
      this[a["id"]]["filteringField"] = JSON.stringify(a).toLowerCase();
    });
    return this;
  };
  Object.defineProperty(this, "ids", {
    get: function() {
      let arr = [];
      for (let r of this) {
        if (!r.trashed) arr.push(r);
      }
      if (this.sortBy) {
        arr.sort(
          (a, b) => a[this.sortBy] > b[this.sortBy] ? -1 : 1
        );
      }
      if (this.reverse > 0) {
        arr.reverse();
      }
      if (this.filter) {
        arr = arr.filter((c) => c.filteringField.includes(this.filter));
      }
      return arr.map((a) => a["id"]);
    },
    set: function() {
      return false;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(this, "reverse", {
    value: 1,
    enumerable: false,
    writable: true,
  });
  Object.defineProperty(this, "filter", {
    value: "",
    enumerable: false,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(this, "sortBy", {
    value: "",
    enumerable: false,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(this, "page", {
    value: 0,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(this, "vocabulary", {
    value: [["id", "по умолчанию"]],
    enumerable: false,
    configurable: true,
    writable: true,
  });
  this.remove = (id) => {
    if (typeof id === "number") this[id]["trashed"] = true;
    return this;
  };
  this.nextPage = (limit = 10) => {
    const maxPage = Math.floor(this.length / limit);
    return this.getPage(++this.page % maxPage, limit);
  };
  this.prevPage = (limit = 10) => {
    const maxPage = Math.floor(this.length / limit);
    return this.getPage((--this.page + maxPage) % maxPage, limit);
  };
  this.getPage = function(number, limit = 10) {
    if (typeof number === "undefined") number = this.page;
    const ids = [...this.ids];
    const maxPage = Math.floor(this.length / limit);
    if (number > maxPage) number = maxPage;
    if (number < 0) number = 0;
    return ids.slice(limit * number++, number * limit).map((id) => this[id]);
  };
}
