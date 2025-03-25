// components/student/ReadingContent.tsx
"use client";

import { FC, useState } from 'react';

interface ReadingContentProps {
    lessonId: string;
    courseId: string;
}

const ReadingContent: FC<ReadingContentProps> = ({ lessonId, courseId }) => {
    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

    // Mock reading content - would come from API in a real app
    const readingContent = {
        title: 'Understanding Python Operators: A Comprehensive Guide',
        sections: [
            {
                heading: 'Introduction to Python Operators',
                content: `
        Operators are special symbols in Python that carry out arithmetic or logical computation. The value that the operator operates on is called the operand.

        For example: In the expression 5 + 3, + is the operator and 5 and 3 are the operands. Python divides operators into several groups based on what they operate on and their functionality.
        `
            },
            {
                heading: 'Arithmetic Operators',
                content: `
        Arithmetic operators are used to perform mathematical operations.

        - Addition (+): Adds two operands
        - Subtraction (-): Subtracts the right operand from the left operand
        - Multiplication (*): Multiplies two operands
        - Division (/): Divides the left operand by the right operand (always results in a float)
        - Floor Division (//): Division that results in whole number adjusted to the left in the number line
        - Modulus (%): Returns the remainder when the left operand is divided by the right operand
        - Exponentiation (**): Raises the left operand to the power of the right operand

        \`\`\`python
        a = 10
        b = 3

        # Addition
        print(a + b)  # Output: 13

        # Subtraction
        print(a - b)  # Output: 7

        # Multiplication
        print(a * b)  # Output: 30

        # Division
        print(a / b)  # Output: 3.3333333333333335

        # Floor Division
        print(a // b)  # Output: 3

        # Modulus
        print(a % b)  # Output: 1

        # Exponentiation
        print(a ** b)  # Output: 1000
        \`\`\`
        `
            },
            {
                heading: 'Comparison Operators',
                content: `
        Comparison operators are used to compare values. They return either True or False.

        - Equal to (==): If the values of two operands are equal, then the condition becomes true
        - Not equal to (!=): If values of two operands are not equal, then condition becomes true
        - Greater than (>): If the value of the left operand is greater than the value of the right operand, then condition becomes true
        - Less than (<): If the value of the left operand is less than the value of the right operand, then condition becomes true
        - Greater than or equal to (>=): If the value of the left operand is greater than or equal to the value of the right operand, then condition becomes true
        - Less than or equal to (<=): If the value of the left operand is less than or equal to the value of the right operand, then condition becomes true

        \`\`\`python
        a = 10
        b = 3
        c = 10

        # Equal to
        print(a == b)  # Output: False
        print(a == c)  # Output: True

        # Not equal to
        print(a != b)  # Output: True

        # Greater than
        print(a > b)  # Output: True

        # Less than
        print(a < b)  # Output: False

        # Greater than or equal to
        print(a >= c)  # Output: True

        # Less than or equal to
        print(a <= b)  # Output: False
        \`\`\`
        `
            },
            {
                heading: 'Logical Operators',
                content: `
        Logical operators are used to combine conditional statements.

        - AND (and): Returns True if both statements are true
        - OR (or): Returns True if one of the statements is true
        - NOT (not): Returns True if the statement is false

        \`\`\`python
        a = True
        b = False

        # AND
        print(a and b)  # Output: False

        # OR
        print(a or b)  # Output: True

        # NOT
        print(not a)  # Output: False
        print(not b)  # Output: True
        \`\`\`
        `
            },
            {
                heading: 'Assignment Operators',
                content: `
        Assignment operators are used to assign values to variables.

        - Assign (=): a = 5
        - Add and assign (+=): a += 5 is equivalent to a = a + 5
        - Subtract and assign (-=): a -= 5 is equivalent to a = a - 5
        - Multiply and assign (*=): a *= 5 is equivalent to a = a * 5
        - Divide and assign (/=): a /= 5 is equivalent to a = a / 5
        - Modulus and assign (%=): a %= 5 is equivalent to a = a % 5
        - Floor divide and assign (//=): a //= 5 is equivalent to a = a // 5
        - Exponent and assign (**=): a **= 5 is equivalent to a = a ** 5

        \`\`\`python
        a = 10

        # Add and assign
        a += 5
        print(a)  # Output: 15

        # Subtract and assign
        a -= 3
        print(a)  # Output: 12

        # Multiply and assign
        a *= 2
        print(a)  # Output: 24
        \`\`\`
        `
            },
            {
                heading: 'Identity Operators',
                content: `
        Identity operators are used to compare the objects, not if they are equal, but if they are actually the same object, with the same memory location.

        - is: Returns True if both variables are the same object
        - is not: Returns True if both variables are not the same object

        \`\`\`python
        a = [1, 2, 3]
        b = [1, 2, 3]
        c = a

        print(a is b)  # Output: False
        print(a is c)  # Output: True
        print(a is not b)  # Output: True
        \`\`\`
        `
            },
            {
                heading: 'Membership Operators',
                content: `
        Membership operators are used to test if a sequence is present in an object.

        - in: Returns True if a sequence with the specified value is present in the object
        - not in: Returns True if a sequence with the specified value is not present in the object

        \`\`\`python
        a = [1, 2, 3, 4, 5]

        print(1 in a)  # Output: True
        print(10 in a)  # Output: False
        print(10 not in a)  # Output: True
        \`\`\`
        `
            },
            {
                heading: 'Conclusion',
                content: `
        Understanding Python operators is fundamental to mastering Python programming. They form the backbone of any operation, calculation, or conditional logic in your code. By using them effectively, you can write more concise and efficient code.

        In the next lesson, we'll look at how to use these operators in practical examples and explore some more advanced use cases.
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
            {/* Reading controls */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{readingContent.title}</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFontSize('sm')}
                        className={`p-1 ${fontSize === 'sm' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Small text"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('md')}
                        className={`p-1 ${fontSize === 'md' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Medium text"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('lg')}
                        className={`p-1 ${fontSize === 'lg' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Large text"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('xl')}
                        className={`p-1 ${fontSize === 'xl' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Extra large text"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Reading content */}
            <div className={`space-y-8 ${getFontSizeClass()}`}>
                {readingContent.sections.map((section, index) => (
                    <div key={index} className="reading-section">
                        <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
                        <div className="prose prose-slate max-w-none">
                            {section.content.split('```').map((part, i) => {
                                if (i % 2 === 0) {
                                    // Text content
                                    return (
                                        <div key={i} className="mb-4 whitespace-pre-line">
                                            {part}
                                        </div>
                                    );
                                } else {
                                    // Code block
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

            {/* Navigation */}
            <div className="mt-12 pt-4 border-t border-gray-200 flex justify-between">
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous Lesson
                </button>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                    Next Lesson
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ReadingContent;