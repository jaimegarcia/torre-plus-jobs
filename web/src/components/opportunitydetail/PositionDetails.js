import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import CustomSkeleton from "../utils/CustomSkeleton";
import { Box,Chip,Typography,makeStyles } from "@material-ui/core";

const toFirstUpperCase=(str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom:10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function PositionDetails({ details }) {

  return (
    <Box>
      {details.map((x)=>(
        <React.Fragment>
          <h2>{toFirstUpperCase(x.code)}</h2>
          <div>{x.content.split("\n").map((i,key) => {
            return <><div key={key}>{i}</div><br/></>;
        })}</div>
        </React.Fragment>
      ))}
    </Box>
  );
}


export default PositionDetails;