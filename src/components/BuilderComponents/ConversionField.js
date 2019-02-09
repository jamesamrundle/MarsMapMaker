import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {conversionUserOptions} from "./Helpers/renderSelectOptions"
import {CM, FORMAT_CONV, FORMAT_M21, MM} from "./Helpers/FileHelpers"

class ConversionField extends Component {
    constructor(props) {
        super(props);
        this.state = {field: null, unit: null, addValue: false}
        this.displayExample = this.displayExample.bind(this);

        this.setField = this.setField.bind(this);
        this.setUnit = this.setUnit.bind(this);
    }

    displayExample() {
        if (this.state.field && this.state.field.length > 0) {
            return (
                this.props.sesarValues.sesarField + " : " + "[" + this.state.field.toString() + "]"
            )
        }
        else return ""
    }

    getUnselected = () => {

        let selectedNow = this.state.field;
        let wasSubmitted = (this.state.submittedField) ? this.state.submittedField : null;
        // console.log("snap",snapShot, "selectedNow",selectedNow)
        let removeMe=[];
        // if(snapShot!= null) {
        //     for (var each of snapShot) {
        //         console.log("each",each)
        //         if ( selectedNow.indexOf(each) <0 ) removeMe.push(each)
        //     }
        // }
        if (wasSubmitted != null) {

            if (selectedNow != wasSubmitted) removeMe=[wasSubmitted]
        }
    console.log("removeme!",removeMe)
    return removeMe
}


extraUnitField = () =>{
        if(this.props.addFieldCount > 0) {
            return (
                <div className="inline">

                    <button onClick={(e) => this.removeSelection(e)} className="inline fa fa-minus"/>

                    <select className="form-control inline inline-grid" id="sel2" name="sellist2" onChange={this.setField}>
                        {conversionUserOptions(this.props.allUserFields)}
                    </select>
                    <div className={"unit inline"}>

                        <input  type="radio" name="measure_unit" value={CM} onClick={this.setUnit}/>CM <br/>
                        <input type="radio" name="measure_unit" value={MM} onClick={this.setUnit}/>MM
                    </div>

                </div>
            )
        }
    }



    setUnit(e){
        this.setState({unit:e.target.value},
        this.addConversionValue )   }

    addConversionValue =()=>{ //wrap callback in a methodless function for passing as second arg to setState
        this.props.addConversionValue(this.props.selectedField,
            {field: this.state.field , unit: this.state.unit }) }

    toggleAdd = () =>{ this.setState({addValue:!this.state.addValue})}

    setField(e){
        this.setState({field:e.target.value.split(" ")[0] , showConv:true},
            this.submitSelection)}

    removeFieldCallBack = () =>{ this.props.removeFieldCallBack(this.state.field,this.props.selectedField)}

    removeSelection = () =>{console.log("removeselection");
        this.props.removeField(FORMAT_CONV);
        this.removeFieldCallBack();
        this.setState({field:null},)
    }



    submitSelection = () => {

        if(this.state.field) {
            this.props.callBack({selectedField: this.props.selectedField},
                [this.state.field], //because callback fcts expect array for these values
                FORMAT_CONV,
                this.getUnselected())
        }

        this.setState({submittedField : this.state.field})
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
                else scalar=1
            }
            if (defaultUnit === MM) {
                if (this.state.unit === CM) {
                    scalar = 10;
                }
                else scalar=1

            }

            if (this.state.showConv) {
                return (
                    <div className="inline verify">
                        <h5>
                        {defaultVal}{defaultUnit} + {extraVal}{this.state.unit} for a total submitted value
                        of { Number(defaultVal) + Number(extraVal * scalar)}</h5>
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
                {/*{this.showButton()}*/}
                {/*{this.showConversion()}*/}
            </div>

        );
    }
}

export default ConversionField;