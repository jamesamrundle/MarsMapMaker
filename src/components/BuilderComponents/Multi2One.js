import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21 ,FORMAT_121} from "./Helpers/FileHelpers"
import {toggledUserOptions} from "./Helpers/renderSelectOptions"


/* Unlike other components where one maps sesar fields to their fields,
    this is a component in which users can choose to assign multiple
        userFields to the previously selected sesarField*/
class Multi2One extends Component {
    constructor(props) {
        super(props);
        this.state={currentFields:null }
    }



        getUnselected= () =>{
        let snapShot = this.state.snapShot;
        let selectedNow = this.state.currentFields;
        let wasSubmitted = (this.state.submittedFields) ? this.state.submittedFields : null;
        // console.log("snap",snapShot, "selectedNow",selectedNow)
        let removeMe = []
        // if(snapShot!= null) {
        //     for (var each of snapShot) {
        //         console.log("each",each)
        //         if ( selectedNow.indexOf(each) <0 ) removeMe.push(each)
        //     }
        // }
        if(wasSubmitted != null){
            for (var each of wasSubmitted) {
                console.log("each",each)
                if ( selectedNow.indexOf(each) <0 && removeMe.indexOf(each)<0) removeMe.push(each)
            }
        }

        // console.log("Remove these", removeMe)
            return removeMe
    }



    handleSelects = (e) =>{
        if(e) {
            var options = e.target.selectedOptions;
           // console.log("M21", options);
            var fields = []
            Object.entries(options).map( // creates array of selected userFields
                (each) => {
                    //console.log("M21", each[1].id);
                    fields = fields.concat(each[1].id)
                })
            this.setState({currentFields: fields})
        }}

    handleSubmit = () =>{

        this.setState({...this.state,submittedFields:this.state.currentFields})

        this.props.collapseOnFinish();

        this.props.registerExtraFields(this.state.currentFields);

        if(this.state.currentFields) {
            this.props.callBack({selectedField: this.props.selectedField},
                this.state.currentFields,
                FORMAT_M21,
                this.getUnselected())
        }
    }




    renderOptions= () =>{


       // console.log("M21 props",this.props)
        var defined = (value) => " Ex : "+(value.exampleValue!=""?value.exampleValue:"undefined")

        const allChoices = Object.entries(this.props.allUserFields).map(
            ([key, value]) =>{
                //if selected from other field
                if (!value.disabled)
                    return ( <option id={key} key={"UF" + key}  >
                        {key+" "}+ {defined(value) } </option>);
                //if selected by self
                if(((value.disabled === true) && (value.mappedTo !== this.props.selectedField)) ||
                    key === this.props.originField )
                    return ( <option   id={key} key={"UF" + key}
                                       disabled={value.disabled} >
                        {key+" "} +{defined(value)} </option>);
                //origin field
                else
                    return( <option   id={key} key={"UF" + key}
                                      style={{color:"red"}} >
                    {key+" "} +{defined(value)} </option>)
            });

        return allChoices;
    }

    displayExample=()=>{
        if(this.state.currentFields&&this.state.currentFields.length >0) {
            return (
                this.props.selectedField + " : " + "["+this.state.currentFields.toString()+"]"
            )
        }
        else return ""
    }


    render() {

        return (
            <div className="fieldElement" onFocus={()=>this.setState({snapShot:this.state.currentFields})} >
                    <span>
                        <h3>{this.props.selectedField}</h3>
                        <h5 className="subText">{this.displayExample()}</h5>
                    </span>
                <select multiple className="form-control" id="sel2" name="sellist2" onChange={(e)=>this.handleSelects(e)}>
                    {toggledUserOptions(this.props.allUserFields,this.props.selectedField,this.props.originField)}
                    </select>
                <button onClick={()=> this.handleSubmit()}  >Submit</button>
            </div>
        );
    }
}

export default Multi2One;