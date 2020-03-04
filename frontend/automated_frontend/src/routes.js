import React from "react";
import {Route} from "react-router-dom";
import ModuleList from "./containers/ModuleList";
import DetailModuleView from "./containers/DetailModuleView";
import Login from "./containers/SignIn";
import TestList from "./containers/TestList"
import GradeMechanism from "./component/Grade"
import Grade from "./containers/addGrade";
import AddModule from "./containers/addModule";
import FeedbackMechanism from "./containers/FeedbackMechanism.js";
import Home from "./component/Home"
import DetailTestview from "./containers/DetailTestView"
import CreateExam from "./containers/CreateExam";
import SignUpTeacher from "./containers/SignUpTeacher";
import WelcomePage from "./component/WelcomePage";
import SavedTests from "./component/SavedTests";
import GeneratedFeedback from "./component/GeneratedFeedback";
import CreateFeedback from "./component/CreateFeedback";
import SavedFeedback from "./component/SavedFeedback";
import FeedbackInformation from "./component/FeedbackInformation";

const BaseRouter = (props) => (
        <div>
            <Route exact path="/" component={WelcomePage}/>
            <Route exact path="/modulesList/:id" component={ModuleList} />
            <Route exact path="/modules/:moduleID/:userid" component={DetailModuleView} />
            <Route exact path="/questions/:questionID/:moduleID/:userid" component={DetailTestview} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registerteacher" component={SignUpTeacher} />
            <Route exact path="/feedbackstage/:id/:userid" component={TestList} />
            <Route exact path="/Grade" component={GradeMechanism} />
            <Route exact path="/addGrade/:id/:title/:testcount" component={Grade} />
            <Route exact path="/createExam/:id/:userid" component={CreateExam} />
            <Route exact path="/addmodule/:userid" component={AddModule} />
            <Route exact path="/feedbackInfo" component={FeedbackMechanism} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/savedtests/:id" component={SavedTests} />
            <Route exact path="/savedfeedbacks/:id" component={SavedFeedback} />
            <Route exact path="/generatefeedback/:id/:userid" component={GeneratedFeedback} />
            <Route exact path="/feedbackInfo/:id/:userid" component={FeedbackInformation} />  
            <Route exact path="/createFeedback/:testid/:userid" component={CreateFeedback} /> 
        </div>
)
export default BaseRouter