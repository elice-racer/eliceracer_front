import { useRecoilState } from "recoil";
import { snackbarAtom, SnackbarProps } from "../recoil/SnackbarAtom";

let timer: any;

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarAtom);

  const snackbarOpen = (snackbarProps: SnackbarProps) => {
    setSnackbar({
      open: true,
      message: snackbarProps.message,
    });

    if (!timer) {
      timer = setTimeout(() => {
        snackbarClose();
        timer = null;
      }, 3000);
    }
  };

  const snackbarClose = () => {
    setSnackbar({
      open: false,
      message: "",
    });
  };

  return {
    snackbar,
    snackbarOpen,
    snackbarClose,
  };
};
