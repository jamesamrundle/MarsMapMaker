import {FORMAT_121, FORMAT_M21} from "./FileHelpers";



export let decoupleOldUserFieldsMapValues=(oldUserFields,currentMapping)=>{
    var editedCurrentMapping=  currentMapping ;
   if(oldUserFields) {
       var temp = []
       console.log("uf", oldUserFields)
       console.log("curr", currentMapping)
       if (typeof editedCurrentMapping.userValues != "string") {
           for (var each of editedCurrentMapping.userValues) {
               console.log(each)
               if (oldUserFields.indexOf(each) < 0)
                   temp.push(each)
           }
       } else {
           if (oldUserFields.indexOf(currentMapping.userValues) < 0)
               temp.push(currentMapping.userValues)
       }

       console.log("decoupled", oldUserFields, "now ", temp)
       return {...editedCurrentMapping, userValues: temp}
   }
   else return editedCurrentMapping;
}


// disableUserField=(userField)=>{
//     console.log("disuser field", userField)
//     if(typeof userField === "string") {
//         var copy = this.state.fields[userField];
//         copy.disabled = true;
//         this.setState(preState => ({
//             fields: {
//                 ...this.state.fields,
//                 userField: copy
//             }
//         }))
//         return
//     } else {
//         console.log("disuser ruhroh")
//         var copy = {...this.state.fields};
//         (userField).map(each => {
//             copy[each].disabled = !copy[each].disabled
//         });
//         this.setState({fields:{...copy}})
//     }
// }



//no statePiece needed
export let enableUserField=(oldUserField,newFields)=>{
    console.log("enable user field", oldUserField, newFields)

    if (oldUserField === "NULL") return newFields

    var temp= newFields

    if(typeof oldUserField === "string") {
        temp[oldUserField].disabled = false;
        delete temp[oldUserField].mappedTo;

    } else if (oldUserField ) {
        console.log("ensuser ruhroh")
        for (var each of oldUserField){
            temp[each].disabled = false;
            delete temp[each].mappedTo
        };

    }
    return temp;
}

//statePiece = this.state.sesarFields
export let disableSesarField=(statePiece,e)=>{
    console.log("TD:", e)
    var temp = {...statePiece};
    if(e.selectedField) {
        temp[e.selectedField].disabled = true
    }
    return temp;

}

export let enableSesarField=(oldField,sesarFields)=>{
    var temp = sesarFields;
    temp[oldField].disabled = false;

    if(temp[oldField].format === FORMAT_M21){
        temp[oldField].format = FORMAT_121;
    }

    temp[oldField].disabled = false;
    return temp;
}

//statePiece = this.state.mapValues
export let addToBeMapped=(statePiece,userField,sesarValues,format)=>{

    if(sesarValues.selectedField!== null) {
        var temp = {};
        // console.log("mapdebug", statePiece)
        if (!statePiece[sesarValues.selectedField]) {

            temp.userValues = [userField];
            temp.sesarField = sesarValues.selectedField;
            temp.format = format;
        }
        // console.log("the set StatePiece",this.state)

        else {
            temp = statePiece[sesarValues.selectedField];
            // console.log("dastemp", temp)
            for (var each of userField) {
                    if (temp.userValues.indexOf(each) < 0)
                    temp.userValues = temp.userValues.concat(each);
            }

            temp.sesarField = sesarValues.selectedField;
            temp.format = format;
        }

        console.log("returning state", {...statePiece}, "temp:", temp)
        return {...statePiece, [sesarValues.selectedField]: temp};
    }
    else return {...statePiece}
};


/*sets userFields with property mappedTo which is the sesarField it is mapped to
*   usefull for handeling reselection and validating if a particular option field should have access to reassign its mapped values*/
//statePiece= this.state.fields
export let setUserField=(statePiece,userField, sesarValues)=>{
    console.log("set user field", userField, "set mappval", sesarValues);

    var temp = {...statePiece} //(this.state.fields[each].mappedTo != null) ? (this.state.fields[userField].mappedTo) : [];
    var XUnit = statePiece[userField]

    if (typeof userField != "string") {
        console.log("not string")
        for (var each of userField) {

            if (sesarValues && each !== "NULL") {
                console.log("1")
                temp[each].mappedTo = sesarValues.selectedField;
                temp[each].disabled = true;
            }


            else if (!sesarValues && each !== "NULL"){
                console.log("2")
                temp[each].disabled = !temp[each].disabled;
                delete temp[each].mappedTo;
            }

            if (each === "NULL"){console.log("3")}
        }
    }
    else {//is string
        console.log("is string")
        console.log(XUnit)

        if(sesarValues){
            if(XUnit.disabled === true) XUnit.disabled = false;
            console.log("1")
            console.log(XUnit)

            XUnit.disabled = true;
            console.log(XUnit)
            XUnit.mappedTo = sesarValues.selectedField
            console.log(XUnit)
    }

        else {
            console.log("2")
            temp[userField].disabled = ! temp[userField].disabled;
            delete temp[userField].mappedTo  ;}
    }
   let  returnTemp = {...temp,[userField]:XUnit}
    console.log("set UF debug ",returnTemp);
  if(userField[0] !== "NULL") {
      return returnTemp;
  }
  else
      return{...temp}
}





//statePiece not needed
export let removeMapValue = (oldVal,newMapValues)=>{
    let temp = newMapValues;

    delete temp[oldVal]
    console.log("TEMP DELETE", temp)
    return (temp)
};

export let replaceM21Null =(mapValues,sesarField,selectedValue,index)=>{
    console.log("ReplaceM21 \n mapValues:",mapValues,"sesarField:",sesarField,"SelectedValues",selectedValue, "index", index)
    let temp = mapValues;
    let selectedField =sesarField.selectedField ;
    temp[selectedField].userValues[index] = selectedValue[0];
    return temp;
}

export let removeExtraM21Field = (mapValues,sesarField,selectedValue,index)=>{
    console.log("RemoveM21 \n mapValues:",mapValues,"sesarField:",sesarField,"SelectedValues",selectedValue,"index:",index)
    let temp = mapValues;

    if(temp[sesarField].userValues[index] === selectedValue) {
        temp[sesarField].userValues.splice(index, 1)
    }
    else{temp[sesarField].userValues.splice(index,0,"ERROR") }
    return temp;
}