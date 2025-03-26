"use client";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define the props for TabPanel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  dir?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, dir, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      dir={dir}
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

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function ClassGrade() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#F1F1F9',
          boxShadow: 'none',
          paddingY: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          textColor="inherit"
          aria-label="full width tabs"
          scrollButtons={false}
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly', // Center and space out the tabs evenly in desktop
            width: '100%',
            overflowX: 'auto',
            paddingX: 0,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '12px 16px',
              backgroundColor: '#F1F1F9',
              color: '#171717',
              borderRadius: 20,
              border: 'solid 1px #9193A5',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex', // Flex to align text vertically and horizontally
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#f2f2f2',
                color: '#007bff',
              },
              '&.Mui-selected': {
                backgroundColor: '#3198F5',
                color: '#fff',
                border: 'solid 1px #3198F5',
              },
              // Font size adjustments for mobile
              fontSize: { xs: '10px', sm: '12px', md: '14px' },
              paddingX: { xs: 1, sm: 3, md: 6 }, // Adjust padding for mobile
              // Adjustments for desktop to reduce tab width and add spacing
              minWidth: { xs: 'auto', md: '120px' },  // Adjust the minimum width of each tab
              marginRight: { md: '8px' }, 
            },
          }}
        >
          <Tab label="Pre-K to Grade 3" {...a11yProps(0)} />
          <Tab label="Grades 4 - 8" {...a11yProps(1)} />
          <Tab label="Grades 9 - 12" {...a11yProps(2)} />
          <Tab label="Specialized" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        {/* Content for Pre-K to Grade 3 */}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {/* Content for Grades 4 - 8 */}
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        {/* Content for Grades 9 - 12 */}
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        {/* Content for Specialized */}
      </TabPanel>
    </Box>
  );
}
