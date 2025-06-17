# api gateway with nginx
![image](https://github.com/user-attachments/assets/e137f947-229a-4b18-89f4-c1259372aff8)

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
