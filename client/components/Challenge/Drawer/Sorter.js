// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getAllWines, deleteWine } from '../store';

// import { Box, Typography, Grid, Container, Paper,
//   Card, CardMedia, CardContent, CardActions,
//   InputLabel, MenuItem, ListSubheader, FormControl, Select, FormHelperText,
//   ToggleButton, ToggleButtonGroup,
//   Button, IconButton, Breadcrumbs
//   } from '@mui/material';
// import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

// import useStyles from '../styles';
// import FilterWines from './FilterWines';
// import WinesGrids from './WinesGrids';

// const AllWines = () => {
//   const state = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const classes = useStyles();

//   const [ wines, setWines ] = useState(state.wines.wines);
//   useEffect(()=>{
//     setWines(state.wines.wines)
//   }, [state.wines.wines])
 
//   const [ filteredType, setType ] = useState('');
//   const [ filteredBlend, setBlend ] = useState('');
//   const [ filteredCountry, setCountry ] = useState('');
//   const [ filteredRegion, setRegion ] = useState('');
//   const [ filtered, setFiltered ] = useState(false);
 
//   const handleSort = (ev) => {
//     const sortBy = ev.target.value;
//     const sortProducts = [...wines];
//     sortProducts.sort((a, b) => {
//       switch (sortBy) {
//         case 'a-z':
//           return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
//         case 'z-a':
//           return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
//         case 'lowtohigh':
//           return a.price - b.price;
//         case 'hightolow':
//           return b.price - a.price;
//         default: // includes 'featured'
//           return a.isFeatured && b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
//       }
//     })
//     setWines(sortProducts);
//   }

//   const resetFilter = () => {
//     location.reload();
//   }

//   const handleFilter = (ev) => {
//     filtered ? setWines(state.wines.wines) : ''
   
//     let newType = filteredType;
//     let newBlend = filteredBlend;
//     let newCountry = filteredCountry;
//     let newRegion = filteredRegion;
   
//     switch (ev.target.name) {
//       case 'type':
//         newType = ev.target.value
//         setType(newType);
//         break;
//       case 'blend':
//         newBlend = ev.target.value
//         setBlend(newBlend)
//         break;
//       case 'country':
//         newCountry = ev.target.value
//         setCountry(newCountry)
//         break;
//       case 'region':
//         newRegion = ev.target.value
//         setRegion(newRegion)
//         break;
//     }

//     let newList = [...state.wines.wines];
//     let filteredList = [];
//     if(newType){
     
//       newList = newList.filter( wine => wine.type === newType );
//     }
//     if(newBlend){
//       newList = newList.filter( wine => wine.blend === newBlend );
//     }
//     if(newCountry){
//       newList = newList.filter( wine => wine.country === newCountry );
//     }
//     if(newRegion){
//       newList = newList.filter( wine => wine.region === newRegion );
//     }
//     setWines(newList)
//     setFiltered(true)
   
//   }
//   const types = [...new Set(state.wines.wines.map((wine) => wine.type))]
//   const blends = [...new Set(state.wines.wines.map((wine) => wine.blend))]
//   const countries = [...new Set(state.wines.wines.map((wine) => wine.country))]
//   const regions = [...new Set(state.wines.wines.map((wine) => wine.region))]

//   return ( 
//     <div>
//       <Container maxWidth="xl" className={classes.container} style={{display: 'flex'}}>
     
//         <div className='filterBar'>
//           <Box style={{display: 'flex', flexDirection: 'column', width: '170px', margin: '25px'}}>
//             <FilterWines types={types} blends={blends} countries={countries} regions={regions} handleFilter={handleFilter} resetFilter={resetFilter} handleSort={handleSort} /> 
//           </Box>
//         </div>

//         <div className='winesResults'>
//           <Typography
//             variant="h6"
//             align="center"
//             color="textPrimary"
//             gutterBottom
//           >
//           { filtered ? ` ${wines.length}
//             ${filteredType}
//             ${filteredBlend}
//             ${filteredCountry}
//             ${filteredRegion}` : ''}
         
//           </Typography>
         
//           <Container className={classes.cardGrid}> 
//             {/* <div role="presentation" onClick={handleClick}>
//               <Breadcrumbs aria-label="breadcrumb">
//                 <Link underline="hover" color="inherit" href="/">
//                   HOME
//                 </Link>
               
//                 <Typography color="text.primary">Sips</Typography>
//               </Breadcrumbs>
//             </div> */}

//             <WinesGrids wines={wines} handleSort={handleSort} />
//           </Container>
//         </div>
 
//       </Container>
//     </div>
   
//   )
// }

// export default AllWines;
// Sent from my iPhone