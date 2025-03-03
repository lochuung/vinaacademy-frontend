////////////////////////////////////////////////////////////////////////////////
// 🛑 Những nội dung ở đây không liên quan đến NextJS, đây chỉ là một cơ sở dữ liệu giả
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // Dùng để lọc dữ liệu theo từ khóa

// Hàm delay để tạo độ trễ mô phỏng xử lý bất đồng bộ
export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

// Định nghĩa kiểu dữ liệu cho Product (được gọi là Course ở đây)
export type Course = {
    photo_url: string;   // URL hình ảnh của sản phẩm/khóa học
    name: string;        // Tên sản phẩm/khóa học
    description: string; // Mô tả của sản phẩm/khóa học
    created_at: string;  // Ngày tạo (dạng chuỗi ISO)
    price: number;       // Giá của sản phẩm/khóa học
    id: number;          // ID duy nhất của sản phẩm/khóa học
    category: string;    // Danh mục của sản phẩm/khóa học
    updated_at: string;  // Ngày cập nhật (dạng chuỗi ISO)
};

// "fakeCourses" là kho dữ liệu giả dùng để mô phỏng dữ liệu sản phẩm/khóa học
export const fakeCourses = {
    records: [] as Course[], // Lưu trữ danh sách các đối tượng sản phẩm/khóa học

    // Hàm khởi tạo dữ liệu mẫu
    initialize() {
        const sampleCourses: Course[] = [];

        // Hàm tạo dữ liệu sản phẩm ngẫu nhiên với id truyền vào
        function generateRandomProductData(id: number): Course {
            const categories = [
                'Electronics',      // Điện tử
                'Furniture',        // Nội thất
                'Clothing',         // Quần áo
                'Toys',             // Đồ chơi
                'Groceries',        // Hàng tạp hóa
                'Books',            // Sách
                'Jewelry',          // Trang sức
                'Beauty Products'   // Mỹ phẩm
            ];

            return {
                id,
                name: faker.commerce.productName(),           // Tên sản phẩm ngẫu nhiên
                description: faker.commerce.productDescription(),// Mô tả sản phẩm ngẫu nhiên
                created_at: faker.date
                    .between({ from: '2022-01-01', to: '2023-12-31' })
                    .toISOString(),                           // Ngày tạo ngẫu nhiên trong khoảng
                price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })), // Giá sản phẩm ngẫu nhiên
                photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`, // URL hình ảnh mẫu
                category: faker.helpers.arrayElement(categories), // Chọn ngẫu nhiên một danh mục
                updated_at: faker.date.recent().toISOString()    // Ngày cập nhật gần đây
            };
        }

        // Sinh 20 bản ghi sản phẩm mẫu
        for (let i = 1; i <= 20; i++) {
            sampleCourses.push(generateRandomProductData(i));
        }

        this.records = sampleCourses;
    },

    // Hàm lấy tất cả sản phẩm với tính năng lọc theo danh mục và tìm kiếm
    async getAll({
        categories = [],   // Mảng danh mục lọc (mặc định rỗng tức là không lọc)
        search             // Từ khóa tìm kiếm (nếu có)
    }: {
        categories?: string[];
        search?: string;
    }) {
        let products = [...this.records];

        // Lọc sản phẩm theo danh mục nếu danh mục được cung cấp
        if (categories.length > 0) {
            products = products.filter((product) =>
                categories.includes(product.category)
            );
        }

        // Tìm kiếm sản phẩm qua các trường: name, description, category
        if (search) {
            products = matchSorter(products, search, {
                keys: ['name', 'description', 'category']
            });
        }

        return products;
    },

    // Hàm lấy kết quả phân trang với tùy chọn lọc theo danh mục và tìm kiếm
    async getCourses({
        page = 1,         // Số trang (mặc định là trang 1)
        limit = 10,       // Số sản phẩm trên 1 trang (mặc định là 10)
        categories,       // Danh mục, được truyền dưới dạng chuỗi (các mục phân cách nhau bằng dấu chấm)
        search            // Từ khóa tìm kiếm
    }: {
        page?: number;
        limit?: number;
        categories?: string;
        search?: string;
    }) {
        await delay(1000); // Đợi 1 giây để mô phỏng xử lý bất đồng bộ

        // Nếu có danh mục, tách chuỗi thành mảng danh mục
        const categoriesArray = categories ? categories.split('.') : [];
        const allProducts = await this.getAll({
            categories: categoriesArray,
            search
        });
        const totalProducts = allProducts.length;

        // Tính toán vị trí bắt đầu cho phân trang
        const offset = (page - 1) * limit;
        // Lấy các sản phẩm cho trang hiện tại
        const paginatedProducts = allProducts.slice(offset, offset + limit);

        // Mô phỏng thời gian hiện tại dưới dạng chuỗi ISO
        const currentTime = new Date().toISOString();

        // Trả về kết quả phân trang
        return {
            success: true,
            time: currentTime,
            message: 'Sample data for testing and learning purposes',
            total_products: totalProducts,
            offset,
            limit,
            products: paginatedProducts
        };
    },

    // Hàm lấy một sản phẩm cụ thể theo ID
    async getCourseById(id: number) {
        await delay(1000); // Mô phỏng độ trễ

        // Tìm kiếm sản phẩm theo id trong danh sách records
        const product = this.records.find((product) => product.id === id);

        if (!product) {
            return {
                success: false,
                message: `Product with ID ${id} not found`
            };
        }

        // Mô phỏng thời gian hiện tại dưới dạng chuỗi ISO
        const currentTime = new Date().toISOString();

        return {
            success: true,
            time: currentTime,
            message: `Product with ID ${id} found`,
            product
        };
    }
};

// Khởi tạo dữ liệu mẫu ngay khi file được import
fakeCourses.initialize();