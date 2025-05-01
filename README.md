# clean-code-typescript [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Clean%20Code%20Typescript&url=https://github.com/labs42io/clean-code-typescript)

Концепції Clean Code, адаптовані для TypeScript.  
Натхненні [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript).

## Зміст

  1. [Вступ](#вступ)
  2. [Змінні](#змінні)
  3. [Функції](#функції)
  4. [Об'єкти та структури даних](#обєкти-та-структури-даних)
  5. [Класи](#класи)
  6. [SOLID](#solid)
  7. [Тестування](#тестування)
  8. [Паралельність](#паралельність)
  9. [Обробка помилок](#обробка-помилок)
  10. [Форматування](#форматування)
  11. [Коментарі](#коментарі)
  12. [Переклади](#переклади)

## Вступ

![Гумористичне зображення оцінки якості програмного забезпечення як кількості лайливих слів, які ви вигукуєте, коли читаєте код](https://www.osnews.com/images/comics/wtfm.jpg)

Принципи програмної інженерії з книги Роберта К. Мартіна [*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), адаптовані для TypeScript. Це не стильовий посібник. Це посібник з написання [читабельного, повторно використовуваного та рефакторингового](https://github.com/ryanmcdermott/3rs-of-software-architecture) програмного забезпечення на TypeScript.

Не кожен принцип тут повинен суворо дотримуватись, і ще менше з них будуть загальноприйнятими. Це лише рекомендації, і нічого більше, але вони кодифіковані багаторічним колективним досвідом авторів книги *Clean Code*.

Наше ремесло програмної інженерії налічує лише трохи більше 50 років, і ми все ще багато чого вчимося. Коли архітектура програмного забезпечення стане такою ж старою, як архітектура будівель, можливо, тоді у нас будуть жорсткіші правила для дотримання. А поки що, нехай ці рекомендації слугують орієнтиром для оцінки якості коду TypeScript, який створюєте ви та ваша команда.

Ще одна річ: знання цих принципів не зробить вас миттєво кращим розробником програмного забезпечення, і робота з ними протягом багатьох років не означає, що ви не будете помилятися. Кожен фрагмент коду починається як перший чернетковий варіант, як мокра глина, що набуває своєї остаточної форми. Врешті-решт, ми вирізаємо недоліки, коли переглядаємо код з колегами. Не картайте себе за перші чернетки, які потребують покращення. Натомість критикуйте сам код!

**[⬆ повернутись до змісту](#зміст)**

## Змінні

### Використовуйте змістовні імена змінних

Розрізняйте імена таким чином, щоб читач розумів, які між ними відмінності.

**Погано:**

```ts
function between<T>(a1: T, a2: T, a3: T): boolean {
  return a2 <= a1 && a1 <= a3;
}

```

**Добре:**

```ts
function between<T>(value: T, left: T, right: T): boolean {
  return left <= value && value <= right;
}
```

**[⬆ повернутись до змісту](#зміст)**

### Використовуйте вимовні імена змінних

Якщо ви не можете вимовити ім'я змінної, ви не зможете обговорювати її, не звучачи як ідіот.

**Погано:**

```ts
type DtaRcrd102 = {
  genymdhms: Date;
  modymdhms: Date;
  pszqint: number;
}
```

**Добре:**

```ts
type Customer = {
  generationTimestamp: Date;
  modificationTimestamp: Date;
  recordId: number;
}
```

**[⬆ повернутись до змісту](#зміст)**

### Використовуйте однаковий словниковий запас для однакового типу змінних

**Погано:**

```ts
function getUserInfo(): User;
function getUserDetails(): User;
function getUserData(): User;
```

**Добре:**

```ts
function getUser(): User;
```

**[⬆ повернутись до змісту](#зміст)**

### Використовуйте пошукові імена

Ми будемо читати більше коду, ніж коли-небудь напишемо. Важливо, щоб код, який ми пишемо, був читабельним і пошуковим. Не називаючи змінні іменами, які мають значення для розуміння нашої програми, ми шкодимо нашим читачам. Робіть ваші імена пошуковими. Інструменти, такі як [ESLint](https://typescript-eslint.io/), можуть допомогти ідентифікувати неназвані константи (також відомі як магічні рядки та магічні числа).

**Погано:**

```ts
// Що за чорт, для чого ці 86400000?
setTimeout(restart, 86400000);
```

**Добре:**

```ts
// Оголосіть їх як капіталізовані іменовані константи.
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000; // 86400000

setTimeout(restart, MILLISECONDS_PER_DAY);
```

**[⬆ повернутись до змісту](#зміст)**

### Використовуйте пояснювальні змінні

**Погано:**

```ts
declare const users: Map<string, User>;

for (const keyValue of users) {
  // ітерація по мапі користувачів
}
```

**Добре:**

```ts
declare const users: Map<string, User>;

for (const [id, user] of users) {
  // ітерація по мапі користувачів
}
```

**[⬆ повернутись до змісту](#зміст)**

### Уникайте ментального картування

Явне краще, ніж неявне.  
*Чіткість - це король.*

**Погано:**

```ts
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

**Добре:**

```ts
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**[⬆ повернутись до змісту](#зміст)**

### Не додавайте непотрібний контекст

Якщо ім'я вашого класу/типу/об'єкта говорить вам щось, не повторюйте це в імені змінної.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#зміст)**

### Використовуйте аргументи за замовчуванням замість короткого зациклення або умов

Аргументи за замовчуванням часто чистіші, ніж коротке зациклення.

**Погано:**

```ts
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10;
  // ...
}
```

**Добре:**

```ts
function loadPages(count: number = 10) {
  // ...
}
```

**[⬆ повернутись до змісту](#зміст)**

### Використовуйте enum для документування наміру

Перерахування (enums) можуть допомогти вам документувати намір коду. Наприклад, коли ми більше турбуємося про те, щоб значення відрізнялись, ніж про їх точне значення.

**Погано:**

```ts
const GENRE = {
  ROMANTIC: 'romantic',
  DRAMA: 'drama',
  COMEDY: 'comedy',
  DOCUMENTARY: 'documentary',
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // декларація Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // якась логіка для виконання
    }
  }
}
```

**Добре:**

```ts
enum GENRE {
  ROMANTIC,
  DRAMA,
  COMEDY,
  DOCUMENTARY,
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // декларація Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // якась логіка для виконання
    }
  }
}
```

**[⬆ повернутись до змісту](#зміст)**

## Функції

### Аргументи функцій (в ідеалі 2 або менше)

Обмеження кількості параметрів функції неймовірно важливе, оскільки це полегшує тестування вашої функції.
Наявність більше трьох призводить до комбінаторного вибуху, коли ви повинні тестувати тонни різних випадків для кожного окремого аргументу.  

Один або два аргументи - це ідеальний випадок, а трьох слід уникати, якщо це можливо. Все, що перевищує це, має бути консолідовано.
Зазвичай, якщо у вас більше двох аргументів, то ваша функція намагається зробити занадто багато.
У випадках, коли це не так, здебільшого об'єкт вищого рівня буде достатнім як аргумент.  

Розгляньте можливість використання об'єктних літералів, якщо вам потрібно багато аргументів.  

Щоб було очевидно, які властивості очікує функція, ви можете використовувати синтаксис [деструктуризації](https://basarat.gitbook.io/typescript/future-javascript/destructuring).
Це має кілька переваг:

1. Коли хтось дивиться на сигнатуру функції, відразу зрозуміло, які властивості використовуються.

2. Це можна використовувати для імітації іменованих параметрів.

3. Деструктуризація також клонує вказані примітивні значення об'єкта аргументу, переданого у функцію. Це може допомогти запобігти побічним ефектам. Примітка: об'єкти та масиви, які деструктуризуються з об'єкта аргументу, НЕ клонуються.

4. TypeScript попереджає про невикористані властивості, що було б неможливо без деструктуризації.

**Погано:**

```ts
function createMenu(title: string, body: string, buttonText: string, cancellable: boolean) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

**Добре:**

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

Ви можете ще більше покращити читабельність, використовуючи [аліаси типів](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases):

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

**[⬆ повернутись до змісту](#зміст)**

### Функції повинні робити одне

Це, безумовно, найважливіше правило в програмній інженерії. Коли функції роблять більше, ніж одне, їх важче створювати, тестувати та розуміти. Коли ви можете ізолювати функцію до однієї дії, її легко рефакторити, і ваш код буде набагато чистішим. Якщо ви не винесете з цього посібника нічого іншого, крім цього, ви випередите багатьох розробників.

**Погано:**

```ts
function emailActiveClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Добре:**

```ts
function emailActiveClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

**[⬆ повернутись до змісту](#зміст)**

### Назви функцій повинні говорити, що вони роблять

**Погано:**

```ts
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();

// Важко зрозуміти з назви функції, що саме додається
addToDate(date, 1);
```

**Добре:**

```ts
function addMonthToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();
addMonthToDate(date, 1);
```

**[⬆ повернутись до змісту](#зміст)**

### Функції повинні бути лише на одному рівні абстракції

Коли у вас більше одного рівня абстракції, ваша функція зазвичай робить занадто багато. Розділення функцій призводить до повторного використання та полегшує тестування.

**Погано:**

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
    // лексичний аналіз...
  });

  ast.forEach((node) => {
    // парсинг...
  });
}
```

**Добре:**

```ts
const REGEXES = [ /* ... */ ];

function parseCode(code: string) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);

  syntaxTree.forEach((node) => {
    // парсинг...
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

**[⬆ повернутись до змісту](#зміст)**

### Видаліть дубльований код

Зробіть все можливе, щоб уникнути дубльованого коду.
Дубльований код поганий, тому що це означає, що існує більше одного місця для зміни чогось, якщо вам потрібно змінити якусь логіку.  

Уявіть, якщо ви керуєте рестораном і ведете облік вашого інвентарю: всіх ваших помідорів, цибулі, часнику, спецій тощо.
Якщо у вас є кілька списків, де ви це зберігаєте, то всі вони повинні бути оновлені, коли ви подаєте страву з помідорами.
Якщо у вас лише один список, є лише одне місце для оновлення!  

Часто ви маєте дубльований код, тому що у вас є дві або більше дещо різних речей, які мають багато спільного, але їхні відмінності змушують вас мати дві або більше окремі функції, які роблять багато однакових речей. Видалення дубльованого коду означає створення абстракції, яка може обробляти цей набір різних речей лише однією функцією/модулем/класом.  

Правильна абстракція є критичною, саме тому ви повинні дотримуватися принципів [SOLID](#solid). Погані абстракції можуть бути гіршими за дубльований код, тому будьте обережні! Але якщо ви можете зробити хорошу абстракцію, зробіть це! Не повторюйтеся, інакше ви будете оновлювати кілька місць щоразу, коли захочете змінити одну річ.

**Погано:**

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

**Добре:**

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

function showEmployeeList(employee: (Developer | Manager)[]) {
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

Ви також можете розглянути додавання типу об'єднання або спільного батьківського класу, якщо це відповідає вашій абстракції.
```ts
class Developer {
  // ...
}

class Manager {
  // ...
}

type Employee = Developer | Manager

function showEmployeeList(employee: Employee[]) {
  // ...
  });
}

```

Ви повинні критично ставитися до дублювання коду. Іноді існує компроміс між дубльованим кодом і збільшенням складності через введення непотрібної абстракції. Коли дві реалізації з двох різних модулів виглядають схожими, але живуть у різних доменах, дублювання може бути прийнятним і переважати над витяганням спільного коду. Витягнутий спільний код у цьому випадку створює непряму залежність між двома модулями.

**[⬆ повернутись до змісту](#зміст)**

### Встановлюйте об'єкти за замовчуванням за допомогою Object.assign або деструктуризації

**Погано:**

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

**Добре:**

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

Або ви можете використовувати оператор поширення (spread operator):

```ts
function createMenu(config: MenuConfig) {
  const menuConfig = {
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true,
    ...config,
  };

  // ...
}
```
Оператор поширення і `Object.assign()` дуже схожі.
Головна відмінність полягає в тому, що поширення визначає нові властивості, тоді як `Object.assign()` встановлює їх. Більш детально ця різниця пояснюється в [цій](https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign) темі.

Альтернативно, ви можете використовувати деструктуризацію з значеннями за замовчуванням:

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu({ title = 'Foo', body = 'Bar', buttonText = 'Baz', cancellable = true }: MenuConfig) {
  // ...
}

createMenu({ body: 'Bar' });
```

Щоб уникнути будь-яких побічних ефектів і неочікуваної поведінки передаючи явно значення `undefined` або `null`, ви можете вказати компілятору TypeScript не дозволяти це.
Дивіться опцію [`--strictNullChecks`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictnullchecks) в TypeScript.

**[⬆ повернутись до змісту](#table-of-contents)**

### Не використовуйте прапорці як параметри функцій

Прапорці повідомляють вашому користувачеві, що ця функція робить більше однієї речі.
Функції повинні робити одну річ. Розділіть ваші функції, якщо вони слідують різним шляхам коду на основі булевого значення.

**Погано:**

```ts
function createFile(name: string, temp: boolean) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Добре:**

```ts
function createTempFile(name: string) {
  createFile(`./temp/${name}`);
}

function createFile(name: string) {
  fs.create(name);
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Уникайте побічних ефектів (частина 1)

Функція створює побічний ефект, якщо вона робить щось інше, ніж приймає значення і повертає інше значення або значення.
Побічним ефектом може бути запис у файл, зміна глобальної змінної або випадкове перерахування всіх ваших грошей незнайомцю.

Час від часу вам дійсно потрібні побічні ефекти в програмі. Як у попередньому прикладі, вам може знадобитися запис у файл.
Але те, що ви хочете зробити, це централізувати місце, де ви це робите. Не майте кілька функцій і класів, які записують у певний файл.
Майте одну службу, яка це робить. Одну і тільки одну.

Основна ідея полягає в тому, щоб уникнути поширених пасток, таких як обмін станом між об'єктами без структури, використання мутабельних типів даних, які можуть бути змінені будь-чим, і не централізація того, де відбуваються ваші побічні ефекти. Якщо ви зможете це зробити, ви будете щасливіші, ніж більшість інших програмістів.

**Погано:**

```ts
// Глобальна змінна, на яку посилається наступна функція.
let name = 'Robert C. Martin';

function toBase64() {
  name = btoa(name);
}

toBase64();
// Якби у нас була інша функція, яка використовувала це ім'я, тепер це було б значення в Base64

console.log(name); // очікується, що надрукує 'Robert C. Martin', але натомість 'Um9iZXJ0IEMuIE1hcnRpbg=='
```

**Добре:**

```ts
const name = 'Robert C. Martin';

function toBase64(text: string): string {
  return btoa(text);
}

const encodedName = toBase64(name);
console.log(name);
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Уникайте побічних ефектів (частина 2)

Браузери та Node.js обробляють лише JavaScript, тому будь-який код TypeScript має бути скомпільований перед запуском або налагодженням. У JavaScript деякі значення незмінні (immutable), а деякі змінні (mutable). Об'єкти та масиви є двома видами мутабельних значень, тому важливо обережно обробляти їх, коли вони передаються як параметри до функції. Функція JavaScript може змінювати властивості об'єкта або змінювати вміст масиву, що може легко спричинити помилки в інших місцях.

Припустимо, існує функція, яка приймає параметр масиву, що представляє кошик покупок. Якщо функція вносить зміни в цей масив кошика - наприклад, додаючи товар для покупки - тоді будь-яка інша функція, яка використовує той самий масив `cart`, буде порушена цим додаванням. Це може бути чудово, але також може бути погано. Давайте уявимо погану ситуацію:

Користувач натискає кнопку "Придбати", яка викликає функцію `purchase`, що створює мережевий запит і надсилає масив `cart` на сервер. Через погане мережеве з'єднання функція `purchase` повинна повторювати запит. А що, якщо тим часом користувач випадково натисне кнопку "Додати до кошика" на товарі, який насправді не хоче, перш ніж розпочнеться мережевий запит? Якщо це станеться і мережевий запит розпочнеться, функція покупки надішле випадково доданий товар, оскільки масив `cart` був змінений.

Відмінним рішенням було б для функції `addItemToCart` завжди клонувати `cart`, редагувати його і повертати клон. Це забезпечило б, що функції, які все ще використовують старий кошик покупок, не будуть порушені змінами.

Два застереження щодо цього підходу:

1. Можуть бути випадки, коли ви дійсно хочете змінити вхідний об'єкт, але коли ви приймаєте цю практику програмування, ви виявите, що такі випадки досить рідкісні. Більшість речей можна переробити так, щоб не було побічних ефектів! (див. [чиста функція](https://en.wikipedia.org/wiki/Pure_function))

2. Клонування великих об'єктів може бути дуже дорогим з точки зору продуктивності. На щастя, це не є великою проблемою на практиці, оскільки існують [чудові бібліотеки](https://github.com/immutable-js/immutable-js), які дозволяють такий підхід до програмування бути швидким і не таким інтенсивним щодо пам'яті, як це було б для вас вручну клонувати об'єкти та масиви.

**Погано:**

```ts
function addItemToCart(cart: CartItem[], item: Item): void {
  cart.push({ item, date: Date.now() });
};
```

**Добре:**

```ts
function addItemToCart(cart: CartItem[], item: Item): CartItem[] {
  return [...cart, { item, date: Date.now() }];
};
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Не пишіть до глобальних функцій

Забруднення глобальних змінних є поганою практикою в JavaScript, оскільки ви можете зіткнутися з іншою бібліотекою, і користувач вашого API не буде про це знати, поки не отримає виняток у продакшені. Давайте подумаємо про приклад: що, якщо ви хочете розширити нативний метод масиву JavaScript, щоб мати метод `diff`, який міг би показати різницю між двома масивами? Ви могли б написати свою нову функцію до `Array.prototype`, але вона могла б зіткнутися з іншою бібліотекою, яка намагалася зробити те саме. Що, якщо ця інша бібліотека використовувала `diff` лише для пошуку різниці між першим і останнім елементами масиву? Ось чому було б набагато краще просто використовувати класи і просто розширювати глобальний `Array`.

**Погано:**

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

**Добре:**

```ts
class MyArray<T> extends Array<T> {
  diff(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Віддавайте перевагу функціональному програмуванню над імперативним

Віддавайте перевагу цьому стилю програмування, коли можете.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Інкапсулюйте умови

**Погано:**

```ts
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

**Добре:**

```ts
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0;
}

if (canActivateService(subscription, account)) {
  // ...
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Уникайте негативних умов

**Погано:**

```ts
function isEmailNotUsed(email: string): boolean {
  // ...
}

if (isEmailNotUsed(email)) {
  // ...
}
```

**Добре:**

```ts
function isEmailUsed(email: string): boolean {
  // ...
}

if (!isEmailUsed(email)) {
  // ...
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Уникайте умов

Це здається неможливим завданням. При першому почутті цього більшість людей каже: "Як я повинен щось робити без оператора `if`?" Відповідь полягає в тому, що ви можете використовувати поліморфізм для досягнення тієї ж задачі в багатьох випадках. Друге питання зазвичай: "Ну, це чудово, але чому я повинен це робити?" Відповідь - це попередня концепція чистого коду, яку ми вивчили: функція повинна робити тільки одну річ. Коли у вас є класи та функції, які мають оператори `if`, ви повідомляєте своєму користувачеві, що ваша функція робить більше однієї речі. Пам'ятайте, робіть лише одну річ.

**Погано:**

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

**Добре:**

```ts
abstract class Airplane {
  protected getMaxAltitude(): number {
    // спільна логіка з підкласами ...
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

**[⬆ повернутись до змісту](#table-of-contents)**

### Уникайте перевірки типів

TypeScript є строгим синтаксичним розширенням JavaScript і додає необов'язкову статичну перевірку типів до мови.
Завжди віддавайте перевагу вказанню типів змінних, параметрів і значень, що повертаються, щоб використовувати повну силу можливостей TypeScript.
Це робить рефакторинг легшим.

**Погано:**

```ts
function travelToTexas(vehicle: Bicycle | Car) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(currentLocation, new Location('texas'));
  }
}
```

**Добре:**

```ts
type Vehicle = Bicycle | Car;

function travelToTexas(vehicle: Vehicle) {
  vehicle.move(currentLocation, new Location('texas'));
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Не оптимізуйте надмірно

Сучасні браузери виконують багато оптимізацій під капотом під час виконання. Часто, якщо ви оптимізуєте, ви просто витрачаєте свій час. Є хороші [ресурси](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers) для перегляду, де оптимізація не вистачає. Націльтеся на них, поки вони не будуть виправлені, якщо це можливо.

**Погано:**

```ts
// На старих браузерах кожна ітерація з незакешованою `list.length` була б дорогою
// через перераховування `list.length`. У сучасних браузерах це оптимізовано.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Добре:**

```ts
for (let i = 0; i < list.length; i++) {
  // ...
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Видаляйте мертвий код

Мертвий код так само поганий, як і дублювання коду. Немає причин тримати його у вашій кодовій базі.
Якщо він не викликається, позбудьтеся його! Він все ще буде збережений у вашій історії версій, якщо вам він ще знадобиться.

**Погано:**

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

**Добре:**

```ts
function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Використовуйте ітератори та генератори

Використовуйте генератори та ітерабельні об'єкти при роботі з колекціями даних, що використовуються як потік.  
На це є кілька причин:

- відокремлює виклик від реалізації генератора в тому сенсі, що виклик вирішує, скільки елементів доступу
- лінива ініціалізація, елементи транслюються за запитом
- вбудована підтримка для ітерації елементів за допомогою синтаксису `for-of`
- ітерабельні об'єкти дозволяють реалізовувати оптимізовані шаблони ітератора

**Погано:**

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

// Виведення перших 10 чисел Фібоначчі.
print(10);
```

**Добре:**

```ts
// Генерує нескінченний потік чисел Фібоначчі.
// Генератор не зберігає масив усіх чисел.
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

// Виведення перших 10 чисел Фібоначчі.
print(10);
```

Існують бібліотеки, які дозволяють працювати з ітерабельними об'єктами аналогічно нативним масивам, шляхом
ланцюжка методів, таких як `map`, `slice`, `forEach` тощо. Дивіться [itiriri](https://www.npmjs.com/package/itiriri) для
прикладу розширеного маніпулювання з ітерабельними об'єктами (або [itiriri-async](https://www.npmjs.com/package/itiriri-async) для маніпуляцій з асинхронними ітерабельними об'єктами).

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

**[⬆ повернутись до змісту](#table-of-contents)**

## Об'єкти та структури даних

### Використовуйте геттери та сеттери

TypeScript підтримує синтаксис геттера/сеттера.
Використання геттерів і сеттерів для доступу до даних з об'єктів, які інкапсулюють поведінку, може бути кращим, ніж просто пошук властивості об'єкта.
"Чому?" ви можете запитати. Ось список причин:

- Коли ви хочете зробити більше, ніж отримати властивість об'єкта, вам не потрібно шукати та змінювати кожен доступ у вашій кодовій базі.
- Робить додавання валідації простим при використанні `set`.
- Інкапсулює внутрішнє представлення.
- Легко додати логування та обробку помилок при отриманні та встановленні.
- Ви можете лінива завантажувати властивості вашого об'єкта, наприклад, отримуючи їх з сервера.

**Погано:**

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

**Добре:**

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

// Тепер `BankAccount` інкапсулює логіку валідації.
// Якщо одного дня специфікації зміняться, і нам знадобиться додаткове правило валідації,
// нам потрібно буде змінити лише реалізацію `setter`,
// залишаючи весь залежний код незмішним.
const account = new BankAccount();
account.balance = 100;
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Створюйте об'єкти з приватними/захищеними членами

TypeScript підтримує `public` *(за замовчуванням)*, `protected` та `private` модифікатори доступу для членів класу.  

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Віддавайте перевагу незмінності

Система типів TypeScript дозволяє позначати окремі властивості в інтерфейсі/класі як *readonly*. Це дозволяє працювати у функціональному стилі (несподівана мутація є поганою практикою).  
Для більш складних сценаріїв існує вбудований тип `Readonly`, який приймає тип `T` і позначає всі його властивості як readonly, використовуючи відображені типи (див. [відображені типи](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)).

**Погано:**

```ts
interface Config {
  host: string;
  port: string;
  db: string;
}
```

**Добре:**

```ts
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

Для масивів ви можете створити масив тільки для читання, використовуючи `ReadonlyArray<T>`.
Він не дозволяє зміни, такі як `push()` та `fill()`, але можна використовувати функції, такі як `concat()` та `slice()`, які не змінюють значення масиву.

**Погано:**

```ts
const array: number[] = [ 1, 3, 5 ];
array = []; // помилка
array.push(100); // масив буде оновлено
```

**Добре:**

```ts
const array: ReadonlyArray<number> = [ 1, 3, 5 ];
array = []; // помилка
array.push(100); // помилка
```

Оголошення аргументів лише для читання у [TypeScript 3.4 є трохи простішим](https://github.com/microsoft/TypeScript/wiki/What's-new-in-TypeScript#improvements-for-readonlyarray-and-readonly-tuples).

```ts
function hoge(args: readonly string[]) {
  args.push(1); // помилка
}
```

Віддавайте перевагу [константним твердженням](https://github.com/microsoft/TypeScript/wiki/What's-new-in-TypeScript#const-assertions) для літеральних значень.

**Погано:**

```ts
const config = {
  hello: 'world'
};
config.hello = 'world'; // значення змінюється

const array  = [ 1, 3, 5 ];
array[0] = 10; // значення змінюється

// повертаються об'єкти, які можна змінювати
function readonlyData(value: number) {
  return { value };
}

const result = readonlyData(100);
result.value = 200; // значення змінюється
```

**Добре:**

```ts
// об'єкт тільки для читання
const config = {
  hello: 'world'
} as const;
config.hello = 'world'; // помилка

// масив тільки для читання
const array  = [ 1, 3, 5 ] as const;
array[0] = 10; // помилка

// Ви можете повертати об'єкти тільки для читання
function readonlyData(value: number) {
  return { value } as const;
}

const result = readonlyData(100);
result.value = 200; // помилка
```

**[⬆ повернутись до змісту](#table-of-contents)**

### type проти interface

Використовуйте type, коли вам може знадобитися об'єднання або перетин. Використовуйте interface, коли ви хочете використовувати `extends` або `implements`. Немає строгого правила, проте використовуйте те, що працює для вас.  
Для більш детального пояснення зверніться до цієї [відповіді](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/54101543#54101543) про відмінності між `type` і `interface` у TypeScript.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

## Класи

### Класи повинні бути малими

Розмір класу вимірюється його відповідальністю. Слідуючи *принципу єдиної відповідальності*, клас повинен бути малим.

**Погано:**

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

**Добре:**

```ts
class Dashboard {
  disable(): void { /* ... */ }
  enable(): void { /* ... */ }
  getVersion(): string { /* ... */ }
}

// розділіть відповідальності, переміщуючи решту методів до інших класів
// ...
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Висока згуртованість і низька зв'язність

Згуртованість визначає ступінь зв'язку між членами класу. В ідеалі всі поля в класі повинні використовуватися кожним методом.
Тоді ми кажемо, що клас є *максимально згуртованим*. На практиці, однак, це не завжди можливо і навіть не завжди рекомендується. Проте варто віддавати перевагу високій згуртованості.  

Зв'язність відноситься до того, наскільки пов'язані або залежні один від одного два класи. Класи вважаються слабо зв'язаними, якщо зміни в одному з них не впливають на інший.  
  
Хороший дизайн програмного забезпечення має **високу згуртованість** і **низьку зв'язність**.

**Погано:**

```ts
class UserManager {
  // Погано: кожна приватна змінна використовується однією або іншою групою методів.
  // Це ясно свідчить про те, що клас має більше однієї відповідальності.
  // Якщо мені потрібно лише створити сервіс для отримання транзакцій для користувача,
  // мене все одно змушують передавати екземпляр `emailSender`.
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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Віддавайте перевагу композиції перед успадкуванням

Як відомо зазначено в [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns) від Gang of Four, ви повинні *віддавати перевагу композиції перед успадкуванням*, де це можливо. Є багато вагомих причин використовувати успадкування і багато вагомих причин використовувати композицію. Головна ідея цієї максими полягає в тому, що якщо ваш розум інстинктивно тяжіє до успадкування, спробуйте подумати, чи композиція може краще змоделювати вашу проблему. У деяких випадках це можливо.  
  
Ви можете запитати, "коли я повинен використовувати успадкування?" Це залежить від вашої конкретної проблеми, але ось гідний список випадків, коли успадкування має більше сенсу, ніж композиція:

1. Ваше успадкування представляє відносини "є" (is-a), а не "має" (has-a) (Людина->Тварина проти Користувач->Дані користувача).

2. Ви можете повторно використовувати код з базових класів (Люди можуть рухатися, як всі тварини).

3. Ви хочете вносити глобальні зміни в похідні класи, змінюючи базовий клас (Змінити витрати калорій усіх тварин під час руху).

**Погано:**

```ts
class Employee {
  constructor(
    private readonly name: string,
    private readonly email: string) {
  }

  // ...
}

// Погано, тому що у працівників "є" податкові дані. EmployeeTaxData не є типом Employee
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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Використовуйте ланцюжок методів

Цей патерн дуже корисний і часто використовується в багатьох бібліотеках. Він дозволяє вашому коду бути виразним і менш багатослівним. З цієї причини використовуйте ланцюжки методів і подивіться, наскільки чистим буде ваш код.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

## SOLID

### Принцип єдиної відповідальності (SRP)

Як зазначено в Clean Code, "Ніколи не повинно бути більше однієї причини для зміни класу". Спокусливо набити клас великою кількістю функціональності, як коли ви можете взяти лише одну валізу на ваш рейс. Проблема в тому, що ваш клас не буде концептуально згуртованим і це дасть йому багато причин для змін. Зменшення кількості необхідних змін класу важливе. Це важливо, тому що якщо занадто багато функціональності в одному класі і ви змінюєте частину його, може бути важко зрозуміти, як це вплине на інші залежні модулі у вашому кодовій базі.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Принцип відкритості/закритості (OCP)

Як зазначив Бертран Мейєр, "програмні сутності (класи, модулі, функції тощо) повинні бути відкритими для розширення, але закритими для модифікації". Що це означає? Цей принцип в основному стверджує, що ви повинні дозволяти користувачам додавати нові функціональні можливості без зміни існуючого коду.

**Погано:**

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
      // трансформувати відповідь і повернути
    } else if (this.adapter instanceof NodeAdapter) {
      const response = await makeHttpCall<T>(url);
      // трансформувати відповідь і повернути
    }
  }
}

function makeAjaxCall<T>(url: string): Promise<T> {
  // запит і повернення обіцянки
}

function makeHttpCall<T>(url: string): Promise<T> {
  // запит і повернення обіцянки
}
```

**Добре:**

```ts
abstract class Adapter {
  abstract async request<T>(url: string): Promise<T>;

  // код, спільний для підкласів ...
}

class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // запит і повернення обіцянки
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // запит і повернення обіцянки
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {
  }

  async fetch<T>(url: string): Promise<T> {
    const response = await this.adapter.request<T>(url);
    // трансформувати відповідь і повернути
  }
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Принцип підстановки Лісков (LSP)

Це страшний термін для дуже простої концепції. Формально він визначається як "Якщо S є підтипом T, то об'єкти типу T можуть бути замінені об'єктами типу S (тобто об'єкти типу S можуть замінити об'єкти типу T) без зміни будь-яких бажаних властивостей цієї програми (коректність, виконувані завдання тощо)". Це ще страшніше визначення.  
  
Найкраще пояснення полягає в тому, що якщо у вас є батьківський клас і дочірній клас, то батьківський клас і дочірній клас можуть бути взаємозамінними без отримання неправильних результатів. Це все ще може бути незрозуміло, тому давайте розглянемо класичний приклад квадрата і прямокутника. Математично квадрат є прямокутником, але якщо ви моделюєте його за допомогою відносин "є" через успадкування, ви швидко потрапляєте в біду.

**Погано:**

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
      .getArea(); // ПОГАНО: Повертає 25 для Square. Повинно бути 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Принцип розділення інтерфейсу (ISP)

ISP стверджує, що "Клієнти не повинні бути змушені залежати від інтерфейсів, які вони не використовують". Цей принцип дуже пов'язаний з принципом єдиної відповідальності.
Що це дійсно означає, так це те, що ви завжди повинні проектувати свої абстракції таким чином, щоб клієнти, які використовують відкриті методи, не отримували весь пиріг. Це також включає в себе накладання на клієнтів тягаря реалізації методів, які їм насправді не потрібні.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Принцип інверсії залежностей (DIP)

Цей принцип стверджує дві суттєві речі:

1. Модулі високого рівня не повинні залежати від модулів низького рівня. Обидва повинні залежати від абстракцій.

2. Абстракції не повинні залежати від деталей. Деталі повинні залежати від абстракцій.

Це може бути важко зрозуміти спочатку, але якщо ви працювали з Angular, ви бачили реалізацію цього принципу у вигляді впровадження залежностей (DI). Хоча це не ідентичні концепції, DIP утримує модулі високого рівня від знання деталей їхніх модулів низького рівня та їх налаштування. Це можна досягти через DI. Величезною перевагою цього є зменшення зв'язку між модулями. Зв'язування - це дуже погана схема розробки, оскільки вона робить ваш код важким для рефакторингу.

DIP зазвичай досягається за допомогою контейнера інверсії управління (IoC). Прикладом потужного IoC-контейнера для TypeScript є [InversifyJs](https://www.npmjs.com/package/inversify)

**Погано:**

```ts
import { readFile as readFileCb } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileCb);

type ReportData = {
  // ..
}

class XmlFormatter {
  parse<T>(content: string): T {
    // Перетворює рядок XML на об'єкт T
  }
}

class ReportReader {

  // ПОГАНО: Ми створили залежність від конкретної реалізації запиту.
  // Нам слід просто зробити так, щоб ReportReader залежав від методу parse: `parse`
  private readonly formatter = new XmlFormatter();

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8');
    return this.formatter.parse<ReportData>(text);
  }
}

// ...
const reader = new ReportReader();
const report = await reader.read('report.xml');
```

**Добре:**

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
    // Перетворює рядок XML на об'єкт T
  }
}


class JsonFormatter implements Formatter {
  parse<T>(content: string): T {
    // Перетворює рядок JSON на об'єкт T
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
const report = await reader.read('report.xml');

// або якщо нам потрібно прочитати json звіт
const reader = new ReportReader(new JsonFormatter());
const report = await reader.read('report.json');
```

**[⬆ повернутись до змісту](#table-of-contents)**

## Тестування

Тестування є важливішим за доставку. Якщо у вас немає тестів або їх недостатньо, кожного разу, коли ви доставляєте код, ви не будете впевнені, що нічого не зламали.
Вирішення того, що становить достатню кількість, залежить від вашої команди, але 100% покриття (всі оператори та гілки)
- це спосіб досягти дуже високої впевненості та спокою розробників. Це означає, що крім наявності чудового фреймворку для тестування, вам також потрібно використовувати хороший [інструмент покриття](https://github.com/gotwarlost/istanbul).

Немає виправдання не писати тести. Існує [багато хороших JS-фреймворків для тестування](http://jstherightway.org/#testing-tools) з підтримкою типізації для TypeScript, тому знайдіть той, який підходить вашій команді. Коли ви знайдете один, що працює для вашої команди, тоді намагайтеся завжди писати тести для кожної нової функції/модуля, який ви вводите. Якщо ваш переважний метод - це розробка через тестування (TDD), це чудово, але головне - просто переконатися, що ви досягаєте своїх цілей з покриття перед запуском будь-якої функції або рефакторингом існуючої.

### Три закони TDD

1. Вам не дозволяється писати виробничий код, якщо це не для того, щоб пройти модульний тест, що не проходить.

2. Вам не дозволяється писати більше модульного тесту, ніж достатньо для невдачі, і; помилки компіляції - це невдачі.

3. Вам не дозволяється писати більше виробничого коду, ніж достатньо для проходження одного невдалого модульного тесту.

**[⬆ повернутись до змісту](#table-of-contents)**

### Правила F.I.R.S.T.

Чисті тести повинні дотримуватися таких правил:

- **Fast** (Швидкі) тести повинні бути швидкими, тому що ми хочемо запускати їх часто.

- **Independent** (Незалежні) тести не повинні залежати один від одного. Вони повинні давати однаковий результат незалежно від того, запускаються вони окремо чи всі разом у будь-якому порядку.

- **Repeatable** (Повторювані) тести повинні бути повторюваними в будь-якому середовищі, і не повинно бути виправдання, чому вони провалюються.

- **Self-Validating** (Самоперевірочні) тест повинен відповідати або *Пройдено*, або *Не пройдено*. Вам не потрібно порівнювати файли журналів, щоб відповісти, чи пройшов тест.

- **Timely** (Своєчасні) модульні тести повинні бути написані до виробничого коду. Якщо ви пишете тести після виробничого коду, ви можете виявити, що написання тестів занадто складне.

**[⬆ повернутись до змісту](#table-of-contents)**

### Одна концепція на тест

Тести також повинні слідувати *Принципу єдиної відповідальності*. Робіть лише одне твердження на модульний тест.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Назва тесту повинна розкривати його намір

Коли тест не проходить, його назва є першим показником того, що могло піти не так.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

## Асинхронність

### Перевага обіцянок (promises) перед зворотними викликами (callbacks)

Зворотні виклики не є чистими, і вони спричиняють надмірну кількість вкладеності *(пекло зворотних викликів)*.
Існують утиліти, які перетворюють існуючі функції, що використовують зворотні виклики, на версію, яка повертає обіцянки
(для Node.js див. [`util.promisify`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original), для загального призначення див. [pify](https://www.npmjs.com/package/pify), [es6-promisify](https://www.npmjs.com/package/es6-promisify))

**Погано:**

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

**Добре:**

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

Обіцянки підтримують кілька допоміжних методів, які допомагають зробити код більш стислим:  

| Шаблон                  | Опис                                |  
| ------------------------ | -----------------------------------------  |  
| `Promise.resolve(value)` | Перетворює значення в вирішену обіцянку.   |  
| `Promise.reject(error)`  | Перетворює помилку в відхилену обіцянку.  |  
| `Promise.all(promises)`  | Повертає нову обіцянку, яка виконується з масивом значень виконання для переданих обіцянок або відхиляється з причиною першої обіцянки, яка відхиляється. |
| `Promise.race(promises)`| Повертає нову обіцянку, яка виконується/відхиляється з результатом/помилкою першої врегульованої обіцянки з масиву переданих обіцянок. |

`Promise.all` особливо корисний, коли існує потреба запускати завдання паралельно. `Promise.race` полегшує реалізацію таких речей, як тайм-аути для обіцянок.

**[⬆ повернутись до змісту](#table-of-contents)**

### Async/Await ще чистіші за обіцянки

З синтаксисом `async`/`await` ви можете писати код, який є набагато чистішим та зрозумілішим, ніж ланцюжки обіцянок. У функції з префіксом ключового слова `async` у вас є спосіб сказати середовищу виконання JavaScript призупинити виконання коду на ключовому слові `await` (коли воно використовується з обіцянкою).

**Погано:**

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

**Добре:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

async function downloadPage(url: string): Promise<string> {
  const response = await get(url);
  return response;
}

// десь в асинхронній функції
try {
  const content = await downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
  await write('article.html', content);
  console.log(content);
} catch (error) {
  console.error(error);
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

## Обробка помилок

Викинуті помилки - це хороша річ! Вони означають, що середовище виконання успішно визначило, коли щось у вашій програмі пішло не так, і воно повідомляє вам, зупиняючи виконання функції
в поточному стеку, завершуючи процес (у Node), та повідомляючи вас у консолі за допомогою сліду стеку.

### Завжди використовуйте Error для викидання чи відхилення

JavaScript, а також TypeScript дозволяють вам `throw` будь-який об'єкт. Обіцянка також може бути відхилена з будь-якою причиною об'єкта.
Рекомендується використовувати синтаксис `throw` з типом `Error`. Це тому, що ваша помилка може бути перехоплена у коді вищого рівня з синтаксисом `catch`.
Було б дуже заплутано перехопити там текстове повідомлення, і це зробило б [налагодження більш болісним](https://basarat.gitbook.io/typescript/type-system/exceptions#always-use-error).
З тієї ж причини ви повинні відхиляти обіцянки з типами `Error`.

**Погано:**

```ts
function calculateTotal(items: Item[]): number {
  throw 'Not implemented.';
}

function get(): Promise<Item[]> {
  return Promise.reject('Not implemented.');
}
```

**Добре:**

```ts
function calculateTotal(items: Item[]): number {
  throw new Error('Not implemented.');
}

function get(): Promise<Item[]> {
  return Promise.reject(new Error('Not implemented.'));
}

// або еквівалентно до:

async function get(): Promise<Item[]> {
  throw new Error('Not implemented.');
}
```

Перевага використання типів `Error` полягає в тому, що вони підтримуються синтаксисом `try/catch/finally`, і неявно всі помилки мають властивість `stack`, яка
дуже потужна для налагодження.
Існують також інші альтернативи, не використовувати синтаксис `throw`, а замість цього завжди повертати користувацькі об'єкти помилок. TypeScript полегшує це. Розгляньте наступний приклад:

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

Для детального пояснення цієї ідеї зверніться до [оригінального посту](https://medium.com/@dhruvrajvanshi/making-exceptions-type-safe-in-typescript-c4d200ee78e9).

**[⬆ повернутись до змісту](#table-of-contents)**

### Не ігноруйте перехоплені помилки

Нічого не робити з перехопленою помилкою не дає вам можливості виправити або реагувати на цю помилку. Запис помилки в консоль (`console.log`) не набагато краще, оскільки часто вона може губитися в морі речей, виведених на консоль. Якщо ви обгортаєте будь-який фрагмент коду в `try/catch`, це означає, що ви думаєте, що там може виникнути помилка, і тому у вас повинен бути план або шлях коду для випадку, коли вона виникає.

**Погано:**

```ts
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}

// або ще гірше

try {
  functionThatMightThrow();
} catch (error) {
  // ігнорувати помилку
}
```

**Добре:**

```ts
import { logger } from './logging'

try {
  functionThatMightThrow();
} catch (error) {
  logger.log(error);
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Не ігноруйте відхилені обіцянки

З тієї ж причини ви не повинні ігнорувати перехоплені помилки з `try/catch`.

**Погано:**

```ts
getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    console.log(error);
  });
```

**Добре:**

```ts
import { logger } from './logging'

getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    logger.log(error);
  });

// або використовуючи синтаксис async/await:

try {
  const user = await getUser();
  await sendEmail(user.email, 'Welcome!');
} catch (error) {
  logger.log(error);
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

## Форматування

Форматування є суб'єктивним. Як і багато правил тут, немає жорсткого і швидкого правила, якого ви повинні дотримуватися. Головна точка - *НЕ СПЕРЕЧАТИСЯ* про форматування. Існує безліч інструментів для автоматизації цього. Використовуйте один! Це марнування часу і грошей для інженерів сперечатися про форматування. Загальне правило, якого слід дотримуватися, - *зберігати послідовні правила форматування*.

Для TypeScript існує потужний інструмент під назвою [ESLint](https://typescript-eslint.io/). Це інструмент статичного аналізу, який може допомогти вам кардинально покращити читабельність та обслуговуваність вашого коду. Існують готові до використання конфігурації ESLint, на які ви можете посилатися у своїх проектах:

- [ESLint Config Airbnb](https://www.npmjs.com/package/eslint-config-airbnb-typescript) - Стиль Airbnb

- [ESLint Base Style Config](https://www.npmjs.com/package/eslint-plugin-base-style-config) - Набір основних правил ESLint для JS, TS та React

- [ESLint + Prettier](https://www.npmjs.com/package/eslint-config-prettier) - правила lint для форматера коду [Prettier](https://github.com/prettier/prettier)

Зверніться також до цього чудового джерела [TypeScript StyleGuide and Coding Conventions](https://basarat.gitbook.io/typescript/styleguide).

### Міграція з TSLint на ESLint

Якщо ви шукаєте допомогу в міграції з TSLint на ESLint, ви можете перевірити цей проект: <https://github.com/typescript-eslint/tslint-to-eslint-config>

### Використовуйте послідовну капіталізацію

Капіталізація розповідає вам багато про ваші змінні, функції тощо. Ці правила є суб'єктивними, тому ваша команда може вибрати те, що захоче. Суть в тому, що незалежно від того, що ви всі виберете, просто *будьте послідовними*.

**Погано:**

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

**Добре:**

```ts
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const ARTISTS = ['ACDC', 'Led Zeppelin', 'The Beatles'];

const discography = getArtistDiscography('ACDC');
const beatlesSongs = SONGS.filter((song) => isBeatlesSong(song));

function eraseDatabase() {}
function restoreDatabase() {}

type Animal = { /* ... */ }
type Container = { /* ... */ }
```

Перевагу слід віддавати використанню `PascalCase` для назв класів, інтерфейсів, типів та просторів імен.
Перевагу слід віддавати використанню `camelCase` для змінних, функцій та членів класів.
Перевагу слід віддавати використанню капіталізованого `SNAKE_CASE` для констант.

**[⬆ повернутись до змісту](#table-of-contents)**

### Функції-викликачі та функції-виклики повинні бути близькими

Якщо функція викликає іншу, тримайте ці функції вертикально близько в вихідному файлі. В ідеалі, тримайте викликача прямо над викликаним.
Ми зазвичай читаємо код зверху вниз, як газету. Через це, зробіть ваш код таким, що читається таким чином.

**Погано:**

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

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Організуйте імпорти

З чистими та легкими для читання операторами імпорту ви можете швидко побачити залежності поточного коду. Переконайтеся, що ви застосовуєте наступні хороші практики для операторів `import`:

- Оператори імпорту повинні бути в алфавітному порядку та згруповані.
- Невикористані імпорти повинні бути видалені.
- Іменовані імпорти повинні бути в алфавітному порядку (тобто `import {A, B, C} from 'foo';`)
- Джерела імпорту повинні бути в алфавітному порядку в межах груп, тобто: `import * as foo from 'a'; import * as bar from 'b';`
- Перевагу слід віддавати використанню `import type` замість `import` при імпорті лише типів з файлу, щоб уникнути циклів залежностей, оскільки ці імпорти стираються під час виконання
- Групи імпорту розділяються порожніми рядками.
- Групи повинні поважати наступний порядок:
  - Поліфіли (тобто `import 'reflect-metadata';`)
  - Вбудовані модулі Node (тобто `import fs from 'fs';`)
  - зовнішні модулі (тобто `import { query } from 'itiriri';`)
  - внутрішні модулі (тобто `import { UserService } from 'src/services/userService';`)
  - модулі з батьківського каталогу (тобто `import foo from '../foo'; import qux from '../../foo/qux';`)
  - модулі з того ж або братнього каталогу (тобто `import bar from './bar'; import baz from './bar/baz';`)

**Погано:**

```ts
import { TypeDefinition } from '../types/typeDefinition';
import { AttributeTypes } from '../model/attribute';
import { Customer, Credentials } from '../model/types';
import { ApiCredentials, Adapters } from './common/api/authorization';
import fs from 'fs';
import { ConfigPlugin } from './plugins/config/configPlugin';
import { BindingScopeEnum, Container } from 'inversify';
import 'reflect-metadata';
```

**Добре:**

```ts
import 'reflect-metadata';

import fs from 'fs';
import { BindingScopeEnum, Container } from 'inversify';

import { AttributeTypes } from '../model/attribute';
import { TypeDefinition } from '../types/typeDefinition';
import type { Customer, Credentials } from '../model/types';

import { ApiCredentials, Adapters } from './common/api/authorization';
import { ConfigPlugin } from './plugins/config/configPlugin';
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Використовуйте аліаси TypeScript

Створюйте більш зручні імпорти, визначаючи властивості paths та baseUrl у розділі compilerOptions у файлі `tsconfig.json`

Це дозволить уникнути довгих відносних шляхів при імпорті.

**Погано:**

```ts
import { UserService } from '../../../services/UserService';
```

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

## Коментарі

Використання коментарів є ознакою неспроможності висловитися без них. Код повинен бути єдиним джерелом правди.
  
> Не коментуйте поганий код — перепишіть його.  
> — *Brian W. Kernighan and P. J. Plaugher*

### Віддавайте перевагу самопояснюючому коду замість коментарів

Коментарі — це вибачення, а не вимога. Хороший код *здебільшого* документує сам себе.

**Погано:**

```ts
// Перевірити, чи підписка активна.
if (subscription.endDate > Date.now) {  }
```

**Добре:**

```ts
const isSubscriptionActive = subscription.endDate > Date.now;
if (isSubscriptionActive) { /* ... */ }
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Не залишайте закоментований код у своїй кодовій базі

Контроль версій існує не просто так. Залиште старий код у вашій історії.

**Погано:**

```ts
type User = {
  name: string;
  email: string;
  // age: number;
  // jobPosition: string;
}
```

**Добре:**

```ts
type User = {
  name: string;
  email: string;
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Не ведіть журнал у коментарях

Пам'ятайте, використовуйте контроль версій! Немає потреби в мертвому коді, закоментованому коді, і особливо в коментарях-журналах. Використовуйте `git log`, щоб отримати історію!

**Погано:**

```ts
/**
 * 2016-12-20: Видалені монади, не зрозумів їх (RM)
 * 2016-10-01: Покращено використання спеціальних монад (JP)
 * 2016-02-03: Додано перевірку типів (LI)
 * 2015-03-14: Реалізовано combine (JR)
 */
function combine(a: number, b: number): number {
  return a + b;
}
```

**Добре:**

```ts
function combine(a: number, b: number): number {
  return a + b;
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

### Уникайте позиційних маркерів

Вони зазвичай лише додають шуму. Нехай назви функцій та змінних разом з правильним відступом та форматуванням надають вашому коду візуальну структуру.  
Більшість середовищ розробки підтримують функцію згортання коду, що дозволяє згортати/розгортати блоки коду (див. [згортання регіонів](https://code.visualstudio.com/updates/v1_17#_folding-regions) у Visual Studio Code).

**Погано:**

```ts
////////////////////////////////////////////////////////////////////////////////
// Клас клієнта
////////////////////////////////////////////////////////////////////////////////
class Client {
  id: number;
  name: string;
  address: Address;
  contact: Contact;

  ////////////////////////////////////////////////////////////////////////////////
  // публічні методи
  ////////////////////////////////////////////////////////////////////////////////
  public describe(): string {
    // ...
  }

  ////////////////////////////////////////////////////////////////////////////////
  // приватні методи
  ////////////////////////////////////////////////////////////////////////////////
  private describeAddress(): string {
    // ...
  }

  private describeContact(): string {
    // ...
  }
};
```

**Добре:**

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

**[⬆ повернутись до змісту](#table-of-contents)**

### Коментарі TODO

Коли ви розумієте, що вам потрібно залишити нотатки в коді для пізніших вдосконалень,
робіть це за допомогою коментарів `// TODO`. Більшість IDE мають спеціальну підтримку таких коментарів, тому
ви можете швидко переглянути весь список todos.  

Однак майте на увазі, що коментар *TODO* не є виправданням для поганого коду. 

**Погано:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // переконатися, що `dueDate` проіндексовано.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**Добре:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // TODO: переконатися, що `dueDate` проіндексовано.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**[⬆ повернутись до змісту](#table-of-contents)**

## Переклади

Це також доступно іншими мовами:
- ![br](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Бразильська португальська**: [vitorfreitas/clean-code-typescript](https://github.com/vitorfreitas/clean-code-typescript)
- ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Китайська**: 
  - [beginor/clean-code-typescript](https://github.com/beginor/clean-code-typescript)
  - [pipiliang/clean-code-typescript](https://github.com/pipiliang/clean-code-typescript)
- ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **Французька**: [ralflorent/clean-code-typescript](https://github.com/ralflorent/clean-code-typescript)
- ![de](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Germany.png) **Німецька**: [mheob/clean-code-typescript](https://github.com/mheob/clean-code-typescript)
- ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Японська**: [MSakamaki/clean-code-typescript](https://github.com/MSakamaki/clean-code-typescript)
- ![ko](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Корейська**: [738/clean-code-typescript](https://github.com/738/clean-code-typescript)
- ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Російська**: [Real001/clean-code-typescript](https://github.com/Real001/clean-code-typescript)
- ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Іспанська**: [3xp1o1t/clean-code-typescript](https://github.com/3xp1o1t/clean-code-typescript)
- ![tr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Turkey.png) **Турецька**: [ozanhonamlioglu/clean-code-typescript](https://github.com/ozanhonamlioglu/clean-code-typescript)
- ![vi](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **В'єтнамська**: [hoangsetup/clean-code-typescript](https://github.com/hoangsetup/clean-code-typescript)

Посилання будуть додані після завершення перекладів.  
Перевірте цю [дискусію](https://github.com/labs42io/clean-code-typescript/issues/15) для отримання додаткових деталей та прогресу.
Ви можете зробити неоціненний внесок у спільноту *Clean Code*, переклавши це вашою мовою.

**[⬆ повернутись до змісту](#table-of-contents)**
