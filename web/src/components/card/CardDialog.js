import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Dialog,DialogTitle,DialogContent,makeStyles,useTheme } from '@material-ui/core';
import CardForm from "../../components/card/CardForm";
import {clearSelectedMentor} from "../../services/mentors/mentorsActions"

import "./CardForm.css";

const stripePromise = loadStripe("pk_test_51HNHGPEnkm8R0LuQq6ElEuxVbDmcuFHIEQlMsWolC1NdEbxEoaH91oWtFd8T31Wine6rtIwAZJ4lgylshF2bcD7D00ZmAFUhPS");

const useStyles = makeStyles({
  dialogPaper: theme=>( {
    [theme.breakpoints.down(480)]: {
      margin: 0,
      width:'100%',
      textAlign: 'center'
    },
  })
});

function CardDialog({ dispatch,selectedMentor }) {

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    console.log("closing modal")
    dispatch(clearSelectedMentor())
    setOpenModal(false);
    
  };
  useEffect(() => {
    handleModalOpen();


  }, [selectedMentor]);

  const theme = useTheme();
  const classes = useStyles(theme);
  //console.log("individualmentor",mentor,date)
  //      to={mentor ? `/positions/${mentor.id}` : "#"}
  return (


    <Dialog
      aria-labelledby="payment-dialog"
      open={openModal}
      onClose={handleModalClose}
      classes={{ paper: classes.dialogPaper }}   
    >
    <DialogTitle id="payment-dialog-title" >Please Provide your Credit Card Info</DialogTitle>
    <Typography variant="h4">For Testing Use 4242 4242 4242 4242 04/24 444</Typography>
    <DialogContent>
      <Elements stripe={stripePromise}>
          <CardForm mentor={selectedMentor} />
        </Elements>
  
    </DialogContent>
  </Dialog>
  );
}

const mapStateToProps = (state) => ({
  selectedMentor:state.mentors.selectedMentor
});

export default connect(mapStateToProps)(CardDialog);











