import React, {Component} from 'react';
import {FormatSwitch} from "./FormatSwitcher";
import "../../css/MapBuilder.css"
import {firstMapOptions} from "../Helpers/renderSelectOptions"
import {handleOptionSelect} from "../Helpers/CallBacks"
import AddFieldButton from "./AddFieldButton";
import Multi2One from "../Multi2One";
import {FORMAT_M21} from "../Helpers/FileHelpers";



class XRenderFormats extends Component {

    constructor(props) {

        console.log("in render formats")
        super(props);
        this.state = {format: null,
            selectedField:null,
            disabledSelf:false,
            addField:0,

        }

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


    // renderMappingDisplay = (num) => {
    //    if(this.state["showExample"+num.toString()]){ return (
    //         <div>
    //             {num}
    //         <h5 className="verify">Mapping your field(s)</h5>
    //
    //     <h6 className="subText verify">{(this.state.extraUserFields != null)?
    //         this.props.userField.fieldName +" + "+JSON.stringify( this.state.extraUserFields):
    //         this.props.userField.fieldName} </h6>
    //
    //
    //
    //     <h5 className={"verify"} >to SESAR field&nbsp;{this.state.selectedField}</h5>
    //
    //             <input type={"radio"} onClick={()=>this.setState({["showExample"+num.toString()]: !this.state["showExample"+num.toString()]})} />
    //         </div>
    //
    // ) }
    // else return <div><input type="radio" onClick={()=>this.setState({["showExample"+num.toString()]: !this.state["showExample"+num.toString()]})} /></div>
    // }


    addField = (e) => {console.log("goin here"); this.setState(preState => ({addField:preState.addField+1}))}

    removeField = (format) => {console.log("removeField"); if(format === FORMAT_M21) this.setState(preState => ({addField:preState.addField+1}))
                            else { this.setState(preState => ({addField:0}))}}

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
            <div className="row">
                <div className="col-lg-1"/>
            <div className="card col-lg-10 " >

                <div className="card-header" >



                    <div className="col-lg-5">
                        <div className="inline col-lg-1">
                            <AddFieldButton allUserFields={this.props.sesarFields}
                                            addFieldOnClick={(e)=>this.addField(e)}
                                            format={this.state.format}
                                            selectedField={this.state.selectedField}/>
                        </div>
                        <FormatSwitch
                            {...this.props}
                            collapseOnFinish = {this.collapseOnFinish}
                            format={this.state.format}
                            handleSelect={this.handleSelect}
                            originField={this.props.userField.fieldName}
                            exampleValue={this.props.userField.exampleValue}
                            selectedField={this.state.selectedField}
                            addConversionValue={this.props.addConversionValue}
                            registerExtraFields={this.registerExtraFields}
                            defaultUnit={this.props.defaultUnit}
                            addFieldCount={this.state.addField}
                            removeField = {this.removeField}
                            />
                    </div>



                    <div className="col-lg-3">
                        <select className="form-control" id="sel2" name="sellist2"
                                disabled={this.isDisabled()} onChange={this.handleSelect} >

                            {firstMapOptions(this.props.sesarFields,this.props.userField.fieldName)}

                        </select>

                    </div>





            </div>

            </div>
            </div>)
    }
}

export default XRenderFormats;