const assert = require("assert");

// -- keys
const uniquekey = Symbol("userName");
const user = {};

user["userName"] = "valor de um bjeto normal";
user[uniquekey] = "value fo symbol";

assert.deepStrictEqual(user.userName, "valor de um bjeto normal");
assert.deepStrictEqual(user[uniquekey], "value fo symbol");
assert.deepStrictEqual(user[Symbol("userName")], undefined);

//é dificil de pegar mas não é secreto
// console.log("symbol", Object.getOwnPropertySymbols(user)[0]);

//byPass - má prática
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);

//wel known Symbos
const obj = {
  [Symbol.iterator]: () => ({
    itens: ["c", "b", "a"],
    next() {
      return {
        done: this.itens.length === 0,
        value: this.itens.pop(),
      };
    },
  }),
};

// for (const item of obj) {
//   console.log(item);
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItens = Symbol("kItens");
class MyDate {
  constructor(...args) {
    this[kItens] = args.map((arg) => new Date(...arg));
  }
}

const myDate = new MyDate([2021, 10, 03], [2020, 09, 04]);

// console.log(myDate[kItens]);
assert.deepEqual(myDate[kItens], [
  new Date(2021, 10, 03),
  new Date(2020, 9, 04),
]);
