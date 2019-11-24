import React, { Component } from 'react'
import classes from './QuizCreator.module.scss'
import Button from '../components/Button'
import { createControl, validate, validateForm } from '../form/formFramework'
import Input from '../components/Input'
import Auxiliary from './Auxiliary'
import Select from '../components/Select'
import axios from 'axios'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'значение не может быть пустым',
        id: number
        }, {required: true}
    )
}

function createFormControl() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true} ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }

    
}

export class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControl()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()
        const quiz = this.state.quiz.concat(),
              index = quiz.length + 1,
              {question, option1, option2, option3, option4} = this.state.formControls,
              questionItem = {
                  question: question.value,
                  id: index,
                  rightAnswerId: this.state.rightAnswerId,
                  answers: [
                      {text: option1.value, id: option1.id},
                      {text: option2.value, id: option2.id},
                      {text: option3.value, id: option3.id},
                      {text: option4.value, id: option4.id}
                  ]
              }
              quiz.push(questionItem)
              this.setState({
                  quiz,
                  isFormValid: false,
                  rightAnswerId: 1,
                  formControls: createFormControl()
              })

    }

    createQuizHandler = event => {
        event.preventDefault()
        axios.post('https://react-quiz1989.firebaseio.com/quiz/ZZUS6BRFQSTpTlmENgQu/quiz.json', this.state.quiz)
        .then(response => console.log(response))
        // console.log(this.state.quiz)
    }

    ChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls },
        control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControl = () => {
        return Object.keys(this.state.formControls).map( (controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key={controlName + index}>
                <Input 
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => this.ChangeHandler(event.target.value, controlName)}
                />
                { index === 0 ? <hr/> : null }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = e => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }

    render() {

        const select = <Select 
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.creator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        { this.renderControl() }
                       { select }
                        <Button
                            type="primary"
                            className="btn-primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator
