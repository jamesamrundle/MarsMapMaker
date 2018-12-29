import React, {Component} from 'react';
import "../css/MapBuilder.css"
import One2DateFormat from "./One2DateFormat"
import {FORMAT_M21 } from "../hoc/Builder_Helpers"

class One2One extends Component {
    constructor(props) {
        super(props);
        this.state={field:null}
        // this.displayExample=this.displayExample.bind(this);
        this.handleClick=this.handleClick.bind(this);

    }


    handleClick(e){
       this.props.changeFormat(e,this.props.selectedField);
      this.props.handleSelect(this.props.selectedField)
    }



    // renderSesarFields(){
    //
    //     var defined = (value) => " Ex : "+(value.exampleValue!=""?value.exampleValue:"undefined")
    //
    //     const allChoices = Object.entries(this.props.userFelds).map(
    //         ([key, value]) =>{
    //             if (!value.disabled) return (
    //             <option id={key}  >
    //                 {key+" "}+ {defined(value) } </option>)
    //             else return (
    //                 <option   id={key} disabled={value.disabled} >
    //                     {key+" "} +{defined(value)} </option>
    //             )});
    //
    //     return allChoices;
    // }

    render() {
        // for(var each in this.props.userFelds){console.log("fuggmane",each)}
      {
        return (
            <div className="fieldBox">
                Map other values to this Field?
                <button value={FORMAT_M21} onClick={this.handleClick} >Yes</button>

            </div>

        );}

    }
}

export default One2One;