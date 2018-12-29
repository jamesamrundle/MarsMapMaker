import React from "react";
import * as d3 from "d3-dsv";


    export const FORMAT_M21 = "multi2one";
    export const FORMAT_DATE = "dateFormat";
    export const FORMAT_CONV = "conversion";
    export const FORMAT_121 = "one2one";

  export  async function readToText(file) {

        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsText(file);
        });

    };


   export async function fileTextToState(fileContents) {
        var userFields = d3.csvParse(fileContents)
        // console.log("CSV", userFields)//all data
        // console.log("cols:", userFields.columns) //column names
        // console.log("uf0", userFields[0]); //column,value of first inputs
        var tempStateObject = {}
        Object.keys(userFields[0]).map(each => {

                tempStateObject[each] = {
                    disabled: false,
                    exampleValue: userFields[0][each]
                } //logs first value of field
            }
        )
        return tempStateObject;
    }//this.state.fields."each"


// export function kallBack(sesarValues,userField,format){ //on button click toggles disable for option and sets mapping variable
//     if(sesarValues.selectedField.length > 1) console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
//     console.log("vallbacking",sesarValues,"uf",userField,"form",format)
//     // disableUserField(userField);
//     this.disableSesarFields(sesarValues);
//     this.addToBeMapped(userField,sesarValues,format)
//     this.setUserField(userField,sesarValues);
// };