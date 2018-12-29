import React, {Component} from 'react';
import ConversionField from "./ConversionField"
import One2One from "./One2One"
import One2DateFormat from "./One2DateFormat"
import Multi2One from "./Multi2One"
import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21 ,FORMAT_121} from "../hoc/Builder_Helpers"
import "../css/tooltip.css"
import "../css/MapBuilder.css"
import _ from "lodash"


class XRenderFormats extends Component {

    constructor(props) {

        console.log("in render formats")
        super(props);
        this.state = {format: this.props.format, selectedField:null, disabledSelf:false}
        this.formatSwitch = this.formatSwitch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }



    formatSwitch() {

        var callBack = this.props.callBack
        var userField = this.props.userField
        var sesarFields = this.props.sesarFields
        var exampleValue = this.props.exampleValue
        // var changeFormat = this.props.changeFormat



        switch (this.state.format) {

            case FORMAT_121 :
                console.log("switch 121")
                return <One2One selectedField={this.state.selectedField} changeFormat={this.props.changeFormat} handleSelect={this.handleSelect}/>
                break;

            case FORMAT_DATE :
                console.log("switch 12d")
                return "o2d"
                break;

            case FORMAT_M21 :
                // console.log("switch m21")
                //return "m2o"
                return <Multi2One selectedField={this.state.selectedField} allUserFields={this.props.allUserFields}
                                  decouple={this.props.decouple} callBack={this.props.multiCallBack} originField={userField.fieldName} />
                break;

            case FORMAT_CONV :
                // console.log("switch conv")
                return "conv"
                break;




            default:
                // console.log("switch default")
                return
        }
    }

    /*in order to make this function as confusing as possible, it handles default event action in this component
    for selecting initial sesar field, as well as updating state:format,
    when user decides to map multiple user fields to one sesarField by passing the field .*/
    handleSelect(event){
        var val = (event.target != null)? event.target.value : event;
        var isProperEvent = (event.target != null);

        var stateObj = {format:this.props.sesarFields[val].format,  selectedField:val ,disabledSelf:(val!== "NULL")}

        this.setState(stateObj,
            () => {if(isProperEvent)
                this.props.callBack(this.state,this.props.userField.fieldName,this.state.format) } )
    }

   // handleFormatToMulti(e,sesarField){ this.props.handleFormatToMulti(e,sesarField)}

    renderSesarFields(){
        const allChoices = Object.entries(this.props.sesarFields).map(
            ([key, value]) =>{
                if (!value.mappedTo == null || value.mappedTo === this.props.userField.fieldName) return (
                    <option className="tooltip" title={value.message} id={key} > {key} </option>
                    )
                else return (
                    <option  className="tooltip" id={key}  disabled={value.disabled} > {key} </option>
                )
            });

        return [<option id="nothing" value={"NULL"}>{"SELECT SESAR FIELD"}</option>].concat(allChoices);
    }


    changeFormat(e) { this.props.changeFormat(e, this.props.sesarValues.sesarField) }

    isCurrentFormat(buttonFormat){ return (this.state.format === buttonFormat)? "checked" : "" }

    isDisabled(){return (this.props.userField.disabled && !this.state.disabledSelf)?  true: false}

    render() {
        return(
            <div >
                {this.formatSwitch()}

                <h3>{this.props.userField.fieldName}</h3>

                <div className="fieldBox">
                    <span>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.props.userField.exampleValue}</h5>
                    </span>

                    {JSON.stringify( this.props.userField)}

                    <select className="form-control" id="sel2" name="sellist2"
                            disabled={this.isDisabled()} onChange={this.handleSelect} >
                        {this.renderSesarFields()}
                    </select>

                </div>



                {/*<form><fieldset>
                    <legend>Format:</legend>
                    <input type="radio" name="fieldFormat" value={FORMAT_121} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_121)} />One2One
                    <input type="radio" name="fieldFormat" value={FORMAT_M21} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_M21)} />Multi2One
                    <input type="radio" name="fieldFormat" value={FORMAT_CONV} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_CONV)} />UnitConversion
                    <input type="radio" name="fieldFormat" value={FORMAT_DATE} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_DATE)} />DateFormat
                </fieldset></form>*/}

            </div>)
    }
}

export default XRenderFormats;