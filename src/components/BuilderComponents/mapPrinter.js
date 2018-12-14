
import React from "react";

export default function mapPrinter (mapValues){
    var one2oneMap = ( "let map = {\n")

    var logicMap = ("let logic = {\n" )

    var combinationMap = ("let combinations = {\n")



    console.log("mapper map values", mapValues)
    for(var each in mapValues){
        console.log("mapper map values", mapValues[each].userValues.field)
        switch (mapValues[each].format){
            case "one2one":
                one2oneMap = one2oneMap.concat( " "+mapValues[each].sesarName+ ": \""+mapValues[each].userValues.field+"\",\n")
                break;
            case "dateFormat":
                typeExist.dateFormat = true;
                logicMap = logicMap.concat("  "+mapValues[each].sesarName+ ": scrippsDate,\n")
                one2oneMap = one2oneMap.concat( " "+mapValues[each].sesarName+ ": \""+mapValues[each].userValues.field+"\",\n")
                break;
            case"multi2one":
                typeExist.multi2One = true;
                combinationMap = combinationMap.concat("  "+mapValues[each].sesarName+ ": delimit,\n")
                one2oneMap = one2oneMap.concat( " "+mapValues[each].sesarName+ ": \""+mapValues[each].userValues.field+"\",\n")
                break;
            case "conversion":
                typeExist.conversion = true;
                one2oneMap = one2oneMap.concat( " "+mapValues[each].sesarName+ ": \""+mapValues[each].userValues.field+"\",\n")
                break;
            default:
               console.log("mapbuilding errrrrrrror!")
                break;
        }

        }

    var map = "// ======================\n" +
        "// Scripps Helpers\n" +
        "// ======================\n" +
        "\n" +
        dateFunction() +

        "\n" +
        "// creates a key value string from originalKey and new value\n" +
        "const keyValueString = (scrippsValue, scrippsKey) => {\n" +
        "  return scrippsKey + ':' + scrippsValue\n" +
        "}\n" +
        "\n" +
        delimitFunction() +
        "}\n" +
        "\n" +

        one2oneMap +
        combinationMap+
        logicMap+

        "\nreturn {map, logic, combinations}\n"

    return map;
    }




var typeExist={
    conversion:false,
    dateFormat:false,
    multi2One:false}




function sizeConversion(){
    if (typeExist.conversion) {
        return "\n" +
            "// convert mm to cm\n" +
            "const size = (userValue, userKey) => {\n" +  // "const size = (scrippsValue, scrippsKey) => {\n" +
            "  return unit == 'mm' ? userValue/10 : userValue\n" +//"  return scrippsKey == 'CORED_LENGTH_MM' ? scrippsValue/10 : scrippsValue\n" +
            "}\n"
    }
}

function dateFunction() {
    if (typeExist.dateFormat){
    return ( "\n" +
        "//creates a date from a string in the form YYYYDDMM\n" +
        "const scrippsDate = (scrippsValue) => {\n" +
        "  const y = scrippsValue.substr(0,4)\n" +
        "  const d = scrippsValue.substr(6,2)\n" +
        "  const m = scrippsValue.substr(4,2)\n" +
        "  return y + '-' + m + '-' + d + 'T00:00:00Z'\n" +
        "}\n" )}
    else return ""}

function delimitFunction(){if (typeExist.multi2One){
   return "// creates a delimited list of values\n" +
    "const delimit = (valueArray) => {\n" +
    "  return valueArray.join(';')\n" +
    "}\n"}
    else return "";
}

