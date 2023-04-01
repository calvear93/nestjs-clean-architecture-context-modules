<h2 align="center"><b>NestJS</b></h2>
<h3 align="center"><b>Clean Architecture (Modular/Context Slices)</b></h3>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://github.com/calvear93/nestjs-clean-architecture" target="_blank">
	<img src="https://img.shields.io/github/license/calvear93/nestjs-clean-architecture" alt="Package License" />
  </a>
</p>

## ⛩ **Structure**

```bash
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── __tests__/ # e2e tests and utilities
│   ├── libs/ # shared generic libraries
│   ├── modules/ # context slices
│   │   ├── _shared/
│   │   ├── rol/
│   │   └── user/
│   ├── app.module.ts
│   └── main.ts # entrypoint
├── tsconfig.json
└── package.json
```

## 📥 **Getting Started**

-   Install [NodeJS](https://nodejs.org/es/).
-   Install [PNPM](https://pnpm.io/installation)
-   Execute `pnpm install` command.
-   Run `pnpm prisma migrate deploy`.
-   Run either `pnpm start` or `pnpm test` commands.

## 🧪 **Executing**

| Command             | Action                    |
| ------------------- | ------------------------- |
| pnpm start          | executes the api          |
| pnpm test           | executes tests            |
| pnpm prisma `<cmd>` | executes a prisma command |
| pnpm seed           | applies database seed     |

## ⚙️ **Commands**

### **1. [Prisma](https://www.prisma.io/docs/reference/api-reference/command-reference)**

| Command                               | Action                         |
| ------------------------------------- | ------------------------------ |
| pnpm prisma generate                  | generates prisma client        |
| pnpm prisma migrate dev --create-only | creates a new migration        |
| pnpm prisma migrate reset             | clears database                |
| pnpm prisma migrate deploy            | applies migrations to database |

## ⚙️ **Clean Architecture**

### Core/Domain Layer (Enterprise Bussiness Rules)

Bussiness logic, domain entities (value objects), validations, calcs or any
bussiness rules applying to entities.

-   **Value Objects** (domain class/interface): from bussiness core.
    -   i.e. User, Document, Company, Stat.
-   **Aggregates** (domain class/interface/functions): base entities and extensions, relations or associated entities.
    -   i.e. AdminList, TrackableEntity, UserRoles, addUserRol, getAdminUsers.
-   **Core Functions**: isolates bussiness rules for the entities.
    -   i.e. getFullName(user), isValid(document), getAgeAverage(people).
-   **Schemas and Validators (class/object/function)**: data type or constraints, entities and values validators.
    -   i.e. UserSchema, UserIdPipe, userBelongsToCompany(user, company), documentIsValid(document).
-   **Core Events, Errors and Exceptions**:
    -   i.e. CompanyAlreadyExistsException, UserAgeNotAllowed, DocumentNotFound.
-   **Constants** (const/enums/lookups/lists): bussiness values, constraints, limits.
    -   i.e. BussinessDays, MAX_USER_PER_COMPANY.

TypeScript/JavaScript are functional languages, so, we should to
prefer functions for implements any entity bussiness logic,
instead of create classes with methods and logic inside.

### Application/Use Cases Layer (Application Bussiness Rules)

Application flows, implementation of use cases, mappers, transformers, DTOs,
DAO (a.k.a. repositories) contracts, or abstractions of any infrastructure layer service.

-   **Services/Use Cases** (class/function), a.k.a. interactors, domain/infrastructure orchestation for solve one or multiple related use cases.
    -   i.e. UserService, UserRegisterUseCase, StatsManager, DocumentHandler.
-   **Abstractions/Contracts** (abstract class/interface),
    -   i.e. UserRepository, CompanyProvider, DocumentProvider.
-   **Data Transfer Object** (class/interface), input/output object definitions.
    -   i.e. CreateUser, GetCompanyBy, DeletedDocuments, PaginableDataset.
-   **Mappers and Transformers** (function), translate and parse application objects to domain entities.
    -   i.e. createUser(createUserDto), documentToBase64(documentBlob), etc.
-   **Application Events, Errors and Exceptions**:
    -   i.e. RepositoryConnectionError, UserAlreadyIsAdminException, ReportGeneratedSuccessfully.

Uses core entities and logic, and infrastructure abstractions/contracts.

### Infrastructure/Adapters Layer (Enterprise Bussiness Rules)

Bridge with frameworks, persistence, external services,
HTTP controllers, queue or event messages, etc.
Implementations for input, output, data communication
and processing by specific technologies.

-   **Entrypoint** (class/function): application adapters and infrastructure initializer.
    -   i.e. appBootstrap(), app.listen(PORT, ...), NestFactory.create(...).
-   **Gateways** (class/function): controllers, event handlers/listeners/consumers, crons, job processors, websocket handler.
    -   i.e. UserController, AdminUpdateSubscriber, DeleteNoValidCompaniesJob, CertificateRotateCronJob.
-   **Publishers/Emitters** (class/function): event publishers, queue messages, topic emitters, websockets.
    -   i.e. UserActionLogsProducer, DailyJobEnqueue, sendAdminCreateMessage(...), adminDeletedNotify(...).
-   **Authentication/Authorization** (class/function/middlewares): infrastructure security, gateways protection.
    -   i.e. ApiKeyAuth(...), BearerJwtAuth(...), auth.IsAdmin(user), sessionMiddleware(...).
-   **Providers/Repositories** (class/function): persistence adapters, external system API service, infrastructure communication as file storage, system OS.
    -   i.e. MsSqlProvider, UserAzStorageRepository, ApiManagementService.
-   **Mappers and Transformers** (function), translate and parse infrastructure objects, exceptions or events to application ones.
    -   i.e. mapUserUpsertRoles(roles), decryptPassword(password), etc.
-   **Events, Errors and Exceptions**: generally are included with frameworks/libraries
    -   i.e. PrismaClientRustPanicError, RedisConnectionAborted, FatalProcessOutOfMemory.
-   **Configuration/Constants** (const/enums/lookups/lists): infrastructure config.
    -   i.e. SwaggerDocumentConf, RedisConnection, AzCredentials.

Classes or any logic used in Application layer must
implement abstractions/contracts from it.
