

import React from "react";
import XRenderFormats from "../Main/XRenderFormats";

export let allowedMulti = ["sample_comment","sample_description","field_name"];

var defined = (value) => " Ex : "+(value.exampleValue!=""?value.exampleValue:"undefined")

//from XRenderFormats
export let firstMapOptions = (sesarFields,currentField) =>{
    const allChoices = Object.entries(sesarFields).map( //iterates through all sesar fields to propagate options
        ([field, value]) =>{
            if (!value.mappedTo == null || value.mappedTo === currentField) return (
                <option className="tooltip" title={value.message} id={field} key={"SO" + field} > {field} </option>
            );
            else return (
                <option  className="tooltip" title={value.message} id={field}  disabled={value.disabled} key={"SO" + field}> {field} </option>
            )
        });

    // react renders array of elements
    return [<option id="nothing" value={"NULL"}>{"SELECT SESAR FIELD"}</option>].concat(allChoices);
};



// from ConversionField

export let conversionUserOptions = allUserFields => Object.entries(allUserFields).map(
    ([key, value]) =>{
        if (!value.disabled) return (
            <option className="tooltip" title={value.exampleValue} id={key}  >
                {key+" "}</option>)
        else return (
            <option  className="tooltip" title={value.exampleValue}
                     id={key} disabled={value.disabled} >
                {key+" "}</option>
        )});

//from MultiToOne
                                                //NULL         //sample_comment
export let toggledUserOptions = (allUserFields, selectedField,originField) =>{
   var allChoices =  Object.entries(allUserFields).map(
    ([key, value]) =>{
        //if available?
        if (!value.disabled)
            return ( <option className="" title={value.exampleValue}
                             id={key} key={"UF" + key}  > {key}</option>);
        //if selected by self
        if(((value.disabled === true) && (key === selectedField )) )
            // || key === originField )
            return ( <option   className="" title={value.exampleValue}
                                id={key} key={"UF" + key}
                               selected={"selected"}
                               disabled={value.disabled} >

                               {key}</option>);
        //selected elsewhere
        else if(((value.disabled === true) && (key !== selectedField )) ){
            return ( <option   className="" title={value.exampleValue}
                               id={key} key={"UF" + key}

                               disabled={value.disabled} >

                {key}</option>);
            }
        //origin field
        //     else return( <option   className="" title={value.exampleValue}
        //                       id={key} key={"UF" + key}
        //                       style={{color:"red"}} >
        //
        //                       {key}</option>)
    });

        // react renders array of elements
        return [<option id="nothing" value={"NULL"}>{"SELECT FIELD"}</option>].concat(allChoices);
}

//from DefaultInfo

export let defaultInfoOptions=(allUserFields)=> {
    return Object.entries(allUserFields).map(([key, value]) =>{
        //console.log("key",key,"value",value)
        return( <option  className="tooltip" title={value.exampleValue} id={key}  value={key} >
            {key+" "} </option>)
    });
};