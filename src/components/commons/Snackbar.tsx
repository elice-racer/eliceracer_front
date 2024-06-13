import { Snackbar as MuiSnackbar } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import ReactDom from "react-dom";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

interface SnackbarProps {
  open: boolean;
  message?: string;
  variant?: "default";
}
export default function Snackbar({ open, message }: SnackbarProps) {
  const el = document.getElementById("modal") as HTMLElement;

  if (!el) return null;

  return ReactDom.createPortal(
    <MuiSnackbar open={open} TransitionComponent={TransitionUp} message={message} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />,
    el
  );
}
