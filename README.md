# Sensors  Test


# Requirements
- node >= 10.16.3
- docker > = 19.03.05


# Installation
1) Install Packages
```
npm install
```
2) Copy .env.example into .env
3) Run postgres database
```
docker-compose up -d
```
4) Migrate database
```
npm run db:migrate
```

# Development run
```
npm run start:dev
```

# Production run
```
npm run build
```

```
npm run start
```

# Run integration tests

```
npm run test:integration
```
