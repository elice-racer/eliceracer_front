import { atom } from "recoil";
import { UsersPageInfo } from "../services/user";

export const currentUserAtom = atom<UsersPageInfo | null>({
  key: "currentUserAtom",
  default: null,
});
