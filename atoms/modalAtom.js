import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false, // want the modal to hide at first
});
