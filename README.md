## Generator, Interators e Async Iterators

O objetivo dos generetors é fazer que funçõs virem listas e
que entreguem os dados sob demanda.

Podemos obter todos os dados de um generator usando os iteradores

- Rest spread
- Array.from()
- for of

## O tipo Symbol

O Symbol é muito utilizado para valores únicos, que seriam usados como uma string ou number. Algo como chaves de objeto, ou nomes de função.

Outro cenário é a criação de classs privadas que não devem ser acessadas diretamente de forma externa.

Alem disso, podemos moficar as propriedades SYMBOL para interceptar o comportamento padrão de objetos.

por exemplo, alem do symbol.toToPrimitive, podemos utilizar as propriedade interator e async interator para adicionar comportamento para quando esse objeto for chamador por algum operador de iteração.
