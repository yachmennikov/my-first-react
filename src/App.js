import React, {Component} from 'react'
import Layout from './layout/layout'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import Quiz from './containers/Quiz'
import QuizList from './containers/QuizList'
import QuizCreator from './containers/QuizCreator'
import Auth from './containers/Auth'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Layout>
             <Route path="/auth" component={Auth} />
             <Route path="/quiz-creator" component={QuizCreator} />
             <Route path="/quiz/:id" component={Quiz} />
             <Route path="/" exact component={QuizList} />
          </Layout>
        </Switch>
       </BrowserRouter>   
    )
  }
 
}

export default App
