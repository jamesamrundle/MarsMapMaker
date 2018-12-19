import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import fieldsDict from "./hoc/fieldsDict"
import './css/MapBuilder.css'
import * as d3 from "d3-dsv"

import saveAs from 'file-saver';
import mapPrinter from "./BuilderComponents/mapPrinter"
import RenderFormats from "./BuilderComponents/RenderFormats"

var text = "original_archive,current archive,platform_name,cruise_field_prgrm,name,collection_method,collection_start_date,collection_end_date,latitude,latitude_end,longitude,longitude_end,elevation,elevation_end,size,size_unit CM IS COMMON,,collector,primary_location_type,igsn,,sample_comment,,field_name KEYED LIST,sample description,geological_age,age (min)MA,age (max)MA,sample_comment,classification,sample description,sample_type"

var newtext = text.split(",");


class MapBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            file: [], fields: {}, mapValues: {},
        }

        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.readToCSV = this.readToCSV.bind(this)
        this.renderOptions = this.renderOptions.bind(this)
        this.renderfields = this.renderfields.bind(this);
        this.makeMapFile = this.makeMapFile.bind(this);
    }


    async handleFileUpload(e) {
        console.log("e", e)
        this.setState({cat: ["whatthefuck"]})
        await this.setState({file: e[0]})
        console.log("state: ", this.state.file)
        //this.readToCSV(this.state.file
        const fileContents = await this.readToText(this.state.file)
        console.log("fc:", fileContents);
        await this.readToCSV(fileContents)
    }

    async readToText(file) {

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


    async readToCSV(file) {
        var userFields = d3.csvParse(file)
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
        this.setState({fields:tempStateObject})
        console.log("stert",this.state)
    }//this.state.fields."each"


    text = "original_archive,current archive,platform_name,cruise_field_prgrm,name,collection_method,collection_start_date,collection_end_date,latitude,latitude_end,longitude,longitude_end,elevation,elevation_end,size,size_unit CM IS COMMON,,collector,primary_location_type,igsn,,sample_comment,,field_name KEYED LIST,sample description,geological_age,age (min)MA,age (max)MA,sample_comment,classification,sample description,sample_type"

    newtext = text.split(",");

    didCreateSZFields = false;

    addSZFieldstoState(){
       var  sesarFieldStateObject = {}
        this.newtext.map((sesarField)=>sesarFieldStateObject[sesarField]={sesarField:sesarField,fieldFormat:null})
         this.setState({sesarFields:sesarFieldStateObject})
       this.didCreateSZFields=true;
        console.log("STATE",this.state)
    }

    renderOptions = (props)=> { //all the field options from uploaded csv
        var userFields = Object.keys(this.state.fields)
        console.log("Props",props)
        if (userFields) {
            return userFields.map(each => {

                var d = this.state.fields[each].disabled

                return <option id={each} onClick={this.toggleDisable} disabled={d}>{each}</option>
            })
        } else return ""
    }




    renderfields() {

        var userFields = Object.keys(this.state.fields)

        var testFields = {name: {sesarName: "name", fieldFormat: "one2one", userValues: null},
            collection_start_date: {sesarName: "collection_start_date", fieldFormat: "dateFormat", userValues: null},
            size: {sesarName: "size", fieldFormat: "conversion", userValues: null},
            sample_description: {sesarName: "sample_description", fieldFormat: "multi2one", userValues: null}}

        var changeFormat=(e,sesarField)=>{

            var newFormat = e.target.value;
            if(newFormat !== this.state.sesarFields[sesarField].fieldFormat){
                this.setState(preState => ({sesarFields:{ ...this.state.sesarFields,
                    [sesarField].fieldFormat: [newFormat]};
            }
                }


        var setToBeMapped= (sesarName,mappingValues,format)=>{
            this.setState(preState => ({    mapValues: {
                                ...this.state.mapValues,
                                [sesarName]:{userValues:mappingValues,sesarName:sesarName,format:format}
                                }
                                }));// console.log("set StatePiece",this.state)
        };


        var ToggleDisable = (e) => {
            var copy = {...this.state.fields};
            (e.field).map(each =>{
                copy[each].disabled = !copy[each].disabled
        });
        this.setState({fields:{...copy}})}

        var callBack =(mappingValues,sesarName,format)=> { //on button click toggles disable for option and sets mapping variable
            ToggleDisable(mappingValues);
            setToBeMapped(sesarName,mappingValues,format)
        };


/*className="fieldBox" sesarValues={value}
                                 userFields={userFields} userFelds={this.state.fields}
                                 format={value.fieldFormat} callback={callBack}
                                 changeFormat={changeFormat}/>;
*/
        if (userFields.length > 0) {
            return Object.entries(this.state.sesarFields).map(([each, value]) => { //each is the sesar field object
                console.log("renderformats",value)
                return <div> :) <RenderFormats sesarValues={value}
                               userFields={userFields} userFelds={this.state.fields}
                               format={value.fieldFormat} callback={callBack}
                                               changeFormat={changeFormat}/> </div>

                }
            )
        }
        return <div>:)</div>
    }

handleSelect(e){


    console.log("handleselect", e.target.selectedOptions[0].id)
    // var cat = Object.assign({}, this.state.fields)
    //
    // this.setState(preState => ({
    //     fields: {
    //         ...this.state.fields,
    //         [x]: {disabled: !preState.fields[x].disabled}
    //     }
    // }));
    }

 makeMapFile(){
     var blob = new Blob([ mapPrinter(this.state.mapValues)], {type: "text/plain;charset=utf-8"});
     saveAs(blob, "testfile1.txt");
    ;
 }
    render() {

        if(!this.didCreateSZFields)this.addSZFieldstoState();

        return (


            <div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                fileinput
                <input type="file" onChange={event => this.handleFileUpload(event.target.files)}></input>
                {this.renderfields()}

                <div></div>
                <button onClick={this.makeMapFile} > Create Map File</button>
            </div>
        )
    }
}



export default (MapBuilder);
