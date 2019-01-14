

import React from "react";
import XRenderFormats from "../Main/XRenderFormats";

var defined = (value) => " Ex : "+(value.exampleValue!=""?value.exampleValue:"undefined")

//from XRenderFormats
export let firstMapOptions = (sesarFields,currentField) =>{
    const allChoices = Object.entries(sesarFields).map( //iterates through all sesar fields to propagate options
        ([key, value]) =>{
            if (!value.mappedTo == null || value.mappedTo === currentField) return (
                <option className="tooltip" title={value.message} id={key} key={"SO" + key} > {key} </option>
            );
            else return (
                <option  className="tooltip" title={value.message} id={key}  disabled={value.disabled} key={"SO" + key}> {key} </option>
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
                {key+" "}+ {defined(value) } </option>)
        else return (
            <option  className="tooltip" title={value.exampleValue}
                     id={key} disabled={value.disabled} >
                {key+" "} +{defined(value)} </option>
        )});

//from MultiToOne

export let toggledUserOptions = (allUserFields, selectedField,originField) => Object.entries(allUserFields).map(
    ([key, value]) =>{
        //if selected from other field
        if (!value.disabled)
            return ( <option id={key} key={"UF" + key}  >
                {key+" "}+ {defined(value) } </option>);
        //if selected by self
        if(((value.disabled === true) && (value.mappedTo !== selectedField)) ||
            key === originField )
            return ( <option   id={key} key={"UF" + key}
                               disabled={value.disabled} >
                {key+" "} +{defined(value)} </option>);
        //origin field
        else
            return( <option   id={key} key={"UF" + key}
                              style={{color:"red"}} >
                {key+" "} +{defined(value)} </option>)
    });

//from DefaultInfo

export let defaultInfoOptions=(allUserFields)=> {
    return Object.entries(allUserFields).map(([key, value]) =>{
        console.log("key",key,"value",value)
        return( <option  className="tooltip" title={value.exampleValue} id={key}  value={key} >
            {key+" "} +{defined(value)} </option>)
    });
};