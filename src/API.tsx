import QuestionCard from './components/QuestionCard';
import {shuffleArray} from './utils'

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[]} 

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty)=>{
                // https://opentdb.com/api.php?amount=10&type=multiple
     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

        const data = await (await fetch(endpoint)).json()
        // console.log(data)
        return data.results.map( (item: Question) =>{
            return {
                ...item,
                answers:shuffleArray([...item.incorrect_answers,item.correct_answer])

            }
        } )
} 