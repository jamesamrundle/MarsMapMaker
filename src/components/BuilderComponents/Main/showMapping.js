import React, {Component} from 'react';
import "../css/MapBuilder.css"
import {conversionUserOptions} from "./Helpers/renderSelectOptions"
import {CM, FORMAT_CONV, FORMAT_M21, MM} from "./Helpers/FileHelpers"

class showMapping extends Component {
    constructor(props) {
        super(props);

    }



    render() { //console.log("CONVERS",this.props)
        return (

            <div className="fieldElement" >
                {this.extraUnitField()}
                {/*{this.showButton()}*/}
                {/*{this.showConversion()}*/}
            </div>

        );
    }
}

export default showMapping;