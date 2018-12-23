import React, {Component} from 'react';
import ConversionField from "./ConversionField"
import One2One from "./One2One"
import One2DateFormat from "./One2DateFormat"
import Multi2One from "./Multi2One"
import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21 ,FORMAT_121} from "../hoc/Builder_Helpers"


class XRenderFormats extends Component {

    constructor(props) {

        console.log("in render formats")
        super(props);
        this.state = {format: this.props.format}
        this.switchStatement = this.switchStatement.bind(this);
    }

    /*##### Updates State from props after radio button changeFormat callback*/
    componentWillReceiveProps(nextProps) {
        this.setState({format: nextProps.sesarValues.fieldFormat})
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
                return "o2o"
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
                return  <div className="fieldBox">
                    <span><h3></h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.props.userField.exampleValue}</h5>
                    </span>

                    {JSON.stringify( this.props.userField)}
                    <select
                        /*onBlur={()=>this.props.updateFields(this.state.field)}*/>

                    {/*<XRenderFormats sesarValues={{[each]:{name:each,...value}}} userField={{[each]:{fieldName:each,...value}}}
                               userFields={userFields} sesarFields={this.state.sesarFields} userFelds={this.state.fields}
                                format={null} callback={callBack} changeFormat={changeFormat}/>*/}
                    </select>


                </div>
        }
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

                <h3>{this.props.userField.fieldName}</h3>

                {this.switchStatement()}

                <form><fieldset>
                    <legend>Format:</legend>
                    <input type="radio" name="fieldFormat" value={FORMAT_121} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_121)} />One2One
                    <input type="radio" name="fieldFormat" value={FORMAT_M21} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_M21)} />Multi2One
                    <input type="radio" name="fieldFormat" value={FORMAT_CONV} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_CONV)} />UnitConversion
                    <input type="radio" name="fieldFormat" value={FORMAT_DATE} onClick={(e) =>(this.changeFormat(e))} checked ={this.isCurrentFormat(FORMAT_DATE)} />DateFormat
                </fieldset></form>

            </div>)
    }
}

export default XRenderFormats;