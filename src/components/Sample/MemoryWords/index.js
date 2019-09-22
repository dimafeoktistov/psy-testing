import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../../actions/projectActions'
import {submitMemoryWords} from '../../../actions/generalHelpers'
import {Redirect} from 'react-router-dom'
import './styles.css';
import TimerReverse from "../TimerReverse";

const words = ['Лес', 'Хлеб', 'Окно', 'Стул', 'Вода', 'Конь', 'Гриб', 'Игла', 'Мед', 'Огонь'].sort(() => Math.random() - 0.5);

class MemoryWords extends Component {
  state = {
    error: false,
    errorCounter: 0,
    startTraining: false,
    endTraining: false,
    showWords: true,
    result: [],
    correct: 0,
  };

  endMemorizing = () => {
    this.setState({showWords: false})
  };
  checkWords = () => {
    const wordsLower = words.map(word => word.toLowerCase());
    const correct = Object.values(this.state.result).filter(value => wordsLower.includes(value.toLowerCase()));
    this.setState({endTraining: true, correct: correct.length})
  };
  handleChange = (e) => {
    this.setState(({result: {...this.state.result, [e.target.id]: e.target.value}}))
  };

  render() {
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>;
    return (
      <div className='contents'>
        {!this.state.startTraining &&
        <div className='message'>
          <span className='start-message'>{'Запомните следующие слова'}</span>
          <button className='start-btn' onClick={() =>
            this.setState({startTraining: true})}>
            Начать
          </button>
        </div>
        }
        {this.state.startTraining &&
        <React.Fragment>

          {this.state.showWords && <TimerReverse maxTime={3} passedFunction={this.endMemorizing}/>}

          {this.state.showWords && words.join(', ')}
          {!this.state.showWords && <div>
            {words.map((word, i) => <div key={i}><input placeholder={'Введите слово'} onChange={this.handleChange}
                                                        id={i}/></div>)}
            <button onClick={this.checkWords}>Проверить</button>
          </div>}

        </React.Fragment>
        }
        {this.state.endTraining &&
        //two buttons did better job, one button is next and the final button is submit
        <>
          <div>Воспроизведено слов правильно: {this.state.correct}</div>
          <button className='next' onClick={() =>
            this.props.submitResult(this.state.correct)}>Submit
          </button>
        </>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    time: state.current.setTime,
    project: state.result
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    submitResult: (result) => dispatch(submitMemoryWords(result))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoryWords)