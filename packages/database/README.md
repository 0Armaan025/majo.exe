# Majo.exe Database

## 📝 Description

- `/prisma/schema.prisma` contains database schema. It's used by [Prisma](https://www.prisma.io/) to generate database client.
- `/prisma/migrations` contains database migrations. They are used to update database.
- `/src/client.js` contains database client. It's used by Majo.exe to interact with database. It also includes edge client for Prisma Data Proxy.

## 🗜️ Setup [preferred, Neon]

1. Create new [Neon](https://neon.tech/) account and create new database.
2. Create new file or edit existing `.env` file in root directory of the project
3. In `.env` file set this values:
   - `DATABASE_URL` - pooling database connection string
   - `DIRECT_URL` - non-pooling database connection string
   - `SHADOW_DATABASE_URL` - create new database and paste non-pooling database connection string
- Note: Neon doesn't support creating databases, you have to create it manually. Prisma require shadow database to generate migrations.
4. Run `pnpm install` to install dependencies.
5. Run `pnpm prisma:migrate` to generate & apply initial migration.
6. Run `pnpm prisma:generate` to generate database client.

## 🐳 Setup [alternative, Docker]

1. Install Docker by following the instructions at https://docs.docker.com/get-docker/.
2. Pull the PostgreSQL Docker image for version 15 (`docker pull postgres:15`) or use existing one.
3. Create a new container using the PostgreSQL image (`docker run --name majoexe -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15`)
4. Run `pnpm install` to install dependencies.
5. Create new file or edit existing `.env` file in root directory of the project
6. In `.env` file set this values:
   - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/majoexe`
   - `DIRECT_URL=postgresql://postgres:postgres@localhost:5432/majoexe`
   - `SHADOW_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/majoexe`
7. Run `pnpm prisma:migrate` to generate & apply initial migration.
8. Run `pnpm prisma:generate` to generate database client.

---

> **Note**:
> Majo.exe can also work with other databases like MongoDB and MySQL. You can find more information about it in [Prisma documentation](https://www.prisma.io/docs/concepts/database-connectors). If you want to use other database you have to change `DATABASE_URL` in `.env` file and change schema in `/prisma/schema.prisma` file.

##### Example `.env` file

Remember - the file is super secret, better to not share it!

```
DATABASE_URL=DATABASE_URL
DIRECT_URL=DIRECT_DATABASE_URL
SHADOW_DATABASE_URL=SHADOW_DATABASE_URL
```

> **Warning**:
> This file should be in **root directory** of the project.

---

## 📝 Contributors

- [@r-kjha](https://github.com/r-kjha) (Emoji config support, Bug fixes, New features, Testing)
- [@Joao-Victor-Liporini](https://github.com/Joao-Victor-Liporini) (Bug fixes, Command handler improvements, Testing, New features)
- [@krzesl0](https://github.com/krzesl0) (New Features, Bug fixes, Testing)
- [@\_index1337](https://github.com/index1337) (Readme tutorials)
- [@Wafelowski](https://github.com/HeavyWolfPL) (Translation improvements)
- [@Sakshyam6966](https://github.com/Sakshyam6966) (New Features, Bug fixes, Testing)

## 💝 Sponsors

**These wonderful people and services have helped develop Majo.exe, without them this project would not exist. Thanks goes to these wonderful people!**

| Sponsor                                            | Description                                                                                                                                                         |
| -------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Terohost](https://my.terohost.com/aff.php?aff=17) | **TeroHost is a Discord Bot hosting** provider that helps take care of all your needs regarding your Discord Bot to ensure your bot perfect uptime, ping and speed. |

## ⁉️ Issues

If you have any issues with the bot please create [new issue here](https://github.com/igorkowalczyk/majo.exe/issues).
When creating new issue please provide as much information as possible. If you can, please provide logs from console.

## 📥 Pull Requests

When submitting a pull request:

- Clone the repo.
- Create a branch off of `master` and give it a meaningful name (e.g. `my-awesome-new-feature`).
- Open a [pull request](https://github.com/igorkowalczyk/majo.exe/pulls) on [GitHub](https://github.com) and describe the feature or fix.

We will review your pull request as soon as possible. We might suggest some changes or improvements.

## 📋 License

This project is licensed under the MIT. See the [LICENSE](https://github.com/igorkowalczyk/majo.exe/blob/master/license.md) file for details
