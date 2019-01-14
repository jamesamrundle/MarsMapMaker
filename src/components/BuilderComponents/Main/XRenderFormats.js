import React, {Component} from 'react';
import {FormatSwitch} from "./FormatSwitcher";
import "../../css/MapBuilder.css"
import {firstMapOptions} from "../Helpers/renderSelectOptions"
import {handleOptionSelect} from "../Helpers/CallBacks"



class XRenderFormats extends Component {

    constructor(props) {

        console.log("in render formats")
        super(props);
        this.state = {format: null,
            selectedField:null,
            disabledSelf:false}

    }



    /* it handles default event action in this component for selecting initial sesar field
    * Also from One2One component handles sets disabledSelf property when reassignment to multiple format through, same flow
    * */

    handleSelect=(event)=>{

        let e = event;
        let wasSelected = this.state.selectedField;
        let isProperEvent = (e.target != null);
        let val = (event.target != null)? event.target.value : event;

        let stateObj;

        //handles submission of default  "SELECT FIELD" option
        if(val === "NULL"){
            stateObj = {format:null,  selectedField:null ,disabledSelf:(val!== "NULL")}
        }

        else {
            stateObj = {format:this.props.sesarFields[val].format,  selectedField:val ,disabledSelf:(val!== "NULL")}
        }

        this.setState(stateObj,
            () => {if(isProperEvent){
                this.props.callBack(this.state,
                    this.props.userField.fieldName,
                    this.state.format,
                    (val!==wasSelected)?wasSelected:null)
            }
        }
        )
    }



   // handleFormatToMulti(e,sesarField){ this.props.handleFormatToMulti(e,sesarField)}





    changeFormat= (e) =>{ this.props.changeFormat(e, this.props.sesarValues.sesarField) }

    isDisabled = () =>{return (this.props.userField.disabled && !this.state.disabledSelf)?  true: false};

    collapseOnFinish = () => this.setState({collapse:true});

    expandOnEdit = () => this.setState({collapse:false})

    registerExtraFields=(fields)=> this.setState({extraUserFields:fields})


    render() {
        if(this.state.collapse=== "") {
            return (<div className="fieldContainer">
                <h3>{this.props.userField.fieldName}</h3>
                <button onClick={()=>this.expandOnEdit()} >Edit?</button>
            </div>)
        }

        else return(
            <div className="fieldContainer" >

                <span >
                  <h3  className="inline">{this.props.userField.fieldName}</h3>
                    <h5 className="subText inline"> Example from your data :{this.props.userField.exampleValue}</h5>
                </span>

                <br/>

                <div className="fieldElement" >

                    <br/>

                    <h5 className="inline">Mapping your field(s)
                        <h5 className="subText inline">{(this.state.extraUserFields != null)?
                                this.props.userField.fieldName +" + "+JSON.stringify( this.state.extraUserFields):
                                this.props.userField.fieldName} </h5>
                        <br/>
                        to SESAR field
                        <h5 className="subText inline"> {this.state.selectedField} </h5>
                    </h5>

                        <br/>
                        <br/>

                    <select className="form-control" id="sel2" name="sellist2"
                            disabled={this.isDisabled()} onChange={this.handleSelect} >

                        {firstMapOptions(this.props.sesarFields,this.props.userField.fieldName)}

                        </select>

                </div>

                <FormatSwitch
                              {...this.props}
                               collapseOnFinish = {this.collapseOnFinish}
                              format={this.state.format}
                              handleSelect={this.handleSelect}
                              originField={this.props.userField.fieldName}
                              selectedField={this.state.selectedField}
                              addConversionValue={this.props.addConversionValue}
                              registerExtraFields={this.registerExtraFields}
                              defaultUnit={this.props.defaultUnit}/>


            </div>)
    }
}

export default XRenderFormats;