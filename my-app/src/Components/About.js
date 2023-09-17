import { useLocation } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as React from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
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
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
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
  const location = useLocation();
  const { userData } = location.state;
  console.log(userData.documents, "userData");
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundImage: `url("main.jpeg")`,
        }}
      >
        <AccountCircleIcon style={{ width: "250px", height: "250px" }} />
        <div style={{ marginTop: "80px", marginLeft: "40px" }}>
          <b style={{ fontSize: "30px" }}>{userData?.name} </b>
          <Typography sx={{ marginRight: "20px" }}>
            {userData?.profile?.role}{" "}
          </Typography>
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
                  <Typography sx={{ marginRight: "20px" }}>Profile </Typography>
                  <HelpOutlineOutlinedIcon sx={{ marginRight: "20px" }} />
                  <CreateOutlinedIcon />
                </div>
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          National ID information
          <Card
            variant="outlined"
            sx={{ maxWidth: "500px", marginLeft: "300px" }}
          >
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
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p>Permanent Account Number</p>
                    <p>Aadhar</p>
                    <p>Passport</p>
                  </div>
                  <div>
                    <p>{userData.national.pan}</p>
                    <p>{userData.national.aadhar}</p>
                    <p>{userData.national.passport}</p>
                  </div>
                  <div></div>
                </div>
              </CardContent>
            </React.Fragment>
          </Card>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Documents
          <Card
            variant="outlined"
            sx={{ maxWidth: "500px", marginLeft: "300px" }}
          >
            <React.Fragment>
              <CardContent>
                Documents
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p>Permanent Account Number</p>
                    <p>Aadhar</p>
                    <p>Passport</p>
                  </div>
                  <div>
                    {userData?.documents.map((item) => (
                      <>
                        <u>
                          <p
                            style={{ color: "blue" }}
                            onClick={() => handleOpen(item.image)}
                          >
                            {item.type}
                          </p>
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
                      </>
                    ))}
                  </div>
                  <div>
                    {userData?.documents.map((item) => (
                      <>
                        <u>
                          <a
                            href={item.image}
                            download
                            style={{
                              display: "flex",
                              marginTop: "17px",
                              marginBottom: "15px",
                            }}
                          >
                            Download
                          </a>
                        </u>
                      </>
                    ))}
                  </div>
                </div>
              </CardContent>
            </React.Fragment>
          </Card>
        </CustomTabPanel>
      </Box>
    </>
  );
}
