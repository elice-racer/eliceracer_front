const deviceSizes = {
  mobileS: "290px",
  mobileM: "375px",
  mobileL: "479px",
  tablet: "768px",
  laptop: "1024px",
} as const;

const device = {
  mobileS: `screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
} as const;

const colors = {
  puple1: "#EEEAFE",
  puple2: "#B67BFF",
  puple3: "#954AF5",
  puple4: "#7353EA",
  puple5: "#6700E6",
  blue1: "#E7F8F9",
  blue2: "#32C7DB",
  blue3: "#60B5C5",
  green1: "#E6EFE6",
  green2: "#509151",
  gray1: "#EDEDED",
  gray2: "#5F5F5F",
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
