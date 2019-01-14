import React, {Component} from 'react';
import "../css/MapBuilder.css"
import One2DateFormat from "./One2DateFormat"
import {FORMAT_M21 } from "./Helpers/FileHelpers"

class One2One extends Component {

    state={field:null};

    handleClick = (e) => {
       this.props.changeFormat(e,this.props.selectedField);
      this.props.handleSelect(this.props.selectedField)
    };


    render() {

        return (
            <div className="fieldBox">
                Map other values to this Field?
                <button value={FORMAT_M21} onClick={this.handleClick} >Yes</button>

            </div>

        );}

    }

export default One2One;