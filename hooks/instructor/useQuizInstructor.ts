'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getQuizForInstructor,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getQuizSubmissions
} from '@/services/quizInstructorService';
import { QuestionDto, QuizDto, AnswerDto, QuizSubmissionResultDto } from '@/types/quiz';
import { useToast } from '@/hooks/use-toast';

// Query keys
export const QUIZ_KEYS = {
    all: ['quizzes'] as const,
    quiz: (id: string) => [...QUIZ_KEYS.all, id] as const,
    questions: (quizId: string) => [...QUIZ_KEYS.quiz(quizId), 'questions'] as const,
    question: (quizId: string, questionId: string) => [...QUIZ_KEYS.questions(quizId), questionId] as const,
    answers: (questionId: string) => ['question', questionId, 'answers'] as const,
    submissions: (quizId: string) => [...QUIZ_KEYS.quiz(quizId), 'submissions'] as const,
};

/**
 * Hook to get quiz data for instructor
 */
export function useQuizForInstructor(quizId: string, enabled: boolean = true) {
    const { toast } = useToast();

    return useQuery({
        queryKey: QUIZ_KEYS.quiz(quizId),
        queryFn: async () => {
            const result = await getQuizForInstructor(quizId);
            if (!result) {
                toast({
                    title: "Lỗi tải dữ liệu",
                    description: "Không thể tải thông tin bài kiểm tra",
                    variant: "destructive"
                });
                throw new Error('Không thể tải thông tin bài kiểm tra');
            }
            return result;
        },
        enabled: enabled && !!quizId,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });
}

/**
 * Hook to create a new question
 */
export function useCreateQuestion() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ quizId, question }: { quizId: string, question: QuestionDto }) => {
            const result = await createQuestion(quizId, question);
            if (!result) {
                throw new Error('Không thể tạo câu hỏi mới');
            }
            return { quizId, question: result };
        },
        onSuccess: ({ quizId, question }) => {
            // Invalidate quiz data to trigger a refetch
            queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.quiz(quizId) });

            // Update the quiz cache with the new question
            queryClient.setQueryData<QuizDto | undefined>(
                QUIZ_KEYS.quiz(quizId),
                (oldData) => {
                    if (!oldData) {
                      return undefined;
                    }

                    return {
                        ...oldData,
                        questions: [...oldData.questions, question]
                    };
                }
            );

            toast({
                title: "Thành công",
                description: "Đã tạo câu hỏi mới",
            });
        },
        onError: (error) => {
            toast({
                title: "Lỗi",
                description: `Không thể tạo câu hỏi: ${error instanceof Error ? error.message : 'Đã xảy ra lỗi'}`,
                variant: "destructive"
            });
        }
    });
}

/**
 * Hook to update an existing question
 */
export function useUpdateQuestion() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ questionId, question, quizId }: { questionId: string, question: QuestionDto, quizId: string }) => {
            const result = await updateQuestion(questionId, question);
            if (!result) {
                throw new Error('Không thể cập nhật câu hỏi');
            }
            return { quizId, question: result };
        },
        onSuccess: ({ quizId, question }) => {
            // Update the quiz cache with the updated question
            queryClient.setQueryData<QuizDto | undefined>(
                QUIZ_KEYS.quiz(quizId),
                (oldData) => {
                    if (!oldData) {
                      return undefined;
                    }

                    return {
                        ...oldData,
                        questions: oldData.questions.map(q =>
                            q.id === question.id ? question : q
                        )
                    };
                }
            );

            toast({
                title: "Thành công",
                description: "Đã cập nhật câu hỏi",
            });
        },
        onError: (error) => {
            toast({
                title: "Lỗi",
                description: `Không thể cập nhật câu hỏi: ${error instanceof Error ? error.message : 'Đã xảy ra lỗi'}`,
                variant: "destructive"
            });
        }
    });
}

/**
 * Hook to delete a question
 */
export function useDeleteQuestion() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ questionId, quizId }: { questionId: string, quizId: string }) => {
            const success = await deleteQuestion(questionId);
            if (!success) {
                throw new Error('Không thể xóa câu hỏi');
            }
            return { quizId, questionId };
        },
        onSuccess: ({ quizId, questionId }) => {
            // Update the quiz cache by removing the deleted question
            queryClient.setQueryData<QuizDto | undefined>(
                QUIZ_KEYS.quiz(quizId),
                (oldData) => {
                    if (!oldData) {
                      return undefined;
                    }

                    return {
                        ...oldData,
                        questions: oldData.questions.filter(q => q.id !== questionId)
                    };
                }
            );

            toast({
                title: "Thành công",
                description: "Đã xóa câu hỏi",
            });
        },
        onError: (error) => {
            toast({
                title: "Lỗi",
                description: `Không thể xóa câu hỏi: ${error instanceof Error ? error.message : 'Đã xảy ra lỗi'}`,
                variant: "destructive"
            });
        }
    });
}

