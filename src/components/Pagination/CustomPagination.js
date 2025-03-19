import React from "react";
import Pagination from "@mui/material/Pagination"; // ✅ Corrected import
import { createTheme, ThemeProvider } from "@mui/material/styles"; // ✅ Corrected import

const darkTheme = createTheme({ // ✅ Updated function name
  palette: {
    mode: "dark", // ✅ 'type' is now 'mode' in MUI v5
  },
});

export default function CustomPagination({ setPage, numOfPages = 10 }) {
  // Scroll to top when page changes
  const handlePageChange = (event, page) => { // ✅ Updated event handling
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={handlePageChange} // ✅ Fixed event handling
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
}
