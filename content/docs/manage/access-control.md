---
title: Access control
enableTableOfContents: true
isDraft: true
---

Neon supports access control at a project level and database level, providing you with flexibility in managing access to your databases.

## Project access control

Neon Pro plan users can grant project-level access by sharing a project with other Neon accounts. Users granted access to a project have full access everything within the project, including the databases it contains. The only restriction is that users cannot delete a shared project. Otherwise, these users have the same level of access to the project as you, the project owner. For example, these users can create and delete branches, databases, roles, computes, and so on. You can think of it as adding a "Neon project administrator".

These users can also access the credentials of any role created in a Neon project, which means they can connect as any role define in a project.

Neon's project sharing capability allows organizations to set up databases in separate Neon projects and grant access to those databases at a Neon project level. Neon Pro accounts can create up to 20 projects by default. If you require more projects, you can reach out to [support@neon.tech].

### How to grant project access

To grant access to a Neon project, follow the steps in our [Project sharing](/docs/guides/project-sharing-guide) guide. The process involves having users sign up for a Neon account and granting access to the email address associated with their Neon account.

## Database access control

In Neon, databases and roles reside on a branch within your project. The basic structure of a Neon project looks like this:

```text
Neon account
    |
    |- project 
    |      |
    |      |---- root branch
    |                 |
    |                 |---- roles
    |                 |---- databases          
```

Database access within a Neon project is managed through a combination of roles and privileges.

A newly created Neon project includes the following:

- A root branch named `main`
- A Postgres role named for your user account.
- A ready-to-use database named `neondb`, owned by the Postgres role

You can grant access to a database by adding roles and assigning privileges to those roles.

The role initially created with your Neon project and any role you add to a branch via the Neon Console, CLI, or API is granted membership in the `neon_superuser` role. The privileges and predefined role memberships granted to `neon_superuser` include:

- `CREATEDB`: Provides the ability to create databases.
- `CREATEROLE`: Provides the ability to create new roles (which also means it can alter and drop roles) and install [Postgres extensions supported by Neon](/docs/extensions/pg-extensions).
- `BYPASSRLS`: Provides the ability to bypass row-level security (RLS) policies. This attribute is only included in `neon_superuser` roles in projects created after the [August 15, 2023 release](/docs/release-notes/2023-08-15-storage-and-compute).
- `NOLOGIN`: The role cannot be used to log in to the Postgres server. Neon is a managed Postgres service, so you cannot access the host operating system.
- `pg_read_all_data`: A predefined role in Postgres that provides the ability to select from all tables and views.
- `pg_write_all_data`: A predefined role in Postgres that provides the ability to insert, update, and delete in all tables and use all sequences.

### Creating a role with limited privileges

To create roles with limited privileges, you can do so by creating Postgres roles via SQL. Roles created with SQL have the same privileges as newly created roles in a stand-alone Postgres installation. These roles are not granted membership in the [neon_superuser](/docs/manage/roles/#the-neon_superuser-role) role like roles created with the Neon Console, CLI, or API. You must grant these roles the privileges you want them to have.

To create a role with SQL, issue a `CREATE ROLE` statement from a client such as [psql](/docs/connect/query-with-psql-editor) or from the [Neon SQL Editor](/docs/get-started-with-neon/query-with-neon-sql-editor).

```sql
CREATE ROLE <name> WITH LOGIN PASSWORD 'password';
```

For a guide that shows how to create roles and manage database access via SQL, see [Manage roles and database access with SQL](/docs/guides/manage-database-access). The guide walks you through creating a database and setting up roles with privileges for the database.

### Database access control with read replicas

Neon supports read replicas, which allow you to limit database access to read only instead of read/write. A read replica in Neon is implemented as a read-only compute instance. When users connect to your database via read replica connection string, they are only able to perform read operations. Write operations are rejected.

You can add a read replica to a Neon project in a few easy steps, which more convenient than creating read only roles. Here's how to do it:



