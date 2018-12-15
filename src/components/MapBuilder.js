import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import fieldsDict from "./hoc/fieldsDict"
import './css/MapBuilder.css'
import * as d3 from "d3-dsv"
import ConversionField from "./BuilderComponents/ConversionField"
import One2One from "./BuilderComponents/One2One"
import One2DateFormat from "./BuilderComponents/One2DateFormat"
import Multi2One from "./BuilderComponents/Multi2One"
import saveAs from 'file-saver';
import mapPrinter from "./BuilderComponents/mapPrinter"

var text = "original_archive,current archive,platform_name,cruise_field_prgrm,name,collection_method,collection_start_date,collection_end_date,latitude,latitude_end,longitude,longitude_end,elevation,elevation_end,size,size_unit CM IS COMMON,,collector,primary_location_type,igsn,,sample_comment,,field_name KEYED LIST,sample description,geological_age,age (min)MA,age (max)MA,sample_comment,classification,sample description,sample_type"

var newtext = text.split(",");


class MapBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            file: [], fields: {}, mapValues:{},
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

        Object.keys(userFields[0]).map(each => this.setState({
            fields:
                {
                    ...this.state.fields,
                    [each]:
                        {disabled: false,
                        exampleValue:userFields[0][each]} //logs first value of field
                }
        }))//this.state.fields."each"

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

        var setToBeMapped= (sesarName,mappingValues,format)=>{
            this.setState(preState => ({    mapValues: {
                                ...this.state.mapValues,
                                [sesarName]:{userValues:mappingValues,sesarName:sesarName,format:format}
                                }
                                }));// console.log("set StatePiece",this.state)
        };

        var toggleDisable = (e) => {
            (e.field).map(each =>{  console.log("...", each)
                this.setState(preState => ({ fields: {...this.state.fields,
                        [each]: {...preState.fields[each],disabled: !preState.fields[each].disabled}
                    }}))});
        }

        var callBack =(mappingValues,sesarName,format)=> { //on button click toggles disable for option and sets mapping variable
            toggleDisable(mappingValues);
            setToBeMapped(sesarName,mappingValues,format)
        };




        if (userFields) {
            return Object.entries(testFields).map(([each, value]) => { //each is the sesar field object

                    switch (value.fieldFormat) {
                        case "one2one":
                            return  <One2One className="fieldBox" sesarValues={value} handleClick={this.toggleDisable}
                                             userFields={userFields} userFelds={this.state.fields}
                                             format={value.fieldFormat} callback={callBack} />;
                            /*this.renderOne2One({...value},((e)=>{testFields[each].userValues=e.target.value;console.log(testFields)}));*/
                            break;
                        case "dateFormat":
                            return  <One2DateFormat className="fieldBox" sesarValues={value} userFields={userFields} format={value.fieldFormat} callback={callBack}  />
                            /*this.renderDateFormat({...value},((e)=>{testFields[each].userValues=e.target.value;console.log(testFields)}));*/
                            break;
                        case"multi2one":
                           return <Multi2One sesarValues={value} userFields={userFields} format={value.fieldFormat} callback={callBack}  >WTF</Multi2One>

                            // return this.rendermulti2One({...value},((e)=>{testFields[each].userValues=(Object.entries(e.target.selectedOptions).map(each=>{return each.id}));console.log(testFields)}));
                            break;
                        case "conversion":
                            return <ConversionField sesarValues={value} userFields={userFields} format={value.fieldFormat}
                                        callback={callBack} />
                            /*this.renderConversion({...value},((e)=>{testFields[each].userValues=(e.target.value);console.log(testFields)}),
                                ((e)=>{testFields[each].unit=e.target.value;console.log("woo",testFields)}));*/
                            break;
                        default:
                            return <div>Broked</div>
                    }
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
