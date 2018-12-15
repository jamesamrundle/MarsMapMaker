import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {renderDateFormat} from "../hoc/Builder_Helpers";


class DateFormatter extends Component {
    constructor(props) {
        super(props);
        this.state = {dateInput : ""}
        this.renderDateFormatted=this.renderDateFormatted.bind(this)
    }

    date = "20170507";

    renderDateFormatted(){
        if(this.state.dateInput){
            return(<div>
               <line>Year : {this.date.substring(this.state.dateInput.indexOf("Y"),this.state.dateInput.lastIndexOf("Y")+1)}</line>
               <line>Day : {this.date.substring(this.state.dateInput.indexOf("D"),this.state.dateInput.lastIndexOf("D")+1)}</line>
               <line>Month : {this.date.substring(this.state.dateInput.indexOf("M"),this.state.dateInput.lastIndexOf("M")+1)}</line>
                </div>)
        }
        else return(<div>input something</div>)
    }

    render() {

        return (
            <span>

                <div>
                    <h3 > Example field from your data: </h3>
                    {this.renderDateFormatted()}
                </div>
                    <h4 style={{fontStyle:"bold",color:"grey"}}> {this.date}</h4>
                <input onChange={event => this.setState({dateInput: event.target.value})} id="dateTxtBox" defaultValue={this.date}></input>
            </span>);
    }
}

export default DateFormatter;