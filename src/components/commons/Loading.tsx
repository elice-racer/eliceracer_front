import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { loadingAtom } from "../../recoil/LoadingAtom";
import { useRecoilState } from "recoil";

export default function Loading() {
  const [isLoading, setLoading] = useRecoilState(loadingAtom);

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
