import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {conversionUserOptions} from "./Helpers/renderSelectOptions"
import {CM,MM} from "./Helpers/FileHelpers"

class ConversionField extends Component {
    constructor(props) {
        super(props);
        this.state={field:null,unit:null, addValue: false}
        this.displayExample=this.displayExample.bind(this);

        this.setField=this.setField.bind(this);
        this.setUnit=this.setUnit.bind(this);
    }

    displayExample(){
        if(this.state.field&&this.state.field.length >0) {
            return (
                this.props.sesarValues.sesarField+ " : " + "["+this.state.field.toString()+"]"
            )}
        else return ""
    }

    renderChoices(){
        var defined = (value) => " Ex : "+(value.exampleValue!=""?value.exampleValue:"undefined")

        const allChoices = Object.entries(this.props.allUserFields).map(
            ([key, value]) =>{
                if (!value.disabled) return (
                    <option id={key}  >
                        {key+" "}+ {defined(value) } </option>)
                else return (
                    <option   id={key} disabled={value.disabled} >
                        {key+" "} +{defined(value)} </option>
                )});
        return allChoices;
    }

    extraUnitField = () =>{
        if(this.state.addValue===true) {
            return (
                <div>
                    <h4> Complete data to {this.props.selectedField} is comprised of</h4>
                    <h4> {this.props.originField} and : </h4>
                    <br/>
                    <select className="form-control" id="sel2" name="sellist2" onChange={this.setField}>
                        {conversionUserOptions(this.props.allUserFields)}
                    </select>
                    <fieldset>
                        <legend>This data is in:</legend>
                        <input type="radio" name="measure_unit" value={CM} onClick={this.setUnit}/>CM
                        <input type="radio" name="measure_unit" value={MM} onClick={this.setUnit}/>MM
                    </fieldset>
                </div>
            )
        }
    }


    setField(e){this.setState({field:e.target.value.split(" ")[0] , showConv:true})}

    setUnit(e){this.setState({unit:e.target.value}); console.log("!!",this.state)}

    toggleAdd = () =>{ this.setState({addValue:!this.state.addValue})}

    submitSelection = () => {
        this.props.addConversionValue(this.props.selectedField,
            {field: this.state.field , unit: this.state.unit })
    }

    showConversion = () => {
        if(this.state.field){
            let defaultVal = this.props.allUserFields[this.props.originField].exampleValue;
            let extraVal = this.props.allUserFields[this.state.field].exampleValue;
            extraVal = (extraVal === undefined) ? 0 : extraVal;
            let defaultUnit = this.props.defaultUnit;
            let scalar = 0;


            if (defaultUnit === CM) {
                if (this.state.unit === MM) {
                    scalar = 1 / 10;
                }
            }
            if (defaultUnit === MM) {
                if (this.state.unit === CM) {
                    scalar = 10;
                }
            }

            if (this.state.showConv) {
                return (
                    <div>
                        <h4>
                        {defaultVal}{defaultUnit} + {extraVal}{this.state.unit} for a total submitted value
                        of { Number(defaultVal) + Number(extraVal * scalar)}</h4>
                    </div>
                )
            }
        }
    }


    showButton = () => {
       let  {unit, field} = this.state;

        if (this.state.addValue === false){
            return <div>
                <p>Do additional fields comprise the whole data?</p>
                <button onClick={()=>this.toggleAdd()}> Yes</button>
            </div>
        }
        if(this.state.addValue !== false && (unit !== undefined && field !== undefined)){
            return <div>
            <button onClick={()=>this.submitSelection()} >
                Submit</button>
            </div>
        }
    }

    render() { //console.log("CONVERS",this.props)
        return (
            <div className="fieldElement" >
                {this.extraUnitField()}
                {this.showConversion()}

                {this.showButton()}

            </div>
        );
    }
}

export default ConversionField;