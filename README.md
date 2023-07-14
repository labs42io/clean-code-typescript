# clean-code-typescript [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Clean%20Code%20Typescript&url=https://github.com/labs42io/clean-code-typescript)

Clean Code concepts adapted for TypeScript.
Inspired from [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript).

## Table of Contents

1. [Introduction](#introduction)
2. [Variables](#variables)
3. [Functions](#functions)
4. [Objects and Data Structures](#objects-and-data-structures)
5. [Classes](#classes)
6. [SOLID](#solid)
7. [Testing](#testing)
8. [Concurrency](#concurrency)
9. [Error Handling](#error-handling)
10. [Formatting](#formatting)
11. [Comments](#comments)

## Introduction

Software engineering principles, from Robert C. Martin's book
[_Clean Code_](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882),
adapted for TypeScript. This is not a style guide. It's a guide to producing
[readable, reusable, and refactorable](https://github.com/ryanmcdermott/3rs-of-software-architecture) software in TypeScript.

Not every principle herein has to be strictly followed, and even fewer will be
universally agreed upon. These are guidelines and nothing more, but they are
ones codified over many years of collective experience by the authors of
_Clean Code_.

Our craft of software engineering is just a bit over 50 years old, and we are
still learning a lot. When software architecture is as old as architecture
itself, maybe then we will have harder rules to follow. For now, let these
guidelines serve as a touchstone by which to assess the quality of the
TypeScript code that you and your team produce.

One more thing: knowing these won't immediately make you a better software
developer, and working with them for many years doesn't mean you won't make
mistakes. Every piece of code starts as a first draft, like wet clay getting
shaped into its final form. Finally, we chisel away the imperfections when
we review it with our peers. Don't beat yourself up for first drafts that need
improvement. Beat up the code instead!

**[⬆ back to top](#table-of-contents)**

## Variables

### Use meaningful variable names

Distinguish names in such a way that the reader knows what the differences offer.

**Bad:**

```ts
function between<T>(a1: T, a2: T, a3: T): boolean {
  return a2 <= a1 && a1 <= a3
}
```

**Good:**

```ts
function between<T>(value: T, left: T, right: T): boolean {
  return left <= value && value <= right
}
```

**[⬆ back to top](#table-of-contents)**

### Use pronounceable variable names

If you can’t pronounce it, you can’t discuss it without sounding like an idiot.

**Bad:**

```ts
type DtaRcrd102 = {
  genymdhms: Date
  modymdhms: Date
  pszqint: number
}
```

**Good:**

```ts
type Customer = {
  generationTimestamp: Date
  modificationTimestamp: Date
  recordId: number
}
```

**[⬆ back to top](#table-of-contents)**

### Use the same vocabulary for the same type of variable

**Bad:**

```ts
function getUserInfo(): User
function getUserDetails(): User
function getUserData(): User
```

**Good:**

```ts
function getUser(): User
```

**[⬆ back to top](#table-of-contents)**

### Use searchable names

We will read more code than we will ever write. It's important that the code we do write must be readable and searchable. By _not_ naming variables that end up being meaningful for understanding our program, we hurt our readers. Make your names searchable. Tools like [ESLint](https://typescript-eslint.io/) can help identify unnamed constants (also known as magic strings and magic numbers).

**Bad:**

```ts
// What the heck is 86400000 for?
setTimeout(restart, 86400000)
```

**Good:**

```ts
// Declare them as named constants.
const MillisecondsPerDay = 24 * 60 * 60 * 1000 // 86400000

setTimeout(restart, MillisecondsPerDay)
```

**[⬆ back to top](#table-of-contents)**

### Use explanatory variables

**Bad:**

```ts
declare const users: Map<string, User>

for (const keyValue of users) {
  // iterate through users map
}
```

**Good:**

```ts
declare const users: Map<string, User>

for (const [id, user] of users) {
  // iterate through users map
}
```

**Bad:**

```ts
const result = await fetchUser()
const data = await fetchComments(result.id)
```

**Good:**

```ts
const user = await fetchUser()
const comments = await fetchComments(user.id)
```

**[⬆ back to top](#table-of-contents)**

### Avoid Mental Mapping

Explicit is better than implicit.
_Clarity is king._

**Bad:**

```ts
const u = getUser()
const s = getSubscription()
const t = charge(u, s)
```

**Good:**

```ts
const user = getUser()
const subscription = getSubscription()
const transaction = charge(user, subscription)
```

**[⬆ back to top](#table-of-contents)**

### Don't add unneeded context

If your class/type/object name tells you something, don't repeat that in your variable name.

**Bad:**

```ts
type Car = {
  carMake: string
  carModel: string
  carColor: string
}

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`)
}
```

**Good:**

```ts
type Car = {
  make: string
  model: string
  color: string
}

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`)
}
```

**[⬆ back to top](#table-of-contents)**

### Use default arguments instead of short circuiting or conditionals

Default arguments are often cleaner than short circuiting.

**Bad:**

```ts
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10
  // ...
}
```

**Good:**

```ts
function loadPages(count: number = 10) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### Prefer string union types over enum types for constrained strings

To constrain a string to a particular set of values, use a string union type.

String unions require less code, fewer imports, and are usually simpler to work with, overall.

**Bad:**

```ts
const GENRE = {
  ROMANCE: 'romance',
  DRAMA: 'drama',
  COMEDY: 'comedy',
  DOCUMENTARY: 'documentary'
}

projector.configureFilm(GENRE.COMEDY)

class Projector {
  // declaration of Projector
  configureFilm(genre) {
    if (genre === GENRE.ROMANCE) {
      // some logic to be executed
    }
  }
}
```

**Good:**

```ts
type Genre = 'romance' | 'drama' | 'comedy' | 'documentary'

projector.configureFilm(GENRE.COMEDY)

class Projector {
  // declaration of Projector
  configureFilm(genre) {
    if (genre === 'romance') {
      // some logic to be executed
    }
  }
}
```

**[⬆ back to top](#table-of-contents)**

## Functions

### Function arguments (2 or fewer ideally)

Limiting the number of function parameters is incredibly important because it makes testing your function easier.
Having more than three leads to a combinatorial explosion where you have to test tons of different cases with each separate argument.

One or two arguments is the ideal case, and three should be avoided if possible. Anything more than that should be consolidated.
Usually, if you have more than two arguments then your function is trying to do too much.
In cases where it's not, most of the time a higher-level object will suffice as an argument.

Consider using object literals if you are finding yourself needing a lot of arguments.

To make it obvious what properties the function expects, you can use the [destructuring](https://basarat.gitbook.io/typescript/future-javascript/destructuring) syntax.
This has a few advantages:

1. When someone looks at the function signature, it's immediately clear what properties are being used.

2. It can be used to simulate named parameters.

3. Destructuring also clones the specified primitive values of the argument object passed into the function. This can help prevent side effects. Note: objects and arrays that are destructured from the argument object are NOT cloned.

4. TypeScript warns you about unused properties, which would be impossible without destructuring.

**Bad:**

```ts
function createMenu(
  title: string,
  body: string,
  buttonText: string,
  cancellable: boolean
) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true)
```

**Good:**

```ts
function createMenu(options: {
  title: string
  body: string
  buttonText: string
  cancellable: boolean
}) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
})
```

You can further improve readability by using [type aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases):

```ts
type MenuOptions = {
  title: string
  body: string
  buttonText: string
  cancellable: boolean
}

function createMenu(options: MenuOptions) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
})
```

**[⬆ back to top](#table-of-contents)**

### Functions should do one thing

This is by far the most important rule in software engineering. When functions do more than one thing, they are harder to compose, test, and reason about. When you can isolate a function to just one action, it can be refactored easily and your code will read much cleaner. If you take nothing else away from this guide other than this, you'll be ahead of many developers.

**Bad:**

```ts
function emailActiveClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client)
    if (clientRecord.isActive()) {
      email(client)
    }
  })
}
```

**Good:**

```ts
function emailActiveClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email)
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client)
  return clientRecord.isActive()
}
```

**[⬆ back to top](#table-of-contents)**

### Function names should say what they do

**Bad:**

```ts
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date()

// It's hard to tell from the function name what is added
addToDate(date, 1)
```

**Good:**

```ts
function addMonthToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date()
addMonthToDate(date, 1)
```

**Bad:**

```ts
// This _might_ be okay if we're consistent, but what if we want to import
// two or more `fetch` functions in some other module?
export const fetch(userId: string) {
  // ...
}

// What do we call the next function, `fetchWithArguments`?
const fetchWithParams(email?: string, lastName?: string) {
  //...
}
```

**Good:**

```ts
//
export const userGetById(userId: string) {
  // ...
}

// Combine the domain object name `user` with a standard convention `Search`
// Now we can import this just about anywhere without naming collisions
interface UserSearchFilter {
  email?: string
  lastName? : string
}
const userSearch({ email, lastName }: UserSearchFilter) {
  //...
}
```

**[⬆ back to top](#table-of-contents)**

### Functions should only work on a single level of abstraction

When we have more than one level of abstraction our function is probably doing too much. Splitting up functions leads to reusability, more composable code, and easier testing.

**Bad:**

```ts
function parseCode(code: string) {
  const REGEXES = [
    /* ... */
  ]
  const statements = code.split(' ')
  const tokens = []

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      // ...
    })
  })

  const ast = []
  tokens.forEach((token) => {
    // lex...
  })

  ast.forEach((node) => {
    // parse...
  })
}
```

**Good:**

```ts
const REGEXES = [
  /* ... */
]

function parseCode(code: string) {
  const tokens = tokenize(code)
  const syntaxTree = parse(tokens)

  syntaxTree.forEach((node) => {
    // parse...
  })
}

function tokenize(code: string): Token[] {
  const statements = code.split(' ')
  const tokens: Token[] = []

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      tokens.push(/* ... */)
    })
  })

  return tokens
}

