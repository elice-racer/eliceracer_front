import { atom } from "recoil";
import { UsersInfo } from "../servies/user";

export const currentUserAtom = atom<UsersInfo | null>({
  key: "currentUserAtom",
  default: null,
});
