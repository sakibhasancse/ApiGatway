# Api gateway with kong
![image](https://github.com/user-attachments/assets/5dde38f3-eee1-45ec-aca3-4fb054f45f5e)

### 1️⃣ Try on your device.

### 2️⃣ Run the Services

```sh
cd docker
docker-compose up --build -d
```


```sh
cd kong
docker-compose up --build -d
```

## 🚀 Try the API
### 🔹 Register a User
```sh
curl --location 'http://localhost:8000/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "sakib",
    "password": "122"
}'
```

### 🔹 Login to Get Token
```sh
curl --location 'http://localhost:8000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "sakib",
    "password": "122"
}'
```
- **Response:** `{ "token": "your-jwt-token" }`

### 🔹 Access an Authenticated Route
```sh
curl --location --request GET 'http://localhost:8000/product/products' \
--header 'Authorization: Bearer your-token' \
--header 'Content-Type: application/json'
```

## 🛑 Stop Services
```sh
docker-compose down
```
