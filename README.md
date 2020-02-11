# clean-code-typescript [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Clean%20Code%20Typescript&url=https://github.com/labs42io/clean-code-typescript)

Концепции чистого кода адаптированные для TypeScript, вдохновленные [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript).

Оригинал на английском [clean-code-typescript](https://github.com/labs42io/clean-code-typescript)

*У переводчика не идеальные знания английского, указывайте пожалуйста на [ошибки](https://github.com/Real001/clean-code-typescript/issues/5)!*

## Содержание

  1. [Введение](#введение)
  2. [Переменные](#переменные)
  3. [Функции](#функции)
  4. [Объекты и структуры данных](#объекты-и-структуры-данных)
  5. [Классы](#классы)
  6. [SOLID](#solid)
  7. [Тестирование](#тестирование)
  8. [Асинхронность](#асинхронность)
  9. [Обработка ошибок](#обработка-ошибок)
  10. [Форматирование](#форматирование)
  11. [Комментарии](#комментарии)
  12. [Переводы](#переводы)

## Введение

![Humorous image of software quality estimation as a count of how many expletives
you shout when reading code](https://www.osnews.com/images/comics/wtfm.jpg)

Инженерные принципы ПО, из книги Robert C. Martin'
[*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882),
адаптированные для TypeScript. Это не руководство по стилю. Это руководство по написанию
[читаемого, переиспользуемого и пригодного для рефакторинга](https://github.com/ryanmcdermott/3rs-of-software-architecture) кода на TypeScript.

Не каждый принцип описанный здесь должен строго соблюдаться и еще меньше получать
всеобщего признаний. Это принципы и ни чего более, оно они накапливались в течение
многих лет с опытом коллектива авторов *Чистого Кода*

Ремеслу по написанию программного обеспечения чуть более 50 лет, но мы все еще многому учимся.
Когда программная архитектура постареет до возрастра самой архитектуры, быть может тогда у нас
появятся жесткие правила которым необходимо следовать. А сейчас пусть это служит критериями,
с помощью которого вы будете оценивать качество вашего TypeScript кода и вашей команды. 

И еще одна вещь: знание этих принципов не делает вас сразу лучшим разработчиком ПО, а их использование в
течение многих лет не гарантирует, что вы не будете совершать ошибки. Каждый кусок кода начинается как
черновик, как мокрый кусок глины который только постепенно приобретает свою форму. Не упрекайте себя при
первых набросках кода, которые нуждаются в улучшении. Улучшайте код вместо этого!

**[⬆ Вернуться в начало](#содержание)**

## Переменные

### Используйте выразительные имена переменных

Различайте имена таким образом, чтобы читатель знал что они означают.

**Плохо:**

```ts
function between<T>(a1: T, a2: T, a3: T): boolean {
  return a2 <= a1 && a1 <= a3;
}

```

**Хорошо:**

```ts
function between<T>(value: T, left: T, right: T): boolean {
  return left <= value && value <= right;
}
```

**[⬆ Вернуться в начало](#содержание)**

### Используйте произносительные имена переменных

Если вы не можете произносить их, вы не можете обсуждать их не выглядя как идиот.

**Плохо:**

```ts
type DtaRcrd102 = {
  genymdhms: Date;
  modymdhms: Date;
  pszqint: number;
}
```

**Хорошо:**

```ts
type Customer = {
  generationTimestamp: Date;
  modificationTimestamp: Date;
  recordId: number;
}
```

**[⬆ Вернуться в начало](#содержание)**

### Используйте один и тот же словарь для одних и тех же типов переменных

**Плохо:**

```ts
function getUserInfo(): User;
function getUserDetails(): User;
function getUserData(): User;
```

**Хорошо:**

```ts
function getUser(): User;
```

**[⬆ Вернуться в начало](#содержание)**

### Используйте имена, доступные для поиска 

Мы читаем больще кода, чем пишем. Это важно чтобы код, который мы пишем, был читаемым и достумным для поиска.
Не называйте переменные, которые в конечном итое имеют смысл только для наших программ мы вредим нашим читателям.
Делайте ваши имена доступными для поиска.
Такие инструменты, как [TSLint](https://palantir.github.io/tslint/rules/no-magic-numbers/) и [ESLint](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md)
могут помочь идентифицировать не названные константы.

**Плохо:**

```ts
// What the heck is 86400000 for?
setTimeout(restart, 86400000);
```

**Хорошо:**

```ts
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

setTimeout(restart, MILLISECONDS_IN_A_DAY);
```

**[⬆ Вернуться в начало](#содержание)**

### Используйте объясняющие переменные

**Плохо:**

```ts
declare const users: Map<string, User>;

for (const keyValue of users) {
  // iterate through users map
}
```

**Хорошо:**

```ts
declare const users: Map<string, User>;

for (const [id, user] of users) {
  // iterate through users map
}
```

**[⬆ Вернуться в начало](#содержание)**

### Избегайте мысленного связывания

Явное лучше, чем неявное. 
*Ясность - это король.*

**Плохо:**

```ts
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

**Хорошо:**

```ts
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**[⬆ Вернуться в начало](#содержание)**

### Не добавляйте не нужный контекст

Если имя вашего класса/типа/объекта говорит само за себя, не повторяйте его в вашем именни переменной.

**Плохо:**

```ts
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
}

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

**Хорошо:**

```ts
type Car = {
  make: string;
  model: string;
  color: string;
}

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

**[⬆ Вернуться в начало](#содержание)**

### Используйте аргументы по умолчанию вместо замыканий или вычислений

Аргументы по умолчанию часто чище, чем короткое вычисление.

**Плохо:**

```ts
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10;
  // ...
}
```

**Хорошо:**

```ts
function loadPages(count: number = 10) {
  // ...
}
```

**[⬆ Вернуться в начало](#содержание)**

### Используйте enum для документирования

Enum'ы могут помочь документированию вашего кода. Например когда мы обеспокоены тем, что наши переменные
отличаются от значений.

**Плохо:**

```ts
const GENRE = {
  ROMANTIC: 'romantic',
  DRAMA: 'drama',
  COMEDY: 'comedy',
  DOCUMENTARY: 'documentary',
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // delactation of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed 
    }
  }
}
```

**Хорошо:**

```ts
enum GENRE {
  ROMANTIC,
  DRAMA,
  COMEDY,
  DOCUMENTARY,
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // delactation of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed 
    }
  }
}
```

**[⬆ Вернуться в начало](#содержание)**

## Функции

### Аргументы функции (идеально два или меньше)

Ограничение колличества параметров функции невероятно важно, потому что это делает тестирование ваших
функций проще. Наличие более 3-х аргументов приводит к комбинаторному взрыву, где вы должны протестировать
множество вариантов с каждым отдельным аргументом

Один или два аргумента это идеальный случай, а три и более следует избегать, если это возможно.
Большое колличество аргументов лучше объединять. Обычно если вы используете более двух аргументов, то ваша функция пытается
делать слишком много. В случаях когда это не так, то лучше использовать объект верхнего уровня. 

Подумайте о том чтобы использовать объектные литералы, если вам необходимо много аргументов.

Для того чтобы вы знали какие параметры ожидает функция, вы можете использовать
[синтаксис деструктуризации](https://basarat.gitbooks.io/typescript/docs/destructuring.html).

Он имеет несколько преимуществ:

1. Когда кто-то смотрит на синатуру функции, то сразу становится понятка какие свойства она использует.

2. Деструктуризация также клонирует примитивные значения аргумента-объекта переданного в функцию.
 Это помогает избежать сайд эффекта. Заметка: объекты и массивы которые деструктурированы из аргумента-объекта не клонируются.

3. TypeScript предупреждает о неиспользуемых свойствах, это было бы невозможно без деструктуризации.

**Плохо:**

```ts
function createMenu(title: string, body: string, buttonText: string, cancellable: boolean) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

**Хорошо:**

```ts
function createMenu(options: { title: string, body: string, buttonText: string, cancellable: boolean }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

Вы можете еще больше повысить читаемость, если будете использовать [type aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases):

```ts

type MenuOptions = { title: string, body: string, buttonText: string, cancellable: boolean };

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

**[⬆ back to top](#содержание)**

### Функции должны выполнять одну задачу

Это одно из самых важных правил в разработке ПО. Когда функции решают больше одной задачи,
их труднее объединять, тестировать. Если вы сможете изолировать функцию так чтобы она выполняла только одну задачу,
  в дальнейшем она может быть легко переработана, а ваш код будет чище. Если вы запомните только это правило из этого
  руководства, то вы уже будете лучше многих разработчиков.

**Плохо:**

```ts
function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Хорошо:**

```ts
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

**[⬆ back to top](#содержание)**

### Название функций должны описывать что они делают

**Плохо:**

```ts
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

**Хорошо:**

```ts
function addMonthToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();
addMonthToDate(date, 1);
```

**[⬆ back to top](#содержание)**

### Функции должны иметь один уровень абстракции

Если у вас больше одного уровня абстракции, то обычно эта функция делает слишком многое. Разделение функций дает возможность
переиспользования и простого тестирования.

**Плохо:**

```ts
function parseCode(code: string) {
  const REGEXES = [ /* ... */ ];
  const statements = code.split(' ');
  const tokens = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

**Хорошо:**

```ts
const REGEXES = [ /* ... */ ];

function parseCode(code: string) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);

  syntaxTree.forEach((node) => {
    // parse...
  });
}

function tokenize(code: string): Token[] {
  const statements = code.split(' ');
  const tokens: Token[] = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function parse(tokens: Token[]): SyntaxTree {
  const syntaxTree: SyntaxTree[] = [];
  tokens.forEach((token) => {
    syntaxTree.push( /* ... */ );
  });

  return syntaxTree;
}
```

**[⬆ back to top](#содержание)**

### Удаляйте дублированный код

Делайте все возможное для избежания дублирования кода.
Дублирование кода плохо, тем что если вам придется править логику, её придется править в нескольких местах.  

Представьте если вы открыли ресторан и ведете учет ваших продуктов: всех ваших томатов, лука, чеснока, специй и д.р..
Если у вас закажут блюда из томатов, то вам придется вносить изменения во все ваши списки. Если список будет только один,
то и править нужно будет только его.

Часто вы дублируете код из-за того что когда вам требуется реализовать два и более незначительно различающихся действий,
которые очень похожи, но их различия заставляют вас завести несколько функций, делающий практически одно и тоже. Удаление
дублирующихся частей кода, означает создание абстракции, обрабатывающий разную логику с помощью всего одной функции/модуля/класса.

Получение абстракции имеет важное значение, поэтому вы должны следовать принципам [SOLID](#solid). Плохие абстракции могут
оказаться хуже дублирующего кода, будьте осторожны! Если вы можете сделать хорошую абстракцию делайте. Не повторяйте себя
в противном случае вы можете обнаружить себя вносящим изменения в разные места, для одной единственной логики.

**Плохо:**

```ts
function showDeveloperList(developers: Developer[]) {
  developers.forEach((developer) => {
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
  managers.forEach((manager) => {
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

**Хорощо:**

```ts
class Developer {
  // ...
  getExtraDetails() {
    return {
      githubLink: this.githubLink,
    }
  }
}

class Manager {
  // ...
  getExtraDetails() {
    return {
      portfolio: this.portfolio,
    }
  }
}

function showEmployeeList(employee: Developer | Manager) {
  employee.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();
    const extra = employee.getExtraDetails();

    const data = {
      expectedSalary,
      experience,
      extra,
    };

    render(data);
  });
}
```

Вы должны критически относиться к дублированию кода. Иногда существует компромисс между дублированием кода и увеличением
сложности, вводя новую абстракцию. Когда две реализации из двух разных модулей выглядят одинаково, но существуют в разных
доменах, дублирование может быть приемлемым и предпочтительным вариантом, нежели объединение в общий код. Перенос логики
в общий код, вводит косвенную зависимость между двумя модулями.

**[⬆ back to top](#содержание)**

### Устанавливайте объекты по умолчанию с помощью Object.assign или деструктуризации

**Плохо:**

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu(config: MenuConfig) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable = config.cancellable !== undefined ? config.cancellable : true;

  // ...
}

createMenu({ body: 'Bar' });
```

**Хорошо:**

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu(config: MenuConfig) {
  const menuConfig = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // ...
}

createMenu({ body: 'Bar' });
```

Кроме того можно использовать деструктуризацию со значениями по умолчанию:

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu({ title = 'Foo', body = 'Bar', buttonText = 'Baz', cancellable = true }: MenuConfig) {
  // ...
}

createMenu({ body: 'Bar' });
```

Чтобы избежать каких-либо побочных эффектов и неожиданноо поведения передавая явно `undefined` или `null` вы можете сказать
компилятору TypeScript чтобы он не разрешал этого.
Смотрите [`--strictNullChecks`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictnullchecks) опция для TypeScript.

**[⬆ back to top](#содержание)**

### Не используйте флаги в качестве параметров функции

Флаги говорят пользователю, что функция совершает более одного действия. Функция должна решать одну задачу.
Разделяйте функции, если они исполняют различные варианты кода на основе логического значения.

**Плохо:**

```ts
function createFile(name: string, temp: boolean) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Хорошо:**

```ts
function createTempFile(name: string) {
  createFile(`./temp/${name}`);
}

function createFile(name: string) {
  fs.create(name);
}
```

**[⬆ back to top](#содержание)**

### Избегайте побочных эффектов (часть 1)

Функция производит побочный эффект, если она совершает какое-либо действие помимо получения значения и
возврата другого значения или значений. Побочный эффект может быть записью в файл, изменением каких-то
глобальных переменных или случайным переводом всех ваших денег неизвестным лицам.
  
Впрочем, побочные эффекты в программе необходимы. Пусть, как и в предыдущем примере, вам требуется запись в файл.
Опишите то, что вы хотите сделать, строго в одном месте. Не создавайте несколько функций и классов, которые пишут что-то
в конкретный файл. Создайте один сервис, который всем этим занимается. Один и только один.

Суть в том, чтобы избегать распространенных ошибок, таких как, например, передача состояния между объектами
без какой-либо структуры, с помощью изменяемых данных, которые может перезаписывать кто угодно, в обход
централизованного места применения побочных эффектов. Если научитесь так делать, вы станете счастливее, чем подавляющее
большинство других программистов.

**Плохо:**

```ts
// Global variable referenced by following function.
let name = 'Robert C. Martin';

function toBase64() {
  name = btoa(name);
}

toBase64();
// If we had another function that used this name, now it'd be a Base64 value

console.log(name); // expected to print 'Robert C. Martin' but instead 'Um9iZXJ0IEMuIE1hcnRpbg=='
```

**Хорошо:**

```ts
const name = 'Robert C. Martin';

function toBase64(text: string): string {
  return btoa(text);
}

const encodedName = toBase64(name);
console.log(name);
```

**[⬆ back to top](#содержание)**

### Избегайте побочных эффектов (Часть 2)

В JavaScript примитивы передаются по значению, а объекты и массивы передаются по ссылке. В случае объектов или массивов,
если ваша функция вносит изменения в корзину покупок(массив), например при добавлении элемента в массив, то любая другая
функция использующаяя `корзину` массив будет зависеть от этого добавления. Это может быть как хорошо, так и плохо. Давайте
представим плохую ситуации:

Пользователь нажимает кнопку "Купить" вызывующую функцию `purchase`, которая делает сетевой запрос и отправляет `корзину`
массив на сервер. Если происходит плохое подключение к сети функция должна отправить повторный запрос. Теперь, если пользователь
случайно нажимает на кнопку "Добавить в корзину", но пока не хочет покупать товар? Если это произойдет и в этот момент начнется
запрос на сервер, то функция purchase отправит случайно добавленный элемент, так как он имеет ссылку на корзину покупок,
котора была изменена функцией `addItemToCart`. Путем добавления нежелательного элемента.

Хорошим бы решением было бы что бы функция `addItemToCart` всегда клонировала бы массив `cart` редактировала его и
возвращала клон. Это бы гарантировало, что никакие другие функции, использующие ссылку на массив корзины покупок,
не будут затронуты какими-либо изменениями.  

Два предостережения по-поводу такого подхода:

1. Возможны случаи, когда вы на самом деле хотите изменить объект по ссылке, но такие случаи крайне редки.
Большинство функций могут быть объявлены без сайд эффектов! (Смотрите [pure function](https://en.wikipedia.org/wiki/Pure_function))

2.Клонирование больших объектов может быть очень нагрузочным и влиять на производительность. К счастью, это не является
большой проблемой на практике, потому что есть отличные библиотеки, которые позволяют клонировать объекты с меньшей
нагрузкой на память в отличии от клонирования вручную.

**Плохо:**

```ts
function addItemToCart(cart: CartItem[], item: Item): void {
  cart.push({ item, date: Date.now() });
};
```

**Хорошо:**

```ts
function addItemToCart(cart: CartItem[], item: Item): CartItem[] {
  return [...cart, { item, date: Date.now() }];
};
```

**[⬆ back to top](#содержание)**

### Не пишите глобальные функции

Загрязнение глобальных переменных — плохая практика в JavaScript, так как может породить конфликты с другой библиотекой,
и пользователь вашего API не увидит ошибок, пока не получит исключение в продакшене. Давайте рассмотрим пример:
что если вы хотите расширить стандартный метод Array JavaScript, имея метод `diff` который бы вычислял различие между
двумя массивами? Вы должны были бы записать новую функцию в `Array.prototype`, но тогда она может войти в конфликт 
с другой библиотекой, которая пыталась сделать то же самое. Что если другая библиотека использовала метод `diff`,
чтобы найти разницу между первым и последним элементами массива? В этом случае лучше использовать классы и просто
сделать наследование от глобального `Array`.

**Плохо:**

```ts
declare global {
  interface Array<T> {
    diff(other: T[]): Array<T>;
  }
}

if (!Array.prototype.diff) {
  Array.prototype.diff = function <T>(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

**Хорошо:**

```ts
class MyArray<T> extends Array<T> {
  diff(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

**[⬆ back to top](#содержание)**

### Предпочтение функциональное программирование над императивным

Отдавайте предпочтение этому стилю программирования, когда можете.

**Плохо:**

```ts
const contributions = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < contributions.length; i++) {
  totalOutput += contributions[i].linesOfCode;
}
```

**Хорошо:**

```ts
const contributions = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

const totalOutput = contributions
  .reduce((totalLines, output) => totalLines + output.linesOfCode, 0);
```

**[⬆ back to top](#содержание)**

### Инкапсулируйте условия

**Плохо:**

```ts
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

**Хорошо:**

```ts
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0
}

if (canActivateService(subscription, account)) {
  // ...
}
```

**[⬆ back to top](#содержание)**

### Избегайте негативных условий

**Плохо:**

```ts
function isEmailNotUsed(email: string): boolean {
  // ...
}

if (isEmailNotUsed(email)) {
  // ...
}
```

**Хорошо:**

```ts
function isEmailUsed(email): boolean {
  // ...
}

if (!isEmailUsed(node)) {
  // ...
}
```

**[⬆ back to top](#содержание)**

### Избегайте условных операторов

Эта задача кажется невозможной. Большинство людей, впервые услышав это, говорят, "как я должен делать что-либо без
выражения `if`?". Ответ заключается в том, что во многих случаях для достижения тех же целей можно использовать
полиморфизм. Второй вопрос обычно, "хорошо, замечательно, но почему я должен их избегать?" Ответ, предыдущая концепция
чистого кода, которую вы узнали: функция должна выполнять только одну задачу. Когда у вас есть классы и функции,
содержащие конструкцию `if`, вы говорите своему пользователю, что ваша функция выполняет больше одной задачи.
Запомните, делать только одну задачу.

**Плохо:**

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

  private getMaxAltitude(): number {
    // ...
  }
}
```

**Хорошо:**

```ts
abstract class Airplane {
  protected getMaxAltitude(): number {
    // shared logic with subclasses ...
  }

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

**[⬆ back to top](#содержание)**

### Избегайте проверки типов

TypeScript является надмножеством синтаксиса JavaScript и добавляют дополнительные статические проверки типов для языка.
Всегда предпочитайте указывать типы переменных, параметров и возвращаемых значений, чтобы использовать
всю мощь TypeScript. Это делает будущий рефакторинг более легким.

**Плохо:**

```ts
function travelToTexas(vehicle: Bicycle | Car) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(currentLocation, new Location('texas'));
  }
}
```

**Хорошо:**

```ts
type Vehicle = Bicycle | Car;

function travelToTexas(vehicle: Vehicle) {
  vehicle.move(currentLocation, new Location('texas'));
}
```

**[⬆ back to top](#содержание)**

### Не делайте слишком много оптимизаций

Современные браузеры производят множество оптимизаций под капотом во время исполнения кода. Оптимизируя код вручную вы
зачастую, просто тратите свое время. Есть хорошие [ресурсы](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
для того чтобы увидеть где оптимизация отсутствует. Поглядывайте на них в свободное время, пока эти проблемы не будут
исправлены, если вообще будут, конечно.

**Плохо:**

```ts
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Хорошо:**

```ts
for (let i = 0; i < list.length; i++) {
  // ...
}
```

**[⬆ back to top](#содержание)**

### Удаляйте мертвый код

Мертвый код - так же плохо, как повторяющийся код. Нет никаких оснований продолжать хранить его в кодовой базе.
Если он не используется, избавьтесь от него! В случае надобности, его всегда можно найти в истории версий.
                           
**Плохо:**

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

**Хорошо:**

```ts
function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**[⬆ back to top](#содержание)**

### Используйте итераторы и генераторы

Используйте генераторы и итераторы при работе с коллекциями данных, которые используются как поток.
Есть несколько причин для этого:

- отделяет вызываемый объект от реализации генератора в том смысле, что вызываемый объект решает сколько элементов
 иметь для доступа
- ленивое выполнение, элементы передаются по требованию
- встроенная поддержка итерации элементов с использованием синтаксиса `for-of`
- итераторы позволяют реализовать оптимизированные паттерны итераторов

**Плохо:**

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

// Print first 10 Fibonacci numbers.
print(10);
```

**Хорошо:**

```ts
// Generates an infinite stream of Fibonacci numbers.
// The generator doesn't keep the array of all numbers.
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

// Print first 10 Fibonacci numbers.
print(10);
```

Существуют библиотеки, которые позволяют работать с итераторами так же, как и с собственными массивами, путем
цепочка методов, таких как `map`, `slice`, `forEach` и др. Смотрите [itiriri](https://www.npmjs.com/package/itiriri)
пример продвинутой манипуляции с итераторами (или [itiriri-async](https://www.npmjs.com/package/itiriri-async)
для  манипуляции с асинхронными итераторами).

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

**[⬆ back to top](#содержание)**

## Объекты и структуры данных

### Используйте геттеры и сеттеры


TypeScript поддерживает синтаксис геттеров и сеттеров.
Использовать геттеры и сеттеры для доступа к данным объекта гораздо лучше, чем напрямую обращаться к его свойствам.
"Почему?" спросите вы. Вот список причин:

- Если вы хотите реализовать больше, чем просто доступ к свойству, вам нужно поменять реализацию в одном месте,
а не по всему коду.
- Валидацию легко реализовать на уровне реализации `set`.
- Инкапсуляция внутреннего состояния.
- Легко добавить логирование и обработку ошибок на уровне геттеров и сеттеров.
- Вы можете лениво подгружать свойства вашего объекта, например, с сервера.

**Плохо:**

```ts
type BankAccount = {
  balance: number;
  // ...
}

const value = 100;
const account: BankAccount = {
  balance: 0,
  // ...
};

if (value < 0) {
  throw new Error('Cannot set negative balance.');
}

account.balance = value;
```

**Хорошо:**

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

// Теперь `BankAccount` инкапсулирует логику проверки.
// Если однажды спецификации изменятся, и нам понадобится дополнительное правило проверки,
// нам придется изменить только реализацию `сеттера`,
// оставив весь зависимый код без изменений.
const account = new BankAccount();
account.balance = 100;
```

**[⬆ back to top](#содержание)**

### Создавайте объекты с приватными/защищенными полями

TypeScript поддерживает `public` *(по умолчанию)*, `protected` и `private` средства доступа к свойствам класса.  

**Плохо:**

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

**Хорошо:**

```ts
class Circle {
  constructor(private readonly radius: number) {
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}
```

**[⬆ back to top](#содержание)**

### Используйте иммутабельность

Система типов в TypeScript позволяет помечать отдельные свойства интерфейса/класса как *readonly поля (только для чтения)*.
Это позволяет вам работать функционально (неожиданная мутация это плохо).  
Для более сложных сценариев есть встроенный тип `Readonly`, который принимает тип` T` и помечает все его свойства
только для чтения с использованием mapped types (смотрите [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)).

**Плохо:**

```ts
interface Config {
  host: string;
  port: string;
  db: string;
}
```

**Хорошо:**

```ts
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

В случае массива вы можете создать массив только для чтения, используя `ReadonlyArray<T>`. который не позволяет делать изменения с использованием `push()` и `fill()`, но можно использовать `concat()` и `slice()` они не меняют значения.

**Плохо:**

```ts
const array: number[] = [ 1, 3, 5 ];
array = []; // error
array.push(100); // array will updated
```

**Хорошо:**

```ts
const array: ReadonlyArray<number> = [ 1, 3, 5 ];
array = []; // error
array.push(100); // error
```

Объявление аргументов только для чтения [TypeScript 3.4 is a bit easier](https://github.com/microsoft/TypeScript/wiki/What's-new-in-TypeScript#improvements-for-readonlyarray-and-readonly-tuples).

```ts
function hoge(args: readonly string[]) {
  args.push(1); // error
}
```

Предпочтение [const assertions](https://github.com/microsoft/TypeScript/wiki/What's-new-in-TypeScript#const-assertions) для литеральных значений.

**Плохо:**

```ts
const config = {
  hello: 'world'
};
config.hello = 'world'; // значение изменено

const array  = [ 1, 3, 5 ];
array[0] = 10; // значение изменено

// записываемые объекты возвращаются
function readonlyData(value: number) {
  return { value };
}

const result = readonlyData(100);
result.value = 200; // значение изменено
```

**Хорошо:**

```ts
// объект только для чтения
const config = {
  hello: 'world'
} as const;
config.hello = 'world'; // ошибка

// массив только для чтения
const array  = [ 1, 3, 5 ] as const;
array[0] = 10; // ошибка

// Вы можете вернуть объект только для чтения
function readonlyData(value: number) {
  return { value } as const;
}

const result = readonlyData(100);
result.value = 200; // ошибка
```

**[⬆ back to top](#содержание)**

### Типы vs. интерфейсы

Используйте типы, когда вам может понадобиться объединение или пересечение. Используйте интерфейс, когда хотите использовать `extends`
или `implements`. Однако строгого правила не существует, используйте то, что работает у вас.  
Для более подробного объяснения посмотрите это [ответы](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/54101543#54101543)
о различиях между `type` and `interface` в TypeScript.

**Плохо:**

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

type Shape = {
  // ...
}
```

**Хорошо:**

```ts

type EmailConfig = {
  // ...
}

type DbConfig = {
  // ...
}

type Config  = EmailConfig | DbConfig;

// ...

interface Shape {
  // ...
}

class Circle implements Shape {
  // ...
}

class Square implements Shape {
  // ...
}
```

**[⬆ back to top](#содержание)**

## Классы

### Классы должны быть маленькими

Размер класса измеряется его ответственностью. Следуя *Принципу единственной ответственности* класс должен быть маленьким.

**Плохо:**

```ts
class Dashboard {
  getLanguage(): string { /* ... */ }
  setLanguage(language: string): void { /* ... */ }
  showProgress(): void { /* ... */ }
  hideProgress(): void { /* ... */ }
  isDirty(): boolean { /* ... */ }
  disable(): void { /* ... */ }
  enable(): void { /* ... */ }
  addSubscription(subscription: Subscription): void { /* ... */ }
  removeSubscription(subscription: Subscription): void { /* ... */ }
  addUser(user: User): void { /* ... */ }
  removeUser(user: User): void { /* ... */ }
  goToHomePage(): void { /* ... */ }
  updateProfile(details: UserDetails): void { /* ... */ }
  getVersion(): string { /* ... */ }
  // ...
}
```

**Хорошо:**

```ts
class Dashboard {
  disable(): void { /* ... */ }
  enable(): void { /* ... */ }
  getVersion(): string { /* ... */ }
}

// разделить обязанности, переместив оставшиеся методы в другие классы
// ...
```

**[⬆ back to top](#содержание)**

### Высокая сплоченность низкая связь

Сплоченность определяет степень, в которой члены класса связаны друг с другом. В идеале все поля в классе должны
использоваться каждым методом. Мы говорим, что класс *максимально связный*. На практике это, однако, не всегда возможно
и даже нежелательно. Однако вы должны добиваться, того чтобы сплоченность была высокой.  

Связанность относится и к тому, как связаны или зависимы два класса друг от друга. Классы считаются слабосвязанными если
изменения в одном из них не влияют на другой.  

**Плохо:**

```ts
class UserManager {
  // Плохо: каждая закрытая переменная используется той или иной группой методов.
  // Это ясно показывает, что класс несет больше, чем одну ответственность
  // Если мне нужно только создать сервис, чтобы получить транзакции для пользователя,
  // Я все еще вынужден передавать экземпляр  `emailSender`.
  constructor(
    private readonly db: Database,
    private readonly emailSender: EmailSender) {
  }

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

**Хорошо:**

```ts
class UserService {
  constructor(private readonly db: Database) {
  }

  async getUser(id: number): Promise<User> {
    return await this.db.users.findOne({ id });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await this.db.transactions.find({ userId });
  }
}

class UserNotifier {
  constructor(private readonly emailSender: EmailSender) {
  }

  async sendGreeting(): Promise<void> {
    await this.emailSender.send('Welcome!');
  }

  async sendNotification(text: string): Promise<void> {
    await this.emailSender.send(text);
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

**[⬆ back to top](#содержание)**

### Предпочитайте композицию наследованию

Как сказано в  [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns) от банды черытех вы должны
*Предпочитать композицию наследованию* где можете. Есть много веских причин использовать наследование и много хороших
причин использовать композицию. Суть этого принципа в том, что если ваш ум инстинктивно идет на наследование,
попробуйте подумать, может ли композиция лучше смоделировать вашу проблему. В некоторых случаях может.  
  
Тогда вы можете спросить: "Когда я должен использовать наследование?" Это зависит от вашей проблемы, но это достойный
список, когда наследование имеет больше смысла, чем композиция:

1. Ваше наследование представляет собой "is-a" отношения а не "has-a" отношения (Human->Animal vs. User->UserDetails).

2. Вы можете повторно использовать код из базовых классов (Люди могут двигаться как все животные).

3. Вы хотите внести глобальные изменения в производные классы, изменив базовый класс. (Изменение расхода калорий у всех животных при их перемещении).

**Плохо:**

```ts
class Employee {
  constructor(
    private readonly name: string,
    private readonly email: string) {
  }

  // ...
}

// Плохо, потому что Employees "имеют" налоговые данные. EmployeeTaxData не является типом  Employee
class EmployeeTaxData extends Employee {
  constructor(
    name: string,
    email: string,
    private readonly ssn: string,
    private readonly salary: number) {
    super(name, email);
  }

  // ...
}
```

**Хорошо:**

```ts
class Employee {
  private taxData: EmployeeTaxData;

  constructor(
    private readonly name: string,
    private readonly email: string) {
  }

  setTaxData(ssn: string, salary: number): Employee {
    this.taxData = new EmployeeTaxData(ssn, salary);
    return this;
  }

  // ...
}

class EmployeeTaxData {
  constructor(
    public readonly ssn: string,
    public readonly salary: number) {
  }

  // ...
}
```

**[⬆ back to top](#содержание)**

### Используйте цепочки вызовов

Этот паттерн очень полезен и обычно используется во многих библиотеках. Это позволяет вашему коду быть выразительным
и менее многословным. По этой причине используйте цепочку методов и посмотрите, насколько чистым будет ваш код.

**Плохо:**

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

const queryBuilder = new QueryBuilder();
queryBuilder.from('users');
queryBuilder.page(1, 100);
queryBuilder.orderBy('firstName', 'lastName');

const query = queryBuilder.build();
```

**Хорошо:**

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

**[⬆ back to top](#содержание)**

## SOLID

### Принцип единой ответственности (SRP)

Как написано в Чистом Коде, "Должна быть лишь одна причина для изменения класса". Заманчиво представить себе класс,
переполненный большим количеством функционала, словно в полет вам позволили взять всего один чемодан. Проблема в том, что
ваш класс не будет концептуально связан, и вы будете часто его изменять. Очень важно минимизировать изменения в классе.
Когда вы вносите изменения в класс с огромным функционалом, тяжело отследить последствия ваших изменений.

**Плохо:**

```ts
class UserSettings {
  constructor(private readonly user: User) {
  }

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

**Хорошо:**

```ts
class UserAuth {
  constructor(private readonly user: User) {
  }

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

**[⬆ back to top](#содержание)**

### Принцип открытости/закрытости  (OCP)

Как заявил Бертран Мейер, "программные сущности (классы, модули, функции и т.д.) должны оставаться открытыми для
расширения, но закрытыми для модификации." Что это означает на практике? Принцип закрепляет, что вы должны позволить
пользователям добавлять новые функциональные возможности, но без изменения существующего кода.

**Плохо:**

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
  constructor(private readonly adapter: Adapter) {
  }

  async fetch<T>(url: string): Promise<T> {
    if (this.adapter instanceof AjaxAdapter) {
      const response = await makeAjaxCall<T>(url);
      // трансформируем ответ и возвращаем
    } else if (this.adapter instanceof NodeAdapter) {
      const response = await makeHttpCall<T>(url);
      // трансформируем ответ и возвращаем
    }
  }
}

function makeAjaxCall<T>(url: string): Promise<T> {
  // запрос и возвращение промиса
}

function makeHttpCall<T>(url: string): Promise<T> {
  // запрос и возвращение промиса
}
```

**Хорошо:**

```ts
abstract class Adapter {
  abstract async request<T>(url: string): Promise<T>;

  // общий код для подклассов ...
}

class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // запрос и возвращение промиса
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // запрос и возвращение промиса
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {
  }

  async fetch<T>(url: string): Promise<T> {
    const response = await this.adapter.request<T>(url);
    // трансформируем ответ и возвращаем
  }
}
```

**[⬆ back to top](#содержание)**

### Принцип подстановки Лисков (LSP)

Это страшный термин для очень простой концепции. Формальным языком он звучит как  "Если S является подтипом T, то
объекты типа Т могут быть заменены на объекты типа S (то есть, объекты типа S могут заменить объекты типа Т) без влияния
на важные свойства программы (корректность, пригодность для выполнения задач и т.д.)." Это еще более страшное определение.  
  
Лучшее объяснение заключается в том, что если у вас есть родительский и дочерний классы, то они могут использоваться как
взаимозаменяемые, не приводя при этом к некорректным результатам. Это по-прежнему может сбивать с толку, так что давайте
взглянем на классический пример квадрата-прямоугольника. Математически квадрат представляет собой прямоугольник, но если 
вы смоделируете их отношения через наследование, вы быстро наткнетесь на неприятности..

**Плохо:**

```ts
class Rectangle {
  constructor(
    protected width: number = 0,
    protected height: number = 0) {

  }

  setColor(color: string): this {
    // ...
  }

  render(area: number) {
    // ...
  }

  setWidth(width: number): this {
    this.width = width;
    return this;
  }

  setHeight(height: number): this {
    this.height = height;
    return this;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width: number): this {
    this.width = width;
    this.height = width;
    return this;
  }

  setHeight(height: number): this {
    this.width = height;
    this.height = height;
    return this;
  }
}

function renderLargeRectangles(rectangles: Rectangle[]) {
  rectangles.forEach((rectangle) => {
    const area = rectangle
      .setWidth(4)
      .setHeight(5)
      .getArea(); // BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

**Хорошо:**

```ts
abstract class Shape {
  setColor(color: string): this {
    // ...
  }

  render(area: number) {
    // ...
  }

  abstract getArea(): number;
}

class Rectangle extends Shape {
  constructor(
    private readonly width = 0,
    private readonly height = 0) {
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
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);
```

**[⬆ back to top](#содержание)**

### Принцип разделения интерфейса (ISP)

ISP говорит что "Клиенты не должны зависеть от классов, которые они не используют.". Этот принцип очень
связан с Принципом единой ответственности.
На самом деле это означает, что вы всегда должны проектировать свои абстракции таким образом, чтобы клиенты, которые
используют открытые методы не получали весь пирог. Это также включает в себя возложение на клиентов бремени реализации
методов, которые им на самом деле не нужны.

**Плохо:**

```ts
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
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

class EconomicPrinter implements SmartPrinter {
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

**Хорошо:**

```ts
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter implements Printer, Fax, Scanner {
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

class EconomicPrinter implements Printer {
  print() {
    // ...
  }
}
```

**[⬆ back to top](#содержание)**

### Принцип инверсии зависимостей (DIP)

Этот принцип закрепляет две важные вещи:

1. Модули высшего уровня не должны зависеть от модулей низшего уровня. Оба должны зависеть от абстракций.

2. Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.

Сначала трудно понять этот принцип. Но если вы работали с AngularJS, вы видели реализацию этого принципа в виде
Dependency Injection (DI). Несмотря на то, что они не являются идентичными понятиями, DIP даёт возможность отграничить
модули высокого уровня от деталей модулей низкого уровня и установки их. Он может сделать это через DI. Этот принцип
уменьшает связь между модулями. Если ваши модули тесно связаны, их тяжело рефакторить.
  
DIP обычно достигается использованием контейнера инверсии управления (IoC). Пример мощного контейнера IoC для
TypeScript это [InversifyJs](https://www.npmjs.com/package/inversify)

**Плохо:**

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

**Хорошо:**

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
  constructor(private readonly formatter: Formatter) {
  }

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8');
    return this.formatter.parse<ReportData>(text);
  }
}

// ...
const reader = new ReportReader(new XmlFormatter());
await report = await reader.read('report.xml');

// or if we had to read a json report
const reader = new ReportReader(new JsonFormatter());
await report = await reader.read('report.json');
```

**[⬆ back to top](#содержание)**

## Тестирование

Тестирование важнее деплоя. Если у вас нет тестов или их мало, то каждый раз при выкладке кода на боевые сервера у вас
не будет уверенности, что ничего не сломается.
Решение о достаточном количестве тестов остается на совести вашей команды, но 100% покрытие тестами всех выражений и
ветвлений обеспечивает высокое доверие к вашему коду и спокойствие всех разработчиков. Из этого следует, что в дополнение
к отличному фреймворку для тестирования, необходимо также использовать хороший [инструмент покрытия](https://github.com/gotwarlost/istanbul).

Нет никакого оправдания, чтобы не писать тесты. Есть [много хороших фреймворков для тестирования на JS](http://jstherightway.org/#testing-tools) с поддержкой типов для TypeScript, так что вы найдите тот который понравится вашей команде. Когда вы найдете тот, который работает для вашей команды, тогда стремитесь всегда писать тесты для каждой новой фичи/модуля, которую вы пишете. Если вы предпочитаете метод тест-ориентированной разработки (TDD), это замечательно, но главное - просто убедиться, что вы достигли своих целей покрытия, прежде чем запускать какую-либо функцию или реорганизовать существующую.  

### Три закона TDD

1. Новый рабочий код пишется только после того, как будет написан модульный тест, который не проходит.

2. Вы пишете ровно такой объем кода модульного теста, какой необходим для того, чтобы этот тест не проходил (если код теста не компилируется, считается, что он не проходит).

3. Вы пишете ровно такой объем рабочего кода, какой необходим для прохождения модульного теста, который в данный момент не проходит.

**[⬆ back to top](#содержание)**

### Правила F.I.R.S.T.

Чистые тесты должны следовать правилам:

- **Быстрота(Fast)** Тесты должны выполняться быстро. Все мы знаем, что разработчики люди, а люди ленивы, поскольку эти выражения являются “транзитивными”, то можно сделать вывод, что люди тоже ленивы. А ленивый человек не захочет запускать тесты при каждом изменении кода, если они будут долго выполняться.

- **Независимость(Independent)** Тесты не должны зависеть друг от друга. Они должны обеспечивать одинаковые выходные данные независимо от того, выполняются ли они независимо или все вместе в любом порядке.

- **Повторяемость(Repeatable)** Тесты должны выполняться в любой среде, и не должно быть никаких оправданий тому, почему
они провалились.

- **Очевидность(Self-Validating)** Тест должен отвечать либо *Passed*, либо *Failed*. Вам не нужно сравнивать файлы логов, дл чтобы ответить, что тест пройден.

- **Своевременность(Timely)** Юнит тесты должны быть написаны перед производственным кодом. Если вы пишете тесты после производственного кода, то вам может показаться, что писать тесты слишком сложно.

**[⬆ back to top](#содержание)**

### Один кейс на тест

Тесты также должны соответствовать *Принципу единой ответственности(SPP)*. Делайте только одно утверждение за единицу теста.(ps. не пренебрегайте этим правилом)

**Плохо:**

```ts
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles date boundaries', () => {
    let date: AwesomeDate;

    date = new AwesomeDate('1/1/2015');
    assert.equal('1/31/2015', date.addDays(30));

    date = new AwesomeDate('2/1/2016');
    assert.equal('2/29/2016', date.addDays(28));

    date = new AwesomeDate('2/1/2015');
    assert.equal('3/1/2015', date.addDays(28));
  });
});
```

**Хорошо:**

```ts
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles 30-day months', () => {
    const date = new AwesomeDate('1/1/2015');
    assert.equal('1/31/2015', date.addDays(30));
  });

  it('handles leap year', () => {
    const date = new AwesomeDate('2/1/2016');
    assert.equal('2/29/2016', date.addDays(28));
  });

  it('handles non-leap year', () => {
    const date = new AwesomeDate('2/1/2015');
    assert.equal('3/1/2015', date.addDays(28));
  });
});
```

**[⬆ back to top](#содержание)**

### Название теста должно раскрывать его намерение

Когда тест не пройден, его имя является первым признаком того, что могло пойти не так.

**Плохо:**

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

**Хорошо:**

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

**[⬆ back to top](#содержание)**

## Асинхронность

### Используйте promises а не callbacks

Callback-функции ухудшают читаемость и приводят к чрезмерному количеству вложенности *(ад обратных вызовов(callback hell))*. Существуют утилиты, которые преобразуют существующие функции, используя стиль callback-ов, в версию, которая возвращает промисы (для Node.js смотрите [`util.promisify`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original), для общего назначения смотрите [pify](https://www.npmjs.com/package/pify), [es6-promisify](https://www.npmjs.com/package/es6-promisify))


**Плохо:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';

function downloadPage(url: string, saveTo: string, callback: (error: Error, content?: string) => void) {
  get(url, (error, response) => {
    if (error) {
      callback(error);
    } else {
      writeFile(saveTo, response.body, (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null, response.body);
        }
      });
    }
  });
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html', (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log(content);
  }
});
```

**Хорошо:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url)
    .then(response => write(saveTo, response));
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html')
  .then(content => console.log(content))
  .catch(error => console.error(error));  
```

Промисы поддерживают несколько вспомогательных методов, которые помогают сделать код более понятным:  

| Методы                   | Описание                                   |  
| ------------------------ | -----------------------------------------  |  
| `Promise.resolve(value)` | Преобразуйте значение в решенный промис.   |  
| `Promise.reject(error)`  | Преобразуйте ошибку в отклоненный промис.  |  
| `Promise.all(promises)`  | Возвращает новый промис, который выполняется с массивом значений выполнения для переданных промисов или отклоняется по причине первого промиса, который выполняется с ошибкой. |
| `Promise.race(promises)` | Возвращает новый промис, который выполнен/отклонен с результатом/ошибкой первого выполненного промиса из массива переданных промисов. |

`Promise.all` особенно полезен, когда есть необходимость запускать задачи параллельно. `Promise.race` облегчает реализацию таких вещей, как тайм-ауты для промисов.

**[⬆ back to top](#содержание)**

### Async/Await делает код чище, чем промисы

С помощью синтаксиса `async`` await` вы можете написать код, который будет намного чище и понятнее, чем промисы, связанные
цепочкой. Внутри функции с префиксом ключевого слова `async` у вас есть способ указать среде выполнения JavaScript
приостановить выполнение кода по ключевому слову `await` (при использовании в промисе).

**Плохо:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = util.promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url).then(response => write(saveTo, response));
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html')
  .then(content => console.log(content))
  .catch(error => console.error(error));  
```

**Хорошо:**

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

// где-то в асинхронной функции
try {
  const content = await downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html');
  console.log(content);
} catch (error) {
  console.error(error);
}
```

**[⬆ back to top](#содержание)**

## Обработка ошибок

Бросать ошибки — хорошее решение! Это означает, что во время выполнения вы будете знать, если что-то пошло не так, вы
сможете остановить выполнение вашего приложения убив процесс (в Node) в нужный момент и увидеть место ошибки с помощью
стек трейса в консоли.

### Всегда используйте ошибки для отклонений(reject)

JavaScript и TypeScript позволяют вам делать `throw` любым объектом. Промис также может быть отклонен с любым объектом причины. Рекомендуется использовать синтаксис `throw` с типом `Error`. Это потому что ваша ошибка может быть поймана в более высоком уровне кода с синтаксисом `catch`. Было бы очень странно поймать там строковое сообщение и сделать [отладку более болезненной](https://basarat.gitbooks.io/typescript/docs/types/exceptions.html#always-use-error). По той же причине вы должны отклонять промисы с типами `Error`.

**Плохо:**

```ts
function calculateTotal(items: Item[]): number {
  throw 'Not implemented.';
}

function get(): Promise<Item[]> {
  return Promise.reject('Not implemented.');
}
```

**Хорошо:**

```ts
function calculateTotal(items: Item[]): number {
  throw new Error('Not implemented.');
}

function get(): Promise<Item[]> {
  return Promise.reject(new Error('Not implemented.'));
}

// or equivalent to:

async function get(): Promise<Item[]> {
  throw new Error('Not implemented.');
}
```

Преимущество использования типов `Error` заключается в том, что они поддерживается синтаксисом `try/catch/finally` и неявно всеми ошибками и имеют свойство `stack`, которое является очень мощным для отладки. Есть и другие альтернативы: не использовать синтаксис `throw` и вместо этого всегда возвращать пользовательские объекты ошибок. TypeScript делает это еще проще.
Рассмотрим следующий пример:

```ts
type Result<R> = { isError: false, value: R };
type Failure<E> = { isError: true, error: E };
type Failable<R, E> = Result<R> | Failure<E>;

function calculateTotal(items: Item[]): Failable<number, 'empty'> {
  if (items.length === 0) {
    return { isError: true, error: 'empty' };
  }

  // ...
  return { isError: false, value: 42 };
}
```

Для подробного объяснения этой идеи обратитесь к [оригинальному посту](https://medium.com/@dhruvrajvanshi/making-exceptions-type-safe-in-typescript-c4d200ee78e9).

**[⬆ back to top](#содержание)**

### Не игнорируйте отловленные ошибки

Игнорирование пойманной ошибки не дает вам возможности исправить или каким-либо образом отреагировать на ее появление. Логирование ошибок в консоль (`console.log`) не намного лучше, так как зачастую оно может потеряться в море консольных записей. Оборачивание куска кода в `try/catch` означает, что вы предполагаете возможность появления ошибки и имеете на этот случай четкий план.

**Плохо:**

```ts
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}

// or even worse

try {
  functionThatMightThrow();
} catch (error) {
  // ignore error
}
```

**Хорошо:**

```ts
import { logger } from './logging'

try {
  functionThatMightThrow();
} catch (error) {
  logger.log(error);
}
```

**[⬆ back to top](#содержание)**

### Не игнорируйте ошибки, возникшие в промисах

Вы не должны игнорировать ошибки в промисах по той же причине, что и в `try/catch`.

**Плохо:**

```ts
getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    console.log(error);
  });
```

**Хорошо:**

```ts
import { logger } from './logging'

getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    logger.log(error);
  });

// or using the async/await syntax:

try {
  const user = await getUser();
  await sendEmail(user.email, 'Welcome!');
} catch (error) {
  logger.log(error);
}
```

**[⬆ back to top](#содержание)**

## Форматирование

Форматирование носит субъективный характер. Как и во многом собранном здесь, в вопросе форматирования нет жестких правил, которым вы обязаны следовать. Главное - *НЕ СПОРИТЬ* по поводу форматирования. Есть множество инструментов для автоматизации этого. Используйте один! Это трата времени и денег когда инженеры спорят о форматировании. Общее правило, которому стоит следовать *соблюдайте правила форматирования принятые в команде*  

Для TypeScript есть мощный инструмент под названием [TSLint](https://palantir.github.io/tslint/). Это статический анализ инструмент, который может помочь вам значительно улучшить читаемость и поддерживаемость вашего кода. Но лучще используйте [ESLint](https://github.com/typescript-eslint/typescript-eslint), так как TSLint больше не поддерживается.
Есть готовые к использованию конфигурации TSLint и ESLint, на которые вы можете ссылаться в своих проектах:

- [TSLint Config Standard](https://www.npmjs.com/package/tslint-config-standard) - стандартный набор правил

- [TSLint Config Airbnb](https://www.npmjs.com/package/tslint-config-airbnb) - правила от Airbnb

- [TSLint Clean Code](https://www.npmjs.com/package/tslint-clean-code) - Правила TSLint которые вдохновлены [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

- [TSLint react](https://www.npmjs.com/package/tslint-react) - правила, связанные с React & JSX

- [TSLint + Prettier](https://www.npmjs.com/package/tslint-config-prettier) - правила линта для [Prettier](https://github.com/prettier/prettier) средство форматирования кода

- [ESLint rules for TSLint](https://www.npmjs.com/package/tslint-eslint-rules) - ESLint правила для TypeScript

- [Immutable](https://www.npmjs.com/package/tslint-immutable) - правила отключения мутации в TypeScript

Обратитесь также к этому великому [TypeScript StyleGuide and Coding Conventions](https://basarat.gitbooks.io/typescript/docs/styleguide/styleguide.html) источнику.

### Используйте один вариант именования

Использование заглавных букв говорит вам о ваших переменных, функциях и др.. Эти правила субъективны, поэтому ваша команда может выбирать все, что они хотят. Дело в том, что независимо от того, что вы все выберите, просто *будьте последовательны*.

**Плохо:**

```ts
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restore_database() {}

type animal = { /* ... */ }
type Container = { /* ... */ }
```

**Хорошо:**

```ts
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const ARTISTS = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restoreDatabase() {}

type Animal = { /* ... */ }
type Container = { /* ... */ }
```

Предпочитайте использовать `PascalCase` для имен классов, интерфейсов, типов и пространств имен. Предпочитаю использовать `camelCase` для переменных, функций и членов класса.

**[⬆ back to top](#содержание)**

### Связанные функции должны находится рядом

Если функция вызывает другую, сохраните эти функции вертикально близко в исходном файле. В идеале, функция, которая
использует другую функцию, должна быть прямо над ней. Мы склонны читать код сверху-вниз, как газету. Из-за этого удобно
размещать код таким образом.

**Плохо:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {
  }

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

**Хорошо:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {
  }

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

**[⬆ back to top](#содержание)**

### Организация импортов

С помощью простых и понятных операторов импорта вы можете быстро увидеть зависимости текущего кода. 
Убедитесь, что вы используете следующие хорошие практики для операторов `import`:

- Операторы импорта должны быть в алфавитном порядке и сгруппированы.
- Неиспользованный импорт должен быть удален.
- Именованные импорты должны быть в алфавитном порядке (т.е. `import {A, B, C} from 'foo';`)
- Источники импорта должны быть в алфавитном порядке в группах, т.е.: `import * as foo from 'a'; import * as bar from 'b';`
- Группы импорта обозначены пустыми строками.
- Группы должны соблюдать следующий порядок:
  - Полифилы (т.е. `import 'reflect-metadata';`)
  - Модули сборки Node (т.е. `import fs from 'fs';`)
  - Внешние модули (т.е. `import { query } from 'itiriri';`)
  - Внутренние модули (т.е. `import { UserService } from 'src/services/userService';`)
  - Модули из родительского каталога (т.е. `import foo from '../foo'; import qux from '../../foo/qux';`)
  - Модули из того же или родственного каталога (т.е. `import bar from './bar'; import baz from './bar/baz';`)

**Плохо:**

```ts
import { TypeDefinition } from '../types/typeDefinition';
import { AttributeTypes } from '../model/attribute';
import { ApiCredentials, Adapters } from './common/api/authorization';
import fs from 'fs';
import { ConfigPlugin } from './plugins/config/configPlugin';
import { BindingScopeEnum, Container } from 'inversify';
import 'reflect-metadata';
```

**Хорошо:**

```ts
import 'reflect-metadata';

import fs from 'fs';
import { BindingScopeEnum, Container } from 'inversify';

import { AttributeTypes } from '../model/attribute';
import { TypeDefinition } from '../types/typeDefinition';

import { ApiCredentials, Adapters } from './common/api/authorization';
import { ConfigPlugin } from './plugins/config/configPlugin';
```

**[⬆ back to top](#содержание)**

### Используйте typescript алиасы

Создайте более симпатичный импорт, определив пути и свойства baseUrl в разделе compilerOptions в `tsconfig.json`
Это позволит избежать длинных относительных путей при импорте.

**Плохо:**

```ts
import { UserService } from '../../../services/UserService';
```

**Хорошо:**

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

**[⬆ back to top](#содержание)**

## Комментарии

Использование комментариев свидетельствует о невозможности высказаться без них. Код должен быть единственным источником правды.
  
> Не комментируйте плохой код - переписывайте его.
> — *Brian W. Kernighan and P. J. Plaugher*

### Предпочитаю понятный код вместо комментариев

Комментарии - это извинения, а не требование. Хороший код *в основном* сам документирует себя.

**Плохо:**

```ts
// Check if subscription is active.
if (subscription.endDate > Date.now) {  }
```

**Хорошо:**

```ts
const isSubscriptionActive = subscription.endDate > Date.now;
if (isSubscriptionActive) { /* ... */ }
```

**[⬆ back to top](#содержание)**

### Не оставляйте закомментированный код в вашей кодовой базе

Системы контроля версий существуют не зря. Оставьте старый код в истории.

**Плохо:**

```ts
type User = {
  name: string;
  email: string;
  // age: number;
  // jobPosition: string;
}
```

**Хорошо:**

```ts
type User = {
  name: string;
  email: string;
}
```

**[⬆ back to top](#содержание)**

### Не заводите журнальных комментариев

Не забывайте использовать системы контроля версий! Нет необходимости в мертвом коде, закоментированном коде и особенно в
журнальных комментариях. Используйте `git log`, чтобы получить историю!

**Плохо:**

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

**Хорошо:**

```ts
function combine(a: number, b: number): number {
  return a + b;
}
```

**[⬆ back to top](#содержание)**

### Избегайте маркеров позиционирования

Они, как правило, просто добавляют шум. Пусть функции и имена переменных вместе с правильными отступами и форматированием
задают визуальную структуру кода.
Большинство IDE поддерживают функцию свертывания кода, которая позволяет свернуть/развернуть блоки кода (смотрите
Visual Studio Code [folding regions](https://code.visualstudio.com/updates/v1_17#_folding-regions)).

**Плохо:**

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
};
```

**Хорошо:**

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
};
```

**[⬆ back to top](#содержание)**

### TODO комментарии

Когда вы обнаружите, что вам нужно оставить заметки в коде для некоторых последующих улучшений,
сделайте это с помощью комментариев `// TODO`. Большинство IDE имеют специальную поддержку для так что вы можете быстро
просмотреть весь список todo.

Однако имейте в виду, что комментарий *TODO* не является оправданием для плохого кода. 

**Плохо:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // ensure `dueDate` is indexed.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**Хорошо:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // TODO: ensure `dueDate` is indexed.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**[⬆ back to top](#содержание)**

## Переводы

Это также доступно на других языках:
- ![br](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Brazilian Portuguese**: [vitorfreitas/clean-code-typescript](https://github.com/vitorfreitas/clean-code-typescript)
- ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese**: 
  - [beginor/clean-code-typescript](https://github.com/beginor/clean-code-typescript)
  - [pipiliang/clean-code-typescript](https://github.com/pipiliang/clean-code-typescript)
- ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [MSakamaki/clean-code-typescript](https://github.com/MSakamaki/clean-code-typescript)
- ![tr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Turkey.png) **Turkish**: [ozanhonamlioglu/clean-code-typescript](https://github.com/ozanhonamlioglu/clean-code-typescript)


Ведется работа по переводу этого документа на другие языки:

- ![kr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) Korean

Ссылки будут добавлены после завершения перевода. 
Проверьте это [обсуждение](https://github.com/labs42io/clean-code-typescript/issues/15) для получения более подробной информации и прогресса.
Вы можете внести незаменимый вклад в сообщество *Чистый код*, переведя его на свой язык.
