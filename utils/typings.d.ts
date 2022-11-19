export interface Question {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  incorrectAnswers: Array<String>;
  question: string;
  region: Array<String>;
  tags: Array<string>;
  type: string;
}
