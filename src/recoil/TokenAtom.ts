import { atom, selector } from "recoil";

export const tokenAtom = atom<string | null>({
  key: "tokenAtom",
  default: null,
});

export const isLoginSelector = selector({
  key: "isLoginSelector",
  get: ({ get }) => !!get(tokenAtom),
});
