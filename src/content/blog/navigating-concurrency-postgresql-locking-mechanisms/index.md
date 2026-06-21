---
title: "Navigating Concurrency: A Dive into PostgreSQL Locking Mechanisms"
description: "Unlocking the Power of Advisory Locks for Seamless Concurrency Management"
pubDate: 2024-03-10
tags: ["postgresql", "database-management", "concurrency-control", "transaction-management", "advisory-lock"]
canonicalUrl: "https://towardsdev.com/navigating-concurrency-a-dive-into-postgresql-locking-mechanisms-31e4ce76c439"
cover: "./cover.jpg"
coverAlt: "A row of brass padlocks clipped to a metal railing, with a blurred city skyline behind."
---

> Originally published in [Towards Dev](https://towardsdev.com/navigating-concurrency-a-dive-into-postgresql-locking-mechanisms-31e4ce76c439).

![A row of brass padlocks clipped to a metal railing, with a blurred city skyline behind.](./cover.jpg)
*Photo by [Mitchell Luo](https://unsplash.com/@mitchel3uo) on [Unsplash](https://unsplash.com/)*

Recently I was tasked with implementing a queuing mechanism that would ensure concurrent executions for the same task would occur sequentially. To solve this problem I decided to maintain the queue in a database, since the tasks took some time to complete and I needed a way to store the status of each task.

The best way to manage concurrency in a database is to use transactions and locking, hence I decided to dive deeper into the different types of locking mechanisms provided by PostgreSQL, since that was the database server being used. Before diving into the solution I used, let’s touch on the other methods I explored and why they didn’t fit.

## Serializable Transactions

Transactions offer a straightforward means to enforce consistency in concurrent operations. There are different levels of consistency that can be enforced in transactions, known as **transaction isolation levels**.

There are **4** transaction isolation levels supported in PostgreSQL which you can read [here](https://www.postgresql.org/docs/current/transaction-iso.html). The one that seemed most suitable for my needs was the **serializable** isolation level. It ensures only one transaction operates on the same data at any time. We can set the transaction level using the `SET TRANSACTION` command as follows:

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

But the serializable isolation level only tries to make two concurrent transactions serial. If any operation results in it being impossible to keep two transactions serial amongst each other, an error is thrown by PostgreSQL saying the following:

```text
ERROR:  could not serialize access due to read/write dependencies among transactions
```

In this situation one transaction commits but the other rolls back. This usually happens when 2 transactions try to read and modify the same set of data.

Now, a retry mechanism could have been used instead, but because the operations include some external interactions which could not be rolled back easily, I decided to investigate explicit locking mechanisms.

## Pessimistic Locking

There are two types of locking strategies: **Optimistic locking** and **Pessimistic locking**. In optimistic locking, we go with the assumption that no one else will modify the records we are working on. Before we perform our modifications, we do a version check on the records. If the records were modified, the transaction is aborted.

Pessimistic locking, as the name implies, does not go by this assumption and hence locks the records before doing any modifications. This ensures our records will never be modified by any other transaction. However this can lead to deadlocks if we are not careful.

In my scenario, pessimistic locking was the logical choice. It comes in two forms: **Pessimistic Read** and **Pessimistic Write**. Pessimistic Read locks rows for being modified, but allows other transactions to read those rows. Pessimistic Write locks rows from being both read and modified by other transactions.

PostgreSQL employs `SELECT ... FOR SHARE` for pessimistic read and `SELECT ... FOR UPDATE` for pessimistic writes. Pessimistic Write effectively addressed most of my concerns, except for a potential edge case where the lock might not be implemented if no rows meet the conditions of the `FOR UPDATE` query. Now you might say that makes sense, and it does, but in my case it wouldn’t work because it would then be possible that two tasks would execute simultaneously if there are no items in the queue, which is an outcome I sought to avoid.

## Table Locks

So based on the issues I faced, I realized I needed a way to block all read / write access if two sets of transactions started simultaneously. So, I considered a more drastic option: locking the entire table for the duration of the transaction. In PostgreSQL this is possible using the command:

```sql
LOCK TABLE <table-name> IN ACCESS EXCLUSIVE MODE;
```

`ACCESS EXCLUSIVE` is the only mode in which `SELECT` statements are blocked. This lock mode is usually used by table level operations, like `TRUNCATE` or `DROP TABLE`. However, this approach would create a significant bottleneck as it blocks all tasks, including the one being worked on. So this option would not work as well.

> *There are way more locking modes provided by PostgreSQL, both on the table and row level which I have not covered since it did not apply to my case. You can read more about them [here](https://www.postgresql.org/docs/current/explicit-locking.html#EXPLICIT-LOCKING).*

## Advisory Locks

This is where advisory locks come to the rescue. Unlike other locking mechanisms, PostgreSQL does not enforce advisory locks, leaving their usage up to the developer’s discretion. Acquiring an advisory lock is straightforward:

```sql
SELECT pg_advisory_lock(key);
```

Where `key` is a 64-bit integer. Once the statement executes, PostgreSQL creates an entry in the `pg_locks` table indicating that this key has been locked. We can then use `pg_advisory_unlock(key)` to unlock the key. You can view the different advisory lock functions [here](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS).

In my case using the function `pg_advisory_xact_lock(key)` creates a transaction-level lock in exclusive mode, automatically releasing the lock upon commit or rollback. If any other transaction calls this function with the same key, they will have to wait until the lock is released. By generating a unique key for each task, I could enable concurrent transactions for different tasks while enforcing serial behavior for transactions related to the same task.

## Conclusion

In conclusion, my journey to resolve this concurrency issue provided valuable insights into the diverse locking mechanisms offered by PostgreSQL. Advisory locks unlocks (pun intended) the possibility of solving a lot of problems similar to the one I faced, and are worth exploring for anyone dealing with concurrency control in databases.

## References

- [Postgres Documentation on Explicit Locking](https://www.postgresql.org/docs/current/explicit-locking.html#EXPLICIT-LOCKING)
- [Postgres Documentation on Transaction Isolation Levels](https://www.postgresql.org/docs/current/transaction-iso.html#TRANSACTION-ISO)
- [Advisory locks in Postgres — Danila Rassokhin](https://medium.com/thefreshwrites/advisory-locks-in-postgres-1f993647d061)
- [A Practical Guide to using Advisory Locks in your Application — Denny Sam](https://medium.com/inspiredbrilliance/a-practical-guide-to-using-advisory-locks-in-your-application-7f0e7908d7e9)
