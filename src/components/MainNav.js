import * as React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TvIcon from '@mui/icons-material/Tv';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate(); // Corrected: useNavigate instead of useHistory

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, navigate]); // Correct dependency array

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: '#2d313a',
          color: 'white',
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} sx={{ color: 'white' }} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} sx={{ color: 'white' }} />
        <BottomNavigationAction label="Tv Series" icon={<TvIcon />} sx={{ color: 'white' }} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} sx={{ color: 'white' }} />
      </BottomNavigation>
    </Box>
  );
}
