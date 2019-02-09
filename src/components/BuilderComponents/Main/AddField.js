import ConversionField from "../ConversionField"
import React, {Component} from "react"
import One2One from "../One2One"
import Multi2One from "../Multi2One"
import {CM, FORMAT_CONV, FORMAT_M21, MM} from "../Helpers/FileHelpers"
import "../../css/MapBuilder.css"
import {conversionUserOptions, firstMapOptions} from "../Helpers/renderSelectOptions";
import {allowedMulti} from "./Helpers/renderSelectOptions"



class AddFieldButton extends Component {

    constructor(props) {
        super(props);
        this.state={fieldCount:0}
    }



    selectField = (allUserFields) => {return (
        <div className={""}>
            <select className="form-control" id="sel2" name="sellist2"
                    >

                {conversionUserOptions(allUserFields)}

            </select>
        </div>
    )}



     renderExtraFields = (allUserFields) =>{
        var retVal = [];
        for(var i = 0;i < this.state.fieldCount;i++){
            retVal.push(this.selectField(allUserFields))
        }
        console.log(retVal)
        console.log(this.state.fieldCount)
        return retVal
    }

    render() {
        let props = this.props;
        if (props.format == FORMAT_CONV || allowedMulti.includes(props.selectedField) ) {
            return (
                <div className="inline">
                    <div >


                            <button onClick={() => this.setState({fieldCount:this.state.fieldCount+1})} className="fa fa-plus"></button>

                        <br/>
                    </div>
                    <br/>
                    {this.renderExtraFields(props.allUserFields)}
                </div>
            )
        }
        else return null
    }
}

export default AddFieldButton;