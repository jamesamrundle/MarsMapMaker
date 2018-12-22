import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {readToText} from "./hoc/Builder_Helpers"
import {fileTextToState} from "./hoc/Builder_Helpers"
import './css/MapBuilder.css'
import  {fieldsDict}  from "./hoc/fieldsDict.jsx"


import saveAs from 'file-saver';
import mapPrinter from "./BuilderComponents/mapPrinter"
import RenderFormats from "./BuilderComponents/RenderFormats"

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
    }


    async handleFileUpload(e) {
        //console.log("e", e)
        this.setState({cat: ["whatthefuck"]})
        await this.setState({file: e[0]})
        //console.log("state: ", this.state.file)

        const fileContents = await readToText(this.state.file)
        // console.log("fc:", fileContents);


        this.setState({fields:await fileTextToState(fileContents)})

    }



    // text = "original_archive,current archive,platform_name,cruise_field_prgrm,name,collection_method,collection_start_date,collection_end_date,latitude,latitude_end,longitude,longitude_end,elevation,elevation_end,size,size_unit CM IS COMMON,collector,primary_location_type,igsn,sample_comment,field_name KEYED LIST,sample description,geological_age,age (min)MA,age (max)MA,sample_comment,classification,sample description,sample_type"
    //
    // newtext = text.split(",");
    //
    // didCreateSZFields = false;

    // addSZFieldstoState(){
    //
    //     var hasField=(sesarField) =>{
    //         return (fieldsDict[sesarField] != null)? fieldsDict[sesarField].message : fieldsDict[sesarField]
    //     }
    //
    //    var  sesarFieldStateObject = {}
    //     this.newtext.map((sesarField)=> {console.log(fieldsDict[sesarField]); sesarFieldStateObject[sesarField]={sesarField:sesarField,message:hasField(sesarField),fieldFormat:null}})
    //      this.setState({sesarFields:sesarFieldStateObject})
    //    this.didCreateSZFields=true;
    //
    // }




    renderfields() {

        var userFields = Object.keys(this.state.fields);
        var sesarFields = this.state.sesarFields;

        // var testFields = {name: {sesarName: "name", fieldFormat: "one2one", userValues: null},
        //     collection_start_date: {sesarName: "collection_start_date", fieldFormat: "dateFormat", userValues: null},
        //     size: {sesarName: "size", fieldFormat: "conversion", userValues: null},
        //     sample_description: {sesarName: "sample_description", fieldFormat: "multi2one", userValues: null}}

        var changeFormat=(e,sesarField)=> {
            var newFormat = e.target.value;
        
            if (newFormat !== sesarFields[sesarField].fieldFormat) {
                this.setState(preState => ({
                        sesarFields: {...sesarFields,
                            [sesarField]: {sesarField: sesarField, fieldFormat: newFormat} }
                            
                            } ) )
            }
        }

/*########adds to mapValues is dictionary of each sesar field to be added in format:
 ################################################################
 ##########sesarField:{userValues: , sesarField , fieldFormat}
  ################################################################*/
        var addToBeMapped= (sesarField,mappingValues,format)=>{
            this.setState(preState => ({    mapValues: {
                                ...this.state.mapValues,
                                [sesarField]:{userValues:mappingValues,sesarField:sesarField,format:format}
                                }
                                }));// console.log("the set StatePiece",this.state)
        };


        var ToggleDisable = (e) => {
            console.log("TD:",e)
            var copy = {...this.state.fields};
            (e.field).map(each =>{
                copy[each].disabled = !copy[each].disabled
        });

        this.setState({fields:{...copy}})}

        var callBack =(mappingValues,sesarField,format)=> { //on button click toggles disable for option and sets mapping variable
            ToggleDisable(mappingValues);
            addToBeMapped(sesarField,mappingValues,format)
        };

        
        if (userFields.length > 0) {
            return Object.entries(sesarFields).map(([each, value]) => { //each is the sesar field object
               // console.log("renderformats",value)
                return <div> <RenderFormats sesarValues={value}
                               userFields={userFields} userFelds={this.state.fields}
                                callback={callBack} changeFormat={changeFormat}/> </div>

                }
            )
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

/*########### Handles async nature of component rendering. 
        Can probably remove once all fields are hard coded into state object.*/
      // if(!this.didCreateSZFields)this.addSZFieldstoState();
        console.log("STATE",this.state.sesarFields)
        return (

            <div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                fileinput
                <input type="file" onChange={event => this.handleFileUpload(event.target.files)}/>
                {this.renderfields()}

                <button onClick={this.makeMapFile} > Create Map File</button>
            </div>
        )
    }
}



export default (MapBuilder);
