

# วิธีการติดตั้งอย่างละเอียด 

### 1. ติดตั้ง Dependencies สำหรับ Backend

```bash
# เข้าไปในโฟลเดอร์ backend
cd backend

# ติดตั้ง packages ทั้งหมด
npm install
```

**สิ่งที่ npm install จะติดตั้งให้:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `nanoid` - สร้าง short code
- `qrcode` - สร้าง QR Code
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - จัดการ environment variables

### 2. สร้างไฟล์ .env

```bash
# สร้างไฟล์ .env ในโฟลเดอร์ backend
echo. > .env
```

**เนื้อหาในไฟล์ .env:**
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shorturl?retryWrites=true&w=majority
PORT=3000
```

### 3. ตั้งค่า MongoDB Atlas

**สิ่งที่ต้องทำ:**
1. สร้าง account ที่ [MongoDB Atlas](https://www.mongodb.com/atlas)
2. สร้าง cluster ใหม่
3. ตั้งค่า database user
4. ตั้งค่า network access
5. รับ connection string

### 4. ทดสอบการติดตั้ง

```bash
# เริ่มเซิร์ฟเวอร์
npm start
```

**ผลลัพธ์ที่ควรเห็น:**
```
✅ Connected to MongoDB Atlas
✅ Server running on port 3000
```

## 🔍ตรวจสอบการติดตั้ง

### ตรวจสอบว่า npm install สำเร็จ
```bash
# ดูไฟล์ในโฟลเดอร์ backend
dir

# ควรเห็น:
# - node_modules/ (โฟลเดอร์ใหม่)
# - package.json
# - package-lock.json
# - server.js
# - .env
```

### ตรวจสอบ packages ที่ติดตั้ง
```bash
# ดูรายการ packages
npm list
```

##  ปัญหาที่อาจเกิดขึ้น

### ปัญหา: npm install ไม่สำเร็จ
```bash
# ลบ node_modules และติดตั้งใหม่
rmdir /s node_modules
del package-lock.json
npm install
```

### ปัญหา: ไม่มีไฟล์ .env
```bash
# สร้างไฟล์ .env
echo. > .env
# แล้วแก้ไขด้วย Notepad หรือ VS Code
```

### ปัญหา: MongoDB connection error
- ตรวจสอบ connection string ใน .env
- ตรวจสอบ username/password
- ตรวจสอบ network access ใน MongoDB Atlas


##  คำสั่งที่ต้องรันทั้งหมด

```bash
# 1. เข้าไปในโฟลเดอร์ backend
cd backend

# 2. ติดตั้ง dependencies
npm install

# 3. สร้างไฟล์ .env
echo. > .env

# 4. เริ่มเซิร์ฟเวอร์
npm start
```

หลังจากนี้คุณจะต้องแก้ไขไฟล์ `.env` เพื่อใส่ MongoDB connection string และตั้งค่า MongoDB Atlas ตามที่อธิบายไว้ในขั้นตอนก่อนหน้านี้ครับ
