"use client";

import { FC, useState } from 'react';

interface ReadingContentProps {
    lectureId: string;
    courseId: string;
}

const ReadingContent: FC<ReadingContentProps> = ({ lectureId: lectureId, courseId }) => {
    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

    // Nội dung đọc mẫu - sẽ được lấy từ API trong ứng dụng thực
    const readingContent = {
        title: 'Tìm hiểu về Toán tử trong Python: Hướng dẫn toàn diện',
        sections: [
            {
                heading: 'Giới thiệu về Toán tử trong Python',
                content: `
        Toán tử là các ký hiệu đặc biệt trong Python thực hiện các phép tính toán số học hoặc logic. Giá trị mà toán tử thực hiện trên được gọi là toán hạng.

        Ví dụ: Trong biểu thức 5 + 3, + là toán tử và 5 và 3 là các toán hạng. Python chia toán tử thành nhiều nhóm dựa trên chức năng và đối tượng mà chúng thao tác.
        `
            },
            {
                heading: 'Toán tử Số học',
                content: `
        Toán tử số học được sử dụng để thực hiện các phép tính toán số học.

        - Cộng (+): Cộng hai toán hạng
        - Trừ (-): Trừ toán hạng bên phải khỏi toán hạng bên trái
        - Nhân (*): Nhân hai toán hạng
        - Chia (/): Chia toán hạng bên trái cho toán hạng bên phải (luôn trả về kiểu float)
        - Chia lấy phần nguyên (//): Phép chia trả về số nguyên được điều chỉnh sang trái trên trục số
        - Lấy phần dư (%): Trả về phần dư khi toán hạng bên trái được chia cho toán hạng bên phải
        - Lũy thừa (**): Nâng toán hạng bên trái lên lũy thừa của toán hạng bên phải

        \`\`\`python
        a = 10
        b = 3

        # Cộng
        print(a + b)  # Kết quả: 13

        # Trừ
        print(a - b)  # Kết quả: 7

        # Nhân
        print(a * b)  # Kết quả: 30

        # Chia
        print(a / b)  # Kết quả: 3.3333333333333335

        # Chia lấy phần nguyên
        print(a // b)  # Kết quả: 3

        # Lấy phần dư
        print(a % b)  # Kết quả: 1

        # Lũy thừa
        print(a ** b)  # Kết quả: 1000
        \`\`\`
        `
            },
            {
                heading: 'Toán tử So sánh',
                content: `
        Toán tử so sánh được sử dụng để so sánh các giá trị. Chúng trả về True hoặc False.

        - Bằng (==): Nếu giá trị của hai toán hạng bằng nhau, thì điều kiện trở thành đúng
        - Không bằng (!=): Nếu giá trị của hai toán hạng không bằng nhau, thì điều kiện trở thành đúng
        - Lớn hơn (>): Nếu giá trị của toán hạng bên trái lớn hơn giá trị của toán hạng bên phải, thì điều kiện trở thành đúng
        - Nhỏ hơn (<): Nếu giá trị của toán hạng bên trái nhỏ hơn giá trị của toán hạng bên phải, thì điều kiện trở thành đúng
        - Lớn hơn hoặc bằng (>=): Nếu giá trị của toán hạng bên trái lớn hơn hoặc bằng giá trị của toán hạng bên phải, thì điều kiện trở thành đúng
        - Nhỏ hơn hoặc bằng (<=): Nếu giá trị của toán hạng bên trái nhỏ hơn hoặc bằng giá trị của toán hạng bên phải, thì điều kiện trở thành đúng

        \`\`\`python
        a = 10
        b = 3
        c = 10

        # Bằng
        print(a == b)  # Kết quả: False
        print(a == c)  # Kết quả: True

        # Không bằng
        print(a != b)  # Kết quả: True

        # Lớn hơn
        print(a > b)  # Kết quả: True

        # Nhỏ hơn
        print(a < b)  # Kết quả: False

        # Lớn hơn hoặc bằng
        print(a >= c)  # Kết quả: True

        # Nhỏ hơn hoặc bằng
        print(a <= b)  # Kết quả: False
        \`\`\`
        `
            },
            {
                heading: 'Toán tử Logic',
                content: `
        Toán tử logic được sử dụng để kết hợp các câu lệnh điều kiện.

        - AND (and): Trả về True nếu cả hai câu lệnh đều đúng
        - OR (or): Trả về True nếu một trong các câu lệnh đúng
        - NOT (not): Trả về True nếu câu lệnh sai

        \`\`\`python
        a = True
        b = False

        # AND
        print(a and b)  # Kết quả: False

        # OR
        print(a or b)  # Kết quả: True

        # NOT
        print(not a)  # Kết quả: False
        print(not b)  # Kết quả: True
        \`\`\`
        `
            },
            {
                heading: 'Toán tử Gán',
                content: `
        Toán tử gán được sử dụng để gán giá trị cho biến.

        - Gán (=): a = 5
        - Cộng và gán (+=): a += 5 tương đương với a = a + 5
        - Trừ và gán (-=): a -= 5 tương đương với a = a - 5
        - Nhân và gán (*=): a *= 5 tương đương với a = a * 5
        - Chia và gán (/=): a /= 5 tương đương với a = a / 5
        - Lấy phần dư và gán (%=): a %= 5 tương đương với a = a % 5
        - Chia lấy phần nguyên và gán (//=): a //= 5 tương đương với a = a // 5
        - Lũy thừa và gán (**=): a **= 5 tương đương với a = a ** 5

        \`\`\`python
        a = 10

        # Cộng và gán
        a += 5
        print(a)  # Kết quả: 15

        # Trừ và gán
        a -= 3
        print(a)  # Kết quả: 12

        # Nhân và gán
        a *= 2
        print(a)  # Kết quả: 24
        \`\`\`
        `
            },
            {
                heading: 'Toán tử Định danh',
                content: `
        Toán tử định danh được sử dụng để so sánh các đối tượng, không phải để kiểm tra xem chúng có bằng nhau hay không, mà để kiểm tra xem chúng có thực sự là cùng một đối tượng, với cùng vị trí bộ nhớ hay không.

        - is: Trả về True nếu cả hai biến là cùng một đối tượng
        - is not: Trả về True nếu cả hai biến không phải là cùng một đối tượng

        \`\`\`python
        a = [1, 2, 3]
        b = [1, 2, 3]
        c = a

        print(a is b)  # Kết quả: False
        print(a is c)  # Kết quả: True
        print(a is not b)  # Kết quả: True
        \`\`\`
        `
            },
            {
                heading: 'Toán tử Thành viên',
                content: `
        Toán tử thành viên được sử dụng để kiểm tra xem một chuỗi có hiện diện trong một đối tượng hay không.

        - in: Trả về True nếu một chuỗi với giá trị được chỉ định có hiện diện trong đối tượng
        - not in: Trả về True nếu một chuỗi với giá trị được chỉ định không hiện diện trong đối tượng

        \`\`\`python
        a = [1, 2, 3, 4, 5]

        print(1 in a)  # Kết quả: True
        print(10 in a)  # Kết quả: False
        print(10 not in a)  # Kết quả: True
        \`\`\`
        `
            },
            {
                heading: 'Kết luận',
                content: `
        Hiểu về toán tử trong Python là nền tảng để thành thạo lập trình Python. Chúng tạo nên xương sống của bất kỳ hoạt động, tính toán hoặc logic điều kiện nào trong mã của bạn. Bằng cách sử dụng chúng một cách hiệu quả, bạn có thể viết mã ngắn gọn và hiệu quả hơn.

        Trong bài học tiếp theo, chúng ta sẽ xem xét cách sử dụng các toán tử này trong các ví dụ thực tế và khám phá một số trường hợp sử dụng nâng cao hơn.
        `
            }
        ]
    };

    const getFontSizeClass = () => {
        switch (fontSize) {
            case 'sm': return 'text-sm';
            case 'md': return 'text-base';
            case 'lg': return 'text-lg';
            case 'xl': return 'text-xl';
            default: return 'text-base';
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Điều khiển đọc */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{readingContent.title}</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFontSize('sm')}
                        className={`p-1 ${fontSize === 'sm' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ nhỏ"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('md')}
                        className={`p-1 ${fontSize === 'md' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ vừa"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('lg')}
                        className={`p-1 ${fontSize === 'lg' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ lớn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('xl')}
                        className={`p-1 ${fontSize === 'xl' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ rất lớn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Nội dung đọc */}
            <div className={`space-y-8 ${getFontSizeClass()}`}>
                {readingContent.sections.map((section, index) => (
                    <div key={index} className="reading-section">
                        <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
                        <div className="prose prose-slate max-w-none">
                            {section.content.split('```').map((part, i) => {
                                if (i % 2 === 0) {
                                    // Nội dung văn bản
                                    return (
                                        <div key={i} className="mb-4 whitespace-pre-line">
                                            {part}
                                        </div>
                                    );
                                } else {
                                    // Khối mã
                                    const [language, ...codeLines] = part.split('\n');
                                    const code = codeLines.join('\n');

                                    return (
                                        <div key={i} className="mb-4">
                                            <div className="bg-gray-100 rounded-md p-4 overflow-x-auto">
                                                <pre className="text-sm">
                                                    <code>{code}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Điều hướng */}
            <div className="mt-12 pt-4 border-t border-gray-200 flex justify-between">
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Bài học trước
                </button>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                    Bài học tiếp theo
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ReadingContent;