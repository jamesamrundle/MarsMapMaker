import React, {Component} from 'react';
import "../css/MapBuilder.css"

class ConversionField extends Component {
    constructor(props) {
        super(props);
        this.state={field:null,unit:null}
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

        const allChoices = Object.entries(this.props.userFelds).map(
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


    setField(e){this.setState({field:[e.target.value.split(" ")[0]]})}
    setUnit(e){this.setState({unit:e.target.value}); console.log("!!",this.state)}


    render() { //console.log("CONVERS",this.props)
        return (
            <div className="fieldBox" >
                    <span><h3>{this.props.sesarValues.sesarField}</h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>
                    </span>
                <select className="form-control" id="sel2" name="sellist2" onChange={this.setField}>
                    {this.renderChoices()}
                </select>
                <form>
                    <fieldset>
                        <legend>Your data is in:</legend>
                        <input type="radio" name="measure_unit" value="cm" onClick={this.setUnit}/>CM
                        <input type="radio" name="measure_unit" value="mm" onClick={this.setUnit}/>MM
                    </fieldset>
                </form>
                <button onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarField, this.props.format)} >Make it so</button>

            </div>
        );
    }
}

export default ConversionField;