import React from 'react';
import QAndASearch from './qAndASearch.jsx';
import QAndAList from './qAndAList.jsx';
import QAndAOptions from './qAndAOptions.jsx';
import {BACKEND_URL} from '../app/app.jsx';

class QAndA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };

    this.getAllQuestions = this.getAllQuestions.bind(this);
  }

  getAllQuestions = () => {
    return fetch(`${BACKEND_URL}/qa/questions/?productId=${this.props.productId}`)
    .then((resp) => resp.json())
    .then((allQuestions) => {
      this.setState({questions: allQuestions})
    })
    .catch((err) => {
      console.log('ERROR GETTING ALL QUESTIONS', err);
    });
  }


  componentDidMount() {
    this.getAllQuestions();
  }

  render() {
    return (
      <div className="qAndA" >
        <div className="qAndA-heading" >
          <h1 >Questions And Answers</h1>
        </div>
        <div className="qAndA-body">
          <QAndASearch />
          <QAndAList questions={this.state.questions} />
          <QAndAOptions />
        </div>
      </div>
    )
  }
}


export default QAndA;
