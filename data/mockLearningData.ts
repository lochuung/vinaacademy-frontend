// mockData/mockLearningData.ts
import {Quiz, LectureType, Lecture, Course, Section} from '@/types/lecture';

// Mẫu quiz hoàn chỉnh
export const sampleQuiz: Quiz = {
    questions: [
        {
            id: 'q1',
            text: 'Toán tử nào được sử dụng để kiểm tra xem hai đối tượng có cùng giá trị không?',
            type: 'single_choice',
            options: [
                {id: 'q1_a', text: '==', isCorrect: true},
                {id: 'q1_b', text: 'is', isCorrect: false},
                {id: 'q1_c', text: '===', isCorrect: false},
                {id: 'q1_d', text: 'equals()', isCorrect: false}
            ],
            explanation: 'Toán tử == kiểm tra giá trị bằng nhau, trong khi "is" kiểm tra xem hai biến có tham chiếu đến cùng một đối tượng trong bộ nhớ không.',
            points: 1,
            isRequired: true
        },
        {
            id: 'q2',
            text: 'Trong Python, các toán tử nào thực hiện phép tính số học?',
            type: 'multiple_choice',
            options: [
                {id: 'q2_a', text: '+', isCorrect: true},
                {id: 'q2_b', text: '**', isCorrect: true},
                {id: 'q2_c', text: 'and', isCorrect: false},
                {id: 'q2_d', text: '%', isCorrect: true},
                {id: 'q2_e', text: 'in', isCorrect: false}
            ],
            explanation: 'Các toán tử số học trong Python bao gồm +, -, *, /, %, // và **.',
            points: 2,
            isRequired: true
        },
        {
            id: 'q3',
            text: 'True or False: Toán tử "is" trong Python kiểm tra xem hai biến có cùng một giá trị hay không.',
            type: 'true_false',
            options: [
                {id: 'q3_a', text: 'Đúng', isCorrect: false},
                {id: 'q3_b', text: 'Sai', isCorrect: true}
            ],
            explanation: 'Sai. Toán tử "is" kiểm tra xem hai biến có tham chiếu đến cùng một đối tượng trong bộ nhớ không, không phải kiểm tra giá trị bằng nhau.',
            points: 1,
            isRequired: true
        },
        {
            id: 'q4',
            text: 'Giải thích sự khác nhau giữa toán tử "/" và "//" trong Python.',
            type: 'text',
            options: [],
            explanation: 'Toán tử "/" thực hiện phép chia và trả về kết quả là một số thực (float), trong khi "//" thực hiện phép chia lấy phần nguyên và trả về số nguyên được làm tròn xuống.',
            points: 3,
            isRequired: false
        },
        {
            id: 'q5',
            text: 'Đâu là kết quả của biểu thức: 3 ** 2 % 5 trong Python?',
            type: 'single_choice',
            options: [
                {id: 'q5_a', text: '9', isCorrect: false},
                {id: 'q5_b', text: '4', isCorrect: true},
                {id: 'q5_c', text: '1', isCorrect: false},
                {id: 'q5_d', text: '0', isCorrect: false}
            ],
            explanation: '3 ** 2 = 9, sau đó 9 % 5 = 4 (phần dư khi chia 9 cho 5)',
            points: 1,
            isRequired: true
        }
    ],
    settings: {
        randomizeQuestions: true,
        showCorrectAnswers: true,
        allowRetake: true,
        requirePassingScore: true,
        passingScore: 70,
        timeLimit: 10 // thời gian giới hạn tính bằng phút
    },
    totalPoints: 8
};

// Khai báo các lesson examples với kiểu dữ liệu Lesson
export const videoLectureExample: Lecture = {
    id: 'lesson-04',
    title: 'Biến và toán tử trong Python',
    type: 'video',
    description: 'Học cách sử dụng biến và các toán tử cơ bản trong Python',
    duration: '12 phút',
    videoUrl: '/api/videos/lesson-04.mp4',
    transcript: `Trong bài học này, chúng ta sẽ tìm hiểu về biến và các toán tử trong Python. 
    Biến trong Python không cần khai báo kiểu dữ liệu trước. Python sẽ tự động xác định kiểu dữ liệu dựa trên giá trị được gán.
    Các toán tử trong Python bao gồm toán tử số học, toán tử so sánh, toán tử gán, toán tử logic và toán tử bitwise.
    Hãy cùng xem ví dụ cụ thể...`,
    resources: [
        {
            id: 'video-resource-1',
            title: 'Slide bài giảng',
            type: 'pdf',
            url: '/resources/variables-operators-slides.pdf'
        },
        {
            id: 'video-resource-2',
            title: 'Code mẫu',
            type: 'zip',
            url: '/resources/variables-operators-examples.zip'
        }
    ]
};

