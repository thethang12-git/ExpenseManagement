## Getting Started
```bash
cd <thư mục project-module4>
npm i
npm run dev
npx json-server --watch db.json --port 3001
```
### Thư viện có sẵn:

- Tailwind
- Formik
- Redux
- JSON server
- MUI
- React OAuth2 | Google
- EmailJS
- Axios
- 

> > ⚠️ : NẾU THÊM THƯ VIỆN NÀO THÌ CẬP NHẬT THÊM VÀO ĐÂY!!

## Git turtorial
```
- nếu đã có nhánh đang làm dở thì phải checkout sang nhánh đó trước : git checkout <tên nhánh>
nếu k có thì: 
git checkout -b <tên nhánh mới>
Làm xong thì : 
git add <tên thư mục>
git pull origin main
git push origin <tên nhánh đang làm/nhánh đang checkout>
``` 
## Lưu ý khi sử dụng: phân chia thư mục trong /src
- /app: Nơi lưu trữ next router để chuyển trang và cấu trúc hiển thị của 1 trang web, gọi lại các component
- /components : Lưu trữ tất cả các component dùng để tái sử dụng, chỉ chứa các logic để hiển thị, k chứa logic để tính toán
- /service : Viết các logic nghiệp vụ: gọi API, xử lý tính toán,.... Nó được gọi ở /app dùng để tính toán/ xử lý dữ liệu, sau đó đưa dữ liệu vào components dưới dạng props để hiển thị
- /store : lưu trữ các state redux cần chia sẻ cho global
- /types : quy định định dạng cho dữ liệu
> viết logic tính toán ở trong **/service**, ví dụ gọi api, tính toán từ API , sau đó ở **/app** gọi lại các hàm này, đồng thời gọi **/components** ở trong app và truyền kết quả tính toán được dưới dạng 1 prop cho component đó, ở các component, sẽ nhận props và hiển thị.
