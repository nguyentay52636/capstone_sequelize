# Swagger Documentation

## Cấu trúc thư mục

```
swagger/
├── README.md           # File hướng dẫn này
├── swagger.js          # Cấu hình chính của Swagger
├── property.swagger.js # Documentation cho Property API
└── index.js           # File trống (có thể xóa)
```

## Cách tổ chức

### 1. Tách Swagger Documentation
- Tất cả các comment `@swagger` được tách ra khỏi file routes
- Mỗi module API sẽ có file `.swagger.js` riêng
- Ví dụ: `property.swagger.js` cho Property API

### 2. Cấu hình Swagger
File `swagger.js` chứa cấu hình chính:
```javascript
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property API',
      version: '1.0.0',
      description: 'Swagger tài liệu API cho hệ thống quản lý bất động sản',
    },
    servers: [
      {
        url: 'http://localhost:8000', 
      },
    ],
  },
  apis: ['./swagger/*.swagger.js'], // Đọc từ các file swagger riêng
};
```

### 3. Thêm API mới
Khi thêm API mới, tạo file `.swagger.js` tương ứng:

1. Tạo file `[module-name].swagger.js` trong thư mục `swagger/`
2. Định nghĩa schema và endpoints trong file đó
3. Swagger sẽ tự động đọc tất cả file `.swagger.js`

### 4. Truy cập Swagger
- **Swagger UI**: http://localhost:8000/v1/swagger/
- **Swagger JSON**: http://localhost:8000/v1/swagger.json

## Lợi ích

1. **Tách biệt**: Documentation tách khỏi logic routing
2. **Dễ quản lý**: Mỗi module có file documentation riêng
3. **Dễ bảo trì**: Không cần sửa file routes khi cập nhật documentation
4. **Tổ chức tốt**: Cấu trúc rõ ràng, dễ tìm kiếm

## Ví dụ tạo file mới

Để thêm documentation cho User API, tạo file `user.swagger.js`:

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Đăng nhập user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
``` 
