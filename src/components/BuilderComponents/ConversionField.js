import React, {Component} from 'react';

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
                this.props.sesarValues.sesarName+ " : " + "["+this.state.field.toString()+"]"

            )}
        else return ""
    }

    userFields= this.props.userFields;

    renderOptions(){ if(this.props.userFields != null ){
        return (this.userFields.map(each => {return <option id={each} >{each}</option>}))
    }}
    setField(e){this.setState({field:[e.target.value]})}
    setUnit(e){this.setState({unit:e.target.value}); console.log("!!",this.state)}


    render() { console.log("CONVERS",this.props)
        return (
            <div>
                    <span><h3>{this.props.sesarValues.sesarName}</h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>
                    </span>
                <select className="form-control" id="sel2" name="sellist2" onChange={this.setField}
                        onBlur={()=>this.props.updateFields(this.state.field)}>
                    {this.props.userFields.map(each => {return <option id={each} >{each}</option>})}
                    {/*<this.renderOptions cat={"ok"}></this.renderOptions>//callback for this shittttttt*/}
                </select>
                <form>
                    <fieldset>
                        <legend>Your data is in:</legend>
                        <input type="radio" name="measure_unit" value="cm" onClick={this.setUnit}/>CM
                        <input type="radio" name="measure_unit" value="mm" onClick={this.setUnit}/>MM
                    </fieldset>
                </form>
                <button onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarName, this.props.format)} >Make it so</button>

            </div>
        );
    }
}

export default ConversionField;