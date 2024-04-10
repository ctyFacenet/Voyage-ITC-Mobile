interface Spacing {
    space_2: number;
    space_4: number;
    space_8: number;
    space_10: number;
    space_12: number;
    space_15: number;
    space_16: number;
    space_18: number;
    space_20: number;
    space_24: number;
    space_28: number;
    space_32: number;
    space_36: number;
  }
  
  export const SPACING: Spacing = {
    space_2: 2,
    space_4: 4,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_15: 15,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_24: 24,
    space_28: 28,
    space_32: 32,
    space_36: 36,
  };
  
  interface Color {
    primary: string;
    title: string;
    text: string;
  
    White: string;
    yellow: string,
    violet: string,
    red: string,
    brown: string,
    green: string,
    green_second: string, 
    grey: string
    backgroundYellow: string,
    backgroundViolet: string
    backgroundGreen: string
    backgroundRed: string
    backgourndGrey: string
  }

  
  export const COLORS: Color = {
    primary: "#244A64",
    text: "#6B788E",
    title: "#404041",
    yellow: "#FFB800",
    violet: "#AE63FF",
    red: '#B50000',
    brown: '#A2948A',
    green: '#027A48',
    green_second: '#19B300', 
    White: '#fff',
    grey: 'rgba(64, 64, 65, 0.6)',
    backgroundYellow: 'rgba(255, 184, 0, 0.2)',
    backgroundViolet: 'rgba(174, 99, 255, 0.2)',
    backgroundRed: 'rgba(181, 0, 0, 0.2)',
    backgroundGreen: 'rgba(2, 122, 72, 0.2)',
    backgourndGrey: 'rgba(243, 243, 243, 1)'

   
  };
  
  interface FontFamily {
    poppins_black: string;
    poppins_bold: string;
    poppins_extrabold: string;
    poppins_extralight: string;
    poppins_light: string;
    poppins_medium: string;
    poppins_regular: string;
    poppins_semibold: string;
    poppins_thin: string;
  }
  
  export const FONTFAMILY: FontFamily = {
    poppins_black: "Poppins-Black",
    poppins_bold: "Poppins-Bold",
    poppins_extrabold: "Poppins-ExtraBold",
    poppins_extralight: "Poppins-ExtraLight",
    poppins_light: "Poppins-Light",
    poppins_medium: "Poppins-Medium",
    poppins_regular: "Poppins-Regular",
    poppins_semibold: "Poppins-SemiBold",
    poppins_thin: "Poppins-Thin",
  };
  
  interface FontSize {
    size_8: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_24: number;
    size_30: number;
  }
  
  export const FONTSIZE: FontSize = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_24: 24,
    size_30: 30,
  };
  
  interface BorderRadius {
    radius_4: number;
    radius_8: number;
    radius_10: number;
    radius_15: number;
    radius_20: number;
    radius_25: number;
  }
  
  export const BORDERRADIUS: BorderRadius = {
    radius_4: 4,
    radius_8: 8,
    radius_10: 10,
    radius_15: 15,
    radius_20: 20,
    radius_25: 25,
  };
  

  export const listColor = [
    '#5EBEFF',
    '#244A64',
    '#35729C',
    '#4FA4DE'
  ]