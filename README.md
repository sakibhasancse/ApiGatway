﻿# Api gateway with nginx
![image](https://github.com/user-attachments/assets/e137f947-229a-4b18-89f4-c1259372aff8)

## Overview

This API gateway uses Nginex to handle authentication and route requests to backend services. When a user makes a request, the gateway authenticates the user and, upon successful authentication, forwards the request to the appropriate service. This setup centralizes authentication and simplifies service management.

### 1️⃣ Try on your device.

### 2️⃣ Run the Services

```sh
cd docker
docker-compose up --build -d
```

## 🚀 Try the API
### 🔹 Register a User
```sh
curl --location 'http://localhost:8080/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "sakib",
    "password": "122"
}'
```

### 🔹 Login to Get Token
```sh
curl --location 'http://localhost:8080/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "sakib",
    "password": "122"
}'
```
- **Response:** `{ "token": "your-jwt-token" }`

### 🔹 Access an Authenticated Route
```sh
curl --location --request GET 'http://localhost:8080/product/products' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json'
```

## 🛑 Stop Services
```sh
docker-compose down
```
Kong Implementation: https://github.com/sakibhasancse/ApiGatway/tree/kong-implementation
