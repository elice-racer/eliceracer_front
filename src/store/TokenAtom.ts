import { atom, selector } from "recoil";

export const tokenAtom = atom({
  key: "tokenAtom",
  default: undefined,
});

export const isLoginSelector = selector({
  key: "isLoginSelector",
  get: ({ get }) => !!get(tokenAtom),
});
