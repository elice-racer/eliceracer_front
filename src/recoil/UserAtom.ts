import { atom } from "recoil";
import { UsersPageInfo } from "../servies/user";

export const currentUserAtom = atom<UsersPageInfo | null>({
  key: "currentUserAtom",
  default: null,
});
