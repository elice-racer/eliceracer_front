import { atom } from "recoil";

// SnackbarProps 인터페이스 정의
export interface SnackbarProps {
  open: boolean;
  message: string;
}

// TSnackbar 타입 정의
export type TSnackbar = Omit<SnackbarProps, "open">;

// 초기 상태 정의
const initialState: SnackbarProps = {
  open: false,
  message: "",
};

export const snackbarAtom = atom({
  key: "snackbarAtom",
  default: initialState,
});
