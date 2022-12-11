const assert = require("assert");

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "1", "3"];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ["0", "1", "1", "2", "2", "3"]);

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
]);

//  set.keys === set.values (esse só existe por conta do Map)

// no Array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has("3"));

// mesma teoria do Map, mas voce sempre trabalha com a lista toda
// nao tem get, entao voce pode saber se o item esta ou nao no array
//  na documentao tempos exemplossbre como fazer uma interceção, saber o que tem em uma lista e nao
//  tem outra e assim por diante

//  tem nos dois arrays
const users01 = new Set(["Rafael", "Felipe", "João"]);

const users02 = new Set(["Maria", "Rafael", "Maura"]);

const intersection = new Set([...users01].filter((user) => users02.has(user)));

assert.deepStrictEqual(Array.from(intersection), ["Rafael"]);

const difference = new Set([...users01].filter((user) => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ["Felipe", "João"]);

// WeakSet

// mesma ideia deo weakMAP
// ao é enumerável (iterável)
// Só trabalha com chaves como referência
// so tem metodos simples

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);
