import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {readToText} from "./BuilderComponents/Helpers/FileHelpers"
import {fileTextToState} from "./BuilderComponents/Helpers/FileHelpers"
import './css/MapBuilder.css'
import  {fieldsDict}  from "./BuilderComponents/Helpers/fieldsDict.jsx"
import saveAs from 'file-saver';
import mapPrinter from "./BuilderComponents/Main/mapPrinter"
import XRenderFormats from "./BuilderComponents/Main/XRenderFormats"
import DefaultInfo from "./BuilderComponents/Main/DefaultInfo";
import legend from "../M3Legend.jpg"

import {removeMapValue, setUserField, addToBeMapped, enableSesarField,disableSesarField,enableUserField,decoupleOldUserFieldsMapValues} from "./BuilderComponents/Helpers/CallBacks"
import {LegendPopup} from "./LegendPopup";




class XMapBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            file: [], fields: {}, mapValues: {}, sesarFields:fieldsDict,
        }

    }


        handleFileUpload= async (e) =>{
        //console.log("e", e)
        await this.setState({file: e[0]})
        //console.log("state: ", this.state.file)

        const fileContents = await readToText(this.state.file)
        // console.log("fc:", fileContents);


        this.setState({fields:await fileTextToState(fileContents)})

    }



    // changeFormat=(e,sesarField)=>{
    //     var sesarFields = this.state.sesarFields;
    //     var newFormat = e.target.value;
    //
    //     if (newFormat !== sesarFields[sesarField].format) {
    //         var stateObject = sesarFields[sesarField];
    //         stateObject.format = newFormat;
    //         this.setState(preState => ({
    //             sesarFields: {...sesarFields,
    //                 [sesarField]: stateObject }
    //
    //         } ) )
    //     }
    // }

        currentMapValueFields=(oldVal)=>{return (this.state.mapValues[oldVal].userValues)};

    removeFieldCallBack = (oldField,originField) =>{

        let newFields = enableUserField(oldField,this.state.fields);
        let  newMapValues = {...this.state.mapValues};
        delete newMapValues[originField].extra ;
        newMapValues[originField].userValues = newMapValues[originField].userValues.splice(0,1)
        console.log(newMapValues);
        this.setState(preState => ({
            fields: newFields,

            mapValues : newMapValues //{...preState.mapValues, [sesarValues.selectedField]: newMapValue}
        }))
    }

    callBack =(sesarValues,userField,format,oldField)=> { //on button click toggles disable for option and sets mapping variable
        console.log("kallbacking", sesarValues, "uf", userField, "form", format , "oldfield",oldField)
        let newSesarFields = disableSesarField(this.state.sesarFields,sesarValues); //returns state.sesarFields
        let newMapValues = addToBeMapped(this.state.mapValues,userField, sesarValues, format); //returns state.mapValues
        console.log("new map values",newMapValues)
        let newFields = setUserField(this.state.fields,userField, sesarValues); //returns state.fields

        if(oldField !== null ) {
            console.log("made it!",oldField)
            let userFieldsToEnable = this.currentMapValueFields(oldField);
            newFields = enableUserField(userFieldsToEnable,newFields);
            newSesarFields = enableSesarField(oldField,newSesarFields);
            newMapValues = removeMapValue(oldField,newMapValues);

        }

        this.setState(preState => ({
            fields: newFields,
            sesarFields:  newSesarFields,
            mapValues : newMapValues //{...preState.mapValues, [sesarValues.selectedField]: newMapValue}
        }))
    };

    multiCallBack=(sesarValues,userField,format,oldValues)=> { //on button click toggles disable for option and sets mapping variable

        //sets mappedTo in new fields
        let newFields = setUserField(this.state.fields,userField, sesarValues); //returns state.fields
        // adds new MapValues
        let newMapValues = addToBeMapped(this.state.mapValues,userField, sesarValues, format); //returns state.mapValues
        //sets values no longer selected to not disabled and no mapped to
        newFields = enableUserField(oldValues,newFields)
        // removes oldvalues from MappingValues
        newMapValues = decoupleOldUserFieldsMapValues(oldValues,newMapValues[sesarValues.selectedField])



        this.setState(preState => ({
            fields: newFields,
            mapValues : {...preState.mapValues, [sesarValues.selectedField]: newMapValues}
        }))
    };


    renderfields=()=> {

        let userFields = Object.keys(this.state.fields);

        if (userFields.length > 0) {
            return Object.entries(this.state.fields).map(([each, value]) => { //each is the sesar field object
                   // console.log("renderformats",value)
                    return <div> <XRenderFormats
                                    key={"RF-"+each}
                                    userField={{fieldName:each,...value}}
                                    sesarFields={this.state.sesarFields}
                                    allUserFields={this.state.fields}
                                    decouple={this.decoupleOldUserFieldsMapValues}
                                    callBack={this.callBack} multiCallBack={this.multiCallBack} changeFormat={this.changeFormat}
                                    addConversionValue={this.addConversionValue}
                                    defaultUnit={this.state.mapValues.defaultUnit}
                                    removeFieldCallBack={this.removeFieldCallBack}/>
                    </div>

            } )
        }
        return <div> >:)</div>
    }

    setUnit=(e)=>{
        let unit = e.target.value;
        let newSesarFields = disableSesarField(this.state.sesarFields,{selectedField:"size_unit CM IS COMMON"})
        this.setState(preState => ({mapValues : {...preState.mapValues, defaultUnit : unit },sesarFields:{...newSesarFields} }) )};

    addConversionValue = (targetValue,extra ) => {
        let temp = this.state.mapValues[targetValue]

        if(extra){temp.extra = {field: extra.field , unit : extra.unit}}

        this.setState(preState =>({mapValues : { ...preState.mapValues , [targetValue]: temp  } }))
    }

/*############ Takes in state of generated mapValues and produces  .js map file*/
 makeMapFile=()=>{
     var blob = new Blob([ mapPrinter(this.state.mapValues)], {type: "text/plain;charset=utf-8"});
     saveAs(blob, "testfile1.txt");
    ;
 }

 setDateFormatting=(dateFormat)=>{this.setState(prevState =>({ mapValues : {...this.state.mapValues, userDateFormat:dateFormat}}))}

    render() {


        console.log("STATE",this.state.sesarFields)
        return (

            <div style={{margin:"20px","margin-top":"50px"}}>

                <div className=" row ">

                            <div className={"col-lg-4"} />

                    File Input
                    <div className={"col-lg-3"} >
                        <input  type="file" onChange={event => this.handleFileUpload(event.target.files)}/>
                    </div>

                    <div className={"col-lg-1"}>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal">
                            Help
                        </button>
                        <LegendPopup/>
                    </div>

                </div>

                <div className={"row"}>
                    <div className={"col-lg-3"} />
                    <div className={"col-lg-9"}>
                    <DefaultInfo setDateFormatting={this.setDateFormatting}
                                 userFields={this.state.fields}
                                    setUnit={this.setUnit}/>
                    </div>
                </div>








                {this.renderfields()}
                <div className="">
                <button onClick={this.makeMapFile} > Create Map File</button>
                </div>
                </div>
        )
    }
}



export default (XMapBuilder);
