import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Filterer() {
  const [difficulty, setDifficulty] = useState(0);
  const [category, setCategory] = useState('All');


  const handleChangeDiff = (event) => {
    setDifficulty(event.target.value);
  };

  const handleChangeCat = (event) => {
    setCategory(event.target.value);
  };

  console.log(difficulty)
  console.log(category)
  return (
    <>
    <h3>Filter By</h3>
    &nbsp;
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={difficulty}
          label="difficulty"
          onChange={handleChangeDiff}
        >
          
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </Box>
&nbsp;&nbsp;
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label1">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            value={category}
            label="category"
            onChange={handleChangeCat}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Mental'}>Mental</MenuItem>
            <MenuItem value={'Physical'}>Physical</MenuItem>
            <MenuItem value={'Sleep'}>Sleep</MenuItem>
            <MenuItem value={'Food'}>Food</MenuItem>
            <MenuItem value={'Misc'}>Misc</MenuItem>
          </Select>
        </FormControl>
      </Box>  
      </>);
}