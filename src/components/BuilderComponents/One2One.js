import React, {Component} from 'react';
import "../css/MapBuilder.css"
import One2DateFormat from "./One2DateFormat"

class One2One extends Component {
    constructor(props) {
        super(props);
        this.state={field:null}
        this.setField=this.setField.bind(this);
        this.displayExample=this.displayExample.bind(this);
        this.renderChoices=this.renderChoices.bind(this);

    }

    setField(e){this.setState({field:[e.target.value.split(" ")[0]]})}

    displayExample(){
        if(this.state.field&&this.state.field.length >0) {
            return (
                this.props.sesarValues.sesarName+ " : " + "["+this.state.field.toString()+"]"

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

    render() {
        // for(var each in this.props.userFelds){console.log("fuggmane",each)}
        if(this.props.format == "one2one"){
        return (
            <div className="fieldBox">
                    <span><h3>{this.props.sesarValues.sesarName}</h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>
                    </span>
                <select  className="form-control" id="sel2" name="sellist2" onChange={this.setField}
                    /*onBlur={()=>this.props.updateFields(this.state.field)}*/>
                    {this.renderChoices()}
                </select>
                <button onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarName, this.props.format)} >Make it so</button>

            </div>

        );}
        else if(this.props.format === "dateFormat"){
            return  <One2DateFormat className="fieldBox" sesarValues={this.props.sesarValues}
                                           userFields={this.props.userFields} userFelds={this.props.userFelds}
                                           format={this.props.format} callback={this.props.callBack}  />
        }
    return <line>hi</line>
    }
}

export default One2One;