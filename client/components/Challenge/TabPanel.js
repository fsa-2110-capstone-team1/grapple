import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Challenge Type" {...a11yProps(0)} />
          <Tab label="Difficulty Rating" {...a11yProps(1)} />
          <Tab label="Category Type" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Link to={`/challenges/filter/num`}> Numbers</Link>
        <Link to={`/challenges/filter/unit`}> Units</Link>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Link to={`/challenges/filter/diff1`}> 1</Link>
        <Link to={`/challenges/filter/diff2`}>
          {" "}
          2
        </Link>
        <Link to={`/challenges/filter/diff3`}> 3</Link>
        <Link to={`/challenges/filter/diff4`}> 4</Link>
        <Link to={`/challenges/filter/diff5`}> 5</Link>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Link to={`/challenges/filter/cat1`}> Mental</Link>
        <Link to={`/challenges/filter/cat2`}> Physical</Link>
        <Link to={`/challenges/filter/cat3`}> Sleep</Link>
        <Link to={`/challenges/filter/cat4`}> Food</Link>
        <Link to={`/challenges/filter/cat5`}> Misc.</Link>
      </TabPanel>
    </Box>
  );
}
