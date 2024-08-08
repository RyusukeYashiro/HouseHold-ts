import { createTheme } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { dark, light, PaletteColor, PaletteColorOptions } from "@mui/material/styles/createPalette";

//Paletteの型定義を行う必要がある
// PaletteではcreatePalette.d.tsという型定義ファイルで
// PaletteOptionsというinterfaceが宣言。
declare module "@mui/material/styles" {
    interface Palette {
        incomeColor : PaletteColor
        expenseColor : PaletteColor
        balanceColor : PaletteColor
    }
    interface PaletteOptions {
        incomeColor? :  PaletteColorOptions
        expenseColor? : PaletteColorOptions
        balanceColor?: PaletteColorOptions
    }
}


export const  Theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP , Roboto , sans-serif',
        fontWeightRegular : 400,
        fontWeightMedium : 500,
        fontWeightBold : 700
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        },
    },
    //アプリの色を定義
    palette : {
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        balanceColor: {
            main: green[500],
            light: green[100],
            dark: green[700],
        }
    }
});

