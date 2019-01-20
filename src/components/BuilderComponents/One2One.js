import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {FORMAT_M21 } from "./Helpers/FileHelpers"
import {allowedMulti} from "./Helpers/renderSelectOptions"

class One2One extends Component {

    state={field:null};

    handleClick = (e) => {
       this.props.changeFormat(e,this.props.selectedField);
      this.props.handleSelect(this.props.selectedField)
    };


    render() {
        if(allowedMulti.includes(this.props.selectedField))
        return (
            <div className="fieldBox">
                Map other values to this Field?
                <button value={FORMAT_M21} onClick={this.handleClick} >Yes</button>

            </div>

        );
        else return "";
    }

    }

export default One2One;