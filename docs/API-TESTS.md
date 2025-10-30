# API Tests - Backend Validation

## All tests passed successfully!

### Health Check
```bash
curl http://localhost:3333/
```
**Result:**  API is running

### Authentication
```bash

curl -X POST http://localhost:3333/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"senha123"}'

curl -X POST http://localhost:3333/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"senha123"}'
```
**Result:** User registered and logged in successfully

### User Profile
```bash

curl http://localhost:3333/me \
  -H "Authorization: Bearer YOUR_TOKEN"

curl -X PATCH http://localhost:3333/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Updated Name"}'
```
**Result:** Profile retrieved and updated successfully

### Chat System
```bash

curl -X POST http://localhost:3333/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content":"Hello!"}'

curl http://localhost:3333/messages \
  -H "Authorization: Bearer YOUR_TOKEN"

curl http://localhost:3333/chats \
  -H "Authorization: Bearer YOUR_TOKEN"
```
**Result:**  AI responded, messages retrieved, multiple chats supported

## Backend is OK!
