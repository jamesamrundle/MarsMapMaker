import React, {Component} from 'react';
import {FormatSwitch} from "./FormatSwitcher";
import "../../css/MapBuilder.css"
import {firstMapOptions} from "../Helpers/renderSelectOptions"
import {handleOptionSelect} from "../Helpers/CallBacks"
import AddFieldButton from "./AddFieldButton";
import Multi2One from "../Multi2One";
import {CM, FORMAT_121, FORMAT_CONV, FORMAT_DATE, FORMAT_M21, MM} from "../Helpers/FileHelpers";
import {isEmpty} from "lodash"



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
        console.log("THIS IS VAL",val)
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


    addField = (e) => {console.log("goin here"); this.setState(preState => ({addField:preState.addField+1}),this.props.addExtraM21Field(this.state.selectedField))}

    minusField = (format) => {console.log("minusField"); if(format === FORMAT_M21) this.setState(preState => ({addField:preState.addField-1}))
                            else { this.setState(preState => ({addField:0}))}}

    //changeFormat= (e) =>{ this.props.changeFormat(e, this.props.sesarValues.sesarField) }

    isDisabled = () =>{return (this.props.userField.disabled && !this.state.disabledSelf)?  true: false};

    // collapseOnFinish = () => this.setState({collapse:true});
    //
    // expandOnEdit = () => this.setState({collapse:false})

    registerExtraFields=(fields)=> this.setState({extraUserFields:fields})

    conversionFormat = (field) => {
        let {allUserFields, userField, defaultUnit, mapValues} = this.props;
        let {selectedField} = this.state;

        console.log("MAPVALFIELD",mapValues[field],mapValues[field] === undefined)
        if(mapValues[field] !== undefined){
            console.log("allUserFields[mapValues[selectedField].userValues[0]]",allUserFields[mapValues[selectedField].userValues[0]])
            console.log("mapValues[selectedField]",mapValues[selectedField])
            let defaultVal = allUserFields[mapValues[selectedField].userValues[0]].exampleValue;
            let extraVal = "";
            if(mapValues[selectedField].userValues[1] !== undefined &&
                    mapValues[selectedField].userValues[1] !== "NULL") {
                extraVal = allUserFields[mapValues[selectedField].userValues[1]].exampleValue
            } else {
                extraVal = "" } ;
            extraVal = (extraVal === "") ? 0 : extraVal;
            // let defaultUnit = defaultUnit;
            let scalar = 0;

            let extraUnit = (mapValues[selectedField].extra !== undefined ? 
                            mapValues[selectedField].extra.unit : "NULL")
            if (defaultUnit === CM) {
                if (extraUnit === MM) {
                    scalar = 1 / 10;
                }
                else scalar=1
            }
            if (defaultUnit === MM) {
                if (extraUnit === CM) {
                    scalar = 10;
                }
                else scalar=1

            }


                return (
                    <div className="inline verify">
                        <a>
                            {selectedField}:{ Number(defaultVal) + Number(extraVal * scalar)}</a>
                    </div>
                )

        }
    }

    dateFormat = (field,format) =>{
        let {allUserFields, userField, defaultUnit, mapValues} = this.props;

        let {selectedField} = this.state;
        let dateInput;

        if( mapValues.userDateFormat=== undefined) return <a>SET DATE FORMATTING AT TOP OF PAGE</a>
            else dateInput = mapValues.userDateFormat
        if(mapValues.selectedField === undefined) return <a>NO MAP VALS</a>

        if(allUserFields[selectedField].exampleValue !== undefined){
            let exampleValue = allUserFields[selectedField].exampleValue;

            let returnValue = exampleValue.substring(dateInput.indexOf("Y"),dateInput.lastIndexOf("Y")+1)+"-"+
                exampleValue.substring(dateInput.indexOf("M"),dateInput.lastIndexOf("M")+1)+"-"+
                exampleValue.substring(dateInput.indexOf("D"),dateInput.lastIndexOf("D")+1)

            return <a>{selectedField}:{returnValue}</a>
        }
        return "SORRY"
    }

    m21Format = (field, format) =>{
        let {allUserFields, userField, defaultUnit, mapValues} = this.props;

        let {selectedField} = this.state;

        let theseFields = mapValues[selectedField] !== undefined ? mapValues[selectedField].userValues : " "
        console.log("M21 BBY",theseFields, format)

        let values =  Object.entries(theseFields).map(
            ([each, value]) =>{
                console.log("wat each",each,value, format);
                if(allUserFields[value] !== undefined) {
                    if (format === FORMAT_M21)
                        return <a>{value}:{allUserFields[value].exampleValue},</a>
                    else
                        return <a>{allUserFields[value].exampleValue}</a>
                }
            });
        let example =( (format === FORMAT_M21 ? <a>{selectedField}: [{values}]</a> : <a>{selectedField}: {values}</a>))
        console.log("EX>",example)
        return  <div className="inline verify">{example}</div>
    }

    returnFieldMapValues=(field,format)=>{
        console.log("returnfieldmapvals",field, format)
        format = this.state.selectedField === "sample_comment" ? FORMAT_M21 : format
        console.log("returnfieldmapvals",field, format)

        if (format === null) return ""

        if(format === FORMAT_CONV){
            console.log("in format conv")
            return( <div>{this.conversionFormat(field)}</div>)
        }
        if(format === FORMAT_DATE){
            console.log("in format DATE")
            return( <div>{this.dateFormat(field)}</div>)
        }
        else
        {
            console.log("not format conv")

            return <div >{this.m21Format(field,format)}</div>
        }


    }

    render() {
        if(this.isDisabled()) {
            return null
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
                                            selectedField={this.state.selectedField}
                                            addExtraM21Field = {this.props.addExtraM21Field}/>
                        </div>
                        <FormatSwitch
                            {...this.props}
                           // collapseOnFinish = {this.collapseOnFinish}
                            format={this.state.format}
                            //handleSelect={this.handleSelect}
                            originField={this.props.userField.fieldName}
                            exampleValue={this.props.userField.exampleValue}
                            selectedField={this.state.selectedField}
                            addConversionValue={this.props.addConversionValue}
                            registerExtraFields={this.registerExtraFields}
                            defaultUnit={this.props.defaultUnit}
                            addFieldCount={this.state.addField}
                            minusField = {this.minusField}
                            mapValues = {this.props.mapValues}
                            setExtraM21Fields={this.props.setExtraM21Field}
                            removeM21Field={this.props.removeM21Field}
                            />
                    </div>



                    <div className="col-lg-3">
                        <select className="form-control" id="sel2" name="sellist2"
                                disabled={this.isDisabled()} onChange={this.handleSelect} >

                            {firstMapOptions(this.props.sesarFields,this.props.userField.fieldName)}

                        </select>

                    </div>


                <div>
                    {this.returnFieldMapValues(this.state.selectedField,this.state.format)}
                </div>


            </div>

            </div>
            </div>)
    }
}

export default XRenderFormats;