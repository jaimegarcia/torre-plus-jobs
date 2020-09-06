import React from "react";

import { Box } from "@material-ui/core";

const toFirstUpperCase=(str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** Posistion Details Component
 * @param  {Object} details Paragraphs with details of Opportunity Position
 */
function PositionDetails({ details }) {

  return (
    <Box>
      {details.map((x,i)=>(
        <React.Fragment key={`${x.code}-${i}`}>
          <h2 key={`${x.code}-${i}-h2`}>{toFirstUpperCase(x.code)}</h2>
          <div key={`${x.code}-${i}-div`}>{x.content.split("\n").map((value,j) => {
            return <React.Fragment key={`${x.code}-${i}-${j}`}><div >{value}</div><br/></React.Fragment>;
        })}</div>
        </React.Fragment>
      ))}
    </Box>
  );
}


export default PositionDetails;