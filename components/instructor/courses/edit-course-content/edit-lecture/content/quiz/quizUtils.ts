// Quiz utility functions for integrating the quiz adapter

import { Lecture } from '@/types/lecture';
import { quizToQuizCreateRequest, quizDtoToQuiz } from '@/adapters/quizAdapter';
import { createQuizLesson, updateQuizLesson, getQuizForInstructor } from '@/services/quizInstructorService';

/**
 * Saves a quiz lecture (create new or update existing)
 * 
 * @param lecture The lecture object containing the quiz data
 * @param courseId The course ID
 * @param sectionId The section ID
 * @returns Promise with the saved lecture or null if failed
 */
export async function saveQuizLecture(
  lecture: Lecture, 
  sectionId: string
): Promise<Lecture | null> {
  try {
    if (!lecture.quiz) {
      console.error('Cannot save quiz: quiz data is missing');
      return null;
    }

    // Convert the UI Quiz model to API QuizCreateRequest using our adapter
    const quizRequest = quizToQuizCreateRequest(
      lecture.quiz,
      lecture.id,
      sectionId,
      lecture.title,
      lecture.description
    );

    // Determine if this is a new quiz or an update
    let savedLessonDto;
    if (lecture.id) {
      // Update existing quiz
      savedLessonDto = await updateQuizLesson(lecture.id, quizRequest);
    } else {
      // Create new quiz
      savedLessonDto = await createQuizLesson(quizRequest);
    }

    if (!savedLessonDto) {
      return null;
    }

    // Return the updated lecture with the saved data
    return {
      ...lecture,
      id: savedLessonDto.id,
      title: savedLessonDto.title,
      description: savedLessonDto.description || '',
      // Keep other properties from the current lecture
    };
  } catch (error) {
    console.error('Error saving quiz lecture:', error);
    return null;
  }
}

/**
 * Loads quiz data for a lecture
 * 
 * @param lecture The lecture ID
 * @returns Promise with the updated lecture or null if failed
 */
export async function loadQuizData(lecture: Lecture): Promise<Lecture | null> {
  try {
    if (!lecture.id) {
      console.error('Cannot load quiz: lecture ID is missing');
      return null;
    }

    // Fetch quiz data from API
    const quizDto = await getQuizForInstructor(lecture.id);
    
    if (!quizDto) {
      return null;
    }

    console.log('Received quiz data from API:', quizDto);

    // Convert API QuizDto to UI Quiz model using our adapter
    const quiz = quizDtoToQuiz(quizDto);

    console.log('Converted to UI model:', quiz);

    // Return updated lecture with quiz data
    return {
      ...lecture,
      title: quizDto.title,
      description: quizDto.description || '',
      quiz
    };
  } catch (error) {
    console.error('Error loading quiz data:', error);
    return null;
  }
}