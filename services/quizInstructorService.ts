'use client';

import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api-response";
import { AnswerDto, QuestionDto, QuizDto, QuizSubmissionResultDto } from "@/types/quiz";
import { AxiosResponse } from "axios";

/**
 * Get a quiz by ID for instructor view with all details
 * @param id UUID of the quiz
 * @returns Quiz data or null if retrieval fails
 */
export async function getQuizForInstructor(id: string): Promise<QuizDto | null> {
    try {
        const response: AxiosResponse<ApiResponse<QuizDto>> = await apiClient.get(
            `/instructor/quiz/${id}`
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching quiz with ID ${id} for instructor:`, error);
        return null;
    }
}

/**
 * Get all quizzes for a specific course
 * @param courseId UUID of the course
 * @returns List of quizzes or empty array if retrieval fails
 */
export async function getQuizzesByCourse(courseId: string): Promise<QuizDto[]> {
    try {
        const response: AxiosResponse<ApiResponse<QuizDto[]>> = await apiClient.get(
            `/instructor/quiz/course/${courseId}`
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching quizzes for course ${courseId}:`, error);
        return [];
    }
}

/**
 * Get all quizzes for a specific section
 * @param sectionId UUID of the section
 * @returns List of quizzes or empty array if retrieval fails
 */
export async function getQuizzesBySection(sectionId: string): Promise<QuizDto[]> {
    try {
        const response: AxiosResponse<ApiResponse<QuizDto[]>> = await apiClient.get(
            `/instructor/quiz/section/${sectionId}`
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching quizzes for section ${sectionId}:`, error);
        return [];
    }
}

/**
 * Create a new question for a quiz
 * @param quizId UUID of the quiz
 * @param question Question data
 * @returns Created question data or null if creation fails
 */
export async function createQuestion(quizId: string, question: QuestionDto): Promise<QuestionDto | null> {
    try {
        const response: AxiosResponse<ApiResponse<QuestionDto>> = await apiClient.post(
            `/instructor/quiz/${quizId}/questions`,
            question
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error creating question for quiz ${quizId}:`, error);
        return null;
    }
}

/**
 * Update an existing question
 * @param questionId UUID of the question to update
 * @param question Updated question data
 * @returns Updated question data or null if update fails
 */
export async function updateQuestion(questionId: string, question: QuestionDto): Promise<QuestionDto | null> {
    try {
        const response: AxiosResponse<ApiResponse<QuestionDto>> = await apiClient.put(
            `/instructor/quiz/questions/${questionId}`,
            question
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error updating question with ID ${questionId}:`, error);
        return null;
    }
}

/**
 * Delete a question
 * @param questionId UUID of the question to delete
 * @returns true if deletion was successful, false otherwise
 */
export async function deleteQuestion(questionId: string): Promise<boolean> {
    try {
        await apiClient.delete(`/instructor/quiz/questions/${questionId}`);
        return true;
    } catch (error) {
        console.error(`Error deleting question with ID ${questionId}:`, error);
        return false;
    }
}

/**
 * Create a new answer for a question
 * @param questionId UUID of the question
 * @param answer Answer data
 * @returns Created answer data or null if creation fails
 */
export async function createAnswer(questionId: string, answer: AnswerDto): Promise<AnswerDto | null> {
    try {
        const response: AxiosResponse<ApiResponse<AnswerDto>> = await apiClient.post(
            `/instructor/quiz/questions/${questionId}/answers`,
            answer
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error creating answer for question ${questionId}:`, error);
        return null;
    }
}

/**
 * Update an existing answer
 * @param answerId UUID of the answer to update
 * @param answer Updated answer data
 * @returns Updated answer data or null if update fails
 */
export async function updateAnswer(answerId: string, answer: AnswerDto): Promise<AnswerDto | null> {
    try {
        const response: AxiosResponse<ApiResponse<AnswerDto>> = await apiClient.put(
            `/instructor/quiz/answers/${answerId}`,
            answer
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error updating answer with ID ${answerId}:`, error);
        return null;
    }
}

/**
 * Delete an answer
 * @param answerId UUID of the answer to delete
 * @returns true if deletion was successful, false otherwise
 */
export async function deleteAnswer(answerId: string): Promise<boolean> {
    try {
        await apiClient.delete(`/instructor/quiz/answers/${answerId}`);
        return true;
    } catch (error) {
        console.error(`Error deleting answer with ID ${answerId}:`, error);
        return false;
    }
}

/**
 * Get all student submissions for a quiz
 * @param quizId UUID of the quiz
 * @returns List of quiz submission results or empty array if retrieval fails
 */
export async function getQuizSubmissions(quizId: string): Promise<QuizSubmissionResultDto[]> {
    try {
        const response: AxiosResponse<ApiResponse<QuizSubmissionResultDto[]>> = await apiClient.get(
            `/instructor/quiz/${quizId}/submissions`
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching submissions for quiz ${quizId}:`, error);
        return [];
    }
}
