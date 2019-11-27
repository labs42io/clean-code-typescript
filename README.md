# clean-code-typescript [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Clean%20Code%20Typescript&url=https://github.com/labs42io/clean-code-typescript)

Conceitos de _Código Limpo_ adaptados para TypeScript.
Inspirado em [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)

## Conteúdos

1. [Introdução](#introdução)
2. [Variáveis](#variáveis)
3. [Funções](#funções)
4. [Objetos e Estruturas de dados](#objetos-e-estruturas-de-dados)
5. [Classes](#classes)
6. [SOLID](#solid)
7. [Testando](#testando)
8. [Concorrência](#concorrência)
9. [Tratamento de erros](#tratamento-de-erros)
10. [Formatação](#formatação)
11. [Comentários](#comentários)

## Introdução

![Humorous image of software quality estimation as a count of how many expletives
you shout when reading code](https://www.osnews.com/images/comics/wtfm.jpg)

Principios da engenharia de software, do livro de Robert C. Martin
[_Código Limpo_](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), para TypeScript. Isto não é um style guide.
É um guia para desenvolver software [legível, reutilizavel, e refatorável](https://github.com/ryanmcdermott/3rs-of-software-architecture) em TypeScript.

Nem todos principios contidos aqui tem de ser seguidos estritamente,
e muito menos irão ser universalmente aprovados.
Estes são apenas guias e nada mais, mas que foram codificados durante muito
anos por experiências coletivas dos autores de _Código Limpo_.

Nosso trabalho de engenharia de software tem aproximadamente 50 anos de idade,
e ainda estamos aprendendo muito. Quando arquitetura de software for
algo antigo como uma arquitetura em si, talvez então teremos regras mais
rígidas para serem seguidas. Por enquanto, deixe esses guias servirem como
referências pelo qual podemos avaliar a qualidade do código JavaScript que
você e seu time produz.

Mais uma coisa: Saber de tudo isso não vai te tornar um melhor desenvolvedor
imediatamente, e trabalhar com isso por muitos anos não significa que você
não irá cometer erros. Todo pedaço de código começa como um rascunho, como
argila se moldando para sua forma final. E finalmente, cortamos fora as
imperfeições quando revemos isso com nossos parceiros. Não se deixe abalar
pelos primeiros rascunhos que precisam de melhorias. Mande ver no seu código ao
invés disso!

**[⬆ ir para o topo](#table-of-content)**

## Variáveis

### Use nomes significantes em suas variáveis

Diferencie os nomes de tal forma que o leitor saiba as diferença entre eles

**Ruim:**

```ts
function between<T>(a1: T, a2: T, a3: T) {
  return a2 <= a1 && a1 <= a3;
}
```

**Bom:**

```ts
function between<T>(value: T, left: T, right: T) {
  return left <= value && value <= right;
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Use nomes pronunciáveis

Se você não consegue pronunciar sua variável, você não consegue argumentar sem
parecer um idiota.

**Ruim:**

```ts
class DtaRcrd102 {
  private genymdhms: Date;
  private modymdhms: Date;
  private pszqint = '102';
}
```

**Bom:**

```ts
class Customer {
  private generationTimestamp: Date;
  private modificationTimestamp: Date;
  private recordId = '102';
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Use o mesmo vocabulário para o mesmo tipo de variável

**Ruim:**

```ts
function getUserInfo(): User;
function getUserDetails(): User;
function getUserData(): User;
```

**Bom:**

```ts
function getUser(): User;
```

**[⬆ ir para o topo](#table-of-contents)**

### Use nomes fáceis de pesquisar

Nós vamos ler mais código do que escrever. É importante que o código que escrevemos seja legível e fácil de achar. Ao não nomear variáveis que acabam sendo inúteis para entender nosso programa, machucamos nossos leitores. Faça seus nomes pesquisáveis. Ferramentas como [TSLint](https://palantir.github.io/tslint/rules/no-magic-numbers/) podem te ajudar a identificar constantes sem nome.

**Ruim:**

```ts
// O que diabos é 86400000?
setTimeout(restart, 86400000);
```

**Bom:**

```ts
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

setTimeout(restart, MILLISECONDS_IN_A_DAY);
```

**[⬆ ir para o topo](#table-of-contents)**

### Use variáveis explicativas

**Ruim:**

```ts
declare const users: Map<string, User>;

for (const keyValue of users) {
  // iterate through users map
}
```

**Bom:**

```ts
declare const users: Map<string, User>;

for (const [id, user] of users) {
  // iterate through users map
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Evite mapear mentalmente

Explicito é melhor que implito.
_Clareza é um Rei._

**Ruim:**

```ts
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

**Bom:**

```ts
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**[⬆ ir para o topo](#table-of-contents)**

### Não adicione contextos desnecessários

Se o nome da sua classe/objeto expressa algo, não repita isso no nome da variável.

**Ruim:**

```ts
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
};

function print(car: Car): void {
  console.log(`${this.carMake} ${this.carModel} (${this.carColor})`);
}
```

**Bom:**

```ts
type Car = {
  make: string;
  model: string;
  color: string;
};

function print(car: Car): void {
  console.log(`${this.make} ${this.model} (${this.color})`);
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Use argumentos padrões ao invés de encadear condicionais

Argumentos padrões são normalmente mais limpos que condicionais.

**Ruim:**

```ts
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10;
  // ...
}
```

**Bom:**

```ts
function loadPages(count: number = 10) {
  // ...
}
```

**[⬆ ir para o topo](#table-of-contents)**

## Funções

### Argumentos de funções (2 ou menos, idealmente)

Limitar a quantidade de parametros de uma função é incrivelmente importantante
porque isso torna sua função fácil de testar.
Ter mais de três de leva em uma explosão onde você tem que testar vários
casos diferentes, com argumentos separados.

Um ou dois argumentos é o caso ideal, e três deve ser evitado se possível.
Algo além disso deve ser deixado de lado.
Usualmente, se você tem mais de dois argumentos, suas funções estão tentando fazer
coisas demais.
Nos casos que não estão, na maior parte do tempo um objeto irá ser o suficiente como argumento.

Considere usar objetos caso sinta necessidade de enviar muitos argumentos.

Para deixar explicitos quais propriedades suas funções esperam, você pode usar
[desestruturação](https://basarat.gitbooks.io/typescript/docs/destructuring.html).
Aqui vão algumas vantagens:

1. Quando alguém olhar a assinatura da função, imediatamente será claro quais propriedades estão sendo usadas.

2. Desestruturação também clone os valores primitivos especificados do objeto passado como argumento para a função. Isso ajuda a evitar efeitos colaterais. Nota: Objetos e Arrays que são desestruturados do objeto _argument_ não são clonados.

3. TypeScript irá te avisar quando haver propriedades não utilizadas, o que seria impossivel sem usar desestruturação.

**Ruim:**

```ts
function createMenu(
  title: string,
  body: string,
  buttonText: string,
  cancellable: boolean
) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

**Bom:**

```ts
function createMenu(options: {
  title: string;
  body: string;
  buttonText: string;
  cancellable: boolean;
}) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

Você ainda pode aumentar a legibilidade ao utilizar os [type aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) do TypeScript.

```ts
type MenuOptions = {
  title: string;
  body: string;
  buttonText: string;
  cancellable: boolean;
};

function createMenu(options: MenuOptions) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

**[⬆ ir para o topo](#table-of-contents)**

### Funções devem fazer somente uma coisa

Esta é, de longe, a regra mais importante da engenharia de software. Quando funções fazem mais de uma coisa, elas são mais difíceis de compor, testar e pensar sobre. Quando você consegue isolar a função para apenas uma ação, elas podem ser refatoradas fácilmente e teu código será fácilmente lido. Se você ignorar todo o resto deste guia além dessa dica, você já estará a frente de vários outros desenvolvedores.

**Ruim:**

```ts
function emailClients(clients: Client[]) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Bom:**

```ts
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Nomes das funções devem dizer o que elas fazem

**Ruim:**

```ts
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

**Bom:**

```ts
function addMonthToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();
addMonthToDate(date, 1);
```

**[⬆ ir para o topo](#table-of-contents)**

### Funções devem estar em apenas um nível de abstração

Quando você tem mais de um nível de abstração possívelmente sua função está fazendo coisa demais. Dividir suas funções desencadeia em código reusável e fácil de testar.

**Ruim:**

```ts
function parseCode(code: string) {
  const REGEXES = [
    /* ... */
  ];
  const statements = code.split(' ');
  const tokens = [];

  REGEXES.forEach(regex => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}
```

**Bom:**

```ts
const REGEXES = [
  /* ... */
];

function parseCode(code: string) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);

  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code: string): Token[] {
  const statements = code.split(' ');
  const tokens: Token[] = [];

  REGEXES.forEach(regex => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens: Token[]): SyntaxTree {
  const syntaxTree: SyntaxTree[] = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Remove código duplicado

Faça o seu melhor para evitar código duplicado.
Código duplicado é ruim pois significa que há mais de um lugar para ser alterado se houver alguma mudança na lógica.

Imagine que você tem um restaurante que mantém uma lista do seu inventário: todos seus tomates, cebolas, alho, pimentas, etc.
Se você tem multiplas listas que contém esses dados, então todas irão ser modificadas quando você servir um prato com tomates, por exemplo.
Se você tem apenas uma lista, então este será o único lugar a ser alterado.

Algumas vezes você tem códigos duplicados porque há duas ou mais coisas diferentes, mas que compartilham muito em comum, mas suas diferenças os forçam a ter duas ou mais funções separadas que fazem muito das mesmas coisas. Remover código duplicado significa criar uma abstração que pode lidar com essas diferenças com apenas uma função/módulo/classe.

Ter sua abstração do jeito certo é algo crítico, por isso você deve seguir os principios [SOLID](#solid). Más abstrações podem ser pior que código duplicado, então tome cuidado! Com isto dito, se você pode fazer uma boa abstração, faça! Não repita você mesmo, ou então você se encontrará atualizando vários lugares toda vez que desejar alterar uma coisa.

**Ruim:**

```ts
function showDeveloperList(developers: Developer[]) {
  developers.forEach(developer => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();

    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers: Manager[]) {
  managers.forEach(manager => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();

    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```

**Bom:**

```ts
class Developer {
  // ...
  getExtraDetails() {
    return {
      githubLink: this.githubLink
    };
  }
}

class Manager {
  // ...
  getExtraDetails() {
    return {
      portfolio: this.portfolio
    };
  }
}

function showEmployeeList(employee: Developer | Manager) {
  employee.forEach(employee => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const extra = employee.getExtraDetails();

    const data = {
      expectedSalary,
      experience,
      extra
    };

    render(data);
  });
}
```

Você deve ser duro quando o assunto for código duplicado. As vezes há uma troca entre código duplicado e complexidade aumentada quando introduz abstrações desnecessárias. Quando duas implementações de módulos diferentes se parecem bastante mas vivem em diferentes lugares, código duplicado pode ser aceitável e preferível à extrair para um código comum entre os lugares. Nesse caso, o código que seria extraido iria criar uma dependência indireta entre os dois módulos.

**[⬆ ir para o topo](#table-of-contents)**

### Define objetos padrões utilizando Object.assign ou desestruturação

**Ruim:**

```ts
type MenuConfig = {
  title?: string;
  body?: string;
  buttonText?: string;
  cancellable?: boolean;
};

function createMenu(config: MenuConfig) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}

const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true
};

createMenu(menuConfig);
```

**Bom:**

```ts
type MenuConfig = {
  title?: string;
  body?: string;
  buttonText?: string;
  cancellable?: boolean;
};

function createMenu(config: MenuConfig) {
  const menuConfig = Object.assign(
    {
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellable: true
    },
    config
  );
}

createMenu({ body: 'Bar' });
```

Alternativamente, você pode usar desestruturação com valores predefinidos:

```ts
type MenuConfig = {
  title?: string;
  body?: string;
  buttonText?: string;
  cancellable?: boolean;
};

function createMenu({
  title = 'Foo',
  body = 'Bar',
  buttonText = 'Baz',
  cancellable = true
}: MenuConfig) {
  // ...
}

createMenu({ body: 'Bar' });
```

Para evitar efeitos colaterais e comportamentos indesejados ao passar explicitamente `undefined` ou `null`, você pode dizer ao compilador TypeScript para não permitir isso. Veja mais em [`--strictNullChecks`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictnullchecks).

**[⬆ ir para o topo](#table-of-contents)**

### Não use flags como parâmetros de funções

Flags indicam ao seu usuário que a função faz mais de uma coisa.
Funções devem fazer apenas uma coisa. Divida sua função se ela segue diferentes caminhos baseados em uma condição.

**Ruim:**

```ts
function createFile(name: string, temp: boolean) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Bom:**

```ts
function createFile(name: string) {
  fs.create(name);
}

function createTempFile(name: string) {
  fs.create(`./temp/${name}`);
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Evite efeitos colaterais (parte 1)

Uma função produz efeitos colaterais se ela faz algo além de receber um valor e retornar outro valor ou valores.
Efeitos colaterais poderia ser escrever em um arquivo, modificar alguma variável global, ou acidentamente transferir todo seu dinheiro para um estranho.

Agora, você precisa ter efeitos colaterais em algumas ocasiões. Como no exemplo anterior, onde você precisa escrever em um arquivo.
O que você deseja fazer é centralizar onde você está fazendo isto, ao invés de ter várias funções e classes que escrevem em um só arquivo.
Tenha um serviço que faça isso. Um, e apenas um.

O ponto principal é evitar alguns vacilos como compartilhar o estado entre dois objetos sem nenhuma estrutura, usando tipo de dados mutáveis que podem ser escritos por qualquer coisas, e não centralizar onde seus efeitos colaterais vão ocorrer. Se você pode fazer isso, você será mais feliz que a maioria dos outros programadores.

**Ruim:**

```ts
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
let name = 'Robert C. Martin';

function toBase64() {
  name = btoa(name);
}

toBase64(); // produces side effects to `name` variable

console.log(name); // expected to print 'Robert C. Martin' but instead 'Um9iZXJ0IEMuIE1hcnRpbg=='
```

**Bom:**

```ts
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
const name = 'Robert C. Martin';

function toBase64(text: string): string {
  return btoa(text);
}

const encodedName = toBase64(name);

console.log(name);
```

**[⬆ ir para o topo](#table-of-contents)**

### Evite efeitos colaterais (parte 2)

No JavaScript, primitivos são passados por valores e objetos/arrays são passados por referência. No caso dos objetos e arrays, se sua função faz uma mudança em um array de carrinho de loja, por exemplo, adicionando um item à compra, então todas outras funções que usam esse array serão afetadas por esta adição. Isso pode ser bom, mas pode ser ruim também. Vamos imaginar um cenário ruim:

O usuário clica em "Comprar", botão que chama uma função de compra, que envia uma requisição com o array de carrinho de compras ao servidor. Por conta de uma conexão ruim, a função de comprar precisa ficar tentando novamente a requisição. Agora, e se o usuário, neste meio tempo, clicar no botão "Adicionar ao carrinho", em um item que ele não quer, antes da requisição começar? Se isso acontecer e a requisição começar, a função de compra irá enviar o item adicionado acidentalmente, pois este tem a referência do mesmo array anterior e que a função _addItemToCart_ modificou, ao adicionar um item novo.

Uma ótima solução seria a função _addItemToCart_ sempre clonar o carrinho, editar, e retornar o clone. Isso assegura que nenhuma outra função que tem a referência do carrinho será afetada pelas mudanças.

Dois avisos ao mencionar essa abordagem:

1. Podem haver casos onde você quer modificar o objeto inputado, mas quando você adota esse prática você verá que esses casos são bem raros. A maiorias das coisas podem ser refatoradas para não terem efeitos colaterais! (veja [funções puras](https://en.wikipedia.org/wiki/Pure_function))

2. Clonar grandes objetos pode ser bem caro em termos de performance. Com sorte, isso não é um grande problema na prática pois há ótimas bibliotecas que permitem esse tipo de abordagem serem rápidas e não tão intensivas no consumo de memória, como seria em clonar os objetos manualmente.

**Ruim:**

```ts
function addItemToCart(cart: CartItem[], item: Item): void {
  cart.push({ item, date: Date.now() });
}
```

**Bom:**

```ts
function addItemToCart(cart: CartItem[], item: Item): CartItem[] {
  return [...cart, { item, date: Date.now() }];
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Não escreva em funções globais

Poluir escopos globais é uma má prática em JavaScript pois você pode colidir com código de outra biblioteca, e o usuário da sua API não será esclarecido até ele receber uma erro em produção. Vamos pensar no exemplo a seguir: E se você quiser extender o código nativo do Array em JavaScript, para ter uma função diff que pode mostrar a diferença entre dois arrays? Você pode escrever sua nova função em `Array.prototype`, mas isso iria colidir com código de outra biblioteca que tenta fazer a mesma coisa. E se essa biblioteca usa o método `diff` para achar a diferença entre o primeiro e o último elemento de um array? Por isso seria muito melhor usar classes e simplesmente extender o `Array` global.

**Ruim:**

```ts
declare global {
  interface Array<T> {
    diff(other: T[]): Array<T>;
  }
}

if (!Array.prototype.diff) {
  Array.prototype.diff = function<T>(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

**Bom:**

```ts
class MyArray<T> extends Array<T> {
  diff(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Priorize programação funcional à programação imperativa

Use esse tipo de paradigma quando puder.

**Ruim:**

```ts
const contributions = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  },
  {
    name: 'Suzie Q',
    linesOfCode: 1500
  },
  {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  },
  {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < contributions.length; i++) {
  totalOutput += contributions[i].linesOfCode;
}
```

**Bom:**

```ts
const contributions = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  },
  {
    name: 'Suzie Q',
    linesOfCode: 1500
  },
  {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  },
  {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

const totalOutput = contributions.reduce(
  (totalLines, output) => totalLines + output.linesOfCode,
  0
);
```

**[⬆ ir para o topo](#table-of-contents)**

### Encapsular condicionais

**Ruim:**

```ts
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

**Bom:**

```ts
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0;
}

if (canActivateService(subscription, account)) {
  // ...
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Evite condicionais negativas

**Ruim:**

```ts
function isEmailNotUsed(email: string) {
  // ...
}

if (isEmailNotUsed(email)) {
  // ...
}
```

**Bom:**

```ts
function isEmailUsed(email) {
  // ...
}

if (!isEmailUsed(node)) {
  // ...
}
```

**[⬆ Ir para o topo](#table-of-contents)**

### Evite condicionais

Isso parece uma tarefa impossivel. Quando se escuta isso pela primeira vez, a maioria das pessoas dizem, "Como eu posso fazer qualquer coisa sem declarar um `if`?" A resposta é que você pode usar polimorfismo para alcançar o mesmo objetivo em muitos casos. A segunda pergunta normalmente é, _"Bom isso é otimo, mas por que eu iria querer fazer isso?"_ A resposta é um conceito anterior de codigo limpo que aprendemos antes: Uma função deve fazer apenas uma coisa. Quando você tem classes e funções com `if` declarados, você está falando para seu usuario que sua função faz mais que uma coisa. Lembre-se apenas faça uma coisa.

**Ruim:**

```ts
class Airplane {
  private type: string;

  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
      default:
        throw new Error('Unknown airplane type.');
    }
  }
}
```

**Bom:**

```ts
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Evite verificação de tipo

TypeScript é um superconjunto sintático estrito de JavaScript e adciona verificação de tipo estático para a linguagem.
Prefira sempre especificar tipos de variáveis, parâmetros e retornar valores para aproveitar todo o potencial dos recursos do TypeScript.
Isso torna refatoração mais fácil.

**Ruim:**

```ts
function travelToTexas(vehicle: Bicycle | Car) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(this.currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location('texas'));
  }
}
```

**Bom:**

```ts
type Vehicle = Bicycle | Car;

function travelToTexas(vehicle: Vehicle) {
  vehicle.move(this.currentLocation, new Location('texas'));
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Não otimize demais

Navegadores modernos fazem muita otimização por baixo dos panos na hora da execução. Muitas vezes, se você está otimizando então, você está apenas perdendo seu tempo. Há bons
[recursos](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers) para ver aonde está faltando otimização. Procure esses, até que eles sejam corrigidos caso possam ser.

**Ruim:**

```ts
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Bom:**

```ts
for (let i = 0; i < list.length; i++) {
  // ...
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Remover código morto

Código morto é tão ruim quanto código duplicado. Não há razão alguma para mantê-lo na sua base de códigos.
Se não está sendo chamado, livre-se dele! Ainda continuará seguro no seu histórico de versões se você ainda precisar.

**Ruim:**

```ts
function oldRequestModule(url: string) {
  // ...
}

function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**Bom:**

```ts
function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**[⬆ ir para o topo](#table-of-contents)**

### Use iterators e generators

Use generators e iterables quando trabalhar com coleções de dados que se comportam como uma corrente/fluxo.
Há alguns bons motivos para isso:

- desacopla quem está chamando o generator, deixando a ele a opção de quantos itens deseja acessar
- 'lazy execution', os itens são chamados por demanda
- suporte nativo para iterar itens utilizando a sintaxe `for-of`
- 'iterables' permitem implementar um padrão mais otimizado de 'iterators'

**Ruim:**

```ts
function fibonacci(n: number): number[] {
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const items: number[] = [0, 1];
  while (items.length < n) {
    items.push(items[items.length - 2] + items[items.length - 1]);
  }

  return items;
}

function print(n: number) {
  fibonacci(n).forEach(fib => console.log(fib));
}

// Printa os 10 primeiros números de Fibonnaci.
print(10);
```

**Bom:**

```ts
// Gera uma corrente infinita de números de Fibonacci.
// O generator não mantém um array com todos os números.
function* fibonacci(): IterableIterator<number> {
  let [a, b] = [0, 1];

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function print(n: number) {
  let i = 0;
  for (const fib of fibonacci()) {
    if (i++ === n) break;
    console.log(fib);
  }
}

// Printa os 10 primeiros números de Fibonnaci.
print(10);
```

Tem diversas bibliotecas que permitem trabalhar com iterables de uma forma similar aos arrays nativos, ao encadear métodos como `map`, `slice`, `forEach` etc. Veja [itiriri](https://www.npmjs.com/package/itiriri) para um exemplo avançado de manipulação utilizando iterables (ou [itiriri-async](https://www.npmjs.com/package/itiriri-async) para manipulação de iterables assíncronos).

```ts
import itiriri from 'itiriri';

function* fibonacci(): IterableIterator<number> {
  let [a, b] = [0, 1];

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

itiriri(fibonacci())
  .take(10)
  .forEach(fib => console.log(fib));
```

**[⬆ ir para o topo](#table-of-contents)**

## Objetos e estruturas de dados

### Use getters e setters

TypeScript suporta sintaxe de getter/setter.
Usar getters e setters para acessar dados de objetos que encapsulam comportamento pode ser melhor do que simplesmente procurar por uma propriedade em um objeto.
"Por que?" você pode perguntar. Bom, aqui está uma lista de razões:

- Quando você quer fazer mais além de pegar uma propriedade de um objeto, você não precisa olhar e mudar todos os acessores na sua base de códigos.
- Faz adicionar validação simples quando está setando.
- Encapsula a representação interna;
- Fácil de adicionar logging e tratamento de erros quando usar get e set.
- Você pode carregar preguiçosamente as propriedades do seu objeto, vamos dizer pegar de um servido.

**Ruim:**

```ts
class BankAccount {
  balance: number = 0;
  // ...
}

const value = 100;
const account = new BankAccount();

if (value < 0) {
  throw new Error('Cannot set negative balance.');
}

account.balance = value;
```

**Bom:**

```ts
class BankAccount {
  private accountBalance: number = 0;

  get balance(): number {
    return this.accountBalance;
  }

  set balance(value: number) {
    if (value < 0) {
      throw new Error('Cannot set negative balance.');
    }

    this.accountBalance = value;
  }

  // ...
}

const account = new BankAccount();
account.balance = 100;
```

**[⬆ Ir para o topo](#table-of-contents)**

### Fazer objetos ter membros privados/protegidos

TypeScript suporta acessores `Publico` _(Padrão)_, `Protegido` e `Privado` em membros das classes.

**Ruim:**

```ts
class Circle {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}
```

**Bom:**

```ts
class Circle {
  constructor(private readonly radius: number) {}

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Prefira propriedades de apenas leitura

TypeScript's type system allows you to mark individual properties on an interface / class as readonly. This allows you to work in a functional way (unexpected mutation is bad).
For more advanced scenarios there is a built-in type `Readonly` that takes a type `T` and marks all of its properties as readonly using mapped types (see [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)).

O sistema de tipagem do TypeScript permite que você marque propriedades individuais em uma interface/classe como de apenas leitura. Isso permite que você trabalhe de uma maneira funcional (mutações inesperadas são ruins).
Para cenários mais avançados há um tipo integrado `Readonly` que recebe um tipo `T` e marca todas suas propriedades como de apenas leitura, usando tipos mapeados (mapped types) (veja [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)).

**Ruim:**

```ts
interface Config {
  host: string;
  port: string;
  db: string;
}
```

**Bom:**

```ts
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

**[⬆ ir para o topo](#table-of-contents)**

## Classes

### Classes devem ser pequenas

O tamanho de uma clase é mensurado por sua responsabilidade. Seguindo o princípio de única responsabilidade, uma classe deve ser pequena.

**Ruim:**

```ts
class Dashboard {
  getLanguage(): string {
    /* ... */
  }
  setLanguage(language: string): void {
    /* ... */
  }
  showProgress(): void {
    /* ... */
  }
  hideProgress(): void {
    /* ... */
  }
  isDirty(): boolean {
    /* ... */
  }
  disable(): void {
    /* ... */
  }
  enable(): void {
    /* ... */
  }
  addSubscription(subscription: Subscription): void {
    /* ... */
  }
  removeSubscription(subscription: Subscription): void {
    /* ... */
  }
  addUser(user: User): void {
    /* ... */
  }
  removeUser(user: User): void {
    /* ... */
  }
  goToHomePage(): void {
    /* ... */
  }
  updateProfile(details: UserDetails): void {
    /* ... */
  }
  getVersion(): string {
    /* ... */
  }
  // ...
}
```

**Bom:**

```ts
class Dashboard {
  disable(): void {
    /* ... */
  }
  enable(): void {
    /* ... */
  }
  getVersion(): string {
    /* ... */
  }
}

// divida as responsábilidades movendo os métodos restantes para outras classes
// ...
```

**[⬆ ir para o topo](#table-of-contents)**

### Classes coesas e desacopladas

Coesão define o grau de parentesco que um membro de uma classe tem com os outros. Idealmente, cada campo de uma classe deve ser usado por cada um dos métodos.
Nós dizemos, então, que uma classe é super coesa. Na prática, nem sempre isso é possível, e nem recomendado em alguns casos. Você deve preferir, entretanto, classes com alta coesão.

Acoplamento se refere ao quanto duas classes são relacionadas ou dependentes umas das outras. Classes são pouco acopladas/desacopladas quando mudanças em uma não afeta a outra.

Um bom design de software tem **coesão** e **desacoplamento**

**Ruim:**

```ts
class UserManager {
  // Bad: each private variable is used by one or another group of methods.
  // It makes clear evidence that the class is holding more than a single responsibility.
  // If I need only to create the service to get the transactions for a user,
  // I'm still forced to pass and instance of emailSender.
  constructor(
    private readonly db: Database,
    private readonly emailSender: EmailSender
  ) {}

  async getUser(id: number): Promise<User> {
    return await db.users.findOne({ id });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await db.transactions.find({ userId });
  }

  async sendGreeting(): Promise<void> {
    await emailSender.send('Welcome!');
  }

  async sendNotification(text: string): Promise<void> {
    await emailSender.send(text);
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

**Bom:**

```ts
class UserService {
  constructor(private readonly db: Database) {}

  async getUser(id: number): Promise<User> {
    return await db.users.findOne({ id });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await db.transactions.find({ userId });
  }
}

class UserNotifier {
  constructor(private readonly emailSender: EmailSender) {}

  async sendGreeting(): Promise<void> {
    await emailSender.send('Welcome!');
  }

  async sendNotification(text: string): Promise<void> {
    await emailSender.send(text);
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Prefira composição à herança

Como foi muito bem pontuado em [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns), pela _Gang of Four_, você deve preferir composição à herança quando puder. Há ótimos motivos para usar herança, e ótimos motivos para usar composição. O ponto aqui é, se sua mente instintivamente pensa em heranças, tente pensar em como composições poderiam resolver seu problema de forma melhor. Em muitos casos isso é possível.

Você pode estar pensando, "quando devo usar herança?" E isso depende do seu problema, mas aqui vai uma lista de quando usar herança faz mais sentido de que composição:

1. Sua herança representa uma relação de "é um..." e não "tem um..." (Humano->Animal vs Usuário->Detalhes).

2. Você pode reutilizar código das classes base (Humanos podem se mover como animais).

3. Você deseja fazer mudanças globais ao alterar a classe base. (Alterar o gasto de calorias de todos os animais quando se movimentam).

**Ruim:**

```ts
class Employee {
  constructor(private readonly name: string, private readonly email: string) {}

  // ...
}

// Ruim pois Employees "tem" taxas. EmployeeTaxData não é um tipo de Employee
class EmployeeTaxData extends Employee {
  constructor(
    name: string,
    email: string,
    private readonly ssn: string,
    private readonly salary: number
  ) {
    super(name, email);
  }

  // ...
}
```

**Bom:**

```ts
class Employee {
  private taxData: EmployeeTaxData;

  constructor(private readonly name: string, private readonly email: string) {}

  setTaxData(ssn: string, salary: number): Employee {
    this.taxData = new EmployeeTaxData(ssn, salary);
    return this;
  }

  // ...
}

class EmployeeTaxData {
  constructor(public readonly ssn: string, public readonly salary: number) {}

  // ...
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Use cadeia de métodos

Esse padrão é bem útil e usado normalmente em muitas bibliotecas. Seu uso permite que seu código seja mais expressivo, e menos verboso. Por esse motivo, use cadeia de métodos e olhe depois como seu código irá estar mais limpo.

**Ruim:**

```ts
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): void {
    this.collection = collection;
  }

  page(number: number, itemsPerPage: number = 100): void {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
  }

  orderBy(...fields: string[]): void {
    this.orderByFields = fields;
  }

  build(): Query {
    // ...
  }
}

// ...

const query = new QueryBuilder();
query.from('users');
query.page(1, 100);
query.orderBy('firstName', 'lastName');

const query = queryBuilder.build();
```

**Bom:**

```ts
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): this {
    this.collection = collection;
    return this;
  }

  page(number: number, itemsPerPage: number = 100): this {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
    return this;
  }

  orderBy(...fields: string[]): this {
    this.orderByFields = fields;
    return this;
  }

  build(): Query {
    // ...
  }
}

// ...

const query = new QueryBuilder()
  .from('users')
  .page(1, 100)
  .orderBy('firstName', 'lastName')
  .build();
```

**[⬆ ir para o topo](#table-of-contents)**

## SOLID

### Principio da única responsabilidade (Single Responsabiliy Principle)

Como dito em Código Limpo, "Não deve haver mais de um motivo para alterar uma classe". É tentador lotar uma classe com várias funcionalidades, como se você só pudesse carregar uma mala em uma viagem. O problema disso é que sua classe não será conceitualmente coesiva e posteriormente te trará vários motivos para mudar. Reduzir a quantidade de vezes que você precisa mudar uma classe é importante. É importante pois se muitas funcionalidades estão contidas em uma classe e você altera um pedaço disso, pode ser difícil entender como isso irá afetar os módulos dependentes da sua classe/do seu código.

**Ruim:**

```ts
class UserSettings {
  constructor(private readonly user: User) {}

  changeSettings(settings: UserSettings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

**Bom:**

```ts
class UserAuth {
  constructor(private readonly user: User) {}

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  private readonly auth: UserAuth;

  constructor(private readonly user: User) {
    this.auth = new UserAuth(user);
  }

  changeSettings(settings: UserSettings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Prinpio do Aberto/Fechado (Open/Closed Principle)

Como dito por Bertrand Meyer, "entidades em software (classes, módulos, funções, etc.) devem ser abertas para extenções, mas fechadas para modificações." Mas o que isso significa? Este princípio diz, basicamente, que você deve permitir que seus usuários adicionem novas funcionalidades sem alterar código já existente.

**Ruim:**

```ts
class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {}

  async fetch<T>(url: string): Promise<T> {
    if (this.adapter instanceof AjaxAdapter) {
      const response = await makeAjaxCall<T>(url);
      // transforma a resposta e retorna
    } else if (this.adapter instanceof NodeAdapter) {
      const response = await makeHttpCall<T>(url);
      // transforma a resposta e retorna
    }
  }
}

function makeAjaxCall<T>(url: string): Promise<T> {
  // faz a requisição e retorna uma Promise
}

function makeHttpCall<T>(url: string): Promise<T> {
  // faz a requisição e retorna uma Promise
}
```

**Bom:**

```ts
abstract class Adapter {
  abstract async request<T>(url: string): Promise<T>;
}

class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T> {
    // faz requisição e retorna uma Promise
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T> {
    // faz requisição e retorna uma Promise
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {}

  async fetch<T>(url: string): Promise<T> {
    const response = await this.adapter.request<T>(url);
    // transforma a resposta e retorna
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Principios da Substituição de Liskov (Liskov Substitution Principle)

Este é um termo muito assustador para um conceito bem simples. É formalmente definido como "Se S é um subtipo de T, então os objetos do tipo T podem ser substituidos com objetos do tipo S(ou seja, objetos do tipo S podem substituir objetos do tipo T) sem alterar nenhuma propriedade desejáveis daquele programa (correção, tarefa executada, etc.)." E essa é uma definição ainda mais assustadora.

A melhor explicação para isso é se você tem uma classe pi e uma classe filho, então a classe pai e a classe filho podem ser usada sem ocorrer resultados incorretos. Isso pode ainda estar sendo confuso, então vamos dar uma olhada no exemplo clássico Quadrado-Retângulo. Matemáticamente, o quadrado é um retângulo, mas se você modelar o quadrado usando o relacionamento "é-um" via herança, você terá problemas.

**Ruim:**

```ts
class Rectangle {
  constructor(protected width: number = 0, protected height: number = 0) {}

  setColor(color: string) {
    // ...
  }

  render(area: number) {
    // ...
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
    this.height = width;
  }

  setHeight(height: number) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles: Rectangle[]) {
  rectangles.forEach(rectangle => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); // BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

**Bom:**

```ts
abstract class Shape {
  setColor(color: string) {
    // ...
  }

  render(area: number) {
    // ...
  }

  abstract getArea(): number;
}

class Rectangle extends Shape {
  constructor(private readonly width = 0, private readonly height = 0) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(private readonly length: number) {
    super();
  }

  getArea(): number {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes: Shape[]) {
  shapes.forEach(shape => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);
```

**[⬆ ir para o topo](#table-of-contents)**

### Principio da Segragação de Interface (PSI)

PSI afima que "Clientes não deveriam ser forçados a serem dependentes de interfaces que eles não usam". Esse princípio é muito relacionado ao Princípio da única responsabilidade.
O que isso realmente significa é que você deve sempre projetar suas abstrações de uma maneira que os clientes que estão usando os métodos expostos não obtenham a "a torta inteira". Isto também inclui aos clientes o dever implementar metódos que eles, na realidade, não precisam.

**Ruim:**

```ts
interface ISmartPrinter {
  print();

  fax();

  scan();
}

class AllInOnePrinter implements ISmartPrinter {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements ISmartPrinter {
  print() {
    // ...
  }

  fax() {
    throw new Error('Fax not supported.');
  }

  scan() {
    throw new Error('Scan not supported.');
  }
}
```

**Bom:**

```ts
interface IPrinter {
  print();
}

interface IFax {
  fax();
}

interface IScanner {
  scan();
}

class AllInOnePrinter implements IPrinter, IFax, IScanner {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements IPrinter {
  print() {
    // ...
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Princípio da Inversão de Dependência (DIP) (Dependency Inversion Principle)

Esse princípio afirma duas coisas essenciais:

1. Modulos de alto nível não deveriam ser dependentes de módulos de baixo nível. Ambos devem depender de abstrações.

2. Abstrações não deveriam ser dependentes de detalhes. Detalhes devem depender de abstrações.

Isso pode ser dificil de entender de primeira, porém se você já trabalhou com Angular, você já viu a implementação desse principio na forma de Injeção de Dependência (Dependency Injection). Entretanto, não são conceitos idênticos, DIP mantém modulos de alto nível conhecendo os detalhes dos módulos de baixo nível e os configura. Isso pode ser feito através da Injeção de Depedencia. Um grande benficio disso é que o acoplamento entre módulos é reduzido. Acoplamento é um padrão muito ruim de desenvolvimento porque faz o seu código ser dificil de refatorar.

DIP é normalmente alcançado através do uso de um container de controle de inversão (IoC). Um exemplo de um container IoC poderoso para o TypeScript é o [InversifyJs](https://www.npmjs.com/package/inversify)

**Ruim:**

```ts
import { readFile as readFileCb } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileCb);

type ReportData = {
  // ..
}

class XmlFormatter {
  parse<T>(content: string): T {
    // Converts an XML string to an object T
  }
}

class ReportReader {

  // BAD: We have created a dependency on a specific request implementation.
  // We should just have ReportReader depend on a parse method: `parse`
  private readonly formatter = new XmlFormatter();

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8');
    return this.formatter.parse<ReportData>(text);
  }
}

// ...
const reader = new ReportReader();
await report = await reader.read('report.xml');
```

**Bom:**

```ts
import { readFile as readFileCb } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileCb);

type ReportData = {
  // ..
}

interface Formatter {
  parse<T>(content: string): T;
}

class XmlFormatter implements Formatter {
  parse<T>(content: string): T {
    // Converts an XML string to an object T
  }
}


class JsonFormatter implements Formatter {
  parse<T>(content: string): T {
    // Converts a JSON string to an object T
  }
}

class ReportReader {
  constructor(private readonly formatter: Formatter){

  }

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8');
    return this.formatter.parse<ReportData>(text);
  }
}

// ...
const reader = new ReportReader(new XmlFormatter());
await report = await reader.read('report.xml');

// or if we had to read a json report:
const reader = new ReportReader(new JsonFormatter());
await report = await reader.read('report.json');
```

**[⬆ ir para o topo](#table-of-contents)**

## Testar

Testar é mais importante do que lançar o software. Se você não tem nenhum teste, ou poucos testes, todas as vezes que você lançar um software você não vai ter certeza de que não quebrou nada.
Decidir o que seria uma boa quantidade de testes é de responsabilidade do seu time, mas ter uma cobertura ampla das funcionalidades do seu código é como você atinge confiança e certa paz de espirito. Isso implica que, além de uma boa ferramente para fazer seus testes, precisa de algo para promover essa total cobertura.

Não há desculpas para não escrever testes. Há uma vasta leva de frameworks para testar JavaScript com suporte a tipos com TypeScript, então ache um que seu time prefira. Quando achar um que funcione pro seu time, escreva testes para toda funcionalidade ou módulo que você introduzir. Se seu método preferido é o TDD (Test Driven Development - Desenvolvimento guiado à testes), isso é ótimo, mas o ponto é você ter certeza do código que está lançando, antes de lança-lo, ou refatorar códigos antigos.

### As três leis do TDD

1. Você não pode escrever nenhum código de produção a não ser que seja para fazer um teste unitário quebrado, passar.

2. Você não pode escrever mais de um teste que falhe; e erros de compilação são erros.

3. Você não pode esrever mais de um código de produção do que o suficiente para passar o teste unitário que falhou.

**[⬆ ir para o topo](#table-of-contents)**

### Regras F.I.R.S.T

Testes limpos devem seguir essas regras:

- **Fast - Rápido** testes devem ser rápidos pois queremos roda-los frequentemente.

- **Independent - Independente** testes não devem depender um dos outros. Eles devem retornar algo, seja ele rodado sozinho ou com outros testes.

- **Repeatable - Repetitivos** testes devem ser repetitivos em qualquer ambiente e não devem haver motivos para eles falharem.

- **Self-Validating - Auto-validado** um teste devem responder com _Passed_ ou _Failed_. Você não tem que comparar com arquivos de log para saber se passaram ou não.

- **Timely - Pontuais** testes unitários devem ser escritos antes do código de produção. se você escrever depois, pode parar muito complicado escrever testes.

**[⬆ ir para o topo](#table-of-contents)**

### Único conceito por teste

Testes devem seguir também o principio da única responsabilidade. Faça apenas uma asserção por teste unitário.

**Ruim:**

```ts
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles date boundaries', () => {
    let date: AwesomeDate;

    date = new AwesomeDate('1/1/2015');
    date.addDays(30);
    assert.equal('1/31/2015', date);

    date = new AwesomeDate('2/1/2016');
    date.addDays(28);
    assert.equal('02/29/2016', date);

    date = new AwesomeDate('2/1/2015');
    date.addDays(28);
    assert.equal('03/01/2015', date);
  });
});
```

**Bom:**

```ts
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles 30-day months', () => {
    const date = new AwesomeDate('1/1/2015');
    date.addDays(30);
    assert.equal('1/31/2015', date);
  });

  it('handles leap year', () => {
    const date = new AwesomeDate('2/1/2016');
    date.addDays(28);
    assert.equal('02/29/2016', date);
  });

  it('handles non-leap year', () => {
    const date = new AwesomeDate('2/1/2015');
    date.addDays(28);
    assert.equal('03/01/2015', date);
  });
});
```

**[⬆ ir para o topo](#table-of-contents)**

### O nome do teste deve revelar sua intenção

Quando um teste falha, o seu nome é a primeira indicação do que deu errado.

**Ruim:**

```ts
describe('Calendar', () => {
  it('2/29/2020', () => {
    // ...
  });

  it('throws', () => {
    // ...
  });
});
```

**Bom:**

```ts
describe('Calendar', () => {
  it('should handle leap year', () => {
    // ...
  });

  it('should throw when format is invalid', () => {
    // ...
  });
});
```

**[⬆ ir para o topo](#table-of-contents)**

## Concorrência

### Prefira promises à callbacks

Callbacks não são claros, e eles causam uma quantidade desnecessária de agrupamento _(callback hell)_.
Há utilitários que transformam funções existentes que usam callbacks para uma versão que retorna promises
(Em Node.js há [`util.promisify`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original), para propositos gerais, veja [pify](https://www.npmjs.com/package/pify), [es6-promisify](https://www.npmjs.com/package/es6-promisify))

**Ruim:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';

function downloadPage(
  url: string,
  saveTo: string,
  callback: (error: Error, content?: string) => void
) {
  get(url, (error, response) => {
    if (error) {
      callback(error);
    } else {
      writeFile(saveTo, response.body, error => {
        if (error) {
          callback(error);
        } else {
          callback(null, response.body);
        }
      });
    }
  });
}

downloadPage(
  'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
  'article.html',
  (error, content) => {
    if (error) {
      console.error(error);
    } else {
      console.log(content);
    }
  }
);
```

**Bom:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url).then(response => write(saveTo, response));
}

downloadPage(
  'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
  'article.html'
)
  .then(content => console.log(content))
  .catch(error => console.error(error));
```

Promises suportam alguns padrões que podem ser úteis em alguns casos:

| Padrão                   | Descrição                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise.resolve(value)` | Converte um valor para uma promise resolvida.                                                                                                                       |
| `Promise.reject(error)`  | Converte um erro para uma promise rejeitada.                                                                                                                        |
| `Promise.all(promises)`  | Retorna uma nova promise, que é preenchida com um array of fulfillment values for the passed promises or rejects with the reason of the first promise that rejects. |
| `Promise.race(promises)` | Returns a new promise which is fulfilled/rejected with the result/error of the first settled promise from the array of passed promises.                             |

`Promise.all` is especially useful when there is a need to run tasks in parallel. `Promise.race` makes it easier to implement things like timeouts for promises.

**[⬆ ir para o topo](#table-of-contents)**

### Async/Await são ainda mais claros do que Promises

Com a sintaxe Async/Await você pode escrever um código muito mais claro e compreensível do que com promises. Dentro de uma função prefixada com `async` você tem uma maneira de dizer ao tempo de execução do JavaScript pausar a execução do código quando utilizado o prefixo `await` (quando usando em um promise).

**Ruim:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = util.promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url).then(response => write(saveTo, response));
}

downloadPage(
  'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
  'article.html'
)
  .then(content => console.log(content))
  .catch(error => console.error(error));
```

**Bom:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

async function downloadPage(url: string, saveTo: string): Promise<string> {
  const response = await get(url);
  await write(saveTo, response);
  return response;
}

// somewhere in an async function (Alguma parte de uma função async)
try {
  const content = await downloadPage(
    'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
    'article.html'
  );
  console.log(content);
} catch (error) {
  console.error(error);
}
```

**[⬆ ir para o topo](#table-of-contents)**

## Tratamento de erros

Erros lançados são uma coisa boa! Eles significam que o tempo de execução identificou com sucesso quando alguma coisa no seu programa deu errado e está deixando você saber parando a execução da função atual, matando o processo (em Node), e notificando você no console.

### Sempre use Erro para jogar (throwing) ou rejeitar (rejecting)

JavaScript assim como o TypeScript te permite jogar (`throw`) qualquer objeto. Um promise também ser rejeitado com qualquer objeto de razão.
É aconselhavel usar a sintaxe jogar(`throw`) com um tipo Erro (`Error`). Isto é porque seu erro pode ser pego em um código de alto nível com uma sintaxe pegar (`catch`).
Seria muito confuso pegar uma mensagem string la e faria
[debugar mais doloroso](https://basarat.gitbooks.io/typescript/docs/types/exceptions.html#always-use-error).
Pela mesma razão você deveria rejeitar promises com tipo de erro (`Error`).

**Ruim:**

```ts
function calculateTotal(items: Item[]): number {
  throw 'Not implemented.';
}

function get(): Promise<Item[]> {
  return Promise.reject('Not implemented.');
}
```

**Bom:**

```ts
function calculateTotal(items: Item[]): number {
  throw new Error('Not implemented.');
}

function get(): Promise<Item[]> {
  return Promise.reject(new Error('Not implemented.'));
}

// Ou equivalente a:

async function get(): Promise<Item[]> {
  throw new Error('Not implemented.');
}
```

O benefício de user o tipo `Error` é que este é suportado por `try/catch/finally` e implicitamente todos os erros tem a propriedade `stack`, que é uma ferramenta poderosa para debug.
Há também outras alternativas, não usar `throw` e, ao invés disso, sempre retornar objetos de erro.
TypeScript deixa isso ainda mais fácil. Considere o exemplo abaixo:

```ts
type Result<R> = { isError: false; value: R };
type Failure<E> = { isError: true; error: E };
type Failable<R, E> = Result<R> | Failure<E>;

function calculateTotal(items: Item[]): Failable<number, 'empty'> {
  if (items.length === 0) {
    return { isError: true, error: 'empty' };
  }

  // ...
  return { isError: false, value: 42 };
}
```

Para entender mais disso, leia a [publicação original](https://medium.com/@dhruvrajvanshi/making-exceptions-type-safe-in-typescript-c4d200ee78e9).

**[⬆ ir para o topo](#table-of-contents)**

### Não ignore erros capturados

Não fazer nada com um erro capturado não te da a habilidade para consertar ou reagir ao erro. Mostrar o erro no console (`console.log`) não é muito bom, já que fácilmente pode ser perdido no meio de tanta coisa mostrada no console. Se você coloca todo pedaço de código em um `try/catch`, significa que você acha que um erro pode acontecer, então você deve ter um plano, ou criar uma saída, pra quando acontecer.

**Ruim:**

```ts
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}

// ou ainda pior

try {
  functionThatMightThrow();
} catch (error) {
  // ignorar o erro
}
```

**Bom:**

```ts
import { logger } from './logging';

try {
  functionThatMightThrow();
} catch (error) {
  logger.log(error);
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Não ignore promises rejeitadas

Pelo mesmo motivo que você não deve ignorar erros que vem do `try/catch`.

**Ruim:**

```ts
getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch(error => {
    console.log(error);
  });
```

**Bom:**

```ts
import { logger } from './logging';

getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch(error => {
    logger.log(error);
  });

// ou usando async/await:

try {
  const user = await getUser();
  await sendEmail(user.email, 'Welcome!');
} catch (error) {
  logger.log(error);
}
```

**[⬆ ir para o topo](#table-of-contents)**

## Formatação

Formatação é subjetivo. Como todas outras regras aqui, não há uma mais rápida ou mais difícil que você deva seguir. O ponto principal é _NÃO ARGUMENTE_ formatação do código. Há várias ferramentas que automatizam isso. Escolha uma! É uma perda de tempo e dinheiro para engenheiros (de software) argumentar em cima de formatação de código. A regra geral é _seguir e manter consistente as regras de formatação_.

Em TypeScript, tem uma ótima ferramenta chamada [TSLint](https://palantir.github.io/tslint/). É uma ferramenta de análise estática que pode te ajudar a melhorar drásticamente a legibilidade e manutenibilidade do seu código. Há algumas configurações prontas para serem utilizadas com TSLint.

- [TSLint Config Standard](https://www.npmjs.com/package/tslint-config-standard) - Configurações padrões

- [TSLint Config Airbnb](https://www.npmjs.com/package/tslint-config-airbnb) - Configurações utilizadas no Airbnb

- [TSLint Clean Code](https://www.npmjs.com/package/tslint-clean-code) - Regras inspiradas no livro [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

- [TSLint react](https://www.npmjs.com/package/tslint-react) - Regras para React e JSX

- [TSLint + Prettier](https://www.npmjs.com/package/tslint-config-prettier) - Regras para serem usadas com o [Prettier](https://github.com/prettier/prettier).

- [ESLint rules for TSLint](https://www.npmjs.com/package/tslint-eslint-rules) - Regras do ESLint p/ TypeScript

- [Immutable](https://www.npmjs.com/package/tslint-immutable) - Regras para desabilitar mutações no TypeScript

Vale mencionar também este ótimo artigo [TypeScript StyleGuide and Coding Conventions](https://basarat.gitbooks.io/typescript/docs/styleguide/styleguide.html).

### Capitalize de forma consistente

Capitalização diz muito sobre suas variáveis, funções, etc. Essas regras são subjetivas, seu time pode escolher o que eles quiserem. Indepentente da forma que escolherem, _sejam consistentes_.

**Ruim:**

```ts
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restore_database() {}

class animal {}
class Container {}
```

**Bom:**

```ts
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const ARTISTS = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restoreDatabase() {}

class Animal {}
class Container {}
```

Use `PascalCase` para classes, interfaces, tipos e namespaces.
Use `camelCase` para variáveis, funções e classes.

**[⬆ ir para o topo](#table-of-contents)**

### Function callers and callees should be close

### Funções que chamam outras funções, ou que são chamadas, devem estar próximas uma das outras.

Se uma função chama outra, mantenha essas funções verticalmente perto no seu arquivo. Idealmente, mantenha a função que chama a outra, logo acima da função chamada.

Tendemos a ler código de cima para baixo, como um jornal. Por conta disso, faça seu código ser fácil de ler dessa maneira.

**Ruim:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {}

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers');
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  private getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  review() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();

    // ...
  }

  private getManagerReview() {
    const manager = this.lookupManager();
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.review();
```

**Bom:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {}

  review() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();

    // ...
  }

  private getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers');
  }

  private getManagerReview() {
    const manager = this.lookupManager();
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.review();
```

**[⬆ ir para o topo](#table-of-contents)**

### type vs. interface

Use `type` quando você precisar de uma união ou interseção. Use interface quando precisar usar `extends` ou `implements`. Não há uma regra a ser seguida, entretanto. Use aquela que funciona para você.

Dê uma olhada nesta [explicação](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/54101543#54101543) sobre as diferenças entre `type` e `interface`.

**Ruim:**

```ts
interface EmailConfig {
  // ...
}

interface DbConfig {
  // ...
}

interface Config {
  // ...
}

//...

type Shape {
  // ...
}
```

**Bom:**

```ts

type EmailConfig {
  // ...
}

type DbConfig {
  // ...
}

type Config  = EmailConfig | DbConfig;

// ...

interface Shape {

}

class Circle implements Shape {
  // ...
}

class Square implements Shape {
  // ...
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Organize imports

Com declarações de import fáceis e limpas de ler, você consegue rapidamente ver as dependências do seu código. Assegure-se de que está aplicando as boas práticas para fazer imports:

- Imports devem ser em ordem alfabética e agrupados.
- Imports não utilizadas tem de ser removidos.
- Imports com nomes devem estar em ordem alfabética (ex.: `import {A, B, C} from 'foo';`).
- As fontes do seu imports devem estar em ordem alfabética dividido em grupos, ex.: `import * as foo from 'a'; import * as bar from 'b';`
- Grupos de imports são separados por espaços em branco.
- Grupos devem respeitar a seguinte ordem:
  - polyfills (ex.: `import 'reflect-metadata';`)
  - módulos do node (ex.: `import fs from 'fs';`)
  - módulos externos (ex.: `import { query } from 'itiriri';`)
  - módulos internos (ex.: `import { UserService } from 'src/services/userService';`)
  - módulos de um diretório pai (ex.: `import foo from '../foo'; import qux from '../../foo/qux';`)
  - módulos de um mesmo diretório (ex.: `import bar from './bar'; import baz from './bar/baz';`)

**Ruim:**

```ts
import { TypeDefinition } from '../types/typeDefinition';
import { AttributeTypes } from '../model/attribute';
import { ApiCredentials, Adapters } from './common/api/authorization';
import fs from 'fs';
import { ConfigPlugin } from './plugins/config/configPlugin';
import { BindingScopeEnum, Container } from 'inversify';
import 'reflect-metadata';
```

**Bom:**

```ts
import 'reflect-metadata';

import fs from 'fs';
import { BindingScopeEnum, Container } from 'inversify';

import { AttributeTypes } from '../model/attribute';
import { TypeDefinition } from '../types/typeDefinition';

import { ApiCredentials, Adapters } from './common/api/authorization';
import { ConfigPlugin } from './plugins/config/configPlugin';
```

**[⬆ ir para o topo](#table-of-contents)**

### Use alias do typescript

Faça imports mais agradáveis definindo caminhos e a propriedade baseUrl na seção compilerOptions em `tsconfig.json`

Isso irá evitar caminhos relativos longos quando fizer imports.

**Ruim:**

```ts
import { UserService } from '../../../services/UserService';
```

**Bom:**

```ts
import { UserService } from '@services/UserService';
```

```js
// tsconfig.json
...
  "compilerOptions": {
    ...
    "baseUrl": "src",
    "paths": {
      "@services": ["services/*"]
    }
    ...
  }
...
```

**[⬆ ir para o topo](#table-of-contents)**

## Comentários

O uso de comentários é uma indicação que você falhou ao se expressar sem eles. Seu código deve ser sua única fonte.

> Don’t comment bad code—rewrite it. (Não comente código ruim - Reescreva-o.)
> — _Brian W. Kernighan and P. J. Plaugher_

### Use código que se auto-explica ao invés de comentários

Comentários são desculpas, não um requisito. Bom código normalmente se auto-documentam.

**Ruim:**

```ts
// Checa se subscriptions estão ativas.
if (subscription.endDate > Date.now) {
}
```

**Bom:**

```ts
const isSubscriptionActive = subscription.endDate > Date.now;
if (isSubscriptionActive) {
  /* ... */
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Não deixe código comentado na sua base de código (codebase)

Versionamento de código existe por um motivo. Deixe código antigo no seu histórico.

**Ruim:**

```ts
class User {
  name: string;
  email: string;
  // age: number;
  // jobPosition: string;
}
```

**Bom:**

```ts
class User {
  name: string;
  email: string;
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Não tenha códigos que marcam datas

Lembre-se, versione seu código! Não há motivo para manter código morto, comentado, e especialmente, datado. Use `git log` para ter o histórico.

**Ruim:**

```ts
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Added type-checking (LI)
 * 2015-03-14: Implemented combine (JR)
 */
function combine(a: number, b: number): number {
  return a + b;
}
```

**Bom:**

```ts
function combine(a: number, b: number): number {
  return a + b;
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Evite marcadores posicionados

Normalmente eles só sujam o código. Deixe que os nomes das funções e varáveis, juntamente com uma identação e formatação apropriada, dê uma boa estrutura visual no seu código.
Opcionalmente você pode usar o suporte da sua IDE para _code folding_ (VSCode [folding regions](https://code.visualstudio.com/updates/v1_17#_folding-regions))

**Ruim:**

```ts
////////////////////////////////////////////////////////////////////////////////
// Client class
////////////////////////////////////////////////////////////////////////////////
class Client {
  id: number;
  name: string;
  address: Address;
  contact: Contact;

  ////////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////////
  public describe(): string {
    // ...
  }

  ////////////////////////////////////////////////////////////////////////////////
  // private methods
  ////////////////////////////////////////////////////////////////////////////////
  private describeAddress(): string {
    // ...
  }

  private describeContact(): string {
    // ...
  }
}
```

**Bom:**

```ts
class Client {
  id: number;
  name: string;
  address: Address;
  contact: Contact;

  public describe(): string {
    // ...
  }

  private describeAddress(): string {
    // ...
  }

  private describeContact(): string {
    // ...
  }
}
```

**[⬆ ir para o topo](#table-of-contents)**

### Comentários de TODO

Quando você reparar que precisa deixar notas no código, para alterar coisas futuramente, faça isso utilizando comentários `// TODO`. A maioria das IDEs tem um suporte especial para esse tipo de comentário para que possa voltar nesses comentários mais fácilmente depois.

Tenha em mente que *TODO*s não são uma desculpa para código ruim.

**Ruim:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // garantir que `dueDate` está indexado
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**Bom:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // TODO: garantir que `dueDate` está indexado.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**[⬆ ir para o topo](#table-of-contents)**

Um grande obrigado ao meu amigo [Luís Gustavo](https://github.com/lgustavogdc) que me deu uma força ao traduzir esse conteúdo maravilhoso!
