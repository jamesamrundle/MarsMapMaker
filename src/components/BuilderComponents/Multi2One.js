import React, {Component} from 'react';
import "../css/MapBuilder.css"

class Multi2One extends Component {
    constructor(props) {
        super(props);
        this.state={field:null}
        this.setField=this.setField.bind(this);
        this.displayExample=this.displayExample.bind(this);
    }

    setField(e){
        console.log("in setfield", e)
        if(e) {
            var options = e.target.selectedOptions;
            console.log("M21", options);
            var fields = []
            Object.entries(options).map(
                (each) => {
                    console.log("M21", each[1].id);
                    fields = fields.concat(each[1].id)
                })
            this.setState({field: fields})
           // setField(e){this.setState({field:[e.target.value.split(" ")[0]]})}
        }}

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

    render() {
        return (
            <div className="fieldBox" >
                    <span>
                        <h3>{this.props.sesarValues.sesarField}</h3>
                        <h5 style={{fontStyle:"italic",color:"grey"}}>{this.displayExample()}</h5>
                    </span>
                <select multiple className="form-control" id="sel2" name="sellist2" onChange={(e)=>this.setField(e)}>
                    {this.renderChoices()}
                    {/*{this.props.userFields.map(each => {return <option id={each} >{each}</option>})}*/}
                    </select>
                <button onClick={()=>this.props.callback(this.state,this.props.sesarValues.sesarField,this.props.format)} >Make it so</button>
            </div>
        );
    }
}

export default Multi2One;