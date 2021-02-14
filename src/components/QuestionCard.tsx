import React, {useEffect, useRef} from 'react'
import styles from './QuestionCard.module.css'
import gsap, { Power3 } from 'gsap'

type Props = {
    question:string,
    answers: string[],
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>)=>void,
    userAnswer: any
    questionNr: number,
    totalQuestions: number,
    

}

const QuestionCard: React.FC <Props> = ({answers,question,userAnswer,checkAnswer,questionNr,totalQuestions,}) => {
    // console.log("A",answers, "Q",question);

        const ele = useRef<any>(null)
        const fun2 = () =>{
        
        gsap.fromTo(ele.current,0.8, {width:"0%"},{width:"100%", ease: Power1.easeOut})
                            
        
   }
 
  
  

    useEffect(() => {
     fun2()     
    }, [question])
    
    return (
        <div className={styles.question_container} >

                <p className={styles.number}>
                    Question: {questionNr} / {totalQuestions}
                </p>
                {/* <p>{question}</p> */}
                <div className={styles.test}  ref={ele}>
                    <p  className={styles.question} dangerouslySetInnerHTML={{__html: question}}></p>
                
                        {answers.map(answer=>{
                                // console.log("A",answer);                            
                        return  <div className={styles.answer}  key={answer}>
                                    <button className={styles.answerbtn} disabled={userAnswer} value={answer} onClick={checkAnswer} >
                                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                                     
                                       
                                    </button>
                                </div>
                        })}
                </div>
                
        </div>
    )
}

export default QuestionCard
