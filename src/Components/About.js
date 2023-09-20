import { useLocation, useParams } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { data } from "../data";
import {
  Tabs,
  Tab,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Modal,
} from "@mui/material";

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

export default function About() {
  const [value, setValue] = useState(0);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const obj = data.filter((ele) => {
      return ele.id === params?.id;
    });
    setUserData(obj[0]);
  }, []);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const myStyle = {
    backgroundImage: `url(${"/main.jpeg"})`,
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      {userData && Object.keys(userData).length > 0 ? (
        <>
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={"/main.jpeg"}
              alt="Avatar"
              className="home-image"
              style={{
                filter: "brightness(.2)",
                height: "20rem",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "10%",
                color: "white",
                display: "flex",
              }}
            >
              <AccountCircleIcon
                style={{ width: "250px", height: "250px", color: "white" }}
              />
              <div style={{ marginTop: "80px", marginLeft: "40px" }}>
                <b style={{ fontSize: "30px" }}>{userData?.name} </b>
                <Typography sx={{ marginRight: "20px" }}>
                  {userData?.profile?.role}{" "}
                </Typography>
              </div>
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="National Id info" {...a11yProps(1)} />
                <Tab label="Documents" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              Profile
              <Card
                variant="outlined"
                sx={{ maxWidth: "500px", marginLeft: "300px" }}
              >
                <React.Fragment>
                  <CardContent>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <Typography sx={{ marginRight: "20px" }}>
                        Profile{" "}
                      </Typography>
                      <HelpOutlineOutlinedIcon sx={{ marginRight: "20px" }} />
                      <CreateOutlinedIcon />
                    </div>
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>First Name: </p>
                        <p>Last Name:</p>
                        <p>Employee ID:</p>
                        <p>Role:</p>
                      </div>
                      <div>
                        <p>{userData.profile.firstName}</p>
                        <p>{userData.profile.lastName}</p>
                        <p>{userData.profile.empId}</p>
                        <p>{userData.profile.role}</p>
                      </div>
                      <div></div>
                    </div>
                  </CardContent>
                </React.Fragment>
              </Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button sx={{ width: "200px" }} variant="contained" disabled>
                  Previous Tab
                </Button>
                <Button
                  sx={{ width: "200px" }}
                  variant="contained"
                  onClick={(e) => handleChange(e, 1)}
                >
                  Next Tab
                </Button>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              National ID information
              <Card variant="outlined" sx={{ marginLeft: "200px" }}>
                <React.Fragment>
                  <CardContent>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <Typography sx={{ marginRight: "20px" }}>
                        {" "}
                        National ID information
                      </Typography>
                      <HelpOutlineOutlinedIcon sx={{ marginRight: "20px" }} />
                      <CreateOutlinedIcon />
                    </div>
                    <Divider />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <table>
                        <tr>
                          <th>Person ID</th>
                          <th>Start Date</th>
                          <th>Country</th>
                          <th>National Id Card Type</th>
                          <th>National Id</th>
                          <th>Is Primary</th>
                          <th>Notes</th>
                          <th>Attachment</th>
                          <th>Operation</th>
                        </tr>
                        {userData?.national.map((item) => (
                          <tr>
                            <td>{item.personId}</td>
                            <td>{item.startDate}</td>
                            <td>{item.country}</td>
                            <td>{item.cardType}</td>
                            <td>{item.nationalId}</td>
                            <td>{item.isPrimary}</td>
                            <td>{item.notes}</td>
                            <td>{item.attachment}</td>
                            <td>{item.operation}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </CardContent>
                </React.Fragment>
              </Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  sx={{ width: "200px" }}
                  variant="contained"
                  onClick={(e) => handleChange(e, 0)}
                >
                  Previous Tab
                </Button>
                <Button
                  sx={{ width: "200px" }}
                  variant="contained"
                  onClick={(e) => handleChange(e, 2)}
                >
                  Next Tab
                </Button>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Documents
              <Card
                variant="outlined"
                sx={{ maxWidth: "900px", marginLeft: "300px" }}
              >
                <React.Fragment>
                  <CardContent>
                    Documents
                    <Divider />
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>Emp ID</th>
                        <th>Document type</th>
                        <th>Preview Document</th>
                        <th>Download</th>
                      </tr>
                      {userData?.documents.map((item) => (
                        <tr>
                          <td>{userData.name}</td>
                          <td>{userData.profile.empId}</td>
                          <td>{item.type}</td>
                          <td>
                            <u
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => handleOpen(item.image)}
                            >
                              {item.type}
                            </u>
                            {selectedImage && (
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box
                                  sx={{
                                    position: "relative",
                                    top: "30%",
                                    left: "35%",
                                  }}
                                >
                                  <img
                                    src={selectedImage}
                                    alt={item.type}
                                    width={"500px"}
                                    height={"300px"}
                                    style={{ position: "absolute" }}
                                  />
                                </Box>
                              </Modal>
                            )}
                          </td>
                          <td>
                            <u>
                              <a href={item.image} download>
                                Download
                              </a>
                            </u>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </CardContent>
                </React.Fragment>
              </Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  sx={{ width: "200px" }}
                  variant="contained"
                  onClick={(e) => handleChange(e, 1)}
                >
                  Previous Tab
                </Button>
                <Button sx={{ width: "200px" }} variant="contained" disabled>
                  Next Tab
                </Button>
              </div>
            </CustomTabPanel>
          </Box>
        </>
      ) : (
        "No Data"
      )}
    </>
  );
}
