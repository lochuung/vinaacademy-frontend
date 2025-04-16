import { BaseDto } from "./api-response";
import { LessonType } from "./course";
import { LessonRequest } from "./lesson";

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  TEXT = 'TEXT',
  TRUE_FALSE = 'TRUE_FALSE'
}

export interface AnswerDto {
  id: string; // UUID
  answerText: string;
  isCorrect?: boolean; // Optional as it's only included for instructors and result view
}

export interface AnswerResultDto {
  id: string; // UUID
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
}

export interface QuestionDto {
  id: string; // UUID
  questionText: string;
  explanation: string;
  point: number;
  questionType: QuestionType;
  answers: AnswerDto[];
}

export interface QuizDto extends BaseDto {
  id: string; // UUID
  title: string;
  description: string;
  totalPoint: number;
  passPoint: number;
  duration: number;
  sectionId: string; // UUID
  sectionTitle: string;
  
  // Quiz settings
  randomizeQuestions: boolean;
  showCorrectAnswers: boolean;
  allowRetake: boolean;
  requirePassingScore: boolean;
  passingScore: number;
  timeLimit: number;
  
  questions: QuestionDto[];
}

export interface QuizCreateRequest extends LessonRequest {
  questions: QuestionDto[];
}

export interface UserAnswerRequest {
  questionId: string; // UUID
  selectedAnswerIds: string[]; // UUID[]
  textAnswer?: string;
}

export interface UserAnswerResultDto {
  questionId: string; // UUID
  questionText: string;
  explanation: string;
  points: number;
  earnedPoints: number;
  isCorrect: boolean;
  answers: AnswerResultDto[];
  textAnswer?: string;
}

export interface QuizSubmissionRequest {
  quizId: string; // UUID
  answers: UserAnswerRequest[];
}

export interface QuizSubmissionResultDto {
  id: string; // UUID
  quizId: string; // UUID
  quizTitle: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  score: number;
  totalPoints: number;
  isPassed: boolean;
  answers: UserAnswerResultDto[];
}
