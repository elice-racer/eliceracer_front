import { createTheme } from "@mui/material/styles";

// todo mui 커스텀 테마 만들기
export const Muitheme = createTheme({
  palette: {
    primary: {
      main: "#dfd6ff",
    },
  },
});

const deviceSizes = {
  mobileS: "290px",
  mobileM: "375px",
  mobileL: "479px",
  tablet: "768px",
  laptop: "1024px",
} as const;

export const device = {
  mobileS: `screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
} as const;

export const colors = {
  purple0: "#f2effb",
  purple1: "#dfd6ff",
  purple2: "#c6b3ff",
  purple3: "#aa8dff",
  purple4: "#7353EA",
  purple5: "#8f6cff",
  purple6: "#804cff",
  purple7: "#7126f4",
  purple8: "#6700e6",
  purple9: "#4700a8",
  purple10: "#230054",
  blue1: "#E7F8F9",
  blue2: "#32C7DB",
  blue3: "#60B5C5",
  green1: "#E6EFE6",
  green2: "#509151",
  gray1: "#EDEDED",
  gray2: "#5F5F5F",
  tomato: "#FF776E",
} as const;

const containerSizes = {};

const theme = {
  device,
  colors,
  containerSizes,
};

export interface GlobalTheme {
  colors: typeof colors;
  device: typeof device;
  containerSizes: typeof containerSizes;
}

export default theme;
