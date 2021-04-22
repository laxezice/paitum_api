# paitum_api
## วิธีรัน

### เพิ่มไฟล์ ```scret.json``` โดยข้างในมี
```
  {
    "user": database_username,
    "password": database_password,
    "host": database_host,
    "port": database_port,
    "database": database_name
  }
```
รัน 
```npm start```

### หรือถ้าไม่มี db เพิ่มไฟล์ ```scret.json``` โดยข้างในมี
```
  {
      "user": "postgres",
      "password": "1234",
      "host": "db",
      "port": "5432",
      "database": "paitum"
  }
```
รัน
```docker compose up```
