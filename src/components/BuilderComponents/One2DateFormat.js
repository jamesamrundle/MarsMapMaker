import React, {Component} from 'react';
import DateFormatter from "./DateFormatter"
import "../css/MapBuilder.css"


class One2DateFormat extends Component {
    constructor(props) {
        super(props);
        this.state={field:null}
        this.displayExample=this.displayExample.bind(this);

        this.setField=this.setField.bind(this);
    }

    // setField(e){this.setState({field:[e.target.value]})}
    setField(e){this.setState({field:[e.target.value.split(" ")[0]]})}


    displayExample(){
        if(this.state.field&&this.state.field.length >0) {
            return (
                this.props.sesarValues.sesarField+ " : " + "["+this.state.field.toString()+"]"

            )}
        else return ""
    }

    renderChoices(){

        var defined = (value) => " Ex : "+(value.exampleValue!=""?value.exampleValue:"undefined")

        const allChoices =(
        Object.entries(this.props.userFelds).map(
            ([key, value]) =>{
                if (!value.disabled) return (
                    <option id={key}  >
                        {key+" "}+ {defined(value) } </option>)
                else return (
                    <option   id={key} disabled={value.disabled} >
                        {key+" "} {defined(value)} </option>
                )}))

        return   [<option id="nothing">{"SELECT AN OPTION"}</option>].concat(allChoices)
    }

    render() {
        return (
            <div className="fieldBox" >
                    <span className="col-sm-4"><h3>{this.props.sesarValues.sesarField}</h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>


                <select  className="form-control" id="sel2" name="sellist2" onChange={this.setField}
                        /*onBlur={()=>this.props.updateFields(this.state.field)}*/>
                    {/*{this.props.userFields.map(each => {return <option id={each} >{each}</option>})}*/}
                    {this.renderChoices()}
                </select>
                        <button  onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarField, this.props.format)} >Make it so</button>

                    </span>
                <DateFormatter  className="col-sm-8"></DateFormatter>

            </div>
        );
    }
}

export default One2DateFormat;