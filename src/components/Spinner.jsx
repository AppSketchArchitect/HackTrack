import Backdrop from "@mui/material/Backdrop"; //Resources of the backdrop
import CircularProgress from "@mui/material/CircularProgress"; //Resources of the backdrop
import { makeStyles } from "@mui/styles"; //Import function to style the backdrop
import useLoadingContext from "../context/LoadingContext";

const useStyles = makeStyles({ //Spinner style
  backdrop: {
    position: "absolute"
  }
});

export default function Spinner(){ {/* Show a spinner and lock the page */}
  const classes = useStyles();
  const loadingContext = useLoadingContext();

  return (
    <>
    {loadingContext.isLoading == true && // We show the spinner only if the context need it (Can be show from anywhere)
      <div>
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    }
    </>
  );
}