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

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const items = this[kItens].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );

    //retornando com o "e"
    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItens]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const item of this[kItens]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  //to String tag, para alterar o nome [object Object]
  // Precis do gat pq foi herdado de do prototype Object
  get [Symbol.toStringTag]() {
    return "WHATS?";
  }
}

const myDate = new MyDate([2021, 10, 03], [2020, 09, 04]);

const expecteDates = [new Date(2021, 10, 03), new Date(2020, 9, 04)];

// console.log(myDate[kItens]);
assert.deepEqual(myDate[kItens], expecteDates);

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object WHATS?]"
);

assert.throws(() => myDate + 1, TypeError);

//cerção explicita para char o toPrimite
assert.deepStrictEqual(
  String(myDate),
  "03 de novembro de 2021 e 04 de outubro de 2020"
);

// implementar o iterator!
assert.deepStrictEqual([...myDate], expecteDates);

// (async () => {
//   for await (const item of myDate) {
//     console.log("assync interator", item);
//   }
// })();

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expecteDates);
})();
