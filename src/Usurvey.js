import React, {Component} from 'react'

let firebase = require('firebase')
let uuid = require('uuid');

let firebaseConfig = {
    apiKey: "AIzaSyBwOgmOQbqoGs8VZvFh-zHGS3yeHsiKvhc",
    authDomain: "usurvey-4edc8.firebaseapp.com",
    databaseURL: "https://usurvey-4edc8.firebaseio.com",
    projectId: "usurvey-4edc8",
    storageBucket: "usurvey-4edc8.appspot.com",
    messagingSenderId: "8245617074",
    appId: "1:8245617074:web:b58efbb18c7d16347804ab",
    measurementId: "G-HSS329767R"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class Usurvey extends Component {
    
    //FUNCTIONS:
    nameSubmit = (event) => {
        event.preventDefault()
        //console.log('Hello')
        let studentName = this.refs.nameBox.value
        //Replace the old state studentName with the new one just created
            //can also take a callback function:
        this.setState({studentName: studentName}, function(){
            console.log(this.state);
            //alert(this.state)
        })
    }

    answerSelected = (event) => {
        //THIS GETS CALLED EACH TIME A RADIO BUTTON IS CLICKED ON OUR FORM:

        let answers = this.state.answers;
        if(event.target.name === 'answer1'){
            //this.setState({answer1: event.target.value})
            answers.answer1 = event.target.value;
        }else if(event.target.name === 'answer2'){
            answers.answer2 = event.target.value
        }else if(event.target.name === 'answer3'){
            answers.answer3 = event.target.value
        }

        //How neccessary is the following line? It seems the above lines rewrite the state values as needed.
        this.setState({answers: answers}, () => {console.log(this.state)})
    }

    questionSubmit = () => {
        //We are accessing the database, looking for collection 'uSurvey'
         //If that collection does not exist, it will create it for us.
         //We can create a further node, we want it to be unique id for each user who accesses our survey.
        try{
        firebase.database().ref('uSurvey/'+this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });

        this.setState({isSubmitted: true});
        }catch{
            console.error();
            
        }
    }

    constructor(props){
        super(props);
        this.myRef = React.createRef()

        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
        };
        //ALL FUNCTIONS MUST BE BINDED:
        this.nameSubmit = this.nameSubmit.bind(this)
        this.answerSelected = this.answerSelected.bind(this)
        this.questionSubmit = this.questionSubmit.bind(this)
    }

    render(){
        let studentName;
        let questions;

        if(this.state.studentName === '' && this.state.isSubmitted === false){
            studentName = <div>
                <h1>Hey, Please let us know your name:</h1>
                <form onSubmit={this.nameSubmit}>
                    <input className="inputName" type="text" placeholder="Enter your name" ref="nameBox" />
                </form>
            </div>
        }else if (this.state.studentName !== '' && this.state.isSubmitted === false){
        studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>
            questions = <div>
                <h2>Here are some questions</h2>
                <form onSubmit={this.questionSubmit}>
                    <div className="card">
                        <label>What kind of courses do you like the most: </label><br />
                        <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
                        <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design 
                        <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing                     
                    </div>
                    <br />
                    <div className="card">
                        <label>You are a: </label><br />
                        <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />Student
                        <input type="radio" name="answer2" value="In-job" onChange={this.answerSelected} />In-Job 
                        <input type="radio" name="answer2" value="Looking-job" onChange={this.answerSelected} />Looking-job                     
                    </div>
                    <br />
                    <div className="card">
                        <label>Is online learning helpful: </label><br />
                        <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} />Yes
                        <input type="radio" name="answer3" value="No" onChange={this.answerSelected} />No 
                        <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected} />Maybe                     
                    </div>
                    <br />
                    <input type="submit" className="feedback-button" className="feedback-button" />
                </form>
            </div>
        }else if(this.state.isSubmitted === true && this.state.studentName !== ''){
            studentName = <h1>Thanks, {this.state.studentName} for your input!</h1>
        }

        return(
            <div>
                {studentName}
                -------------------------
                {questions}
            </div>
        )
    }

}

export default Usurvey