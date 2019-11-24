import React from 'react'
import classes from './AnsweresList.module.scss'
import AnswerItem from './AnswerItem'

const AnsweresList = props => (
    <ul className={classes.answersList}>
       {props.answers.map( (answer, index) => {
           return (
               <AnswerItem 
               key={index}
               answer={answer}
               onAnswerClick={props.onAnswerClick}
               state={props.state ? props.state[answer.id] : null} 
               />
           )
       })}
    </ul>
)

export default AnsweresList