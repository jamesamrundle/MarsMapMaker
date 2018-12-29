import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21 ,FORMAT_121} from "../hoc/Builder_Helpers"


class Multi2One extends Component {
    constructor(props) {
        super(props);
        this.state={currentFields:null  }

        this.setField=this.setField.bind(this);
    }



        handleReselects(){
        var snapShot = this.state.snapShot;
        var selectedNow = this.state.currentFields;
        var wasSubmitted = (this.state.submittedFields) ? this.state.submittedFields : null;
        // console.log("snap",snapShot, "selectedNow",selectedNow)
        var removeMe = []
        if(snapShot!= null) {
            for (var each of snapShot) {
                console.log("each",each)
                if ( selectedNow.indexOf(each) <0 ) removeMe.push(each)
            }}
            if(wasSubmitted != null){
            for (var each of wasSubmitted) {
                console.log("each",each)
                if ( selectedNow.indexOf(each) <0 && removeMe.indexOf(each)<0) removeMe.push(each)
            }}

        // console.log("Remove these", removeMe)
            return removeMe
    }



    setField(e){
        // console.log("in setfield", e)
        if(e) {
            var options = e.target.selectedOptions;
            console.log("M21", options);
            var fields = []
            Object.entries(options).map(
                (each) => {
                    console.log("M21", each[1].id);
                    fields = fields.concat(each[1].id)
                })
            this.setState({currentFields: fields})
            // setField(e){this.setState({field:[e.target.value.split(" ")[0]]})}
        }}

    handleSubmit(){

        this.setState({...this.state,submittedFields:this.state.currentFields})
        this.props.callBack({selectedField:this.props.selectedField},
            this.state.currentFields,
            FORMAT_M21,
            this.handleReselects())
    }




    renderChoices(){


       // console.log("M21 props",this.props)
        var defined = (value) => " Ex : "+(value.exampleValue!=""?value.exampleValue:"undefined")

        const allChoices = Object.entries(this.props.allUserFields).map(
            ([key, value]) =>{
                if (!value.disabled)
                    return ( <option id={key}  >
                        {key+" "}+ {defined(value) } </option>);

                if(((value.disabled === true) && (value.mappedTo !== this.props.selectedField)) ||
                    key === this.props.originField )
                    return ( <option   id={key} disabled={value.disabled} >
                        {key+" "} +{defined(value)} </option>);

                else
                    return( <option   id={key} style={{color:"red"}} >
                    {key+" "} +{defined(value)} </option>)
            });

        return allChoices;
    }

    render() {

        var displayExample=()=>{
            if(this.state.currentFields&&this.state.currentFields.length >0) {
                return (
                    this.props.selectedField+ " : " + "["+this.state.currentFields.toString()+"]"
                )}
            else return ""
        }

        return (
            <div className="fieldBox" onFocus={()=>this.setState({snapShot:this.state.currentFields})} > {/*onBlur={console.log("remove",this.handleReselects())}>*/}
                    <span>
                        <h3>{this.props.selectedField}</h3>
                        <h5 style={{fontStyle:"italic",color:"grey"}}>{displayExample()}</h5>
                    </span>
                <select multiple className="form-control" id="sel2" name="sellist2" onChange={(e)=>this.setField(e)}>
                    {this.renderChoices()}
                    </select>
                <button onClick={()=> this.handleSubmit()}  >Make it so</button>
            </div>
        );
    }
}

export default Multi2One;