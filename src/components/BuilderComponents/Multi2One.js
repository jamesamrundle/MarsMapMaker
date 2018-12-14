import React, {Component} from 'react';

class Multi2One extends Component {
    constructor(props) {
        super(props);
        this.state={field:null}
        this.setField=this.setField.bind(this);
        this.displayExample=this.displayExample.bind(this);
    }
    setField(e){
       // this.setState({field:[e.target.value]});
    if(e) {
        var options = e.target.selectedOptions
        console.log("M21", options)
        var fields = []
        Object.entries(options).map(
            (each) => {
                console.log("M21", each[1].id);
                fields = fields.concat(each[1].id)
            })
        this.setState({field: fields})

    }}

    displayExample(){
        if(this.state.field&&this.state.field.length >0) {
         return (
        this.props.sesarValues.sesarName+ " : " + "["+this.state.field.toString()+"]"

    )}
        else return ""
    }

    userFields= this.props.userFields;
    render() {
        return (
            <div>
                    <span>
                        <h3>{this.props.sesarValues.sesarName}</h3>
                        <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>
                    </span>
                <select multiple className="form-control" id="sel2" name="sellist2" onChange={this.setField}
                        onBlur={()=>this.setField()}>
                        /*onBlur={()=>this.props.updateFields(this.state.field)}*/
                    {this.props.userFields.map(each => {return <option id={each} >{each}</option>})}
                    </select>
                <button onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarName,this.props.format)} >Make it so</button>
            </div>
        );
    }
}

export default Multi2One;