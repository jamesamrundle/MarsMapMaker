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
        this.state = {format: this.props.format}
        this.switchStatement = this.switchStatement.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }



    switchStatement() {

        var callBack = this.props.callback
        var userField = this.props.userField
        var sesarFields = this.props.sesarFields
        var exampleValue = this.props.exampleValue
        // var changeFormat = this.props.changeFormat

        //how to switch rendering?

        switch (this.state.format) {

            case FORMAT_121 :
                console.log("switch 121")
                return <One2One selectedFields={this.state.selectedFields} changeFormat={this.props.changeFormat} handleSelect={this.handleSelect}/>
                break;

            case FORMAT_DATE :
                console.log("switch 12d")
                return "o2d"
                break;

            case FORMAT_M21 :
                // console.log("switch m21")
                return "m2o"
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

    handleSelect(e){
        var val = (e.target != null)? e.target.value : e;
        console.log("eeeeeeeeeeeeeeeeee",e)
        //console.log("val",this.props.sesarFields[val])
        //callback(this.state,this.props.sesarValues.sesarField, this.props.format)}
        var stateObj = {format:this.props.sesarFields[val].format,  selectedFields:[val] }

 this.setState(stateObj,
 () => this.props.callback(this.state,this.props.userField.fieldName,this.state.format) )
    }



    renderChoices(){
        const allChoices = Object.entries(this.props.sesarFields).map(
            ([key, value]) =>{
                if (!value.disabled) return (
                    <option className="tooltip" title={value.message} id={key}  >
                        {key}
                       </option>
                    )
                else return (
                    <option  className="tooltip" id={key}  disabled={value.disabled} >
                        {key}
                       </option>
                )});

        return [<option id="nothing">{"SELECT SESAR FIELD"}</option>].concat(allChoices);
    }


    changeFormat(e) {
        // console.log("WHART:",this.props.sesarValues.sesarField)
        this.props.changeFormat(e, this.props.sesarValues.sesarField)
    }

    isCurrentFormat(buttonFormat){
        return (this.state.format === buttonFormat)? "checked" : ""
    }

    render() {
        return(
            <div>
                {this.switchStatement()}

                <h3>{this.props.userField.fieldName}</h3>
                <div className="fieldBox">
                    <span><h3></h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.props.userField.exampleValue}</h5>
                    </span>

                    {JSON.stringify( this.props.userField)}
                    <select className="form-control" id="sel2" name="sellist2"
                            onChange={this.handleSelect}>

                        {this.renderChoices()}
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