export const readingLectureExample: Lecture = {
    id: 'lesson-06',
    title: 'Tìm hiểu về Kiểu dữ liệu',
    type: 'reading',
    description: 'Tổng quan về các kiểu dữ liệu cơ bản trong Python',
    duration: '15 phút đọc',
    textContent: `# Kiểu dữ liệu trong Python

Python có một số kiểu dữ liệu cơ bản sau:

## Kiểu số (Numeric Types)
- int: số nguyên như 5, -3, 0
- float: số thực như 3.14, -0.001, 2.0
- complex: số phức như 3+2j

## Kiểu chuỗi (String)
- str: chuỗi ký tự như "Hello", 'Python'

## Kiểu boolean
- bool: True hoặc False

## Kiểu tuần tự (Sequence Types)
- list: danh sách các phần tử [1, 2, 'hello']
- tuple: bộ các phần tử (không thay đổi được) (1, 2, 'hello')
- range: dãy số range(5) -> 0, 1, 2, 3, 4

## Kiểu ánh xạ (Mapping Type)
- dict: từ điển {'name': 'John', 'age': 30}

## Kiểu tập hợp (Set Types)
- set: tập hợp các phần tử không trùng lặp {1, 2, 3}
- frozenset: tập hợp không thay đổi được frozenset({1, 2, 3})

## Kiểu nhị phân (Binary Types)
- bytes, bytearray, memoryview
    `,
    resources: [
        {
            id: 'reading-resource-1',
            title: 'Tài liệu tham khảo về kiểu dữ liệu',
            type: 'pdf',
            url: '/resources/python-data-types.pdf'
        }
    ]
};

export const quizLectureExample: Lecture = {
    id: 'lesson-05',
    title: 'Bài kiểm tra: Toán tử trong Python',
    type: 'quiz',
    description: 'Kiểm tra kiến thức về các toán tử cơ bản trong Python',
    duration: '10 phút',
    quiz: sampleQuiz,
    resources: []
};

export const assignmentLectureExample: Lecture = {
    id: 'lesson-07',
    title: 'Bài tập thực hành: Sử dụng biến và toán tử',
    type: 'assignment',
    description: 'Thực hành sử dụng biến và toán tử qua các bài tập nhỏ',
    duration: '30 phút',
    assignmentDetails: {
        instructions: `# Bài tập thực hành: Sử dụng biến và toán tử

## Yêu cầu
1. Tạo các biến để lưu trữ thông tin cá nhân (tên, tuổi, chiều cao)
2. Tính BMI (Chỉ số khối cơ thể) sử dụng công thức: BMI = cân nặng / (chiều cao^2)
3. Sử dụng toán tử so sánh để kiểm tra xem BMI có nằm trong khoảng bình thường không (18.5 - 24.9)
4. In kết quả ra màn hình với định dạng rõ ràng

## Hướng dẫn nộp bài
1. Tạo một file Python (.py) với mã nguồn của bạn
2. Tải file lên hệ thống
3. Đảm bảo mã nguồn có chú thích đầy đủ giải thích các bước thực hiện`,
        deadline: '2025-04-07T23:59:59',
        maxPoints: 10,
        submissionType: 'file',
        allowedFileTypes: ['.py'],
        resources: [
            {
                id: 'assignment-resource-1',
                title: 'Tham khảo về toán tử',
                type: 'pdf',
                url: '/resources/python-operators.pdf'
            }
        ]
    },
    resources: [
        {
            id: 'assignment-resource-1',
            title: 'Tham khảo về toán tử',
            type: 'pdf',
            url: '/resources/python-operators.pdf'
        }
    ]
};

