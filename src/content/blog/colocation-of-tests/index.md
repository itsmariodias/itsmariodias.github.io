---
title: "Colocation of Tests: A Cross-Language Perspective"
description: "How Different Languages Handle Test Organization and What We Can Learn"
pubDate: 2025-06-07
tags: ["software-testing", "test-driven-development", "developer-experience", "project-structure", "python-testing"]
canonicalUrl: "https://itsmariodias.medium.com/colocation-of-tests-a-cross-language-perspective-982e75c872d8"
cover: "./cover.jpg"
coverAlt: "Two people at a desk reviewing handwritten diagrams on paper beside open laptops."
---

> Originally published on [Medium](https://itsmariodias.medium.com/colocation-of-tests-a-cross-language-perspective-982e75c872d8).

![Two people at a desk reviewing handwritten diagrams on paper beside open laptops.](./cover.jpg)
*Photo by [Scott Graham](https://unsplash.com/@amstram) on [Unsplash](https://unsplash.com/)*

While building a new personal project using Python, I found myself rethinking the structure of my project. As a professional Java developer, my instinct was to follow the conventional pattern: store tests in a `tests/` folder, mirroring the package hierarchy of the main application. This approach makes it easy to locate test files relative to their source files. However, I became curious about Python’s stance on this. Does it follow the same convention? Or is there room for alternative layouts?

### Discovering Pytest’s Approach

While researching, I came across this interesting section in the [pytest documentation](https://docs.pytest.org/en/stable/explanation/goodpractices.html#choosing-a-test-layout):

> *`pytest` supports two common test layouts:*  
> ***Tests outside application code** and **Tests as part of your application code**.*

I was surprised by the second option. In Java, colocating tests with application code is virtually unheard of. But this discovery made me reconsider: why do we separate tests at all? Given the emphasis on TDD and integrated testing, shouldn’t tests sit alongside the code they validate?

This wasn’t a foreign concept either, I’d seen colocated tests in React projects within my organization. So I began a deeper exploration of how various languages and frameworks handle test organization, with a key focus on modern technologies.

## Rust: Embracing Inline Unit Tests

In Rust, the [official book](https://doc.rust-lang.org/book/ch11-03-test-organization.html) defines two types of tests:

- **Unit tests** which should reside in the same file as the code they test.
- **Integration tests** which should live in a top-level `tests/` directory.

Rust supports this because `cargo`, its build system, can easily distinguish test code from production code during the build process:

> *“Unit tests go in the same file as the code, inside a `#[cfg(test)]` module. Integration tests live in the `tests/` directory.”*

This layout works seamlessly in Rust because the compiler explicitly filters test code when building the final binary. So perhaps the technicalities of colocation depends on whether your compiler can easily separate the tests from the code or not.

## Java (Maven & Gradle): Separate by Design

In the Java ecosystem, both Maven and Gradle follow a [fixed directory layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html):

```text
src/
  main/
    java/
  test/
    java/
```

The separation of test and application code in Java stems from its stringent classpath and dependency management requirements. This is what many Java / Kotlin developers will be familiar with, hence why this practice of separating tests is so prevalent even today.

It made sense historically, especially for large enterprise applications with layered build processes. Java’s static compilation and JAR packaging pipeline benefits from the clear segregation of test and production code.

## React & Jest: Flexible and Pragmatic

The [React GitHub repo](https://github.com/facebook/react/tree/main) shows that tests are colocated under `__tests__` directories next to their corresponding `src` packages.

Jest, the default test runner for React, is similarly flexible. [Jest examples](https://github.com/jestjs/jest/tree/main/examples) show colocated `__tests__` directories, but the layout is not strictly enforced:

> *“Jest doesn’t care where your tests are. As long as they end in `.test.js` or `.spec.js`, they’ll be picked up.”*

A good reflection on this approach comes from [Connor Elsea’s blog post](https://connorelsea.medium.com/the-case-for-colocating-tests-in-react-cef6ea7b4a1a):

> *“Colocation lowers the friction to write and maintain tests. It makes it clear what is tested and what is not.”*

This philosophy promotes accessibility and visibility — important values in JavaScript-heavy codebases.

## Golang: Colocation as Convention

In Go, testing is built into the language with the `testing` [package](https://pkg.go.dev/testing). The convention is to place tests in files ending with `_test.go` within the same package and directory:

> *“You can use a separate package (e.g., `mypkg_test`) in the same directory for black-box testing, ensuring tests don’t have access to internal state.”*

This approach, explained well in [this post](https://jdkaplan.dev/blog/thinkin-logs-2021-10-07/), offers the benefits of colocation while supporting encapsulation, which can be a considered a best of both worlds.

There is less clarity on integration test structure, but the community often favors the same layout, as discussed in [this Reddit post](https://www.reddit.com/r/golang/comments/ofnhyp/where_do_you_keep_integration_tests/).

## Python: Choose Your Own Adventure

In Python, both `unittest` and `pytest` offer great flexibility.

With `unittest`, [test discovery](https://docs.python.org/3/library/unittest.html#test-discovery) is based on naming conventions and package imports:

> *“By default, it will discover tests in any file named `test*.py`, recursively, from the top-level directory.”*

The documentation [recommends](https://docs.python.org/3/library/unittest.html#organizing-test-code) keeping tests in separate modules or directories, but this is not enforced.

`pytest` takes this further by explicitly supporting both separate and colocated test layouts in its [good practices guide](https://docs.pytest.org/en/stable/explanation/goodpractices.html#choosing-a-test-layout):

> *“Colocated tests may be better for small projects and cases where test and code development are tightly coupled.”*

This puts Python in the same camp as JavaScript/React: no technical restriction, just preference.

## Arguments in Favor of Colocation

Here are some strong arguments in favor of test colocation, as outlined in [Kent C. Dodds’ blog post](https://kentcdodds.com/blog/colocation) and [Yockyard](https://www.yockyard.com/post/co-locate-unit-tests/):

- **Proximity**: Easy to see what’s tested and what isn’t.
- **Better discoverability**: Tests live with the code they cover.
- **Encourages TDD**: Reduces friction for writing tests.
- **Simplified project layout**: Especially helpful for smaller codebases.
- **Improved maintainability**: Tests get updated alongside the code they test.

> *“Colocation makes it much easier to see which files are lacking tests and makes refactoring a more confident process.”* — Kent C. Dodds

## Concerns About Colocation

Despite its appeal, colocation has potential downsides:

- **Clutter**: Large or verbose test suites can make it hard to focus on code.
- **Scaling**: Not ideal for large projects with many test types (unit, integration, performance).
- **Build concerns**: Some build systems may inadvertently include tests in production builds.
- **Loss of separation**: Conceptual boundaries between testing and implementation may blur.

These concerns are valid, particularly in enterprise environments or language ecosystems with complex build pipelines (e.g., Java, C++).

## Conclusion: Know Your Tools, Know Your Context

Ultimately, the “right” approach depends on your ecosystem and team preferences. Colocation is gaining popularity in modern languages and frameworks, thanks to its developer-friendly ergonomics and alignment with TDD principles.

For my personal Python project, I’ve decided to colocate tests. I want to experience firsthand how this impacts my workflow, maintenance, and mental model of the codebase.

What about you? Do you colocate your tests? Or do you prefer the traditional separation? I’d love to hear your thoughts and how your language/framework of choice influences this decision.
