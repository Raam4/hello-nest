# My Notes (Nestjs First App)

This is my first Nestjs project.
It includes SequelizeORM and uses PostgreSQL.

## Usage

### Install dependencies

```
npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Routes
```
GET    | /notes
GET    | /notes/:id
POST   | /notes
PUT    | /notes/:id
DELETE | /notes/:id
```

### To build for production

```
npm run build
```