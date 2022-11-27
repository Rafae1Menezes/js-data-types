const assert = require("assert");

function* calculator(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "hello";
  yield "-";
  yield "word";
  yield* calculator(3, 5); // é necessário colocar o * para que ele execute a função em vez de enviá-la
}

const generator = main();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: "hello", done: false });
assert.deepStrictEqual(generator.next(), { value: "-", done: false });
assert.deepStrictEqual(generator.next(), { value: "word", done: false });
assert.deepStrictEqual(generator.next(), { value: 15, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ["hello", "-", "word", 15]);
assert.deepStrictEqual([...main()], ["hello", "-", "word", 15]);

// ---- Async inerators
const { readFile, stat, readdir } = require("fs/promises");

function* promified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey Dude");
}

async function* systemInfo() {
  const file = await readFile(__filename);
  yield {
    file: file.toString(),
  };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

// console.log("promified", [...promified()]);

//promisses resolvidas
// Promise.all([...promified()]).then((results) => console.log(results));

// (async () => {
//   for await (const data of promified()) {
//     console.log(data);
//   }
// })();

(async () => {
  for await (const data of systemInfo()) {
    console.log(data);
  }
})();
