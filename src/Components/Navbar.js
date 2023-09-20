import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../data";
import {
  Card,
  CardContent,
  AppBar,
  Box,
  Toolbar,
  InputBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import MessageIcon from "@mui/icons-material/Message";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "40px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    borderRadius: "40px",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "10px",
    borderRadius: "40px",
    border: "2px solid blue",
    transition: theme.transitions.create("width"),
    width: "100%",
    minWidth: "500px",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue === "") {
      setUserData([]);
    } else {
      const filterData = data.filter((item) => {
        return item.name.includes(searchValue);
      });
      setUserData(filterData);
    }
  }, [searchValue]);

  const handleUserClickOnSearch = (name) => {
    console.log(name);
    const userData = data.filter((item) => {
      return item.name === name;
    });
    navigate(`/about/${userData[0].id}`);
    setSearchValue("");
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "lightgray" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "lightgray", height: "5rem" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={"/avenir.png"}
            alt="Avatar"
            className="avatar"
            style={{ objectFit: "cover", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          />
          <div style={{ display: "flex" }}>
            <Search style={{ position: "relative" }}>
              <StyledInputBase
                placeholder="Search…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
              {userData.length > 0 && (
                <Card
                  variant="outlined"
                  sx={{
                    width: "500px",
                    position: "absolute",
                    zIndex: "50",
                  }}
                >
                  <>
                    <CardContent>
                      {userData.map((item, index) => (
                        <ul key={index} style={{ listStyleType: "none" }}>
                          <li
                            key={index}
                            onClick={(e) => handleUserClickOnSearch(item.name)}
                            style={{ cursor: "pointer" }}
                          >
                            {item.name}
                          </li>
                        </ul>
                      ))}
                    </CardContent>
                  </>
                </Card>
              )}
            </Search>

            <SearchIcon
              sx={{ color: "black", marginRight: "20px", marginTop: "10px" }}
            />
          </div>
          <div>
            <MessageIcon sx={{ color: "black", marginRight: "20px" }} />
            <NotificationsNoneIcon
              sx={{ color: "black", marginRight: "20px" }}
            />
            <MenuBookIcon sx={{ color: "black", marginRight: "20px" }} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
