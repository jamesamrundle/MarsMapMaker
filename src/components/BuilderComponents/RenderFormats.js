import React, {Component} from 'react';
import ConversionField from "./ConversionField"
import One2One from "./One2One"
import One2DateFormat from "./One2DateFormat"
import Multi2One from "./Multi2One"
import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21 ,FORMAT_121} from "../hoc/Builder_Helpers"


class RenderFormats extends Component {

    constructor(props) {

        console.log("in render formats")
        super(props);
        this.state = {format:this.props.sesarValues.fieldFormat}
        this.switchStatement = this.switchStatement.bind(this);
    }

    /*##### Updates State from props after radio button changeFormat callback*/
    componentWillReceiveProps(nextProps){
        this.setState({format: nextProps.sesarValues.fieldFormat})
    }


    switchStatement(){

        var  callBack = this.props.callback
        var value = this.props.sesarValues
        var userFields = this.props.userFields
        var userFelds = this.props.userFelds

        switch (this.state.format) {

            case FORMAT_DATE :                console.log("switch 12d")
                return <p></p>/*<One2DateFormat className="fieldBox" sesarValues={value}
                                    userFields={userFields} userFelds={userFelds}
                                    format={this.state.format} callback={callBack}/>*/
                break;

            case FORMAT_M21 :
                // console.log("switch m21")
                return/* <Multi2One className="fieldBox" sesarValues={value}
                                  userFields={userFields}  userFelds={userFelds}
                                  format={this.state.format} callback={callBack} />*/
                break;

            case FORMAT_CONV :
                // console.log("switch conv")
                return /*<ConversionField className="fieldBox" sesarValues={value}
                                        userFields={userFields} userFelds={userFelds}
                                        format={this.state.format} callback={callBack} />*/
                break;

            default:
                // console.log("switch default")
                return  <One2One className="fieldBox" sesarValues={value}
                                 userFields={userFields} userFelds={userFelds}
                                 format={value.fieldFormat} callback={callBack}/>;
        }
    }

    changeFormat(e){
       // console.log("WHART:",this.props.sesarValues.sesarField)
        this.props.changeFormat(e,this.props.sesarValues.sesarField)}
    render() {


        return(
            <div>

                <h3>{this.props.sesarValues.sesarField}</h3>

                {this.switchStatement()}

            {/*<form><fieldset>*/}
            {/*<legend>Format:</legend>*/}
            {/*<input type="radio" name="fieldFormat" value={FORMAT_121} onClick={(e) =>(this.changeFormat(e))} checked />One2One*/}
            {/*<input type="radio" name="fieldFormat" value={FORMAT_M21} onClick={(e) =>(this.changeFormat(e))}/>Multi2One*/}
            {/*<input type="radio" name="fieldFormat" value={FORMAT_CONV} onClick={(e) =>(this.changeFormat(e))}/>UnitConversion*/}
            {/*<input type="radio" name="fieldFormat" value={FORMAT_DATE} onClick={(e) =>(this.changeFormat(e))}/>DateFormat*/}
            {/*</fieldset></form>*/}

            </div>)
                }
}

export default RenderFormats;