import React from "react";
import { Box} from "@material-ui/core";


/** Organization Details Component
 * @param  {Object} details Organizations Details name and picture
 */
function OrganizationsDetail({ details }) {

  return (
    <Box>
      {details.map((x)=>(
        <React.Fragment key={x.name}>
          <h2 key={x.name}>{x.name}</h2>
          <img key={`${x.name}-pic`} src={x.picture}/>
        </React.Fragment>
      ))}
    </Box>
  );
}


export default OrganizationsDetail;