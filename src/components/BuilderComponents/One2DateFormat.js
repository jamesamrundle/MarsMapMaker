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
    setField(e){this.setState({field:[e.target.value]})}

    displayExample(){
        if(this.state.field&&this.state.field.length >0) {
            return (
                this.props.sesarValues.sesarName+ " : " + "["+this.state.field.toString()+"]"

            )}
        else return ""
    }

    render() {
        return (
            <div className="fieldBox" >
                    <span className="col-sm-4"><h3>{this.props.sesarValues.sesarName}</h3>
                    <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>


                <select  className="form-control" id="sel2" name="sellist2" onChange={this.setField}
                        /*onBlur={()=>this.props.updateFields(this.state.field)}*/>
                    {this.props.userFields.map(each => {return <option id={each} >{each}</option>})}
                </select>
                        <button  onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarName, this.props.format)} >Make it so</button>

                    </span>
                <DateFormatter  className="col-sm-8"></DateFormatter>

            </div>
        );
    }
}

export default One2DateFormat;