import React from "react";
import handleFieldSelect from "../MapBuilder"
import renderOptions from "../MapBuilder"

export default function renderOne2One(each) {
    console.log("121", each)
    return (
        <div>
                    <span><h3>{each.sesarName}</h3>

                    </span>
            <select className="form-control" id="sel2" name="sellist2" on={handleFieldSelect}>
                <renderOptions cat={"ham"}></renderOptions>
            </select>
        </div>
    )
}

export function renderDateFormat(each) {
    return (
        <div>
                    <span><h3>{each.sesarName}</h3>

                    </span>
            <select className="form-control" id="sel2" name="sellist2">
                <this.renderOptions cat={"yes"}></this.renderOptions>
            </select>

            <input defaultValue="COLLECTION START DATE"></input>
        </div>
    )

}

export function rendermulti2One(each) {
    console.log("multi", each)
    return (

        <div>
                    <span><h3>{each.sesarName}</h3>

                    </span>
            <select multiple className="form-control" id="sel2" name="sellist2">
                <this.renderOptions cat={"what"}></this.renderOptions>
            </select>
        </div>
    )
}

export function renderConversion(each) {
    return (
        <div>
                    <span><h3>{each.sesarName}</h3>
                    </span>
            <select className="form-control" id="sel2" name="sellist2">
                <this.renderOptions cat={"ok"}></this.renderOptions>
            </select>
            <form>
                <fieldset>
                    <legend>Your data is in:</legend>
                    <input type="radio" name="measure_unit" value="cm"></input>CM
                    <input type="radio" name="measure_unit" value="mm"></input>MM
                </fieldset>
            </form>

        </div>
    )
}