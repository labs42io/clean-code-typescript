# clean-code-typescript

Clean Code concepts adapted for TypeScript.  
Inspired from [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)

## Table of Contents

  1. [Introduction](#introduction)
  2. [Variables](#variables)
  3. [Functions](#functions) *TODO*
  4. [Objects and Data Structures](#objects-and-data-structures)
  5. [Classes](#classes) *TODO*
  6. [SOLID](#solid) *TODO*
  7. [Testing](#testing) *TODO*
  8. [Concurrency](#concurrency) *TODO*
  9. [Error Handling](#error-handling) *TODO*
  10. [Formatting](#formatting) *TODO*
  11. [Comments](#comments)

## Introduction

![Humorous image of software quality estimation as a count of how many expletives
you shout when reading code](http://www.osnews.com/images/comics/wtfm.jpg)

Software engineering principles, from Robert C. Martin's book
[*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882),
adapted for TypeScript. This is not a style guide. It's a guide to producing
[readable, reusable, and refactorable](https://github.com/ryanmcdermott/3rs-of-software-architecture) software in TypeScript.

Not every principle herein has to be strictly followed, and even fewer will be
universally agreed upon. These are guidelines and nothing more, but they are
ones codified over many years of collective experience by the authors of
*Clean Code*.

Our craft of software engineering is just a bit over 50 years old, and we are
still learning a lot. When software architecture is as old as architecture
itself, maybe then we will have harder rules to follow. For now, let these
guidelines serve as a touchstone by which to assess the quality of the
JavaScript code that you and your team produce.

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
function between<T>(a1: T, a2: T, a3: T) {
  return a2 <= a1 && a1 <= a3;
}

```

**Good:**

```ts
function between<T>(value: T, left: T, right: T) {
  return left <= value && value <= right;
}
```

**[⬆ back to top](#table-of-contents)**

### Use pronounceable variable names

If you can’t pronounce it, you can’t discuss it without sounding like an idiot.

**Bad:**

```ts
class DtaRcrd102 {
  private genymdhms: Date;
  private modymdhms: Date;
  private pszqint = '102';
}
```

**Good:**

```ts
class Customer {
  private generationTimestamp: Date;
  private modificationTimestamp: Date;
  private recordId = '102';
}
```

### Use the same vocabulary for the same type of variable

**Bad:**

```ts
function getUserInfo(): User;
function getUserDetails(): User;
function getUserData(): User;
```

**Good:**

```ts
function getUser(): User;
```

**[⬆ back to top](#table-of-contents)**

### Use searchable names

We will read more code than we will ever write. It's important that the code we do write is readable and searchable. By not naming variables that end up being meaningful for understanding our program, we hurt our readers. Make your names searchable. Tools like [TSLint](https://palantir.github.io/tslint/rules/no-magic-numbers/) can help identify unnamed constants.

**Bad:**

```ts
// What the heck is 86400000 for?
setTimeout(restart, 86400000);
```

**Good:**

```ts
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

setTimeout(restart, MILLISECONDS_IN_A_DAY);
```

**[⬆ back to top](#table-of-contents)**

### Use explanatory variables

**Bad:**

```ts
declare const users:Map<string, User>;

for (const keyValue of users) {
  // iterate through users map
}
```

**Good:**

```ts
declare const users:Map<string, User>;

for (const [id, user] of users) {
  // iterate through users map
}
```

**[⬆ back to top](#table-of-contents)**

### Avoid Mental Mapping

Explicit is better than implicit.  
*Clarity is king.*

**Bad:**

```ts
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

**Good:**

```ts
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**[⬆ back to top](#table-of-contents)**

### Don't add unneeded context

If your class/object name tells you something, don't repeat that in your variable name.

**Bad:**

```ts
class Car {
  carMake: string;
  carModel: string;
  carColor: string;

  name(): string{
    return `${this.carMake} ${this.carModel} (${this.carColor})`;
  }
}
```

**Good:**

```ts
class Car {
  make: string;
  model: string;
  color: string;

  name(): string{
    return `${this.make} ${this.model} (${this.color})`;
  }
}
```

**[⬆ back to top](#table-of-contents)**

### Use default arguments instead of short circuiting or conditionals

Default arguments are often cleaner than short circuiting.

**Bad:**

```ts
function loadPages(count: number) {
  const loadCount = count || 10;
}
```

**Good:**

```ts
function loadPages(count: number = 10) {
}
```

**[⬆ back to top](#table-of-contents)**

## Objects and Data Structures

### Use getters and setters

TypeScript supports getter/setter syntax.
Using getters and setters to access data from objects that encapsulate behavior could be better that simply looking for a property on an object.
"Why?" you might ask. Well, here's a list of reasons:

* When you want to do more beyond getting an object property, you don't have to look up and change every accessor in your codebase.
* Makes adding validation simple when doing a set.
* Encapsulates the internal representation.
* Easy to add logging and error handling when getting and setting.
* You can lazy load your object's properties, let's say getting it from a server.

**Bad:**

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

**Good:**

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

**[⬆ back to top](#table-of-contents)**

### Make objects have private/protected members

TypeScript supports `public` *(default)*, `protected` and `private` accessors on class members.  

**Bad:**

```ts
class Circle {
  radius: number;
  
  constructor(radius: number) {
    this.radius = radius;
  }

  perimeter(){
    return 2 * Math.PI * this.radius;
  }

  surface(){
    return Math.PI * this.radius * this.radius;
  }
}
```

**Good:**

```ts
class Circle {
  constructor(private readonly radius: number) {
  }

  perimeter(){
    return 2 * Math.PI * this.radius;
  }

  surface(){
    return Math.PI * this.radius * this.radius;
  }
}
```

**[⬆ back to top](#table-of-contents)**

### Prefer readonly properties

TypeScript's type system allows you to mark individual properties on an interface / class as readonly. This allows you to work in a functional way (unexpected mutation is bad).  
For more advanced scenarios there is a built-in type `Readonly` that takes a type `T` and marks all of its properties as readonly using mapped types (see [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)).

**Bad:**

```ts
interface Config {
  host: string;
  port: string;
  db: string;
}
```

**Good:**

```ts
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

## Comments

The use of a comments is an indication of failure to express without them. Code should be the only source of truth.
  
> Don’t comment bad code—rewrite it.  
> — *Brian W. Kernighan and P. J. Plaugher*

### Prefer self explanatory code instead of comments

Comments are an apology, not a requirement. Good code mostly documents itself.

**Bad:**

```ts
// Check if subscription is active.
if (subscription.endDate > Date.now) {  }
```

**Good:**

```ts
const isSubscriptionActive = subscription.endDate > Date.now;
if (isSubscriptionActive) { /* ... */ }
```

**[⬆ back to top](#table-of-contents)**

### Don't leave commented out code in your codebase

Version control exists for a reason. Leave old code in your history.

**Bad:**

```ts
class User {
  name: string;
  email: string;
  // age: number;
  // jobPosition: string;
}
```

**Good:**

```ts
class User {
  name: string;
  email: string;
}
```

### Don't have journal comments

Remember, use version control! There's no need for dead code, commented code, and especially journal comments. Use git log to get history!

**Bad:**

```ts
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Added type-checking (LI)
 * 2015-03-14: Implemented combine (JR)
 */
function combine(a:number, b:number): number {
  return a + b;
}
```

**Good:**

```ts
function combine(a:number, b:number): number {
  return a + b;
}
```

**[⬆ back to top](#table-of-contents)**

### Avoid positional markers

They usually just add noise. Let the functions and variable names along with the proper indentation and formatting give the visual structure to your code.  
Optionally you can use IDE support for code folding (see Visual Studio Code [folding regions](https://code.visualstudio.com/updates/v1_17#_folding-regions)).

**Bad:**

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

**Good:**

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

**[⬆ back to top](#table-of-contents)**
