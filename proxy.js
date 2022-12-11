"use strict";

const Event = require("events");
const event = new Event();
const eventName = "counter";
event.on(eventName, (msg) => console.log("Counter updated", msg));

//Esse objto vai ser observado
const myCounter = {
  counter: 0,
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get: (object, prop) => {
    // console.log("chamou", { object, prop });
    return object[prop];
  },
});

// jaja e sempre!
setInterval(function () {
  proxy.counter += 1;
  console.log("[3] setInterval");
  if (proxy.counter === 10) clearInterval(this);
}, 200);

//futuro
//Não é uma boa prática setá-lo com zero para ser executado imediatamente. para disparar uma função assíncrona
setTimeout(() => {
  proxy.counter = 4;
  console.log("[2] setTimeout");
}, 100);

// se quer que execute agora, essa seria uma boa prática
setImmediate(() => {
  proxy.counter = 4;
  console.log("[1] setImmdiate"), proxy.counter;
});

// executa agora, agorinha, mas acaba com o ciclo de vida do node
// ele interromepe a pilha do node para executar esse vento, dando prioridade total
// é uma má prática acessar ele dessa forma
process.nextTick(() => {
  proxy.counter = 2;
  console.log("[0] .nexTick()");
});
