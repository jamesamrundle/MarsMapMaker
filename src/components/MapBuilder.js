import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {readToText} from "./BuilderComponents/Helpers/FileHelpers"
import {fileTextToState} from "./BuilderComponents/Helpers/FileHelpers"
import './css/MapBuilder.css'
import  {fieldsDict}  from "./BuilderComponents/Helpers/fieldsDict.jsx"

import saveAs from 'file-saver';
import mapPrinter from "./BuilderComponents/Main/mapPrinter"
import XRenderFormats from "./BuilderComponents/Main/XRenderFormats"
import {kallBack,FORMAT_M21,FORMAT_121} from "./BuilderComponents/Helpers/FileHelpers";
import DefaultInfo from "./BuilderComponents/Main/DefaultInfo";


var text = "original_archive,current archive,platform_name,cruise_field_prgrm,name,collection_method,collection_start_date,collection_end_date,latitude,latitude_end,longitude,longitude_end,elevation,elevation_end,size,size_unit CM IS COMMON,,collector,primary_location_type,igsn,,sample_comment,,field_name KEYED LIST,sample description,geological_age,age (min)MA,age (max)MA,sample_comment,classification,sample description,sample_type"

var newtext = text.split(",");


class MapBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            file: [], fields: {}, mapValues: {}, sesarFields:fieldsDict,
        }

        // this.handleFileUpload = this.handleFileUpload.bind(this)
        // this.renderfields = this.renderfields.bind(this);
        // this.makeMapFile = this.makeMapFile.bind(this);
        // // this.decoupleOldUserFieldsMapValues = this.decoupleOldUserFieldsMapValues.bind(this)
        // this.addToBeMapped = this.addToBeMapped.bind(this);
        // this.setUserField = this.setUserField.bind(this);
        // // this.disableUserField = this.disableUserField.bind(this);
        // this.disableSesarField = this.disableSesarField.bind(this);
        // this.changeFormat = this.changeFormat.bind(this);
        // this.setDateFormatting=this.setDateFormatting.bind(this);
    }


        handleFileUpload= async (e) =>{
        //console.log("e", e)
        await this.setState({file: e[0]})
        //console.log("state: ", this.state.file)

        const fileContents = await readToText(this.state.file)
        // console.log("fc:", fileContents);


        this.setState({fields:await fileTextToState(fileContents)})

    }






    decoupleOldUserFieldsMapValues=(oldUserFields,currentMapping)=>{
        var editedCurrentMapping=  currentMapping ;
        var temp = []
        console.log("uf",oldUserFields)
        console.log("curr",currentMapping)
        if(typeof editedCurrentMapping.userValues != "string") {
            for (var each of editedCurrentMapping.userValues) {
                console.log(each)
                if (oldUserFields.indexOf(each) < 0)
                    temp.push(each)
            }
        }else {
            if(oldUserFields.indexOf(currentMapping.userValues) < 0)
                temp.push(currentMapping.userValues)
        }

        console.log("decoupled",oldUserFields,"now ",temp)
        return {...editedCurrentMapping, userValues:temp}

    }


    // disableUserField=(userField)=>{
    //     console.log("disuser field", userField)
    //     if(typeof userField === "string") {
    //         var copy = this.state.fields[userField];
    //         copy.disabled = true;
    //         this.setState(preState => ({
    //             fields: {
    //                 ...this.state.fields,
    //                 userField: copy
    //             }
    //         }))
    //         return
    //     } else {
    //         console.log("disuser ruhroh")
    //         var copy = {...this.state.fields};
    //         (userField).map(each => {
    //             copy[each].disabled = !copy[each].disabled
    //         });
    //         this.setState({fields:{...copy}})
    //     }
    // }

    enableUserField=(oldUserField,newFields)=>{
        console.log("enable field", oldUserField)

        var temp= newFields

        if(typeof oldUserField === "string") {
            temp[oldUserField].disabled = false;
            delete temp[oldUserField].mappedTo;

        } else {
            console.log("ensuser ruhroh")
            for (var each of oldUserField){
                temp[each].disabled = false;
                delete temp[each].mappedTo
            };

        }
        return temp;
    }


    disableSesarField=(e)=>{
        console.log("TD:", e)
            var temp = {...this.state.sesarFields};
        if(e.selectedField) {
            temp[e.selectedField].disabled = true
        }
            return temp;

    }

    enableSesarField=(oldField,sesarFields)=>{
        var temp = sesarFields;
        temp[oldField].disabled = false;

        if(temp[oldField].format === FORMAT_M21){
            temp[oldField].format = FORMAT_121;
        }

        temp[oldField].disabled = false;
        return temp;
    }

    addToBeMapped=(userField,sesarValues,format)=>{

        if(sesarValues.selectedField!== null) {
            var temp = {};
            console.log("mapdebug", this.state.mapValues[sesarValues.selectedField])
            if (!this.state.mapValues[sesarValues.selectedField]) {

                temp.userValues = [userField];
                temp.sesarField = sesarValues.selectedField;
                temp.format = format;
            }
            // console.log("the set StatePiece",this.state)

            else {
                temp = this.state.mapValues[sesarValues.selectedField];
                console.log("dastemp", temp)
                for (var each of userField) {
                    if (temp.userValues.indexOf(each) < 0)
                        temp.userValues = temp.userValues.concat(each);
                }

                temp.sesarField = sesarValues.selectedField;
                temp.format = format;
            }

            console.log("returning state", {...this.state.mapValues}, "temp:", temp)
            return {...this.state.mapValues, [sesarValues.selectedField]: temp};
        }
        else return {...this.state.mapValues}
    };



    /*sets userFields with property mappedTo which is the sesarField it is mapped to
*   usefull for handeling reselection and validating if a particular option field should have access to reassign its mapped values*/
        setUserField=(userField, sesarValues)=>{
        console.log("set user field", userField, "set mappval", sesarValues);

        var temp = {...this.state.fields} //(this.state.fields[each].mappedTo != null) ? (this.state.fields[userField].mappedTo) : [];


        if (typeof userField != "string") {
            for (var each of userField) {

                if (sesarValues) {
                    temp[each].mappedTo = sesarValues.selectedField;
                    temp[each].disabled = true;
                }

                else {
                    temp[each].disabled = !temp[each].disabled;
                    delete temp[each].mappedTo;
                }
            }
        }
        else {//is string
            if(sesarValues){
                temp[userField].mappedTo = sesarValues.selectedField;
                temp[userField].disabled = true;}
            else {
                temp[userField].disabled = ! temp[userField].disabled;
                delete temp[userField].mappedTo  ;}
        }

        return temp;
    }



    changeFormat=(e,sesarField)=>{
        var sesarFields = this.state.sesarFields;
        var newFormat = e.target.value;

        if (newFormat !== sesarFields[sesarField].format) {
            var stateObject = sesarFields[sesarField];
            stateObject.format = newFormat;
            this.setState(preState => ({
                sesarFields: {...sesarFields,
                    [sesarField]: stateObject }

            } ) )
        }
    }

        currentMapValueFields=(oldVal)=>{return (this.state.mapValues[oldVal].userValues)};

        removeMapValue = (oldVal,newMapValues)=>{
            let temp = newMapValues;

            delete temp[oldVal]
            console.log("TEMP DELETE", temp)
            return (temp)
        };

    renderfields=()=> {

        var userFields = Object.keys(this.state.fields);


        // var testFields = {name: {sesarName: "name", fieldFormat: "one2one", userValues: null},
        //     collection_start_date: {sesarName: "collection_start_date", fieldFormat: "dateFormat", userValues: null},
        //     size: {sesarName: "size", fieldFormat: "conversion", userValues: null},
        //     sample_description: {sesarName: "sample_description", fieldFormat: "multi2one", userValues: null}}



        let callBack =(sesarValues,userField,format,oldField)=> { //on button click toggles disable for option and sets mapping variable
            console.log("kallbacking", sesarValues, "uf", userField, "form", format)
            let newSesarFields = this.disableSesarField(sesarValues); //returns state.sesarFields
            let newMapValues = this.addToBeMapped(userField, sesarValues, format); //returns state.mapValues
            console.log("new map values",newMapValues)
            let newFields = this.setUserField(userField, sesarValues); //returns state.fields

            if(oldField !== null ) {
                console.log("made it!")
                let userFieldsToEnable = this.currentMapValueFields(oldField);
                newFields = this.enableUserField(userFieldsToEnable,newFields);
                newSesarFields = this.enableSesarField(oldField,newSesarFields);
                newMapValues = this.removeMapValue(oldField,newMapValues);

            }


            this.setState(preState => ({
                fields: newFields,
                sesarFields:  newSesarFields,
                mapValues : newMapValues //{...preState.mapValues, [sesarValues.selectedField]: newMapValue}
            }))
        };

        var multiCallBack=(sesarValues,userField,format,oldValues)=> { //on button click toggles disable for option and sets mapping variable
            console.log("kallbacking", sesarValues, "uf", userField, "form", format)

            //sets mappedTo in new fields
            let newFields = this.setUserField(userField, sesarValues); //returns state.fields
            // adds new MapValues
            let newMapValues = this.addToBeMapped(userField, sesarValues, format); //returns state.mapValues
            //sets values no longer selected to not disabled and no mapped to
            newFields = this.enableUserField(oldValues,newFields)
            // removes oldvalues from MappingValues
            newMapValues = this.decoupleOldUserFieldsMapValues(oldValues,newMapValues[sesarValues.selectedField])



            this.setState(preState => ({
                fields: newFields,
                mapValues : {...preState.mapValues, [sesarValues.selectedField]: newMapValues}
            }))
        };

        
        if (userFields.length > 0) {
            return Object.entries(this.state.fields).map(([each, value]) => { //each is the sesar field object
               // console.log("renderformats",value)
                return <div> <XRenderFormats
                                key={"RF-"+each}
                                userField={{fieldName:each,...value}}
                                sesarFields={this.state.sesarFields}
                                              allUserFields={this.state.fields} decouple={this.decoupleOldUserFieldsMapValues}
                                 callBack={callBack} multiCallBack={multiCallBack} changeFormat={this.changeFormat}
                                    addConversionValue={this.addConversionValue}
                                    defaultUnit={this.state.mapValues.defaultUnit}/> </div>

            } )
        }
        return <div> >:)</div>
    }

    setUnit=(e)=>{ let unit = e.target.value;
        this.setState(preState => ({mapValues : {...preState.mapValues, defaultUnit : unit }}) )};

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

                <div>
                    <DefaultInfo setDateFormatting={this.setDateFormatting}
                                 userFields={this.state.fields}
                                    setUnit={this.setUnit}/>

                </div>
                <div className="fileBtn">
                fileinput
                <input type="file" onChange={event => this.handleFileUpload(event.target.files)}/>
                </div>
                    {this.renderfields()}

                <button onClick={this.makeMapFile} > Create Map File</button>
            </div>
        )
    }
}



export default (MapBuilder);
