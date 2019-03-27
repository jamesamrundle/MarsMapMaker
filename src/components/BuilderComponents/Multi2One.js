import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21 ,FORMAT_121} from "./Helpers/FileHelpers"
import {toggledUserOptions} from "./Helpers/renderSelectOptions"
import ExtraM21Field from "./ExtraM21Field"


/* Unlike other components where one maps sesar fields to their fields,
    this is a component in which users can choose to assign multiple
        userFields to the previously selected sesarField*/
class Multi2One extends Component {
    constructor(props) {
        super(props);
        this.state={currentFields:[] }
    }





    setExtraM21Field = (selectedField, index) =>{
        console.log("alpa",this.props.selectedField , "selectedField",selectedField);

        this.props.setExtraM21Field(this.props.selectedField,selectedField, index)
    }

    removeExtraM21Field = (selectedField, index) =>{
        this.props.removeM21Field(this.props.selectedField,selectedField, index)
    }


    renderExtraFields = () =>{
           var mapValues;
            console.log("M21 PROPS",this.props)

        if(this.props.mapValues[this.props.selectedField]) {
               mapValues = this.props.mapValues[this.props.selectedField].userValues


               var retVal = [];
               if (mapValues) {
                   for (var i = 1; i < mapValues.length; i++) {
                       // retVal.push(this.selectField(this.props.allUserFields, mapValues[i], i))
                       retVal.push(<ExtraM21Field allUserFields ={this.props.allUserFields}
                                                    mapValues ={mapValues[i]}
                                                    index ={i}
                                                    originSesarField = {this.props.selectedField}
                                                    setExtraM21Field={this.setExtraM21Field}
                                                    removeM21Field={this.removeExtraM21Field}
                                                    multiCallBack = {this.props.multiCallBack}
                                                     />)

                   }
                   console.log(retVal)
                   console.log(this.props.fieldCount)
                   return retVal
               }
           }
            else return
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