function parse(tokens: Token[]): SyntaxTree {
  const syntaxTree: SyntaxTree[] = []
  tokens.forEach((token) => {
    syntaxTree.push(/* ... */)
  })

  return syntaxTree
}
```

**[⬆ back to top](#table-of-contents)**

### Remove duplicate code

Do your absolute best to avoid duplicate code.
Duplicate code is bad because it means that there's more than one place to alter something if you need to change some logic.

Imagine if you run a restaurant and you keep track of your inventory: all your tomatoes, onions, garlic, spices, etc.
If you have multiple lists that you keep this on, then all have to be updated when you serve a dish with tomatoes in them.
If you only have one list, there's only one place to update!

Oftentimes you have duplicate code because you have two or more slightly different things, that share a lot in common, but their differences force you to have two or more separate functions that do much of the same things. Removing duplicate code means creating an abstraction that can handle this set of different things with just one function/module/class.

Getting the abstraction right is critical, that's why you should follow the [SOLID](#solid) principles. Bad abstractions can be worse than duplicate code, so be careful! Having said this, if you can make a good abstraction, do it! Don't repeat yourself, otherwise, you'll find yourself updating multiple places anytime you want to change one thing.

**Bad:**

```ts
function showDeveloperList(developers: Developer[]) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary()
    const experience = developer.getExperience()
    const githubLink = developer.getGithubLink()

    const data = {
      expectedSalary,
      experience,
      githubLink
    }

    render(data)
  })
}

function showManagerList(managers: Manager[]) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary()
    const experience = manager.getExperience()
    const portfolio = manager.getMBAProjects()

    const data = {
      expectedSalary,
      experience,
      portfolio
    }

    render(data)
  })
}
```

**Good:**

```ts
class Developer {
  // ...
  getExtraDetails() {
    return {
      githubLink: this.githubLink
    }
  }
}

class Manager {
  // ...
  getExtraDetails() {
    return {
      portfolio: this.portfolio
    }
  }
}

function showEmployeeList(employee: (Developer | Manager)[]) {
  employee.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary()
    const experience = employee.getExperience()
    const extra = employee.getExtraDetails()

    const data = {
      expectedSalary,
      experience,
      extra
    }

    render(data)
  })
}
```

You may also consider adding a union type, or common parent class if it suits your abstraction.

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
}
```

We should be thoughtful about code duplication. Sometimes there is a tradeoff between duplicated code and increased complexity by introducing _unnecessary_ abstractions. When two implementations from two different modules look similar but live in different domains, duplication might be acceptable and preferred over extracting the common code. See the section below about "Manufactured Complexity".

