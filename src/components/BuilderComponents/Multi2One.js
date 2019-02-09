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

selectField = (allUserFields) => {return (

            <div className="inline">


                    <button onClick={(e) => this.ADD(e)} className="inline fa fa-minus"/>



            <select className="form-control inline" id="sel2" name="sellist2"
                    >

                {toggledUserOptions(allUserFields)}

            </select>
        </div>
    )}

    renderExtraFields = () =>{
            var retVal = [];
            for(var i = 0;i < this.props.addFieldCount;i++){
                retVal.push(this.selectField(this.props.allUserFields))
            }
            console.log(retVal)
            console.log(this.props.fieldCount)
            return retVal
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
                        <h5 className="subText">{this.displayExample()}</h5>
                    </span>
                {this.renderExtraFields()}

            </div>
        );
    }
}
/*<select multiple className="form-control" id="sel2" name="sellist2" onChange={(e)=>this.handleSelects(e)}>
                    {toggledUserOptions(this.props.allUserFields,this.props.selectedField,this.props.originField)}
                    </select>
                <button onClick={()=> this.handleSubmit()}  >Submit</button>*/
export default Multi2One;