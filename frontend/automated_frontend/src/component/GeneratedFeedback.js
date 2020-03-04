import React from "react"
import {Link} from "react-router-dom";
import axios from "axios";
import { Form, Button, Table, Divider, RollbackOutlined } from "antd";
import {CSVLink, CSVDownload} from 'react-csv';
import '../css/Layout.css';
class GeneratedFeedback extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            test: [],
            grades: [],
            generatedFeedback: [],
            showingAlert: false
        }
    }
  
    componentDidMount(){
        axios.all([
            axios.get('http://127.0.0.1:8000/api/test'),
            axios.get('http://127.0.0.1:8000/api/grades'),
            axios.get('http://127.0.0.1:8000/api/generatedFeedback')
        ])
        .then(axios.spread((savedtestsres, grades, feedback) => {
                this.setState({
                    test: savedtestsres.data,
                    grades: grades.data,
                    generatedFeedback: feedback.data
                })
                console.log(this.state.test)
                console.log(this.state.grades)
                console.log(this.state.generatedFeedback)
        }))
    }
    saveFeedback(event1, event2) {
        console.log(event1 + "" + event2)
        // axios.post(`http://127.0.0.1:8000/api/save/test/`,{
        //   test: event1,
        //   username: event2
        // })
      }
    handleSave (test, grade, feedback, user, percentage) {
        let found = false
        let tempgrade = this.state.grades;
        let temptest = this.state.test;
        let grade_id = 0;
        let test_id = 0;
        //remove the percentage sign from the number
        percentage = percentage.replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");
        tempgrade.map(function(gradeID, i){
            if(gradeID.grade == grade)
            {
                grade_id = gradeID.id
                temptest.map(function(testID, i){
                    if(testID.name == test)
                    {
                        test_id = testID.id
                        found = true
                        console.log("true")
                    }
                })
            }
        })
        if(found)
        {
            axios.post(`http://127.0.0.1:8000/api/save/feedback/`,{
                    test: test_id,
                    grade: grade_id,
                    user: user,
                    feedback: feedback,
                    percentage: percentage,
                    created_by: "Feedback generator",
            })
            this.setState({
              showingAlert: true
            });
            setTimeout(() => {
              this.setState({
                showingAlert: false,
              });
            }, 5000);
            
        }
        else
        {
            alert("Could not save the feedback!")
        }
        console.log(test + " " + grade + " " + feedback + " " + user + " " + percentage)
    }
    render(){
        var divStyle = {
            height: "40vh", /* Magic here */
            width: "200vh",
            top: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };
        const {id} = this.props.match.params
        console.log(id)
        let test_id = 0
        let test_grade = 0
        let min = 1
        let max = this.state.generatedFeedback.length
        let randNum = Math.floor(Math.random()*(max-min+1)+min)
        let final_generated_feedback = []
            //first get the id of the test based on the test name given
        this.state.test.map(function(item, i){
            if(item.name == id)
            {
                test_id = item.id
            }
        })
        this.state.grades.map(function(item, i){
            if(item.test == test_id)
            {
                test_grade = item.grade
            }
        })
        this.state.generatedFeedback.map(function(item, i){
                if(test_grade == "A" && item.category == "positive" && item.percentage >= 70)
                {
                    
                    final_generated_feedback.push(item.feedback_bank)
                }
                else if(test_grade == "B" && item.category == "positive" && (item.percentage >= 50 && item.percentage < 70))
                {
                    final_generated_feedback.push(item.feedback_bank)
                }   
                else if(test_grade == "C" && item.category == "negative" && (item.percentage > 50))
                {
                    final_generated_feedback.push(item.feedback_bank)
                }
                else if(test_grade == "D" && item.category == "negative" && (item.percentage > 70))
                {
                    final_generated_feedback.push(item.feedback_bank)
                }
        })
            //randomly generate a feedback whether its positive or negative
        var random_feedback = final_generated_feedback[Math.floor(Math.random()*final_generated_feedback.length)];
        var random_percentage = 0
        this.state.generatedFeedback.map(function(item, i){
          if(random_feedback == item.feedback_bank)
          {
              random_percentage = item.percentage
          }
        })
        console.log(random_feedback)
        function generateFeedback(){
            console.log("f")
        }

        const columns = [{
            title: 'Test Name',
            dataIndex: 'test',
            key: 'test',
            render: (text) => {
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Grade given',
            dataIndex: 'grade',
            key: 'grade',
          }, {
            title: 'Feedback Generated',
            dataIndex: 'feedback',
            render: (text) => {
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, 
          {
            title: 'Feedback percentage',
            dataIndex: 'percentage',
            render: (text) => {
                        //    console.log(text);
              return {
                children: text,
                props: {
                  'data-tip': 'a very long text',
                },
              };
            },
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                {/* <a href="#">Action 一 {record.test}</a> */}
                 <Button onClick={(e) => this.handleSave(record.test, record.grade, random_feedback, this.props.match.params.userid, record.percentage)} type="primary" htmlType="submit">Save Feedback</Button>
                {/*<Divider type="vertical" />
                <Link to={`/createFeedback/` + record.test}><Button type="primary" htmlType="submit">Write your own feedback</Button></Link>
                <Divider type="vertical" />
                <CSVLink data={id + " : " + test_grade + " : " + random_feedback} ><Button type="primary" htmlType="submit" >Export Feedback</Button></CSVLink>
            */}</span>
            ),
          }];
          const testInfo = [{
            key: '1',
            test: id,
            grade: test_grade,
            feedback: random_feedback,
            percentage: random_percentage + "%"
          }];
        return(
            <div>
                <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown': 'alert-hidden'}`}>
                  <strong>Your feedback has been saved!</strong> Go check your saved feedbacks to check them out!!
                </div>
                <Link to={`/feedbackInfo/` + id + '/' + this.props.match.params.userid}><ion-icon src="../images/arrow-back-outline.PNG">Back</ion-icon></Link>
                <Table columns={columns} dataSource={testInfo} />
                <Link to={`/createFeedback/` + id + '/' + this.props.match.params.userid}><Button type="primary" htmlType="submit" style={{alignItems:'center'}}>Not happy with this feedback?</Button></Link>
            </div>
        )
    }
}

export default GeneratedFeedback


// Take a look at this npm library - https://www.npmjs.com/package/react-csv

// For example -

// import {CSVLink, CSVDownload} from 'react-csv';

// const csvData =[
//   ['firstname', 'lastname', 'email'] ,
//   ['John', 'Doe' , 'john.doe@xyz.com'] ,
//   ['Jane', 'Doe' , 'jane.doe@xyz.com']
// ];
// <CSVLink data={csvData} >Download me</CSVLink>
// // or
// <CSVDownload data={csvData} target="_blank" />