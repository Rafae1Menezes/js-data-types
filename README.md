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

## Map e WeakMap

O tipo Map é uma especializacao de Object, para ser usado em cenários específicos. Seu objetivo não é substituir o object, mas sim trazer uma alterativa poderosa ao ser core.
Em questão de performace o Map é mais poderoso em cenários onde precisamos ficar adicionando e removendo chaves dinamicamente, evitar conflitos entre nomes de propriedades que foram herdados do prototype chain e trazer uma semaânctica melhor para a manipulação dos dados.

O map tras varias funções para validar se uma chave existe. Remover um item de forma que não prejudique o ciclo de vida do js, e ele possui implementação do padrão generator.

Com ele cnseguirmos rodar um `for of` no objeto para saber suas chaves. Enquanto no Object teríamos que usar um `objet entries`, ou rodar um `for in` e manipular os valoes por index das chaves.

Outro benefício é que podemos usar objetos como chaves de pesquisa. Equando o Object só trabalha com strings e Symbols.

Ja o WeekMap, é usado em casos que precisamos apenas adicionar e remover chaves usando apenas o ID. O diferencial é que podemos usar apenas obj como chave e ele não é numerador, ou seja, não conseguirmos navegar nele pelo for of. A valantagem é a perfomace, pr ser um tipo de inferência fraco, os dados só ficam dele enquanto existir em memória.

## Set

Sua extrutura é uma lista que possui apenas itens únicos.
É muito usado em lugares que vc precisa comparar duas listas.

## Reflect

Reflect é algo comum em liguagem de programação, como c#, Ruby e Python, ele tras a possibilidade de interceptar o compotamento padrão das funções ou do ciclo de vida dos objetos para adicionar funcionalidades customizadas. As propriedade dos Symbol faz um tipo de reflect. A diferência é que o Recleft resolve algum problemas de semântica do JS.

## Proxy

DDD Observer: quando ocorrer uma alteração, todos serão notificados. A extrutura proxy do JS nos permite fazer isso. Os melhores cenários são os sockets http, se um usuário novo se conecta, toda rede precisa saber, para receber e enviar mensagens.

Timers do NODE.JS: setTimeOut, setInterval, setImmediate e .nextTick()
