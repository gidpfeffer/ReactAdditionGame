import React, { Component } from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames';

class Quiz extends Component{
   constructor(props){
      super(props);

      let riddle = this.playGame();
      let correct = false;
      let gameOver = false;

      this.state = {riddle};
      this.renderOptions = this.renderOptions.bind(this);
      this.renderMessage = this.renderMessage.bind(this);
      this.playAgain = this.playAgain.bind(this);
      this.checkResults = this.checkResults.bind(this);
   }

   randomNumber(min, max){
      return Math.floor(Math.random() * (max-min+1)) + min;
   }

   playGame(){

      let field1 = this.randomNumber(20, 50)
      let field2 = this.randomNumber(20, 50)

      let result = field1 + field2;
      let resultsArray = this.generateRandomOptions(result, 4);

      let riddle = {
         resultsArray: resultsArray,
         field1: field1,
         field2: field2,
         answer: result
      };

      if(this.state && this.state.gameOver){
         this.setState({riddle: riddle})
      }else{
         return riddle;
      }
   }

   generateRandomOptions(sum, length){
      let result = sum;
      let resultsArray = [];

      let index = this.randomNumber(0, length - 1);

      while(resultsArray.length < length){
         let randomNum = this.randomNumber(sum - 10, sum + 10)
         if(resultsArray.indexOf(randomNum) > -1 || randomNum === result) continue;
         if(resultsArray.length === index){
            resultsArray.push(result);
            continue;
         }
         resultsArray.push(randomNum);
      }

      return resultsArray;
   }

   checkResults(option){
      if(this.state.riddle.answer === option){
         this.setState({correct: true, gameOver: true});
      }else{
         this.setState({correct: false, gameOver: true});
      }
   }

   renderOptions(){
      return(
         <div className="options">
            {this.state.riddle.resultsArray.map((option, i) => 
                  <QuizOptions option={option} checkResults={(option) => this.checkResults(option)} key={i}/>
               )}
         </div>
      );
   }

   playAgain(){
      this.setState({correct: false, gameOver: false});
      this.playGame();
   }

   renderMessage(){
      if (this.state.correct){
         return <h3>Correct :)</h3>
      }else{
         return <h3>Wrong :(</h3>
      }
   }

	render(){
		return (
      <div className="quiz">
         <div className="quiz-content">
            <p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span>?</p>
            {this.renderOptions()}
         </div>
         <div className={classNames("after", {"hide": !this.state.gameOver}, {"wrong animated zoomInDown": !this.state.correct}, {"correct animated zoomInDown": this.state.correct})}>
            {this.renderMessage()}
         </div>
         <div className="play-again">
            <a className="button" onClick={this.playAgain}>Play Again</a>
         </div>
      </div>
		);
	}
}

export default Quiz;