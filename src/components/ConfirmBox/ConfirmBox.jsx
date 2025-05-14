import {
  Button,
  Dialog,
  DialogContent,
  Fade,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { forwardRef } from "react";
import './ConfirmBox.css'
import { assets } from '../../assets/assets';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});


const ConfirmBox = ({open, closeDialog, title ,deleteFunction,status}) => {
    const STATUS_IDLE = 0;

    const getButtonStatusText = () =>{      
    //   return (status === STATUS_IDLE) ?'Delete' : <img src="./load.svg" alt="" />
      return (status === STATUS_IDLE) ?'Delete' : <img src={assets.loading_image} alt="" />
    }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="md"
      scroll="body"
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ px: 8, py: 6, position: "relative" }}>
        <IconButton
          size="medium"
          onClick={closeDialog}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          X
        </IconButton>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5">Delete {title}</Typography>

              <Typography variant="body1">
                Are you sure you want to delete this {title} ?
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", gap: "2rem" }}
          >
            {/* <Button onClick={closeDialog} size="medium" variant="contained" color="primary">
              Cancel
            </Button> */}
            {/* <Button onClick={deleteFunction} size="medium" variant="contained" color="error" disabled={status === 1}>
            {getButtonStatusText()}
            </Button>{" "} */}

            <button className="btn-cancel" onClick={closeDialog}>
              Cancel
            </button>

             <button className="btn-confirm-delete" onClick={deleteFunction}  disabled={status === 1}>
            {getButtonStatusText()}
            </button>{" "}

          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmBox