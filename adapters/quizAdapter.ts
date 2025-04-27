/**
 * Quiz Adapter
 * 
 * This module provides adapter functions to convert between API quiz models (QuizDto, QuestionDto, etc.)
 * and UI quiz models (Quiz, QuizQuestion, etc.)
 */
import { Quiz, QuizQuestion, QuizOption, QuizSettings, QuestionType as UIQuestionType } from '@/types/lecture';
import { 
  QuizDto, 
  QuestionDto, 
  AnswerDto, 
  QuizCreateRequest,
  QuestionType as APIQuestionType 
} from '@/types/quiz';
import { LessonRequest } from '@/types/lesson';
// Import LessonType as a type, not a value
import type { LessonType } from '@/types/course';

/**
 * Maps the UI question type to API question type
 */
const questionTypeToAPI = (uiType: UIQuestionType): APIQuestionType => {
  switch(uiType) {
    case 'single_choice':
      return APIQuestionType.SINGLE_CHOICE;
    case 'multiple_choice':
      return APIQuestionType.MULTIPLE_CHOICE;
    case 'true_false':
      return APIQuestionType.TRUE_FALSE;
    case 'text':
      return APIQuestionType.TEXT;
    default:
      return APIQuestionType.SINGLE_CHOICE;
  }
};

/**
 * Maps the API question type to UI question type
 */
const questionTypeToUI = (apiType: APIQuestionType): UIQuestionType => {
  switch(apiType) {
    case APIQuestionType.SINGLE_CHOICE:
      return 'single_choice';
    case APIQuestionType.MULTIPLE_CHOICE:
      return 'multiple_choice';
    case APIQuestionType.TRUE_FALSE:
      return 'true_false';
    case APIQuestionType.TEXT:
      return 'text';
    default:
      return 'single_choice';
  }
};

/**
 * Converts a quiz option (UI) to answer DTO (API)
 */
const quizOptionToAnswerDto = (option: QuizOption): AnswerDto => {
  return {
    id: option.id,
    answerText: option.text,
    isCorrect: option.isCorrect
  };
};

/**
 * Converts an answer DTO (API) to quiz option (UI)
 */
const answerDtoToQuizOption = (answer: AnswerDto): QuizOption => {
  return {
    id: answer.id,
    text: answer.answerText,
    isCorrect: answer.isCorrect || false
  };
};

/**
 * Converts a quiz question (UI) to question DTO (API)
 */
const quizQuestionToQuestionDto = (question: QuizQuestion): QuestionDto => {
  return {
    id: question.id || '',
    questionText: question.text,
    explanation: question.explanation || '',
    point: question.points,
    questionType: questionTypeToAPI(question.type),
    answers: question.options.map(quizOptionToAnswerDto)
  };
};

/**
 * Converts a question DTO (API) to quiz question (UI)
 */
const questionDtoToQuizQuestion = (question: QuestionDto): QuizQuestion => {
  console.log('Converting QuestionDto to QuizQuestion:', question);
  
  // Convert each answer to options
  const options = question.answers?.map(answerDtoToQuizOption);
  
  const uiQuestion: QuizQuestion = {
    id: question.id,
    text: question.questionText,
    type: questionTypeToUI(question.questionType),
    options: options,
    explanation: question.explanation || '',
    points: question.point,
    isRequired: true // Default value as API doesn't store this
  };
  
  console.log('Converted to QuizQuestion:', uiQuestion);
  return uiQuestion;
};

/**
 * Converts a UI quiz model to API quiz create request
 * @param quiz The UI quiz model
 * @param lectureId The ID of the lecture
 * @param sectionId The ID of the section
 * @param title The title of the quiz/lecture
 * @param description The description of the quiz/lecture
 */
export const quizToQuizCreateRequest = (
  quiz: Quiz, 
  lectureId: string,
  sectionId: string,
  title: string,
  description: string = ''
): QuizCreateRequest => {
  // Create the lesson request with the basic properties
  const lessonRequest: LessonRequest = {
    title: title || 'Quiz',
    description: description,
    sectionId: sectionId,
    // Use string literal 'QUIZ' instead of LessonType enum
    type: 'QUIZ' as LessonType,
    free: false
  };

  // Extract quiz settings
  const { randomizeQuestions, showCorrectAnswers, allowRetake, requirePassingScore, passingScore, timeLimit } = quiz.settings;

  // Convert UI quiz settings to API quiz fields
  // Create the quiz request with all the necessary properties
  // Note: We don't include 'id' as it's not part of the QuizCreateRequest interface
  const quizRequest: QuizCreateRequest = {
    ...lessonRequest,
    questions: quiz.questions.map(quizQuestionToQuestionDto),
    // We need to coerce the types here since the QuizCreateRequest doesn't include these fields explicitly
    // but they are handled by the backend
    ...(randomizeQuestions !== undefined && { randomizeQuestions }),
    ...(showCorrectAnswers !== undefined && { showCorrectAnswers }),
    ...(allowRetake !== undefined && { allowRetake }),
    ...(requirePassingScore !== undefined && { requirePassingScore }),
    ...(passingScore !== undefined && { passingScore }),
    ...(timeLimit !== undefined && { timeLimit: timeLimit || 0 })
  } as QuizCreateRequest;

  return quizRequest;
};

/**
 * Converts an API quiz DTO to UI quiz model
 * @param quizDto The API quiz DTO
 */
export const quizDtoToQuiz = (quizDto: QuizDto): Quiz => {
  const settings: QuizSettings = {
    randomizeQuestions: quizDto.randomizeQuestions,
    showCorrectAnswers: quizDto.showCorrectAnswers,
    allowRetake: quizDto.allowRetake,
    requirePassingScore: quizDto.requirePassingScore,
    passingScore: quizDto.passingScore,
    timeLimit: quizDto.timeLimit
  };

  const questions = quizDto.questions.map(questionDtoToQuizQuestion);
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return {
    title: quizDto.title,
    questions: questions,
    settings: settings,
    totalPoints: totalPoints,
    passPoint: quizDto.passPoint,
    totalPoint: quizDto.totalPoint,
    timeLimit: quizDto.timeLimit
  };
};