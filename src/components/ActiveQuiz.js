import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswersList from './AnswersList'

const ActiveQuiz = props => {

    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.question}>
                <span>
                    <strong>{props.answerNumber}.</strong> {props.question}
                </span>
                <small> {props.answerNumber} of {props.quizLength}</small> &nbsp;
            </p>
           <AnswersList
           state={props.state} 
           answers={props.answers}
           onAnswerClick={props.onAnswerClick}
           />
        </div>
    )
}

export default ActiveQuiz