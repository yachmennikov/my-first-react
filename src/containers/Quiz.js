import React, {Component} from 'react'
import classes from './quiz.module.scss'
import ActiveQuiz from '../components/ActiveQuiz'
import FinishedQuiz from '../components/FinishedQuiz'

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [ 
            {
            question: 'What color the sky?',
            rightAnswerId: 1,
            id: 1,
            answers: [
                {text: 'blue', id: 1},
                {text: 'purple', id: 2},
                {text: 'dark blue', id: 3},
                {text: 'yellow', id: 4}
            ]
            },
            {
                question: 'What do you want to drink?',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: 'blue curasao', id: 1},
                    {text: 'tequila', id: 2},
                    {text: 'gin & tonic', id: 3},
                    {text: 'el diablo', id: 4}
                ]
            },
            {
                question: 'Влад хуйло?',
                rightAnswerId: 3,
                id: 3,
                answers: [
                    {text: 'конечно', id: 1},
                    {text: 'все так думают', id: 2},
                    {text: 'знаю не по наслышке', id: 3},
                    {text: 'эээ а кто это?', id: 4}
                ]
            }
    ]
    }
   
    onAnswerClickHandler = answerId => { 
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        } 
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })
            const timeOut = window.setTimeout( () => {
                if (this.isQuizFinished()) {
                   this.setState({
                       isFinished: true
                   })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
            window.clearTimeout(timeOut)
            }, 1000) 
        } else {
            results[answerId] = 'mistake'
            this.setState({
                answerState: {[answerId]: 'mistake'},
                results: results
            })
        } 
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.quiz}>
                
                <div className={classes.quizWrapper}>
                    <h1>Answer all questions</h1>
                    {
                        this.state.isFinished 
                        ? <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        :  <ActiveQuiz 
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                        />    
                    }
                   
                </div>
            </div>
        )
    }
}

export default Quiz
