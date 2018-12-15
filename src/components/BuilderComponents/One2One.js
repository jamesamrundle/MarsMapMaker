import React, {Component} from 'react';
import "../css/MapBuilder.css"

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
                )
            })

        return allChoices;
    }

    render() {
        // for(var each in this.props.userFelds){console.log("fuggmane",each)}
        Object.entries(this.props.userFelds).map(
            ([key, value]) => console.log("fugg:",key,"mane:", value.exampleValue)
        );
        return (
            <div className="fieldBox">
                    <span><h3>{this.props.sesarValues.sesarName}</h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>
                    </span>
                <select  className="form-control" id="sel2" name="sellist2" onChange={this.setField}
                    /*onBlur={()=>this.props.updateFields(this.state.field)}*/>

                    {/*{this.props.userFields.map(each => {return <option id={each} >{each}</option>})}*/}
                    {this.renderChoices()}
                </select>
                <button onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarName, this.props.format)} >Make it so</button>
            </div>

        );
    }
}

export default One2One;