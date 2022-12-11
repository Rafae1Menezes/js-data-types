const assert = require("assert");
const { stringify } = require("querystring");
const myMap = new Map();

myMap
  .set(1, "one")
  .set("Erick", { text: "two" })
  .set(true, () => "hello");

// usando um construtor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

// console.log("myMap", myMap);
// console.log(myMap.get(1));

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Erick"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

const onlyReferencWorks = { id: 1 };
myMap.set(onlyReferencWorks, { name: "RafaelMenezes" });

// console.log("get", myMap.get(onlyReferencWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferencWorks), { name: "RafaelMenezes" });

// utilitarios
// No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// para verfocar se um item existe no objeto
// item.hey = se nao eixte = undefined
// if() = coerção implicita para boolean e retorna false
// o jeto certo em Object é ({name: "rafael"}).hasOwnProperty("name")
assert.ok(myMap.has(onlyReferencWorks));

// Para remover um item do objeto
// delete item.id
// imperfomáico para o JS
assert.ok(myMap.delete(onlyReferencWorks));

// Não da par iterar um bjects diretamente
// tem que transforma com o Object
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Erick", { text: "two" }],
    [true, () => {}],
  ])
);

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Objet é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() => '[object Object]'
// ({toString: () => 'hey}).toString() === 'hey

// qualquer chave pode colidir, com as propriedades herdadas do objeto
// costructor, toString, valueOf, etc

const actor = {
  name: "Xuxa da Silva",
  toString: "Queen: Xuxa da Sulva",
};

// nao tem restricao de nome

myMap.set(actor, "oi");
assert.deepStrictEqual(myMap.has(actor), true);

// Nao tem como limpar um Obj se reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --- WeakMap

// Pode ser coletado apó perder as referências

// tem a maioria dos beneficios do MAp
// mas: não é iterável
// só chaves de refencia e que voce ja conheça
//  mais leve e prevê leak de memória, pq depois que as instâncias saem da memria, tudo é limpo

const eakMap = new WeakMap();
const hero = { name: "Flash" };

// WeakMap.set()
// WeakMap.get()
// WeakMap.delete()
// WeakMap.has()
