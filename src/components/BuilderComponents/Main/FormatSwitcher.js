import ConversionField from "../ConversionField"
import React from "react"
import One2One from "../One2One"
import Multi2One from "../Multi2One"
import {FORMAT_CONV,FORMAT_DATE,FORMAT_M21 ,FORMAT_121} from "../Helpers/FileHelpers"


export function FormatSwitch(props){
    //console.log("praps",props)

    var userField = props.userField;

    switch (props.format)
    {

    case
        (FORMAT_121 || FORMAT_DATE)
    :
        // console.log("switch 121")
        return <One2One selectedField={props.selectedField}
                        changeFormat={props.changeFormat}
                        handleSelect={props.handleSelect}/>
        break;



    case
        FORMAT_M21 :
            // console.log("switch m21")
            return <Multi2One collapseOnFinish={props.collapseOnFinish}
                              selectedField={props.selectedField}
                              allUserFields={props.allUserFields}
                              decouple={props.decouple}
                              callBack={props.multiCallBack}
                              originField={props.originField}
                              registerExtraFields={props.registerExtraFields}/>
        break;

    case
        FORMAT_CONV :
            // console.log("switch conv")
            return <ConversionField selectedField={props.selectedField}
                                    allUserFields={props.allUserFields}
                                    callBack={props.multiCallBack}
                                    originField={props.originField}
                                    addConversionValue={props.addConversionValue}
                                    defaultUnit={props.defaultUnit}/>
        break;

    default:
        // console.log("switch default")
        return null
    }

}
