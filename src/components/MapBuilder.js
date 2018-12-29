import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {readToText} from "./hoc/Builder_Helpers"
import {fileTextToState} from "./hoc/Builder_Helpers"
import './css/MapBuilder.css'
import  {fieldsDict}  from "./hoc/fieldsDict.jsx"


import saveAs from 'file-saver';
import mapPrinter from "./BuilderComponents/mapPrinter"
import RenderFormats from "./BuilderComponents/RenderFormats"
import XRenderFormats from "./BuilderComponents/XRenderFormats"
import {kallBack} from "./hoc/Builder_Helpers";

var text = "original_archive,current archive,platform_name,cruise_field_prgrm,name,collection_method,collection_start_date,collection_end_date,latitude,latitude_end,longitude,longitude_end,elevation,elevation_end,size,size_unit CM IS COMMON,,collector,primary_location_type,igsn,,sample_comment,,field_name KEYED LIST,sample description,geological_age,age (min)MA,age (max)MA,sample_comment,classification,sample description,sample_type"

var newtext = text.split(",");


class MapBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            file: [], fields: {}, mapValues: {}, sesarFields:fieldsDict,
        }

        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.renderfields = this.renderfields.bind(this);
        this.makeMapFile = this.makeMapFile.bind(this);
        this.decoupleOldUserFieldsMapValues = this.decoupleOldUserFieldsMapValues.bind(this)
        this.addToBeMapped = this.addToBeMapped.bind(this);
        this.setUserField = this.setUserField.bind(this);
        this.disableUserField = this.disableUserField.bind(this);
        this.disableSesarField = this.disableSesarField.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }


    async handleFileUpload(e) {
        //console.log("e", e)
        await this.setState({file: e[0]})
        //console.log("state: ", this.state.file)

        const fileContents = await readToText(this.state.file)
        // console.log("fc:", fileContents);


        this.setState({fields:await fileTextToState(fileContents)})

    }






    decoupleOldUserFieldsMapValues(oldUserFields,currentMapping){
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


    disableUserField(userField){
        console.log("disuser field", userField)
        if(typeof userField === "string") {
            var copy = this.state.fields[userField];
            copy.disabled = true;
            this.setState(preState => ({
                fields: {
                    ...this.state.fields,
                    userField: copy
                }
            }))
            return
        } else {
            console.log("disuser ruhroh")
            var copy = {...this.state.fields};
            (userField).map(each => {
                copy[each].disabled = !copy[each].disabled
            });
            this.setState({fields:{...copy}})
        }
    }

    enableUserField(oldUserField,newFields){
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


    disableSesarField(e){
        console.log("TD:", e)
        var temp = {...this.state.sesarFields[e.selectedField]};
        temp.disabled = !temp.disabled
        // this.setState({sesarFields:{...temp}})
        return temp;
    }


    addToBeMapped(userField,sesarValues,format){
        var temp = {};
        if(!this.state.mapValues[sesarValues.selectedField]) {

                temp.userValues= [userField];
                temp.sesarField= sesarValues.selectedField;
                temp.format= format;
            }
        // console.log("the set StatePiece",this.state)

    else{
            temp = this.state.mapValues[sesarValues.selectedField];
            console.log("dastemp",temp)
            for(var each of userField){
                if(temp.userValues.indexOf(each) < 0)
                temp.userValues = temp.userValues.concat(each);}

            temp.sesarField = sesarValues.selectedField;
            temp.format= format;
        }
        return temp;
    };



    /*sets userFields with property mappedTo which is the sesarField it is mapped to
*   usefull for handeling reselection and validating if a particular option field should have access to reassign its mapped values*/
    setUserField(userField, sesarValues){
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



    changeFormat(e,sesarField){
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

    renderfields() {

                var userFields = Object.keys(this.state.fields);


                // var testFields = {name: {sesarName: "name", fieldFormat: "one2one", userValues: null},
                //     collection_start_date: {sesarName: "collection_start_date", fieldFormat: "dateFormat", userValues: null},
                //     size: {sesarName: "size", fieldFormat: "conversion", userValues: null},
                //     sample_description: {sesarName: "sample_description", fieldFormat: "multi2one", userValues: null}}



        var callBack =(sesarValues,userField,format)=> { //on button click toggles disable for option and sets mapping variable
            console.log("kallbacking", sesarValues, "uf", userField, "form", format)
            var newSesarField = this.disableSesarField(sesarValues); //returns state.sesarFields[SPECIFIC SESAR FIELD]
            var newMapValues = this.addToBeMapped(userField, sesarValues, format); //returns state.mapValues[SPECIFIC SESAR FIELD]
            var newFields = this.setUserField(userField, sesarValues); //returns state.fields

            this.setState(preState => ({
                fields: newFields,
                sesarFields: {...this.state.sesarFields, [sesarValues.selectedField] : newSesarField},
                mapValues : {...this.state.mapValues, [sesarValues.selectedField]: newMapValues}
            }))
        };

        var multiCallBack=(sesarValues,userField,format,oldValues)=> { //on button click toggles disable for option and sets mapping variable
            console.log("kallbacking", sesarValues, "uf", userField, "form", format)

            //sets mappedTo in new fields
            var newFields = this.setUserField(userField, sesarValues); //returns state.fields
            // adds new MapValues
            var newMapValues = this.addToBeMapped(userField, sesarValues, format); //returns state.mapValues[SPECIFIC SESAR FIELD]
            //sets values no longer selected to not disabled and no mapped to
            newFields = this.enableUserField(oldValues,newFields)
            // removes oldvalues from MappingValues
            newMapValues = this.decoupleOldUserFieldsMapValues(oldValues,newMapValues)

            this.setState(preState => ({
                fields: newFields,
                mapValues : {...this.state.mapValues, [sesarValues.selectedField]: newMapValues}
            }))
        };

        
        if (userFields.length > 0) {
            return Object.entries(this.state.fields).map(([each, value]) => { //each is the sesar field object
               // console.log("renderformats",value)
                return <div> <XRenderFormats  userField={{fieldName:each,...value}}
                                sesarFields={this.state.sesarFields}
                                              allUserFields={this.state.fields} decouple={this.decoupleUserFields}
                                format={null} callBack={callBack} multiCallBack={multiCallBack} changeFormat={this.changeFormat}/> </div>

            } )
        }
        return <div> >:)</div>
    }


/*############ Takes in state of generated mapValues and produces  .js map file*/
 makeMapFile(){
     var blob = new Blob([ mapPrinter(this.state.mapValues)], {type: "text/plain;charset=utf-8"});
     saveAs(blob, "testfile1.txt");
    ;
 }


    render() {


        console.log("STATE",this.state.sesarFields)
        return (

            <div style={{margin:"20px","margin-top":"50px"}}>

                fileinput
                <input type="file" onChange={event => this.handleFileUpload(event.target.files)}/>
                {this.renderfields()}

                <button onClick={this.makeMapFile} > Create Map File</button>
            </div>
        )
    }
}



export default (MapBuilder);