**[⬆ back to top](#table-of-contents)**

### Set default objects with Object.assign or destructuring

**Bad:**

```ts
type MenuConfig = {
  title?: string
  body?: string
  buttonText?: string
  cancellable?: boolean
}

function createMenu(config: MenuConfig) {
  config.title = config.title || 'Foo'
  config.body = config.body || 'Bar'
  config.buttonText = config.buttonText || 'Baz'
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true

  // ...
}

createMenu({ body: 'Bar' })
```

**Good:**

```ts
type MenuConfig = {
  title?: string
  body?: string
  buttonText?: string
  cancellable?: boolean
}

function createMenu(config: MenuConfig) {
  const menuConfig = Object.assign(
    {
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellable: true
    },
    config
  )

  // ...
}

createMenu({ body: 'Bar' })
```

Or, you could use the spread operator:

```ts
function createMenu(config: MenuConfig) {
  const menuConfig = {
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true,
    ...config
  }

  // ...
}
```

The spread operator and `Object.assign()` are very similar.
The main difference is that spreading defines new properties, while `Object.assign()` sets them. More detailed, the difference is explained in [this](https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign) thread.

Alternatively, you can use destructuring with default values:

```ts
type MenuConfig = {
  title?: string
  body?: string
  buttonText?: string
  cancellable?: boolean
}

function createMenu({
  title = 'Foo',
  body = 'Bar',
  buttonText = 'Baz',
  cancellable = true
}: MenuConfig) {
  // ...
}

createMenu({ body: 'Bar' })
```

To avoid any side effects and unexpected behavior by passing in explicitly the `undefined` or `null` value, you can tell the TypeScript compiler to not allow it.
See [`--strictNullChecks`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictnullchecks) option in TypeScript.

**[⬆ back to top](#table-of-contents)**

### Don't use flags as function parameters

Flags tell your user that this function does more than one thing.
Functions should do one thing. Split out your functions if they are following different code paths based on a boolean.

**Bad:**

```ts
function createFile(name: string, temp: boolean) {
  if (temp) {
    fs.create(`./temp/${name}`)
  } else {
    fs.create(name)
  }
}
```

**Good:**

```ts
function createTempFile(name: string) {
  createFile(`./temp/${name}`)
}

function createFile(name: string) {
  fs.create(name)
}
```

### Strive for "low density" code

As with modules, classes, and functions, most lines of code should try to "do one thing".

When we combine lots of logical operations into a single line of code, it becomes less readable, and more difficult to maintain.

**Bad:**

```ts
// Quick! What does this code do?
let userIds = []
if (!(await fetchUserIdsBySignupDate(signUpDate)).length)
  userIds = await db.query<IUser>(
    'SELECT userId FROM signUpAudits WHERE createdDate AFTER ?',
    [signUpDate instanceof Date ? signUpDate | new Date(signUpDate)]
  ).then((rows) => { rows.map((row)=> row.userId ) })
```

**Good:**

```ts
// This may be more lines of code, but it is MUCH easier to read and maintain!
const ensureUserIdsBySignupDateOrAudit = (signUpDate: Date | string) => {
  const userUserIds = await getUserIdsBySignupDate(signUpDate)

  if (userUserIds.length) {
    return userUserIds
  }

  const auditUserIds = await signUpAuditsGetUserIdsByCreatedAt(signUpDate)
  return auditUserIds
}

const signUpAuditsGetUserIdsByCreatedAt = (signUpDate: Date | string) => {
  const createdAt = ensureDate(signUpDate)
  const query = 'SELECT userId FROM signUpAudits WHERE createdDate AFTER ?'
  const params = [createdAt]
  const rows = db.query<{ userId }>(query, params)
  return rows.map((row) => row.userId)
}

// Quick! What does this code do? :D
const userIds = ensureUserIdsBySignupDateOrAudit(signUpDate)
```

### Avoid the ternary operator

The ternary operator may seem convenient sometimes, but it is often more difficult to reason about than many developers realize. Use of the ternary operator, especially when nested, leads to code that is harder to read, harder to maintain, and prone to defects.

When the ternary operator is used, try to use it only to set a variable value, or as a return from a function. Avoid nesting ternaries inside other code, and never combine multiple ternary operators in a single statement.

**Bad:**

```ts
export const ISODateToClientDate = (time: Date | string | undefined) => {
  if (time instanceof Date) {
    return utcToZonedTime(time, clientTimezone)
  }
  return utcToZonedTime(time ? new Date(time) : new Date(), clientTimezone)
}
```

**Good:**

```ts
// This approach clearly delineates the different cases for values of `time`
export const ISODateToClientDate = (time: Date | string | undefined) => {
  if (time instanceof Date) {
    return utcToZonedTime(time, clientTimezone)
  }
  // This may be a few more lines of code, but that is the point!
  // This code is less dense, making it easier to read and maintain.
  if (time) {
    return new utcToZonedTime(new Date(time), clientTimezone)
  }
  return utcToZonedTime(new Date(), clientTimezone)
}
```

Sometimes nested ternaries may _seem_ more readable, at least at first glance.

This code looks _sort of_ readable, until we look at the other options.

**Bad:**

```ts
const query = `
  SELECT id
  FROM carts
  WHERE status = 'active'
  isWebOrder = ?
  ${filterByFailed === 'true' ? 'AND failureReason IS NOT NULL' : ''}
  ${stateId ? 'AND stateId = ?' : ''}
  ORDER BY createdAt DESC
`

// Did you notice the bug in the code above? The nested ternaries provide an excellent distraction!
// Also note how the `?` and `:` tokens blend in visually with surrounding code.
```

**Better:**

```ts
const maybeFailureReason =
  filterByFailed === 'true' ? 'AND failureReason IS NOT NULL' : ''

const maybeStateId = stateId ? 'AND stateId = ?' : ''

const select = `
  SELECT id
  FROM carts
  WHERE status = 'active'
  isWebOrder = ?
  ${maybeFailureReason}
  ${maybeStateId}
  ORDER BY createdAt DESC
`
```

**Best:**

```ts
import { buildWhereClause, isNotNull } from 'some-query-builder'

const conditions = {
  status: 'active',
  isWebOrder,
  stateId
  failureReason: () {
    if (filterByFailed === 'true') {
      return isNotNull
    }
  }
}

// Common logic like building queries should be behind an abstraction!
const whereClause = buildWhereClause(conditions)

const select = sql`
  SELECT id
  FROM carts
  ${whereClause}
  ORDER BY createdAt DESC
`
```

### Prefer named exports over default exports

Named exports are more explicit and tend to work better with our tools.

**Bad:**

```ts
// Defaults encourage too much creativity when importing
import user from './userModel'
import sessionModel from './sessionModel'

const authenticate = (userId: string) => {
  // Defaults tend to result in naming collisions
  const theUser = user.getById(userId)
  const session = sessionModel.getByUserId(userId)
  // ...
}

//
//  ...a whole bunch of other functions
//

export default {
  // When we click "goToDefinition" in VSCode, it brings us here, and we have to click through again
  authenticate
}
```

**Good:**

```ts
import { userGetById } from './userModel'
import { sessionGetByUserId } from './sessionModel'

export const authenticate = (userId: string) => {
  const user = userGetById(userId)
  const session = sessionGetByUserId(userId)
  // ...
}

// No need for extra cruft!
```

### Strive for simplicity, avoid "manufactured complexity"

Some patterns start out with the best intentions, but end up being a burden, and end up making code more difficult to read and maintain. Working on our application code should feel sleek and ergonomic, not clumsy or burdensome. If we feel like one of our patterns is slowing us down, it probably is! We should raise the issue with the team, and figure out a way to make our code simpler, and easier to work with.

A few common examples of manufactured complexity:

- Widespread use of a low-level API, instead of creating a higher-level wrapper API
- Using multiple TS types to represent the same domain object
- Overuse of the type system: too many interfaces, overly-complex generic types, etc
- Misuse or overuse of well-known patterns: e.g. the Factory Pattern
- Strict adherence to one paradigm: OOP, functional programming, immutability

**Bad:**

```ts
import IUserAuth from './IUserAuth'
import IUser from './IUser'
import IUserFetcher from './IUserFetcher'
import UserFetcherFactory from './UserFetcherFactory'
import ISession from './ISession'
import ISessionFetcher from './ISessionFetcher'
import SessionFetcherFactory from './SessionFetcherFactory'

export default class UserAuth implements IUserAuth {
  userFetcher: IUserFetcher
  sessionFetcher: ISessionFetcher

  constructor(
    userFetcherFactory: UserFetcherFactory,
    sessionFetcherFactory: SessionFetcherFactory
  ) {
    this.userFetcher = userFetcherFactory.createUserFetcher<IUser>()
    this.sessionFetcher = sessionFactorFetcher.createSessionFetcher<ISession>()
  }

  async authenticateUser(userId: string) {
    const user = await this.userFetcher.fetchUser(userId)
    const session = await this.sessionFetcher.fetchSession(userId)
    // ... finish authenticating user
  }
}
```

**Good:**

```ts
import { sessionGetByUserId } from './sessionModel'
import { userGetById } from './userModel'

export const authenticateUser(userId: string) {
  const user = userGetById(userId)
  const session = sessionGetByUserId(userId)
  // ... finish authenticating user
}

```

**[⬆ back to top](#table-of-contents)**

### Avoid Side Effects (part 1)

A function produces a side effect if it does anything other than take a value in and return another value or values.
A side effect could be writing to a file, modifying some global variable, or accidentally wiring all your money to a stranger.

Now, you do need to have side effects in a program on occasion. Like the previous example, you might need to write to a file.
What you want to do is to centralize where you are doing this. Don't have several functions and classes that write to a particular file.
Have one service that does it. One and only one.

The main point is to avoid common pitfalls like sharing state between objects without any structure, using mutable data types that can be written to by anything, and not centralizing where your side effects occur. If you can do this, you will be happier than the vast majority of other programmers.

**Bad:**

```ts
// Global variable referenced by following function.
let name = 'Robert C. Martin'

function toBase64() {
  name = btoa(name)
}

toBase64()
// If we had another function that used this name, now it'd be a Base64 value

console.log(name) // expected to print 'Robert C. Martin' but instead 'Um9iZXJ0IEMuIE1hcnRpbg=='
```

**Good:**

```ts
const name = 'Robert C. Martin'

function toBase64(text: string): string {
  return btoa(text)
}

const encodedName = toBase64(name)
console.log(name)
```

**[⬆ back to top](#table-of-contents)**

### Avoid Side Effects (part 2)

Browsers and Node.js process only JavaScript, therefore any TypeScript code has to be compiled before running or debugging. In JavaScript, some values are unchangeable (immutable) and some are changeable (mutable). Objects and arrays are two kinds of mutable values so it's important to handle them carefully when they're passed as parameters to a function. A JavaScript function can change an object's properties or alter the contents of an array which could easily cause bugs elsewhere.

Suppose there's a function that accepts an array parameter representing a shopping cart. If the function makes a change in that shopping cart array - by adding an item to purchase, for example - then any other function that uses that same `cart` array will be affected by this addition. That may be great, however it could also be bad. Let's imagine a bad situation:

The user clicks the "Purchase" button which calls a `purchase` function that spawns a network request and sends the `cart` array to the server. Because of a bad network connection, the `purchase` function has to keep retrying the request. Now, what if in the meantime the user accidentally clicks an "Add to Cart" button on an item they don't actually want before the network request begins? If that happens and the network request begins, then that purchase function will send the accidentally added item because the `cart` array was modified.

A great solution would be for the `addItemToCart` function to always clone the `cart`, edit it, and return the clone. This would ensure that functions that are still using the old shopping cart wouldn't be affected by the changes.

Two caveats to mention to this approach:

1. There might be cases where you actually want to modify the input object, but when you adopt this programming practice you will find that those cases are pretty rare. Most things can be refactored to have no side effects! (see [pure function](https://en.wikipedia.org/wiki/Pure_function))

2. Cloning big objects can be very expensive in terms of performance. Luckily, this isn't a big issue in practice because there are [great libraries](https://github.com/immutable-js/immutable-js) that allow this kind of programming approach to be fast and not as memory intensive as it would be for you to manually clone objects and arrays.

**Bad:**

```ts
function addItemToCart(cart: CartItem[], item: Item): void {
  cart.push({ item, date: Date.now() })
}
```

**Good:**

```ts
function addItemToCart(cart: CartItem[], item: Item): CartItem[] {
  return [...cart, { item, date: Date.now() }]
}
```

**[⬆ back to top](#table-of-contents)**

### Don't write to global functions

Polluting globals is a bad practice in JavaScript because you could clash with another library and the user of your API would be none-the-wiser until they get an exception in production. Let's think about an example: what if you wanted to extend JavaScript's native Array method to have a `diff` method that could show the difference between two arrays? You could write your new function to the `Array.prototype`, but it could clash with another library that tried to do the same thing. What if that other library was just using `diff` to find the difference between the first and last elements of an array? This is why it would be much better to just use classes and simply extend the `Array` global.

**Bad:**

```ts
declare global {
  interface Array<T> {
    diff(other: T[]): Array<T>
  }
}

if (!Array.prototype.diff) {
  Array.prototype.diff = function <T>(other: T[]): T[] {
    const hash = new Set(other)
    return this.filter((elem) => !hash.has(elem))
  }
}
```

**Good:**

```ts
class MyArray<T> extends Array<T> {
  diff(other: T[]): T[] {
    const hash = new Set(other)
    return this.filter((elem) => !hash.has(elem))
  }
}
```

**[⬆ back to top](#table-of-contents)**

### Favor functional programming over imperative programming

Favor this style of programming when you can.

**Bad:**

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
]

let totalOutput = 0

for (let i = 0; i < contributions.length; i++) {
  totalOutput += contributions[i].linesOfCode
}
```

**Good:**

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
]

const totalOutput = contributions.reduce(
  (totalLines, output) => totalLines + output.linesOfCode,
  0
)
```

**[⬆ back to top](#table-of-contents)**

### Encapsulate conditionals

**Bad:**

```ts
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

**Good:**

```ts
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0
}

if (canActivateService(subscription, account)) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### Avoid negative conditionals

**Bad:**

```ts
function isEmailNotUsed(email: string): boolean {
  // ...
}

if (isEmailNotUsed(email)) {
  // ...
}
```

**Good:**

```ts
function isEmailUsed(email: string): boolean {
  // ...
}

if (!isEmailUsed(email)) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### Avoid type checking

TypeScript is a strict syntactical superset of JavaScript and adds optional static type checking to the language.
Always prefer to specify types of variables, parameters and return values to leverage the full power of TypeScript features.
It makes refactoring easier.

**Bad:**

```ts
function travelToTexas(vehicle: Bicycle | Car) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(currentLocation, new Location('texas'))
  } else if (vehicle instanceof Car) {
    vehicle.drive(currentLocation, new Location('texas'))
  }
}
```

**Good:**

```ts
type Vehicle = Bicycle | Car

function travelToTexas(vehicle: Vehicle) {
  vehicle.move(currentLocation, new Location('texas'))
}
```

**[⬆ back to top](#table-of-contents)**

### Don't over-optimize

Modern browsers do a lot of optimization under-the-hood at runtime. A lot of times, if you are optimizing then you are just wasting your time. There are good [resources](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers) for seeing where optimization is lacking. Target those in the meantime, until they are fixed if they can be.

**Bad:**

```ts
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Good:**

```ts
for (let i = 0; i < list.length; i++) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### Remove dead code

Dead code is just as bad as duplicate code. There's no reason to keep it in your codebase.
If it's not being called, get rid of it! It will still be saved in your version history if you still need it.

**Bad:**

```ts
function oldRequestModule(url: string) {
  // ...
}

function requestModule(url: string) {
  // ...
}

const req = requestModule
inventoryTracker('apples', req, 'www.inventory-awesome.io')
```

**Good:**

```ts
function requestModule(url: string) {
  // ...
}

const req = requestModule
inventoryTracker('apples', req, 'www.inventory-awesome.io')
```

**[⬆ back to top](#table-of-contents)**

## Objects and Data Structures

### Use getters and setters

TypeScript supports getter/setter syntax.
Using getters and setters to access data from objects that encapsulate behavior could be better than simply looking for a property on an object.

Advantages:

- When you want to do more beyond getting an object property, you don't have to look up and change every accessor in your codebase.
- Makes adding validation simple when doing a `set`.
- Encapsulates the internal representation.
- Easy to add logging and error handling when getting and setting.
- You can lazy load your object's properties, let's say getting it from a server.

**Bad:**

```ts
type BankAccount = {
  balance: number
  // ...
}

const value = 100
const account: BankAccount = {
  balance: 0
  // ...
}

if (value < 0) {
  throw new Error('Cannot set negative balance.')
}

account.balance = value
```

**Good:**

```ts
class BankAccount {
  private _balance: number = 0

  get balance(): number {
    return this._balance
  }

  set balance(value: number) {
    if (value < 0) {
      throw new Error('Cannot set negative balance.')
    }

    this._balance = value
  }

  // ...
}

// Now `BankAccount` encapsulates the validation logic.
// If one day the specifications change, and we need extra validation rule,
// we would have to alter only the `setter` implementation,
// leaving all dependent code unchanged.
const account = new BankAccount()
account.balance = 100
```

**[⬆ back to top](#table-of-contents)**

### Use private/protected members where appropriate

TypeScript supports `public` _(default)_, `protected` and `private` accessors on class members.

We can also use `readonly` to ensure that certain properties aren't updated (see below).

**Bad:**

```ts
class Circle {
  radius: number

  constructor(radius: number) {
    this.radius = radius
  }

  perimeter() {
    return 2 * Math.PI * this.radius
  }

  surface() {
    return Math.PI * this.radius * this.radius
  }
}
```

**Good:**

```ts
class Circle {
  private readonly _radius: number

  constructor(radius: number) {
    this._radius = radius
  }

  perimeter() {
    return 2 * Math.PI * this._radius
  }

  surface() {
    return Math.PI * this._radius * this._radius
  }

  // If callers need access to the value, it can be exposed using a getter!
  get radius() {
    return this._radius
  }
}
```

**[⬆ back to top](#table-of-contents)**

### Prefer immutability

TypeScript's type system allows you to mark individual properties on an interface/class as _readonly_. This allows you to work in a functional way (an unexpected mutation is bad).
For more advanced scenarios there is a built-in type `Readonly` that takes a type `T` and marks all of its properties as readonly using mapped types (see [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)).

**Bad:**

```ts
// Assuming we don't want instances of Config to be changed after they're created
interface Config {
  host: string
  port: string
  db: string
}
```

**Good:**

```ts
interface Config {
  readonly host: string
  readonly port: string
  readonly db: string
}
```

For arrays, you can create a read-only array by using `ReadonlyArray<T>`.
It doesn't allow changes such as `push()` and `fill()`, but can use features such as `concat()` and `slice()` that do not change the array's value.

**Bad:**

```ts
const array: number[] = [1, 3, 5]
array = [] // error
array.push(100) // array will be updated
```

**Good:**

```ts
function hoge(args: readonly string[]) {
  args.push(1) // error
}
```

Prefer [const assertions](https://github.com/microsoft/TypeScript/wiki/What's-new-in-TypeScript#const-assertions) for literal values.

**Bad:**

```ts
const config = {
  hello: 'world'
}
config.hello = 'world' // value is changed

const array = [1, 3, 5]
array[0] = 10 // value is changed

// writable objects is returned
function readonlyData(value: number) {
  return { value }
}

const result = readonlyData(100)
result.value = 200 // value is changed
```

**Good:**

```ts
// read-only object
const config = {
  hello: 'world'
} as const
config.hello = 'world' // error

// read-only array
const array = [1, 3, 5] as const
array[0] = 10 // error

// You can return read-only objects
function readonlyData(value: number) {
  return { value } as const
}

const result = readonlyData(100)
result.value = 200 // error
```

**[⬆ back to top](#table-of-contents)**

### type vs. interface

Use type when you might need a union or intersection. Use an interface when you want `extends` or `implements`. There is no strict rule, however, use the one that works for you.
For a more detailed explanation refer to this [answer](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/54101543#54101543) about the differences between `type` and `interface` in TypeScript.

**Bad:**

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

**Good:**

```ts
type EmailConfig = {
  // ...
}

type DbConfig = {
  // ...
}

type Config = EmailConfig | DbConfig

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

**[⬆ back to top](#table-of-contents)**

## Classes

### Classes should be small

The class' size is measured by its responsibility. Following the _Single Responsibility principle_ a class should be small.

**Bad:**

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

**Good:**

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

// split the responsibilities by moving the remaining methods to other classes, for example
class DashboardUser {
  // ...
}

class DashboardSubscriptions {
  //...
}
```

**[⬆ back to top](#table-of-contents)**

### Prefer high cohesion and loose coupling

Cohesion defines the degree to which class members are related to each other. If a class is _maximally cohesive_, all fields within a class should be used by each method. In practice, this level of cohesion is rarely possible, but we should consider low cohesion to be a code smell, and a sign that a class might be cleaner if split into two or more classes.

Coupling refers to how related or dependent are two classes toward each other. Classes are said to be loosely coupled if changes in one of them don't affect the other one.

Good software design has **high cohesion** and **loose coupling**.

**Bad:**

```ts
class UserManager {
  // Bad: each private variable is used by one or another group of methods.
  // It makes clear evidence that the class is holding more than a single responsibility.
  // If I need only to create the service to get the transactions for a user,
  // I'm still forced to pass and instance of `emailSender`.
  constructor(
    private readonly db: Database,
    private readonly emailSender: EmailSender
  ) {}

  async getUser(id: number): Promise<User> {
    return await db.users.findOne({ id })
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await db.transactions.find({ userId })
  }

  async sendGreeting(): Promise<void> {
    await emailSender.send('Welcome!')
  }

  async sendNotification(text: string): Promise<void> {
    await emailSender.send(text)
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

**Good:**

```ts
class UserModel {
  async getUser(id: number): Promise<User> {
    return await db.users.findOne({ id })
  }
}

class TransactionModel {
  async getTransactions(userId: number): Promise<Transaction[]> {
    return await db.transactions.find({ userId })
  }
}

class UserNotifier {
  constructor(private readonly emailSender: EmailSender) {}

  async sendGreeting(): Promise<void> {
    await this.emailSender.send('Welcome!')
  }

  async sendNotification(text: string): Promise<void> {
    await this.emailSender.send(text)
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

**[⬆ back to top](#table-of-contents)**

### Prefer composition over inheritance

As stated famously in [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns) by the Gang of Four, we should _prefer composition over inheritance_ where we can. There are lots of good reasons to use inheritance and lots of good reasons to use composition. When tempted to use inheritance, we should first try to think if composition could model our problem better. In many cases it can.

However, there are a few cases where we still might want to use inheritance:

1. Our inheritance represents an "is-a" relationship and not a "has-a" relationship (Human->Animal vs. User->UserDetails).

2. We can reuse code from the base classes (Humans can move like all animals).

3. We want to make global changes to derived classes by changing a base class. (Change the caloric expenditure of all animals when they move).

**Bad:**

```ts
class Employee {
  constructor(private readonly name: string, private readonly email: string) {}

  // ...
}

// Bad because Employees "have" tax data. EmployeeTaxData is not a type of Employee
class EmployeeTaxData extends Employee {
  constructor(
    name: string,
    email: string,
    private readonly ssn: string,
    private readonly salary: number
  ) {
    super(name, email)
  }

  // ...
}
```

**Good:**

```ts
class Employee {
  private taxData: EmployeeTaxData

  constructor(private readonly name: string, private readonly email: string) {}

  setTaxData(ssn: string, salary: number): Employee {
    this.taxData = new EmployeeTaxData(ssn, salary)
    return this
  }

  // ...
}

class EmployeeTaxData {
  constructor(public readonly ssn: string, public readonly salary: number) {}

  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### Avoid fluid interfaces and method chaining

Fluid interfaces make code more [difficult to maintain](https://www.yegor256.com/2018/03/13/fluent-interfaces.html). and place awkward constraints on the future expansion of functionality.

**Bad:**

```ts
class QueryBuilder {
  private collection: string
  private pageNumber: number = 1
  private itemsPerPage: number = 100
  private orderByFields: string[] = []

  from(collection: string): this {
    this.collection = collection
    return this
  }

  page(number: number, itemsPerPage: number = 100): this {
    this.pageNumber = number
    this.itemsPerPage = itemsPerPage
    return this
  }

  orderBy(...fields: string[]): this {
    this.orderByFields = fields
    return this
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
  .build()
```

**Good:**

```ts
class QueryBuilder {
  private collection: string
  private pageNumber: number = 1
  private itemsPerPage: number = 100
  private orderByFields: string[] = []

  from(collection: string): void {
    this.collection = collection
  }

  page(number: number, itemsPerPage: number = 100): void {
    this.pageNumber = number
    this.itemsPerPage = itemsPerPage
  }

  orderBy(...fields: string[]): void {
    this.orderByFields = fields
  }

  build(): Query {
    // ...
  }
}

// ...

const queryBuilder = new QueryBuilder()
queryBuilder.from('users')
queryBuilder.page(1, 100)
queryBuilder.orderBy('firstName', 'lastName')

const query = queryBuilder.build()
```

**[⬆ back to top](#table-of-contents)**

## SOLID

### Single Responsibility Principle (SRP)

A module or class should only ever have a single "reason to change". This is really just another way to describe High Cohesion, as discussed above.

For example, suppose we have a module that generates a PDF report. It includes functions to fetch the data for the report, functions to format the data using templates, and functions to write the output PDF to a file.

This module is operating at multiple levels of abstraction, and has three "reasons to change":

1. The report input data could change
2. The format of the report could change
3. The expected output could change

Identifying these "reasons to change" can help us understand how to break large modules down into smaller pieces, resulting in improved readability and maintainability.

**Bad:**

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

**Good:**

```ts
class UserAuth {
  constructor(private readonly user: User) {}

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  private readonly auth: UserAuth

  constructor(private readonly user: User) {
    this.auth = new UserAuth(user)
  }

  changeSettings(settings: UserSettings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

**[⬆ back to top](#table-of-contents)**

### Open/Closed Principle (OCP)

As stated by Bertrand Meyer, "software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification." Although it was originally discussed primarily in terms of OOP and inheritance, at a high level it can be thought of as the "plugin principle".

One great example of this principle is VSCode, with its vast library of extensions. It's plugin-driven architecture allows us to extend the functionality of the software, without having to modify the source code.

**Bad:**

```ts
type CellFormats = 'string' | 'dollars'

interface GridArgs {
  rows: Array<Record<string, any>>
  formats: Record<string, CellFormats>
}

const DataGrid = ({ rows, formats }: GridArgs) => {
  // ... renders the data in a grid
}

// Usage:
<DataGrid rows={rows} formats={discount: 'dollars'} />
```

**Good:**

```ts
type CellFormatter = (value: any) => ReactNode

interface GridArgs {
  rows: Array<Record<string, any>>
  formatters: Record<string, CellFormatter>
}

const DataGrid = ({ rows, formatters }: GridArgs) => {
  // ... renders the data in a grid
}

// Callers can use any formatter functions they prefer!
<DataGrid rows={rows} formatters={discount: formatPercent} />
```

**[⬆ back to top](#table-of-contents)**

### Liskov Substitution Principle (LSP)

Formal Definition: "If S is a subtype of T, then objects of type T may be replaced with objects of type S (i.e., objects of type S may substitute objects of type T) without altering any of the desirable properties of that program (correctness, task performed, etc.)."

More simply, if we have a parent class and a child class, then the parent class and child class can be used interchangeably without getting incorrect results. A classic example of this is the Square-Rectangle problem. Mathematically, a square is a rectangle, but if we model it using the "is-a" relationship via inheritance, we quickly get into trouble.

**Bad:**

```ts
class Rectangle {
  constructor(protected width: number = 0, protected height: number = 0) {}

  setColor(color: string): this {
    // ...
  }

  render(area: number) {
    // ...
  }

  setWidth(width: number): this {
    this.width = width
    return this
  }

  setHeight(height: number): this {
    this.height = height
    return this
  }

  getArea(): number {
    return this.width * this.height
  }
}

class Square extends Rectangle {
  setWidth(width: number): this {
    this.width = width
    this.height = width
    return this
  }

  setHeight(height: number): this {
    this.width = height
    this.height = height
    return this
  }
}

function renderLargeRectangles(rectangles: Rectangle[]) {
  rectangles.forEach((rectangle) => {
    const area = rectangle.setWidth(4).setHeight(5).getArea() // BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area)
  })
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()]
renderLargeRectangles(rectangles)
```

**Good:**

```ts
abstract class Shape {
  setColor(color: string): this {
    // ...
  }

  render(area: number) {
    // ...
  }

  abstract getArea(): number
}

class Rectangle extends Shape {
  constructor(private readonly width = 0, private readonly height = 0) {
    super()
  }

  getArea(): number {
    return this.width * this.height
  }
}

class Square extends Shape {
  constructor(private readonly length: number) {
    super()
  }

  getArea(): number {
    return this.length * this.length
  }
}

function renderLargeShapes(shapes: Shape[]) {
  shapes.forEach((shape) => {
    const area = shape.getArea()
    shape.render(area)
  })
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)]
renderLargeShapes(shapes)
```

**[⬆ back to top](#table-of-contents)**

### Interface Segregation Principle (ISP)

ISP states that "Clients should not be forced to depend upon interfaces that they do not use.". This principle is very much related to the Single Responsibility Principle. We should try to design abstractions that don't burden the consumer of the abstraction with functionality they don't need.

One classic example of this are overly-complex interfaces or abstract classes, which expect the implementer to include functionality they may not need.

**Bad:**

```ts
interface SmartPrinter {
  print()
  fax()
  scan()
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
    throw new Error('Fax not supported.')
  }

  scan() {
    throw new Error('Scan not supported.')
  }
}
```

**Good:**

```ts
interface Printer {
  print()
}

interface Fax {
  fax()
}

interface Scanner {
  scan()
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

**[⬆ back to top](#table-of-contents)**

### Dependency Inversion Principle (DIP)

This principle states two essential things:

1. High-level modules should not depend on low-level modules. Both should depend on abstractions.

2. Abstractions should not depend upon details. Details should depend on abstractions.

A great example of this is a generic shopping cart API, which can be used to checkout via multiple e-commerce platforms. (Sound familiar?)

Rather than writing multiple checkout APIs with similar workflows, we can write a single set of APIs which operates at a high-level.

The details of each e-commerce platform can be abstracted away into a set of adapters, and the high-level APIs don't need to know the details.

**Bad:**

```ts
import { readFile as readFileCb } from 'fs'
import { promisify } from 'util'

const readFile = promisify(readFileCb)

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
  private readonly formatter = new XmlFormatter()

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8')
    return this.formatter.parse<ReportData>(text)
  }
}

// ...
const reader = new ReportReader()
const report = await reader.read('report.xml')
```

**Good:**

```ts
import { readFile as readFileCb } from 'fs'
import { promisify } from 'util'

const readFile = promisify(readFileCb)

type ReportData = {
  // ..
}

interface Formatter {
  parse<T>(content: string): T
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
  constructor(private readonly formatter: Formatter) {}

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8')
    return this.formatter.parse<ReportData>(text)
  }
}

// ...
const reader = new ReportReader(new XmlFormatter())
const report = await reader.read('report.xml')

// or if we had to read a json report
const reader = new ReportReader(new JsonFormatter())
const report = await reader.read('report.json')
```

**[⬆ back to top](#table-of-contents)**

## Testing

Testing is just as important as shipping. If we don't have appropriate tests in place, we risk breaking something every time we ship.

Test Driven Development (TDD) and code coverage may not be appropriate for every team, but the team needs to have a shared goal: to have adequate testing in place before launching any feature, or refactoring existing functionality.

There's no excuse to not write tests.

**[⬆ back to top](#table-of-contents)**

### F.I.R.S.T. rules

Clean tests should follow the rules:

- **Fast** tests should be fast because we want to run them frequently.

- **Independent** tests should not depend on each other. They should provide same output whether run independently or all together in any order.

- **Repeatable** tests should be repeatable in any environment and there should be no excuse for why they fail.

- **Self-Validating** a test should answer with either _Passed_ or _Failed_. You don't need to compare log files to answer if a test passed.

- **Timely** tests should be written (and pass) before code leaves a feature branch. (Although this is not an excuse to avoid writing tests for existing code!)

**[⬆ back to top](#table-of-contents)**

### The name of the test should reveal its intention

When a test fails, its name is the first indication of what may have gone wrong.

**Bad:**

```ts
describe('Calendar', () => {
  it('2/29/2020', () => {
    // ...
  })

  it('throws', () => {
    // ...
  })
})
```

**Good:**

```ts
describe('Calendar', () => {
  it('should handle leap year', () => {
    // ...
  })

  it('should throw when format is invalid', () => {
    // ...
  })
})
```

**[⬆ back to top](#table-of-contents)**

## Concurrency

### Prefer Async/Await over Promises

With `async`/`await` syntax you can write code that is far cleaner and more understandable than chained promises. Within a function prefixed with `async` keyword, you have a way to tell the JavaScript runtime to pause the execution of code on the `await` keyword (when used on a promise).

Avoid old-style node callbacks (sometimes called "errorbacks"), at all costs.

**Bad:**

```ts
import { get } from 'request'
import { writeFile } from 'fs'
import { promisify } from 'util'

const write = util.promisify(writeFile)

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url).then((response) => write(saveTo, response))
}

downloadPage(
  'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
  'article.html'
)
  .then((content) => console.log(content))
  .catch((error) => console.error(error))
```

**Good:**

```ts
import { get } from 'request'
import { writeFile } from 'fs'
import { promisify } from 'util'

const write = promisify(writeFile)

async function downloadPage(url: string): Promise<string> {
  const response = await get(url)
  return response
}

// somewhere in an async function
try {
  const content = await downloadPage(
    'https://en.wikipedia.org/wiki/Robert_Cecil_Martin'
  )
  await write('article.html', content)
  console.log(content)
} catch (error) {
  console.error(error)
  throw error
}
```

**[⬆ back to top](#table-of-contents)**

## Error Handling

Thrown errors are a good thing! They mean the runtime has successfully identified when something in your program has gone wrong and it's letting you know by stopping function
execution on the current stack, killing the process (in Node), and notifying you in the console with a stack trace.

### Always use Error for throwing or rejecting

JavaScript as well as TypeScript allow you to `throw` any object. A Promise can also be rejected with any reason object.
It is advisable to use the `throw` syntax with an `Error` type. This is because your error might be caught in higher level code with a `catch` syntax.
It would be very confusing to catch a string message there and would make
[debugging more painful](https://basarat.gitbook.io/typescript/type-system/exceptions#always-use-error).
For the same reason you should reject promises with `Error` types.

**Bad:**

```ts
function calculateTotal(items: Item[]): number {
  throw 'Not implemented.'
}
```

**Good:**

```ts
function calculateTotal(items: Item[]): number {
  throw new Error('calculateTotal is not implemented.')
}
```

**[⬆ back to top](#table-of-contents)**

### When logging errors, include detailed error messages and related data

Whenever we catch and log an error, we should try to imagine what information would be useful to us when debugging related problems. However, we also need to be careful not to log PII or secrets.

A few basic guidelines around error logging:

- When an operation fails, try to at least log the IDs of the data entities involved
- When an algorithm or computation fails, try to log the most important inputs
- Modern logging systems can query by JSON properties in logged data, logging objects directly is often preferable over constructing string-based messages

**Bad:**

```ts
try {
  calculateSubTotal({ lineItems, discounts })
} catch (error) {
  console.log(error)
}

// or even worse

try {
  calculateSubTotal({ lineItems, discounts })
} catch (error) {
  // ignore error
}
```

**Good:**

```ts
try {
  calculateSubTotal({ lineItems, discounts })
} catch (error) {
  logger.error('An error was thrown attempting to calculate cart subtotal', {
    error,
    lineItems,
    discounts
  })
  throw error
}
```

**[⬆ back to top](#table-of-contents)**

### Re-throw errors by default

Unless we are certain we can recover from an error, we should usually re-throw the error

**Bad:**

```ts
try {
  calculateTotals({ lineItems, discounts, tax, shipping })
} catch (error) {
  console.log(error)
  // Okay... but now our cart doesn't have any subtotals?! Is it safe to keep going?
}
```

**Good:**

```ts
try {
  calculateTotals({ lineItems, discounts, tax, shipping })
} catch (error) {
  logger.error('An error was thrown attempting to calculate cart totals', {
    lineItems,
    discounts,
    tax,
    shipping
  })
  logger.error(error)
  throw error
}
```

**[⬆ back to top](#table-of-contents)**

## Formatting

Make sure you understand how to use the provided eslint and prettier configurations, both in your editor, and from a terminal.

### Prefer mixed-case names

This goes for variables, functions, classes, etc. Avoid snake_case, "dashed-case" or ALL_CAPS where possible.

Prefer using `PascalCase` for class, interface, type and namespace names.

Prefer using `camelCase` for variables, constants, functions and class members.

**Bad:**

```ts
const DAYS_IN_WEEK = 7
const days_In_Month = 30

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude']
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles']

function eraseDatabase() {}
function restore_database() {}

type animal = {
  /* ... */
}
type Container = {
  /* ... */
}
```

**Good:**

```ts
const daysInMonth = 7
const daysInMonth = 30

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude']
const artists = ['ACDC', 'Led Zeppelin', 'The Beatles']

const discography = getArtistDiscography('ACDC')
const beatlesSongs = songs.filter((song) => isBeatlesSong(song))

function eraseDatabase() {}
function restoreDatabase() {}

type Animal = {
  /* ... */
}
type Container = {
  /* ... */
}
```

**[⬆ back to top](#table-of-contents)**

### Function callers and callees should be close

If a function calls another, keep those functions vertically close in the source file. Ideally, keep the caller right above the callee.

We tend to read code from top-to-bottom, like a newspaper. It is helpful to make our code read that way, too!

If this seems difficult, it is possible that a module or class may be too large.

**Bad:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {}

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers')
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager')
  }

  private getPeerReviews() {
    const peers = this.lookupPeers()
    // ...
  }

  review() {
    this.getPeerReviews()
    this.getManagerReview()
    this.getSelfReview()

    // ...
  }

  private getManagerReview() {
    const manager = this.lookupManager()
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee)
review.review()
```

**Good:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {}

  review() {
    this.getPeerReviews()
    this.getManagerReview()
    this.getSelfReview()

    // ...
  }

  private getPeerReviews() {
    const peers = this.lookupPeers()
    // ...
  }

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers')
  }

  private getManagerReview() {
    const manager = this.lookupManager()
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager')
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee)
review.review()
```

**[⬆ back to top](#table-of-contents)**

### Organize imports

Use the configured eslint plugin to automatically organize imports.

**[⬆ back to top](#table-of-contents)**

## Comments

The use of a comments is an indication of failure to express meaning in code.

> Don’t comment bad code—rewrite it.
> — _Brian W. Kernighan and P. J. Plaugher_

### Prefer self explanatory code instead of comments

Comments are an apology, not a requirement. Good code _mostly_ documents itself.

**Bad:**

```ts
// Check if subscription is active.
if (subscription.endDate > Date.now) {
}
```

**Good:**

```ts
const isSubscriptionActive = subscription.endDate > Date.now
if (isSubscriptionActive) {
  /* ... */
}
```

**[⬆ back to top](#table-of-contents)**

### Don't leave commented code in your codebase

Version control exists for a reason. Leave old code in your history.

**Bad:**

```ts
type User = {
  name: string
  email: string
  // age: number;
  // jobPosition: string;
}
```

**Good:**

```ts
type User = {
  name: string
  email: string
}
```

**[⬆ back to top](#table-of-contents)**

### Don't have journal comments

Remember, use version control! There's no need for dead code, commented code, and especially journal comments. Use `git log` to get history!

**Bad:**

```ts
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Added type-checking (LI)
 * 2015-03-14: Implemented combine (JR)
 */
function combine(a: number, b: number): number {
  return a + b
}
```

**Good:**

```ts
function combine(a: number, b: number): number {
  return a + b
}
```

**[⬆ back to top](#table-of-contents)**

### Avoid positional markers

They usually just add noise. Let the functions and variable names along with the proper indentation and formatting give the visual structure to your code.
Most IDE support code folding feature that allows you to collapse/expand blocks of code (see Visual Studio Code [folding regions](https://code.visualstudio.com/updates/v1_17#_folding-regions)).

**Bad:**

```ts
////////////////////////////////////////////////////////////////////////////////
// Client class
////////////////////////////////////////////////////////////////////////////////
class Client {
  id: number
  name: string
  address: Address
  contact: Contact

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

**Good:**

```ts
class Client {
  id: number
  name: string
  address: Address
  contact: Contact

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

**[⬆ back to top](#table-of-contents)**

### TODO comments

Many code editors have special support for TODO comments. They can be a convenient way to remind ourselves to finish something before we submit our code for review.

However, TODO comments should not be checked into version control, and should be removed before merging feature branches.

If additional work is intended after a feature branch is merged, create a ticket so that the work can be estimated and tracked. It is too easy to forget about tasks that only exist as TODO comments.

**[⬆ back to top](#table-of-contents)**
