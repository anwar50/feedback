import React from "react";
import GradeForm from "../component/GradeForm";
class AddGrade extends React.Component{
    render()
    {
        
        return(
            <div >
                <h2 style={{display: 'flex', justifyContent: 'center'}} >Enter mark and grade information for {this.props.match.params.title} here!</h2>
                    {/* <Button onClick={this.handleClick} style={{justifyContent:'center'}}>Enter a module that you teach!</Button> */}
                    <GradeForm requestMethod="post"
                        testID={this.props.match.params}
                        btnText="Add Grade!" />
            </div>
        )
    }
} 
export default AddGrade