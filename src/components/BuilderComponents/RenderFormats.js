import React, {Component} from 'react';
import ConversionField from "./ConversionField"
import One2One from "./One2One"
import One2DateFormat from "./One2DateFormat"
import Multi2One from "./Multi2One"

class RenderFormats extends Component {

    constructor(props) {

        console.log("in render formats")
        super(props);
        this.state = {format:this.props.format}
        this.switchStatement = this.switchStatement.bind(this);
    }


    switchStatement(){
        console.log("IN SWITCH")
       var  callBack = this.props.callback
        var value = this.props.sesarValues
        var userFields = this.props.userFields
        var userFelds = this.props.userFelds
        switch (value.fieldFormat) {

            case "dateFormat":
                return <One2DateFormat className="fieldBox" sesarValues={value}
                                    userFields={userFields} userFelds={userFelds}
                                    format={this.state.format} callback={callBack}/>


                /*this.renderDateFormat({...value},((e)=>{testFields[each].userValues=e.target.value;console.log(testFields)}));*/
                break;
            case"multi2one":
                return <Multi2One className="fieldBox" sesarValues={value}
                                  userFields={userFields}  userFelds={userFelds}
                                  format={this.state.format} callback={callBack} />

                // return this.rendermulti2One({...value},((e)=>{testFields[each].userValues=(Object.entries(e.target.selectedOptions).map(each=>{return each.id}));console.log(testFields)}));
                break;
            case "conversion":
                return <ConversionField className="fieldBox" sesarValues={value}
                                        userFields={userFields} userFelds={userFelds}
                                        format={this.state.format} callback={callBack} />
                /*this.renderConversion({...value},((e)=>{testFields[each].userValues=(e.target.value);console.log(testFields)}),
                    ((e)=>{testFields[each].unit=e.target.value;console.log("woo",testFields)}));*/
                break;
            default:
                return  <One2One className="fieldBox" sesarValues={value}
                                 userFields={userFields} userFelds={userFelds}
                                 format={value.fieldFormat} callback={callBack}
                                />;

        }
    }

    render() {
        console.log("special props:",this.props);

        return(
            <div>
                {this.switchStatement}

            <form><fieldset>
            <legend>Format:</legend>
            <input type="radio" name="fieldFormat" value="one2one" onClick={(e) =>this.props.changeFormat(e,this.props.sesarValues.sesarName)} checked />One2One
            <input type="radio" name="fieldFormat" value="multi2one" onClick={(e) =>this.props.changeFormat(e,this.props.sesarValues.sesarName)}/>Multi2One
            <input type="radio" name="fieldFormat" value="conversion" onClick={(e) =>this.props.changeFormat(e,this.props.sesarValues.sesarName)}/>UnitConversion
            <input type="radio" name="fieldFormat" value="dateFormat" onClick={(e) =>this.props.changeFormat(e,this.props.sesarValues.sesarName)}/>DateFormat
        </fieldset></form>
            </div>)
                }
}

export default RenderFormats;