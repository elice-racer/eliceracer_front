import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
  isLoading: boolean;
  onClose: () => void;
}

export default function Loading({ isLoading, onClose }: LoadingProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
