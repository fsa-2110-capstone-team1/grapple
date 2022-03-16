import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#D8F1F6',
      main: '#248DA2',
      dark: '#196170',
      contrastText: '#fff',
    },
    secondary: {
      light: '#E0F6FE',
      main: '#0788B7',
      dark: '#022B3A',
      contrastText: '#fff',
    },
    // warning: {
    //   light: '#C54B7B',
    //   main: '#C54B7B',
    //   dark: '#C54B7B',
    //   contrastText: '#fff',
    // },
  },
});

// export const navtheme = createTheme({
//   palette: {
//     primary: {
//       light: '#C54B7B',
//       main: '#C54B7B',
//       dark: '#C54B7B',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#E0F6FE',
//       main: '#0788B7',
//       dark: '#022B3A',
//       contrastText: '#fff',
//     },
//   },
// });

export default theme;
