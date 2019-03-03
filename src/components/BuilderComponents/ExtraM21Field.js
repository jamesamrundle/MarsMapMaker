import React, {Component} from 'react';
import {FORMAT_M21} from "./Helpers/FileHelpers";
import {toggledUserOptions} from "./Helpers/renderSelectOptions";

class ExtraM21Field extends Component {
    constructor(props) {
        super(props);
        this.state={selectedField:[] }
    }

    handleSelects = (e) =>{
        var extraField = e.target.value;
        if(extraField) {

            this.setState({selectedField: extraField},this.handleSubmit)
        }}

    handleSubmit = () =>{

        //function to set current fields in M21 Component
            //this.setState({...this.state,submittedFields:this.state.currentFields})



        //this.props.registerExtraFields(this.state.currentFields); // 2/10 i think its redundant

        if(this.state.selectedField!== "NULL") {
            this.props.setExtraM21Field(this.state.selectedField,this.props.index)
            //,this.getUnselected())
        }
    }

    // handleMinus=()=>{
    //          INSTEAD, CALL DELETE FUNCTION AND WILL NOT BE RENDERED ON NEXT REFRESH
    //
    //     console.log("remove ",thisInput," => ",currentFields)
    //
    //     this.setState({...this.state,currentFields:currentFields},this.minusCallBack)
    //
    //     this.props.minusField(FORMAT_M21)
    // }

    handleMinus=()=>{if(this.state.selectedField) {
        this.props.removeM21Field(this.props.mapValues,this.props.index)

    }}






    render() {
        let {allUserFields} =  this.props;
        return (
            <div className="inline">


                <button onClick={() =>this.handleMinus() } className="inline fa fa-minus"/>



                <select className="form-control inline" id="sel2" name="sellist2" onChange={(e)=>this.handleSelects(e)}
                >

                    {toggledUserOptions(allUserFields,this.props.mapValues)}

                </select>
            </div>
        );
    }
}

export default ExtraM21Field;