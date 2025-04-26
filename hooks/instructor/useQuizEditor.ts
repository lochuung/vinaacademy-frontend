'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Quiz, QuizQuestion, QuizOption, Lecture } from '@/types/lecture';
import { QuestionDto, AnswerDto, QuestionType } from '@/types/quiz';
import {
  useQuizForInstructor,
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
  useCreateAnswer,
  useUpdateAnswer,
  useDeleteAnswer
} from './useQuizInstructor';
import { quizDtoToQuiz } from '@/adapters/quizAdapter';
import { useToast } from '@/hooks/use-toast';

// Debounce delay in milliseconds
const EXPLANATION_DEBOUNCE_DELAY = 800;
const TEXT_DEBOUNCE_DELAY = 600; // Slightly faster for text fields

/**
 * Hook for managing quiz editing with real-time API updates
 */
export function useQuizEditor(lecture: Lecture, sectionId: string) {
  // State
  const [quizState, setQuizState] = useState<Quiz | null>(lecture.quiz || null);
  const [expandedQuestion, setExpandedQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Query and mutations
  const quizQuery = useQuizForInstructor(lecture.id, !!lecture.id);
  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();
  const createAnswerMutation = useCreateAnswer();
  const updateAnswerMutation = useUpdateAnswer();
  const deleteAnswerMutation = useDeleteAnswer();
  
  const { toast } = useToast();

  // Set initial state when lecture changes
  useEffect(() => {
    if (lecture.quiz) {
      setQuizState(lecture.quiz);
    }
  }, [lecture]);

  // Update state when quiz data is loaded
  useEffect(() => {
    if (quizQuery.data) {
      const mappedQuiz = quizDtoToQuiz(quizQuery.data);
      setQuizState(mappedQuiz);
      
      // Set the first question as expanded if there are questions
      if (mappedQuiz.questions.length > 0 && expandedQuestion === '') {
        setExpandedQuestion(mappedQuiz.questions[0].id);
      }
      
      setIsLoading(false);
    }
  }, [quizQuery.data, expandedQuestion]);

  // Set loading state when query is loading
  useEffect(() => {
    setIsLoading(quizQuery.isLoading);
  }, [quizQuery.isLoading]);

  // Initialize a default quiz if none exists
  const initializeDefaultQuiz = () => {
    const defaultQuiz: Quiz = {
      questions: [],
      settings: {
        randomizeQuestions: false,
        showCorrectAnswers: true,
        allowRetake: true,
        requirePassingScore: false,
        passingScore: 70
      },
      totalPoints: 0,
      passPoint: 0,
      totalPoint: 0
    };
    
    setQuizState(defaultQuiz);
    return defaultQuiz;
  };

  // Helper to ensure we have a quiz to work with
  const getQuiz = (): Quiz => {
    return quizState || initializeDefaultQuiz();
  };

  // Update quiz settings
  const updateSettings = (field: keyof Quiz['settings'], value: boolean | number) => {
    const quiz = getQuiz();
    
    const updatedSettings = {
      ...quiz.settings,
      [field]: value
    };
    
    const updatedQuiz = {
      ...quiz,
      settings: updatedSettings
    };
    
    setQuizState(updatedQuiz);
    return updatedQuiz;
  };

  // Add a new question
  const addQuestion = async () => {
    const quiz = getQuiz();
    
    const newQuestion: QuizQuestion = {
      id: `q_${uuidv4()}`,
      text: '',
      type: 'single_choice',
      options: [
        { id: `o_${uuidv4()}_1`, text: '', isCorrect: true },
        { id: `o_${uuidv4()}_2`, text: '', isCorrect: false }
      ],
      explanation: '',
      points: 1,
      isRequired: true
    };
    
    // Create question in local state first
    const updatedQuestions = [...quiz.questions, newQuestion];
    const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      totalPoints
    };
    
    setQuizState(updatedQuiz);
    setExpandedQuestion(newQuestion.id);
    
    // If we have a quiz ID, create the question in the backend
    if (lecture.id) {
      try {
        // Convert to DTO
        const questionDto: QuestionDto = {
          id: newQuestion.id,
          questionText: newQuestion.text,
          explanation: newQuestion.explanation || '',
          point: newQuestion.points,
          questionType: newQuestion.type === 'single_choice' ? QuestionType.SINGLE_CHOICE :
                        newQuestion.type === 'multiple_choice' ? QuestionType.MULTIPLE_CHOICE :
                        newQuestion.type === 'true_false' ? QuestionType.TRUE_FALSE : QuestionType.TEXT,
          answers: newQuestion.options.map(o => ({
            id: o.id,
            answerText: o.text,
            isCorrect: o.isCorrect
          }))
        };
        
        await createQuestionMutation.mutateAsync({
          quizId: lecture.id,
          question: questionDto
        });
      } catch (error) {
        console.error('Error creating question:', error);
        // Don't revert local state as we want to let the user continue working
      }
    }
    
    return updatedQuiz;
  };

  // Remove a question
  const removeQuestion = async (questionId: string) => {
    const quiz = getQuiz();
    
    // Update local state first
    const updatedQuestions = quiz.questions.filter(q => q.id !== questionId);
    const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      totalPoints
    };
    
    setQuizState(updatedQuiz);
    
    // If expandedQuestion was the one being removed, expand the first question if available
    if (expandedQuestion === questionId && updatedQuestions.length > 0) {
      setExpandedQuestion(updatedQuestions[0].id);
    } else if (expandedQuestion === questionId) {
      setExpandedQuestion('');
    }
    
    // If we have a quiz ID, delete the question in the backend
    if (lecture.id) {
      try {
        await deleteQuestionMutation.mutateAsync({
          quizId: lecture.id,
          questionId
        });
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
    
    return updatedQuiz;
  };

  // Duplicate a question
  const duplicateQuestion = async (questionId: string) => {
    const quiz = getQuiz();
    
    const questionToDuplicate = quiz.questions.find(q => q.id === questionId);
    if (!questionToDuplicate) return quiz;
    
    const duplicatedQuestion: QuizQuestion = {
      ...JSON.parse(JSON.stringify(questionToDuplicate)), // Deep clone
      id: `q_${uuidv4()}`,
      text: `${questionToDuplicate.text} (bản sao)`,
      options: questionToDuplicate.options.map(opt => ({
        ...opt,
        id: `o_${uuidv4()}`
      }))
    };
    
    const updatedQuestions = [...quiz.questions, duplicatedQuestion];
    const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      totalPoints
    };
    
    setQuizState(updatedQuiz);
    setExpandedQuestion(duplicatedQuestion.id);
    
    // If we have a quiz ID, create the duplicated question in the backend
    if (lecture.id) {
      try {
        // Convert to DTO
        const questionDto: QuestionDto = {
          id: duplicatedQuestion.id,
          questionText: duplicatedQuestion.text,
          explanation: duplicatedQuestion.explanation || '',
          point: duplicatedQuestion.points,
          questionType: duplicatedQuestion.type === 'single_choice' ? QuestionType.SINGLE_CHOICE :
                        duplicatedQuestion.type === 'multiple_choice' ? QuestionType.MULTIPLE_CHOICE :
                        duplicatedQuestion.type === 'true_false' ? QuestionType.TRUE_FALSE : QuestionType.TEXT,
          answers: duplicatedQuestion.options.map(o => ({
            id: o.id,
            answerText: o.text,
            isCorrect: o.isCorrect
          }))
        };
        
        await createQuestionMutation.mutateAsync({
          quizId: lecture.id,
          question: questionDto
        });
      } catch (error) {
        console.error('Error creating duplicated question:', error);
      }
    }
    
    return updatedQuiz;
  };

  // References for debouncing text updates
  const questionTextTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Update question text with debouncing
  const updateQuestionText = async (questionId: string, text: string) => {
    const quiz = getQuiz();
    
    // Update local state immediately for responsive UI
    const updatedQuestions = quiz.questions.map(q =>
      q.id === questionId ? {...q, text} : q
    );
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Clear any existing timeout for this question
    if (questionTextTimeoutRef.current[questionId]) {
      clearTimeout(questionTextTimeoutRef.current[questionId]);
    }
    
    // Only update backend after the debounce delay
    if (lecture.id) {
      const question = updatedQuestions.find(q => q.id === questionId);
      if (!question) return updatedQuiz;
      
      // Set a new timeout
      questionTextTimeoutRef.current[questionId] = setTimeout(async () => {
        try {
          const questionDto: QuestionDto = {
            id: question.id,
            questionText: question.text,
            explanation: question.explanation || '',
            point: question.points,
            questionType: question.type === 'single_choice' ? QuestionType.SINGLE_CHOICE :
                          question.type === 'multiple_choice' ? QuestionType.MULTIPLE_CHOICE :
                          question.type === 'true_false' ? QuestionType.TRUE_FALSE : QuestionType.TEXT,
            answers: question.options.map(o => ({
              id: o.id,
              answerText: o.text,
              isCorrect: o.isCorrect
            }))
          };
          
          await updateQuestionMutation.mutateAsync({
            questionId,
            question: questionDto,
            quizId: lecture.id
          });
          
          // Clean up the timeout reference after successful update
          delete questionTextTimeoutRef.current[questionId];
        } catch (error) {
          console.error('Error updating question text:', error);
          toast({
            title: "Lỗi cập nhật",
            description: "Không thể cập nhật nội dung câu hỏi. Vui lòng thử lại sau.",
            variant: "destructive"
          });
        }
      }, TEXT_DEBOUNCE_DELAY);
    }
    
    return updatedQuiz;
  };

  // Update question type
  const updateQuestionType = async (questionId: string, type: QuizQuestion['type']) => {
    const quiz = getQuiz();
    
    // Update local state first
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        let options = [...q.options];
        
        // Reset options based on question type
        if (type === 'single_choice' && q.type !== 'single_choice') {
          options = options.map((opt, index) => ({
            ...opt,
            isCorrect: index === 0 // Only first option is correct
          }));
        }
        
        // For true/false, create exactly 2 options
        if (type === 'true_false') {
          options = [
            { id: `o_${uuidv4()}_1`, text: 'Đúng', isCorrect: true },
            { id: `o_${uuidv4()}_2`, text: 'Sai', isCorrect: false }
          ];
        }
        
        // For text type, no options needed
        if (type === 'text') {
          options = [];
        }
        
        return {...q, type, options};
      }
      return q;
    });
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Update in backend
    if (lecture.id) {
      const question = updatedQuestions.find(q => q.id === questionId);
      if (!question) return updatedQuiz;
      
      try {
        const questionDto: QuestionDto = {
          id: question.id,
          questionText: question.text,
          explanation: question.explanation || '',
          point: question.points,
          questionType: question.type === 'single_choice' ? QuestionType.SINGLE_CHOICE :
                        question.type === 'multiple_choice' ? QuestionType.MULTIPLE_CHOICE :
                        question.type === 'true_false' ? QuestionType.TRUE_FALSE : QuestionType.TEXT,
          answers: question.options.map(o => ({
            id: o.id,
            answerText: o.text,
            isCorrect: o.isCorrect
          }))
        };
        
        await updateQuestionMutation.mutateAsync({
          questionId,
          question: questionDto,
          quizId: lecture.id
        });
      } catch (error) {
        console.error('Error updating question type:', error);
      }
    }
    
    return updatedQuiz;
  };

  // Add an option to a question
  const addOption = async (questionId: string) => {
    const quiz = getQuiz();
    
    // Update local state first
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        const newOption: QuizOption = {
          id: `o_${uuidv4()}`,
          text: '',
          isCorrect: false
        };
        return {...q, options: [...q.options, newOption]};
      }
      return q;
    });
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Create option in backend
    if (lecture.id) {
      const question = updatedQuestions.find(q => q.id === questionId);
      if (!question) return updatedQuiz;
      
      const newOption = question.options[question.options.length - 1];
      
      try {
        const answerDto: AnswerDto = {
          id: newOption.id,
          answerText: newOption.text,
          isCorrect: newOption.isCorrect
        };
        
        await createAnswerMutation.mutateAsync({
          questionId,
          answer: answerDto,
          quizId: lecture.id
        });
      } catch (error) {
        console.error('Error creating option:', error);
      }
    }
    
    return updatedQuiz;
  };

  // Remove an option from a question
  const removeOption = async (questionId: string, optionId: string) => {
    const quiz = getQuiz();
    
    // Update local state first
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        if (q.options.length <= 2) {
          return q; // Don't remove if only 2 options left
        }
        return {...q, options: q.options.filter(o => o.id !== optionId)};
      }
      return q;
    });
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Delete option in backend
    if (lecture.id) {
      try {
        await deleteAnswerMutation.mutateAsync({
          answerId: optionId,
          questionId,
          quizId: lecture.id
        });
      } catch (error) {
        console.error('Error deleting option:', error);
      }
    }
    
    return updatedQuiz;
  };

  // References for debouncing option text updates
  const optionTextTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Update option text with debouncing
  const updateOptionText = async (questionId: string, optionId: string, text: string) => {
    const quiz = getQuiz();
    
    // Update local state immediately for responsive UI
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(o =>
            o.id === optionId ? {...o, text} : o
          )
        };
      }
      return q;
    });
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Create a composite key for the timeout reference
    const timeoutKey = `${questionId}_${optionId}`;
    
    // Clear any existing timeout for this option
    if (optionTextTimeoutRef.current[timeoutKey]) {
      clearTimeout(optionTextTimeoutRef.current[timeoutKey]);
    }
    
    // Only update backend after the debounce delay
    if (lecture.id) {
      const question = updatedQuestions.find(q => q.id === questionId);
      if (!question) return updatedQuiz;
      
      const option = question.options.find(o => o.id === optionId);
      if (!option) return updatedQuiz;
      
      // Set a new timeout
      optionTextTimeoutRef.current[timeoutKey] = setTimeout(async () => {
        try {
          const answerDto: AnswerDto = {
            id: option.id,
            answerText: option.text,
            isCorrect: option.isCorrect
          };
          
          await updateAnswerMutation.mutateAsync({
            answerId: optionId,
            answer: answerDto,
            questionId,
            quizId: lecture.id
          });
          
          // Clean up the timeout reference after successful update
          delete optionTextTimeoutRef.current[timeoutKey];
        } catch (error) {
          console.error('Error updating option text:', error);
          toast({
            title: "Lỗi cập nhật",
            description: "Không thể cập nhật văn bản của lựa chọn. Vui lòng thử lại sau.",
            variant: "destructive"
          });
        }
      }, TEXT_DEBOUNCE_DELAY);
    }
    
    return updatedQuiz;
  };

  // Toggle option correctness
  const toggleOptionCorrect = async (questionId: string, optionId: string) => {
    const quiz = getQuiz();
    
    // Update local state first
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        if (q.type === 'single_choice' || q.type === 'true_false') {
          // For single choice, only one option can be correct
          return {
            ...q,
            options: q.options.map(o => ({
              ...o,
              isCorrect: o.id === optionId
            }))
          };
        } else {
          // For multiple choice, toggle the option
          return {
            ...q,
            options: q.options.map(o =>
              o.id === optionId ? {...o, isCorrect: !o.isCorrect} : o
            )
          };
        }
      }
      return q;
    });
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Update option correctness in backend
    if (lecture.id) {
      const question = updatedQuestions.find(q => q.id === questionId);
      if (!question) return updatedQuiz;
      
      const option = question.options.find(o => o.id === optionId);
      if (!option) return updatedQuiz;
      
      try {
        const answerDto: AnswerDto = {
          id: option.id,
          answerText: option.text,
          isCorrect: option.isCorrect
        };
        
        // Wait for the API update to complete
        const updatedAnswer = await updateAnswerMutation.mutateAsync({
          answerId: optionId,
          answer: answerDto,
          questionId,
          quizId: lecture.id
        });
        
        // Update all the other options in the same question if this is a single choice question
        // This ensures consistency between backend and frontend
        if ((question.type === 'single_choice' || question.type === 'true_false') && 
            updatedAnswer && updatedAnswer.answer.isCorrect) {
          
          // For each other option that isn't the one we just updated, set isCorrect to false if needed
          for (const otherOption of question.options) {
            if (otherOption.id !== optionId && otherOption.isCorrect) {
              const otherAnswerDto: AnswerDto = {
                id: otherOption.id,
                answerText: otherOption.text,
                isCorrect: false
              };
              
              await updateAnswerMutation.mutateAsync({
                answerId: otherOption.id,
                answer: otherAnswerDto,
                questionId,
                quizId: lecture.id
              });
            }
          }
          
          // After all updates, refetch the quiz to ensure UI is in sync with backend
          await quizQuery.refetch();
        }
      } catch (error) {
        console.error('Error updating option correctness:', error);
        toast({
          title: "Lỗi cập nhật",
          description: "Không thể cập nhật đáp án. Vui lòng thử lại sau.",
          variant: "destructive"
        });
        
        // Revert to previous state if there's an error
        setQuizState(quiz);
      }
    }
    
    return updatedQuiz;
  };

  // References for debouncing explanation updates
  const explanationTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Update question explanation with debouncing
  const updateExplanation = async (questionId: string, explanation: string) => {
    const quiz = getQuiz();
    
    // Update local state immediately for responsive UI
    const updatedQuestions = quiz.questions.map(q =>
      q.id === questionId ? {...q, explanation} : q
    );
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Clear any existing timeout for this question
    if (explanationTimeoutRef.current[questionId]) {
      clearTimeout(explanationTimeoutRef.current[questionId]);
    }
    
    // Only update backend after the debounce delay
    if (lecture.id) {
      const question = updatedQuestions.find(q => q.id === questionId);
      if (!question) return updatedQuiz;
      
      // Set a new timeout
      explanationTimeoutRef.current[questionId] = setTimeout(async () => {
        try {
          const questionDto: QuestionDto = {
            id: question.id,
            questionText: question.text,
            explanation: question.explanation || '',
            point: question.points,
            questionType: question.type === 'single_choice' ? QuestionType.SINGLE_CHOICE :
                          question.type === 'multiple_choice' ? QuestionType.MULTIPLE_CHOICE :
                          question.type === 'true_false' ? QuestionType.TRUE_FALSE : QuestionType.TEXT,
            answers: question.options.map(o => ({
              id: o.id,
              answerText: o.text,
              isCorrect: o.isCorrect
            }))
          };
          
          await updateQuestionMutation.mutateAsync({
            questionId,
            question: questionDto,
            quizId: lecture.id
          });
          
          // Clean up the timeout reference after successful update
          delete explanationTimeoutRef.current[questionId];
        } catch (error) {
          console.error('Error updating question explanation:', error);
          toast({
            title: "Lỗi cập nhật",
            description: "Không thể cập nhật giải thích. Vui lòng thử lại sau.",
            variant: "destructive"
          });
        }
      }, EXPLANATION_DEBOUNCE_DELAY);
    }
    
    return updatedQuiz;
  };

  // Update question points
  const updatePoints = async (questionId: string, points: number) => {
    const quiz = getQuiz();
    
    // Update local state first
    const updatedQuestions = quiz.questions.map(q =>
      q.id === questionId ? {...q, points} : q
    );
    
    const totalPoints = updatedQuestions.reduce((sum, q) => sum + q.points, 0);
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      totalPoints
    };
    
    setQuizState(updatedQuiz);
    
    // Update in backend
    if (lecture.id) {
      const question = updatedQuestions.find(q => q.id === questionId);
      if (!question) return updatedQuiz;
      
      try {
        const questionDto: QuestionDto = {
          id: question.id,
          questionText: question.text,
          explanation: question.explanation || '',
          point: question.points,
          questionType: question.type === 'single_choice' ? QuestionType.SINGLE_CHOICE :
                        question.type === 'multiple_choice' ? QuestionType.MULTIPLE_CHOICE :
                        question.type === 'true_false' ? QuestionType.TRUE_FALSE : QuestionType.TEXT,
          answers: question.options.map(o => ({
            id: o.id,
            answerText: o.text,
            isCorrect: o.isCorrect
          }))
        };
        
        await updateQuestionMutation.mutateAsync({
          questionId,
          question: questionDto,
          quizId: lecture.id
        });
      } catch (error) {
        console.error('Error updating question points:', error);
      }
    }
    
    return updatedQuiz;
  };

  // Toggle required status for a question
  const toggleRequired = async (questionId: string) => {
    const quiz = getQuiz();
    
    // Update local state first
    const updatedQuestions = quiz.questions.map(q =>
      q.id === questionId ? {...q, isRequired: !q.isRequired} : q
    );
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Note: The backend doesn't currently store isRequired, so no API call needed
    
    return updatedQuiz;
  };

  // Move a question up or down in the order
  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    const quiz = getQuiz();
    
    const index = quiz.questions.findIndex(q => q.id === questionId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === quiz.questions.length - 1)
    ) {
      return quiz; // Can't move further
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedQuestions = [...quiz.questions];
    const [removed] = updatedQuestions.splice(index, 1);
    updatedQuestions.splice(newIndex, 0, removed);
    
    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions
    };
    
    setQuizState(updatedQuiz);
    
    // Note: We're not updating the order in the backend yet
    // This would require a separate API endpoint for reordering questions
    
    return updatedQuiz;
  };

  // Calculate if quiz has valid questions
  const hasValidQuestions = () => {
    const quiz = getQuiz();
    return quiz.questions.some(q =>
      q.text.trim() !== '' &&
      (q.type === 'text' || q.options.some(o => o.text.trim() !== ''))
    );
  };

  // Calculate total points
  const getTotalPoints = () => {
    const quiz = getQuiz();
    return quiz.questions.reduce((sum, q) => sum + q.points, 0);
  };

  return {
    quiz: quizState,
    setLecture: (updatedLecture: Lecture) => {
      if (updatedLecture.quiz) {
        setQuizState(updatedLecture.quiz);
      }
    },
    expandedQuestion,
    setExpandedQuestion,
    isLoading,
    error: quizQuery.error,
    updateSettings,
    addQuestion,
    removeQuestion,
    duplicateQuestion,
    updateQuestionText,
    updateQuestionType,
    addOption,
    removeOption,
    updateOptionText,
    toggleOptionCorrect,
    updateExplanation,
    updatePoints,
    toggleRequired,
    moveQuestion,
    hasValidQuestions,
    totalPoints: getTotalPoints(),
    refetch: quizQuery.refetch
  };
}