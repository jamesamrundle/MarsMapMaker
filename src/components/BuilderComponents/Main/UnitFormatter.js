import ConversionField from "../ConversionField"
import React from "react"
import One2One from "../One2One"
import Multi2One from "../Multi2One"
import {CM,MM} from "../Helpers/FileHelpers"
import "../../css/MapBuilder.css"



export let UnitFormatter = (props) =>{

    return(
    <div className="inline subContainer" >
        <fieldset>
            <legend>Default Measurement Unit:</legend>
            <input type="radio" name="measure_unit" value={CM} onClick={props.setUnit}/>CM
            <input type="radio" name="measure_unit" value={MM} onClick={props.setUnit}/>MM
        </fieldset>
    </div>
    )

}