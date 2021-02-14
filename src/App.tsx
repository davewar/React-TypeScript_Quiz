import React, {useState,useRef,useEffect} from 'react';
import QuestionCard from './components/QuestionCard';
import {Difficulty, fetchQuizQuestions, QuestionState} from './API'
import styles from './App.module.css'
import {FaTimes} from 'react-icons/fa';
import {TiTick} from 'react-icons/ti';

import gsap from 'gsap'

const TOTAL_QUESTIONS = 10

export type AnswerObj = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string
}


function App() {

  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([])
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [correctAns, setCorrectAns] = useState<string | null>("");
  

  
  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))

  const startTrivia = async ()=>{
            setLoading(true)
            setGameOver(false)
            const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY)
            setQuestions(newQuestions);
            setScore(0);
            setUserAnswers([]);
            setNumber(0);
            setLoading(false);

}

const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>)=>{
  if (!gameOver) {
      
      const answer = e.currentTarget.value;
      // console.log(answer);
      
      // is answer correct ?
      const correct = questions[number].correct_answer === answer;
      
      if (correct) setScore((prev) => prev + 1);
     
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
      // console.log(userAnswers);
        if (correct){
          setCorrectAns("Correct")
          
        } else{
          setCorrectAns("Wrong Answer")
        }
      
    }

}

const nextQuestion = () => {
    // Move to next question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
       
    } else {
      setNumber(nextQ);
    }
    // clear answer
    setCorrectAns("")
  };

  const handleRestart =()=>{
           
            setGameOver(true)                     
            setScore(0);
            setUserAnswers([]);
            setNumber(0);
            
  }

  let tl = useRef<any>()

   const fun = () =>{

      gsap.fromTo(tl.current,2, {height:"0%",background:"yellow"},{height:"100%", background:"lightgreen"})
      gsap.fromTo(tl.current,2, {width:"0%"},{width:"100%"}).repeat(1)
   }  
  
    useEffect(() => {
     fun()     
    }, [])


  return (
    <div className={styles.App}>

          <div className={styles.container}>
          <h1 className={styles.title}>REACT QUIZ</h1>
          {
            gameOver || userAnswers.length == TOTAL_QUESTIONS ? (
              <button className={styles.start} onClick={startTrivia}>Start</button>
            ) : null
          }
          { 
                  !gameOver && <button className={styles.restart} onClick={handleRestart}>Restart Quiz</button>            
          }
          {
            !gameOver && <p className={styles.score}>Score: {score} </p> 
          }
          {
            loading && <p>Loading.....</p>
          }
          {
            !loading && !gameOver && (
        
                    <QuestionCard 
                    questionNr={number +1}
                    totalQuestions={TOTAL_QUESTIONS}
                    question={questions[number].question}
                    answers={questions[number].answers}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    checkAnswer={checkAnswer}
                   
                    />
                )  
          }

          {
            questions.length >0 && correctAns !==""? <div className={styles.ans}>Answer - {questions[number].correct_answer}</div>  : null
          }
          
          {
            !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?        
                <button className={styles.next} onClick={nextQuestion} >Next Question</button>
                : null
          }
          
                <div ref={tl}  className={styles.slider}></div>
          </div>
          <div >{correctAns === "Correct" ? <TiTick color="green" size="10rem"    />:
                  correctAns === "Wrong Answer" ? <FaTimes color="red" size="10rem" />:
                    null
          }</div>
    </div>
    
  );
}

export default App;
