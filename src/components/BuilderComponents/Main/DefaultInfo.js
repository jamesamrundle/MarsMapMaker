import React, {Component} from 'react';
import "../../css/MapBuilder.css"
import {renderDateFormat} from "../Helpers/FileHelpers";
import {UnitFormatter} from "./UnitFormatter";
import {defaultInfoOptions} from "../Helpers/renderSelectOptions"


class DefaultInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {dateInput : "",
                        doRender:true}
    }

    setField = (e) => {
        this.setState({...this.state,exampleValue: this.props.userFields[e.target.value].exampleValue})
    };

    toggleRender=()=>{
        console.log("toggle render")
        this.setState(prevState=> ({doRender: !this.state.doRender}))
    }



    renderDateFormatted= () =>{
        const {dateInput, exampleValue} = this.state;



        if(dateInput){
            return(  <div>
                <h4 > According to your mapping: </h4>
               <line>Year : {exampleValue.substring(dateInput.indexOf("Y"),dateInput.lastIndexOf("Y")+1)}</line>
               <line>Day : {exampleValue.substring(dateInput.indexOf("D"),dateInput.lastIndexOf("D")+1)}</line>
               <line>Month : {exampleValue.substring(dateInput.indexOf("M"),dateInput.lastIndexOf("M")+1)}</line>
                </div>)
        }
        else return null;

    }





    RenderSelect=()=>{

        return(
            <div className="fieldElement" >

            <a>Select a field that is a date</a>
            <select className="form-control" id="sel2" name="sellist2" onChange={(e)=>this.setField(e)}>
                {defaultInfoOptions(this.props.userFields)}
            </select>
                {this.renderDateFormatted()}
        </div>)
        };


    renderInput =() =>{
        const helpText =(<div className="verify">
            <line>Below is example data pulled from your CSV</line>
            <br/> <line>Replace digits representing Year with 'Y'</line>
            <br/> <line>Replace digits representing Month with 'M'</line>
            <br/> <line>Replace digits representing Day with 'D'</line>
            <br/> <line>Replace every other character or whitespace with an X</line>
            <br/> <line>Example: 2017-04-27 20:14EST to YYYYXMMXDDXXXXXXXXX</line>
        </div>)

        if(this.state.exampleValue)
        return (<div className={"inline"}>
                {helpText}
                <input onChange={event => this.setState({dateInput: event.target.value})} id="dateTxtBox"
                      defaultValue={(this.state.exampleValue)?this.state.exampleValue: "SELECT FIELD"}
                        onBlur={()=>this.props.setDateFormatting(this.state.dateInput)}>
                </input>
            </div>
    )
            }


    render() {

    if(Object.keys(this.props.userFields).length >0 && this.state.doRender ){
        return (
            <div className="fieldContainer">
                <div ><h3 className={"verify"} > Default Mapping Configuration </h3></div>
            <div className="subContainer fieldElement" >



                <div className="fieldElement">
                    <h4 className={"verify"}>Configure Date Format</h4>
                <this.RenderSelect  />
                    {this.renderInput()}
                </div>

                <br/>

                </div>

                <UnitFormatter setUnit ={this.props.setUnit} />

                <button  onClick={()=>this.toggleRender() }  >Done?</button>


            </div>
                );
    }if(!this.state.doRender){
        return(
            <div className='fieldElement'>
                <h4>Change Date formatting?</h4>
                <button onClick={()=>this.toggleRender()}>Edit</button>
            </div>)
        }
    else return null
}}

export default DefaultInfo;