# clean-code-typescript

Clean Code concepts adapted for TypeScript.  
Inspired from [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)

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