// Khai báo và xác định kiểu cho dữ liệu khóa học
const currentLecture: Lecture = {
    id: 'lesson-05',
    title: 'Bài kiểm tra: Toán tử trong Python',
    type: 'quiz',
    description: 'Kiểm tra kiến thức về các toán tử cơ bản trong Python',
    duration: '10 phút',
    quiz: sampleQuiz,
    isCurrent: true
};

const section1: Section = {
    id: 'section-01',
    title: 'Giới thiệu',
    lectures: [
        {
            id: 'lesson-01',
            title: 'Giới thiệu về Python',
            type: 'video',
            description: 'Tổng quan về Python và các ứng dụng phổ biến',
            duration: '5 phút',
            videoUrl: '/api/videos/lesson-01.mp4',
            isCompleted: true
        },
        {
            id: 'lesson-02',
            title: 'Cài đặt môi trường phát triển',
            type: 'video',
            description: 'Hướng dẫn cài đặt Python và các công cụ phát triển',
            duration: '8 phút',
            videoUrl: '/api/videos/lesson-02.mp4',
            isCompleted: true
        },
        {
            id: 'lesson-03',
            title: 'Tài liệu tham khảo',
            type: 'reading',
            description: 'Các tài liệu tham khảo và hướng dẫn cho người mới bắt đầu',
            duration: '10 phút đọc',
            textContent: `# Tài liệu tham khảo Python cho người mới bắt đầu

Dưới đây là danh sách các tài liệu và nguồn học tập hữu ích khi bắt đầu với Python.

## Tài liệu chính thức
- [Python.org](https://www.python.org/doc/) - Tài liệu chính thức từ Python.org
- [Python Tutorial](https://docs.python.org/3/tutorial/index.html) - Hướng dẫn Python chính thức

## Sách miễn phí
- "Automate the Boring Stuff with Python" - Al Sweigart
- "Think Python" - Allen B. Downey

## Khóa học trực tuyến
- Codecademy: Python Course
- freeCodeCamp: Scientific Computing with Python
- edX: Introduction to Computer Science and Programming Using Python
                  `,
            isCompleted: true
        }
    ]
};

const section2: Section = {
    id: 'section-02',
    title: 'Cơ Bản về Python',
    lectures: [
        {
            id: 'lesson-04',
            title: 'Biến và toán tử trong Python',
            type: 'video',
            description: 'Học cách sử dụng biến và các toán tử cơ bản trong Python',
            duration: '12 phút',
            videoUrl: '/api/videos/lesson-04.mp4',
            isCompleted: true
        },
        currentLecture,
        {
            id: 'lesson-06',
            title: 'Tìm hiểu về Kiểu dữ liệu',
            type: 'reading',
            description: 'Tổng quan về các kiểu dữ liệu cơ bản trong Python',
            duration: '15 phút đọc',
            textContent: `# Kiểu dữ liệu trong Python

Python có một số kiểu dữ liệu cơ bản sau:

## Kiểu số (Numeric Types)
- int: số nguyên như 5, -3, 0
- float: số thực như 3.14, -0.001, 2.0
- complex: số phức như 3+2j

## Kiểu chuỗi (String)
- str: chuỗi ký tự như "Hello", 'Python'

## Kiểu boolean
- bool: True hoặc False

## Kiểu tuần tự (Sequence Types)
- list: danh sách các phần tử [1, 2, 'hello']
- tuple: bộ các phần tử (không thay đổi được) (1, 2, 'hello')
- range: dãy số range(5) -> 0, 1, 2, 3, 4

## Kiểu ánh xạ (Mapping Type)
- dict: từ điển {'name': 'John', 'age': 30}

## Kiểu tập hợp (Set Types)
- set: tập hợp các phần tử không trùng lặp {1, 2, 3}
- frozenset: tập hợp không thay đổi được frozenset({1, 2, 3})

## Kiểu nhị phân (Binary Types)
- bytes, bytearray, memoryview
                  `,
            isCompleted: false
        },
        assignmentLectureExample
    ]
};

