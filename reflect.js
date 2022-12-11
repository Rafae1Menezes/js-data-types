"use strict";

const assert = require("assert");

// arantir a semnatica e segurança dos objetos

//  ---- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => {
//   throw new Error("Eita");
// };

// esse aqui pode acontecer
myObj.add.apply = function () {
  throw new TypeError("vixx");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "vixx",
});

// usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);
//  --- Apply

//  --- defineProperty

//  questoes semanticas
function MyDate() {}

// Feio, tudo é Object, mas Object adionando prop para uma function?
Object.defineProperty(MyDate, "withObject", { value: () => "Hey here" });

// fica mais semântico
Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey Dude" });

assert.deepStrictEqual(MyDate.withObject(), "Hey here");
assert.deepStrictEqual(MyDate.withReflection(), "Hey Dude");

//  -- deleteProperty
const withDelete = { user: "Rafael" };
//  imperfomatico, evitar ao máximo
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

const withReflection = { user: "XuxaDaSilva" };
Reflect.deleteProperty(withReflection, "user");
assert.deepStrictEqual(withReflection.hasOwnProperty("user"), false);

//  --- get
// Deveriamos fazer um get some em intâncias de referência
assert.deepStrictEqual((1)["username"], undefined);
//  com reflection, uma exeção é lançada
assert.throws(() => Reflect.get(1, "userName"), TypeError);

// --- has
assert.ok("superman" in { superman: "Rafael" });
assert.ok(Reflect.has({ batman: "" }, "batman"));

// --- OwnKeys
const user = Symbol("user");
const databaseUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "RafaelMenezes",
};

// com os metodos de object, temos que fazer 2 reuisições
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
  "id",
  Symbol.for("password"),
  user,
]);
