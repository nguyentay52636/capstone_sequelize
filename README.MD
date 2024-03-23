<!-- getuser -->

-Đăng ký và đăng nhập :

http://localhost:8080/auth/login
http://localhost:8080/auth/signup

<!-- get saver image by userID -->

http://localhost:8080/auth/get-saved-image-by-user/1

-Trang chủ :

<!-- get list image  -->

http://localhost:8080/images/get-list-image

 <!-- GET tìm kiếm danh sách ảnh theo tên -->

http://localhost:8080/images/search-by-name/taydeptrai

<!-- getuser -->

-Trang chi tiết :

<!-- + GET thông tin ảnh và người tạo ảnh bằng id ảnh -->

http://localhost:8080/images/get-user-by-image/1

http://localhost:8080/images/get-image-details/1

<!-- GET thông tin bình luận theo id ảnh. -->

<!-- get image detail by imageID -->

http://localhost:8080/images/get-image-details/2

<!-- get info user  detail by imageID -->

http://localhost:8080/images/get-user-by-image/1

<!-- + GET thông tin bình luận theo id ảnh. -->

http://localhost:8080/images/get-comment-by-image/1

<!-- + GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save). -->

<!-- + POST để lưu thông tin bình luận của người dùng với hình ảnh -->

http://localhost:8080/images/save-comment

-Trang quản lý ảnh :

http://localhost:8080/auth/get-data-user-details

http://localhost:8080/auth/get-save-image-by-user

http://localhost:8080/auth/get-create-image-by-user

<!-- upload hinh ah user -->

http://localhost:8080/auth/upload-image

<!-- cap nhap thong tin user -->

http://localhost:8080/auth/update-info-user