const section3: Section = {
    id: 'section-03',
    title: 'Cấu trúc dữ liệu và Vòng lặp',
    lectures: [
        {
            id: 'lesson-08',
            title: 'List và Dictionary',
            type: 'video',
            description: 'Tìm hiểu về List và Dictionary trong Python',
            duration: '15 phút',
            videoUrl: '/api/videos/lesson-08.mp4',
            isCompleted: false
        },
        {
            id: 'lesson-09',
            title: 'Tổng quan về cấu trúc dữ liệu Python',
            type: 'reading',
            description: 'Tài liệu tổng hợp về các cấu trúc dữ liệu trong Python',
            duration: '20 phút đọc',
            textContent: `# Cấu trúc dữ liệu trong Python

Python có các cấu trúc dữ liệu phong phú giúp lưu trữ và tổ chức dữ liệu một cách hiệu quả.

## 1. List
Lists là cấu trúc dữ liệu có thứ tự, có thể thay đổi và cho phép các phần tử trùng lặp.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["abc", 34, True, 40, "male"]
\`\`\`

## 2. Tuple
Tuples cũng là cấu trúc dữ liệu có thứ tự, nhưng không thể thay đổi.

\`\`\`python
fruits = ("apple", "banana", "cherry")
numbers = (1, 2, 3, 4, 5)
mixed = ("abc", 34, True, 40, "male")
\`\`\`

## 3. Dictionary
Dictionaries lưu trữ dữ liệu theo cặp key-value, không có thứ tự và có thể thay đổi.

\`\`\`python
car = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}
\`\`\`

## 4. Set
Sets là tập hợp không có thứ tự, không trùng lặp và có thể thay đổi.

\`\`\`python
fruits = {"apple", "banana", "cherry"}
\`\`\`
                  `,
            isCompleted: false
        },
        {
            id: 'lesson-10',
            title: 'Vòng lặp for và while',
            type: 'video',
            description: 'Học cách sử dụng vòng lặp trong Python',
            duration: '12 phút',
            videoUrl: '/api/videos/lesson-10.mp4',
            isCompleted: false
        },
        {
            id: 'lesson-11',
            title: 'Bài tập thực hành: Cấu trúc dữ liệu và vòng lặp',
            type: 'assignment',
            description: 'Thực hành sử dụng các cấu trúc dữ liệu và vòng lặp trong Python',
            duration: '45 phút',
            assignmentDetails: {
                instructions: `# Bài tập thực hành: Cấu trúc dữ liệu và vòng lặp

## Yêu cầu
1. Tạo một dictionary chứa thông tin về 3 học viên (tên, tuổi, điểm)
2. Sử dụng vòng lặp để hiển thị thông tin của từng học viên
3. Tính điểm trung bình của tất cả học viên
4. Sử dụng list comprehension để tạo một danh sách các học viên có điểm trên trung bình
5. In kết quả ra màn hình với định dạng rõ ràng

## Hướng dẫn nộp bài
1. Tạo một file Python (.py) với mã nguồn của bạn
2. Tải file lên hệ thống
3. Đảm bảo mã nguồn có chú thích đầy đủ giải thích các bước thực hiện`,
                deadline: '2025-04-14T23:59:59',
                maxPoints: 15,
                submissionType: 'file',
                allowedFileTypes: ['.py'],
                resources: [
                    {
                        id: 'resource-2',
                        title: 'Tài liệu về Dictionary',
                        type: 'pdf',
                        url: '/resources/python-dictionaries.pdf'
                    },
                    {
                        id: 'resource-3',
                        title: 'Tham khảo về List Comprehension',
                        type: 'pdf',
                        url: '/resources/list-comprehension.pdf'
                    }
                ]
            },
            isCompleted: false
        },
        {
            id: 'lesson-12',
            title: 'Bài kiểm tra: Cấu trúc dữ liệu và vòng lặp',
            type: 'quiz',
            description: 'Kiểm tra kiến thức về cấu trúc dữ liệu và vòng lặp',
            duration: '15 phút',
            isCompleted: false
        }
    ]
};

// Khởi tạo đối tượng Course với kiểu dữ liệu phù hợp
export const mockCourseData: Course = {
    id: 'course-python-01',
    slug: 'python-cho-nguoi-moi-bat-dau',
    title: 'Python cho Người Mới Bắt Đầu',
    currentLecture: currentLecture,
    sections: [section1, section2, section3],
    progress: 35 // phần trăm hoàn thành
};