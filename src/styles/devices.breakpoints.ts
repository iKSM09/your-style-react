export enum Size {
  MobileS = 320,
  MobileM = 375,
  MobileL = 426,
  Tablet = 768,
  Laptop = 1024,
  LaptopL = 1440,
  Desktop = 2560,
}

export const deviceWidth = {
  approxMobile: `${Size.MobileS}px <= width < ${Size.Tablet}px`,
  approxTablet: `${Size.MobileL}px < width < ${Size.Laptop}px`,
  approxLaptop: `${Size.Tablet}px < width <= ${Size.Desktop}px`,
  approxLaptopOnly: `${Size.Tablet}px < width <= ${Size.LaptopL}px`,

  gtMobileS: `width > ${Size.MobileS + 1}px`,
  lteMobileS: `width <= ${Size.MobileS}px`,

  gtMobileM: `width > ${Size.MobileM + 1}px`,
  lteMobileM: `width <= ${Size.MobileM}px`,

  gtMobileL: `width > ${Size.MobileL + 1}px`,
  gteMobileL: `width >= ${Size.MobileL}px`,
  ltMobileL: `width < ${Size.MobileL - 1}px`,
  lteMobileL: `width <= ${Size.MobileL}px`,

  gtTablet: `width > ${Size.Tablet + 1}px`,
  gteTablet: `width >= ${Size.Tablet}px`,
  ltTablet: `width < ${Size.Tablet - 1}px`,
  lteTablet: `width <= ${Size.Tablet}px`,

  gtLaptop: `width > ${Size.Laptop + 1}px`,
  gteLaptop: `width >= ${Size.Laptop}px`,
  ltLaptop: `width < ${Size.Laptop - 1}px`,
  lteLaptop: `width <= ${Size.Laptop}px`,

  gtLaptopL: `width > ${Size.LaptopL + 1}px`,
  lteLaptopL: `width <= ${Size.LaptopL}px`,

  gtDesktop: `width > ${Size.Desktop + 1}px`,
  lteDesktop: `width <= ${Size.Desktop}px`,
};