/**
 * Hook to create a new answer for a question
 */
export function useCreateAnswer() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ questionId, answer, quizId }: { questionId: string, answer: AnswerDto, quizId: string }) => {
            const result = await createAnswer(questionId, answer);
            if (!result) {
                throw new Error('Không thể tạo đáp án mới');
            }
            return { questionId, answer: result, quizId };
        },
        onSuccess: ({ questionId, answer, quizId }) => {
            // Update the quiz cache with the new answer
            queryClient.setQueryData<QuizDto | undefined>(
                QUIZ_KEYS.quiz(quizId),
                (oldData) => {
                    if (!oldData) {
                      return undefined;
                    }

                    return {
                        ...oldData,
                        questions: oldData.questions.map(q => {
                            if (q.id === questionId) {
                                return {
                                    ...q,
                                    answers: [...q.answers, answer]
                                };
                            }
                            return q;
                        })
                    };
                }
            );

            toast({
                title: "Thành công",
                description: "Đã tạo đáp án mới",
            });
        },
        onError: (error) => {
            toast({
                title: "Lỗi",
                description: `Không thể tạo đáp án: ${error instanceof Error ? error.message : 'Đã xảy ra lỗi'}`,
                variant: "destructive"
            });
        }
    });
}

/**
 * Hook to update an existing answer
 */
export function useUpdateAnswer() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({
            answerId,
            answer,
            questionId,
            quizId
        }: {
            answerId: string,
            answer: AnswerDto,
            questionId: string,
            quizId: string
        }) => {
            const result = await updateAnswer(answerId, answer);
            if (!result) {
                throw new Error('Không thể cập nhật đáp án');
            }
            return { questionId, answer: result, quizId };
        },
        onSuccess: ({ questionId, answer, quizId }) => {
            // Update the quiz cache with the updated answer
            queryClient.setQueryData<QuizDto | undefined>(
                QUIZ_KEYS.quiz(quizId),
                (oldData) => {
                    if (!oldData) {
                      return undefined;
                    }

                    return {
                        ...oldData,
                        questions: oldData.questions.map(q => {
                            if (q.id === questionId) {
                                return {
                                    ...q,
                                    answers: q.answers.map(a =>
                                        a.id === answer.id ? answer : a
                                    )
                                };
                            }
                            return q;
                        })
                    };
                }
            );

            toast({
                title: "Thành công",
                description: "Đã cập nhật đáp án",
            });
        },
        onError: (error) => {
            toast({
                title: "Lỗi",
                description: `Không thể cập nhật đáp án: ${error instanceof Error ? error.message : 'Đã xảy ra lỗi'}`,
                variant: "destructive"
            });
        }
    });
}

/**
 * Hook to delete an answer
 */
export function useDeleteAnswer() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({
            answerId,
            questionId,
            quizId
        }: {
            answerId: string,
            questionId: string,
            quizId: string
        }) => {
            const success = await deleteAnswer(answerId);
            if (!success) {
                throw new Error('Không thể xóa đáp án');
            }
            return { questionId, answerId, quizId };
        },
        onSuccess: ({ questionId, answerId, quizId }) => {
            // Update the quiz cache by removing the deleted answer
            queryClient.setQueryData<QuizDto | undefined>(
                QUIZ_KEYS.quiz(quizId),
                (oldData) => {
                    if (!oldData) {
                      return undefined;
                    }

                    return {
                        ...oldData,
                        questions: oldData.questions.map(q => {
                            if (q.id === questionId) {
                                return {
                                    ...q,
                                    answers: q.answers.filter(a => a.id !== answerId)
                                };
                            }
                            return q;
                        })
                    };
                }
            );

            toast({
                title: "Thành công",
                description: "Đã xóa đáp án",
            });
        },
        onError: (error) => {
            toast({
                title: "Lỗi",
                description: `Không thể xóa đáp án: ${error instanceof Error ? error.message : 'Đã xảy ra lỗi'}`,
                variant: "destructive"
            });
        }
    });
}

/**
 * Hook to get quiz submissions
 */
export function useQuizSubmissions(quizId: string, enabled: boolean = true) {
    const { toast } = useToast();

    return useQuery<QuizSubmissionResultDto[], Error>({ // Specify the type of data and error
        queryKey: QUIZ_KEYS.submissions(quizId),
        queryFn: async (): Promise<QuizSubmissionResultDto[]> => { // Explicitly type the return value of the query function
            return await getQuizSubmissions(quizId);
        },
        enabled: enabled && !!quizId,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });
}