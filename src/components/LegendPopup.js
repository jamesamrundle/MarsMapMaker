import React from "react";
import legend from "../M3Legend.jpg";


export let LegendPopup = () =>{

    return(
        <div className="modal" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    {/*// <!-- Modal Header -->*/}
                    <div className="modal-header">

                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>

                    {/*// <!-- Modal body -->*/}
                    <div className="modal-body">
                        <img src={legend}></img>
                    </div>


                </div>
            </div>
        </div>
    )

}