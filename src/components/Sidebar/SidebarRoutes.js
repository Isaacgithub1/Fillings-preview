import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import RequestPageRoundedIcon from "@mui/icons-material/RequestPageRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import AddTaskIcon from "@mui/icons-material/AddTask";
import React from "react";
import { Link } from "react-router-dom";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { AssignmentIndRounded, CallMissedOutgoingRounded, FactCheckRounded, ListAltRounded, PsychologyAltRounded } from "@mui/icons-material";

const FilingsRoutes = ({open}) => {
     const [Expand, setExpand] = React.useState(false);
     const [ReqExpand, setReqExpand] = React.useState(false);

     const handleClickExpand = () => {
       setExpand(!Expand);
     };
     const handleClickReqExpand = () => {
       setReqExpand(!ReqExpand);
     };

     const [selectedIndex, setSelectedIndex] = React.useState(1);

     const handleListItemClick = (event, index) => {
       setSelectedIndex(index);
     };
     const admin_nav = [
       // {
       //   icon: <ListAltRoundedIcon />,
       //   path: "/enq-form",
       //   name: "Enquiry Form",
       // },
       {
         isSelected: 1,
         icon: <AdminPanelSettingsRoundedIcon />,
         path: "/enq-admin",
         name: "Enquiry Admin",
       },
     ];

     const data = [
       {
         isSelected: 2,
         icon: <RequestPageRoundedIcon />,
         path: "/tax-filing",
         name: "Tax Filing",
       },
       {
         isSelected: 3,
         icon: <DescriptionRoundedIcon />,
         path: "/compliance",
         name: "Compliance",
       },
       {
         isSelected: 4,
         icon: <ContactPageRoundedIcon />,
         path: "/payroll-hr",
         name: "Payroll & HR",
       },
     ];

    return (
      <>
        <List component="div">
          <ListItemButton
            sx={{
              borderRadius: "6px",
              "&:hover": {
                background: "#90b4ce !important",
                "& .icon-list-1": {
                  color: "#FFFFFE",
                },
                "& .text-list-1": {
                  color: "#FFFFFE",
                },
              },
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={handleClickReqExpand}
          >
            <ListItemIcon
              className="icon-list-1"
              sx={{
                color: "#094067",
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AddTaskIcon />
            </ListItemIcon>
            <ListItemText
              className="text-list-1"
              sx={{ color: "#094067", opacity: open ? 1 : 0 }}
              primary="Requests"
            />
            {ReqExpand ? (
              <ExpandLess
                className="icon-list-1"
                sx={{
                  color: "#094067",
                  // minWidth: 0,
                  // mr: open ? 3 : "auto",
                  // justifyContent: "center",
                }}
              />
            ) : (
              <ExpandMore
                className="icon-list-1"
                sx={{
                  color: "#094067",
                  // minWidth: 0,
                  // mr: open ? 3 : "auto",
                  // justifyContent: "center",
                }}
              />
            )}
          </ListItemButton>
          <Collapse in={ReqExpand} timeout="auto" unmountOnExit>
            {admin_nav.map((text, idx) => (
              <ListItem
                component={Link}
                to={text.path}
                key={idx}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  selected={selectedIndex === text.isSelected}
                  onClick={(event) =>
                    handleListItemClick(event, text.isSelected)
                  }
                  component="div"
                  to={text.path}
                  key={idx}
                  sx={{
                    borderRadius: "6px",

                    "&:hover": {
                      background: "#90b4ce !important",
                      "& .icon-list-1": {
                        color: "#FFFFFE",
                      },
                      "& .text-list-1": {
                        color: "#FFFFFE",
                      },
                    },
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    pl: open ? 4 : 2.5,
                  }}
                >
                  <ListItemIcon
                    className="icon-list-1"
                    sx={{
                      color: "#094067",
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    className="text-list-1"
                    primary={text.name}
                    sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Collapse>
        </List>
        <Divider />
        <List component="div">
          <ListItemButton
            sx={{
              borderRadius: "6px",
              "&:hover": {
                background: "#90b4ce !important",
                "& .icon-list-1": {
                  color: "#FFFFFE",
                },
                "& .text-list-1": {
                  color: "#FFFFFE",
                },
              },
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              pl: 2.5,
            }}
            onClick={handleClickExpand}
          >
            <ListItemIcon
              className="icon-list-1"
              sx={{
                color: "#094067",
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <EngineeringRoundedIcon />
            </ListItemIcon>
            <ListItemText
              className="text-list-1"
              sx={{ color: "#094067", opacity: open ? 1 : 0 }}
              primary="Services"
            />
            {Expand ? (
              <ExpandLess
                className="icon-list-1"
                sx={{
                  color: "#094067",
                  // minWidth: 0,
                  // mr: open ? 3 : "auto",
                  // justifyContent: "center",
                }}
              />
            ) : (
              <ExpandMore
                className="icon-list-1"
                sx={{
                  color: "#094067",
                  // minWidth: 0,
                  // mr: open ? 3 : "auto",
                  // justifyContent: "center",
                }}
              />
            )}
          </ListItemButton>
          <Collapse in={Expand} timeout="auto" unmountOnExit>
            <List>
              {data.map((text, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    selected={selectedIndex === text.isSelected}
                    onClick={(event) =>
                      handleListItemClick(event, text.isSelected)
                    }
                    component={Link}
                    to={text.path}
                    key={index}
                    sx={{
                      // pl: 4,
                      borderRadius: "6px",
                      "&:hover": {
                        background: "#90b4ce !important",
                        "& .icon-list-1": {
                          color: "#FFFFFE",
                        },
                        "& .text-list-1": {
                          color: "#FFFFFE",
                        },
                      },
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      pl: open ? 4 : 2.5,
                    }}
                  >
                    <ListItemIcon
                      className="icon-list-1"
                      sx={{
                        color: "#094067",
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="text-list-1"
                      primary={text.name}
                      sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </>
    );

};

const JobSuppRoutes = ({ open }) => {
  const [ReqExpand, setReqExpand] = React.useState(false);

  const handleClickReqExpand = () => {
    setReqExpand(!ReqExpand);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const admin_nav = [
    // {
    //   icon: <ListAltRoundedIcon />,
    //   path: "/enq-form",
    //   name: "Enquiry Form",
    // },
    {
      isSelected: 1,
      icon: <ListAltRounded />,
      path: "/job-supp-table",
      name: "Job-Supp List",
    },
    {
      isSelected: 2,
      icon: <CallMissedOutgoingRounded />,
      path: "/js-followup-table",
      name: "Follow-up List",
    },
    {
      isSelected: 3,
      icon: <FactCheckRounded />,
      path: "/job-supp-confrimed-table",
      name: "Confirmed List",
    },
    {
      isSelected: 4,
      icon: <AssignmentIndRounded />,
      path: "/job-supp-resource-table",
      name: "Resource List",
    },
  ];

  return (
    <>
      <List component="div">
        <ListItemButton
          sx={{
            borderRadius: "6px",
            "&:hover": {
              background: "#90b4ce !important",
              "& .icon-list-1": {
                color: "#FFFFFE",
              },
              "& .text-list-1": {
                color: "#FFFFFE",
              },
            },
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={handleClickReqExpand}
        >
          <ListItemIcon
            className="icon-list-1"
            sx={{
              color: "#094067",
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <WorkRoundedIcon/>
          </ListItemIcon>
          <ListItemText
            className="text-list-1"
            sx={{ color: "#094067", opacity: open ? 1 : 0 }}
            primary="Job Support"
          />
          {ReqExpand ? (
            <ExpandLess
              className="icon-list-1"
              sx={{
                color: "#094067",
                // minWidth: 0,
                // mr: open ? 3 : "auto",
                // justifyContent: "center",
              }}
            />
          ) : (
            <ExpandMore
              className="icon-list-1"
              sx={{
                color: "#094067",
                // minWidth: 0,
                // mr: open ? 3 : "auto",
                // justifyContent: "center",
              }}
            />
          )}
        </ListItemButton>
        <Collapse in={ReqExpand} timeout="auto" unmountOnExit>
          {admin_nav.map((text, idx) => (
            <ListItem
              component={Link}
              to={text.path}
              key={idx}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                selected={selectedIndex === text.isSelected}
                onClick={(event) => handleListItemClick(event, text.isSelected)}
                component="div"
                to={text.path}
                key={idx}
                sx={{
                  borderRadius: "6px",

                  "&:hover": {
                    background: "#90b4ce !important",
                    "& .icon-list-1": {
                      color: "#FFFFFE",
                    },
                    "& .text-list-1": {
                      color: "#FFFFFE",
                    },
                  },
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  pl: open ? 4 : 2.5,
                }}
              >
                <ListItemIcon
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  className="text-list-1"
                  primary={text.name}
                  sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />
    </>
  );
};

const AdminRoutes = ({ open }) => {
  const [Expand, setExpand] = React.useState(false);
  const [ReqExpand, setReqExpand] = React.useState(false);

  const handleClickExpand = () => {
    setExpand(!Expand);
  };
  const handleClickReqExpand = () => {
    setReqExpand(!ReqExpand);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const admin_nav = [
    // {
    //   icon: <ListAltRoundedIcon />,
    //   path: "/enq-form",
    //   name: "Enquiry Form",
    // },
    {
      isSelected: 1,
      icon: <SupervisorAccountRoundedIcon />,
      path: "/admin",
      name: "Users List",
    },
  ];

  return (
    <>
      <List component="div">
        <ListItemButton
          sx={{
            borderRadius: "6px",
            "&:hover": {
              background: "#90b4ce",
              "& .icon-list-1": {
                color: "#FFFFFE",
              },
              "& .text-list-1": {
                color: "#FFFFFE",
              },
            },
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={handleClickReqExpand}
        >
          <ListItemIcon
            className="icon-list-1"
            sx={{
              color: "#094067",
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <ShieldRoundedIcon />
          </ListItemIcon>
          <ListItemText
            className="text-list-1"
            sx={{ color: "#094067", opacity: open ? 1 : 0 }}
            primary="Admin"
          />
          {ReqExpand ? (
            <ExpandLess
              className="icon-list-1"
              sx={{
                color: "#094067",
                // minWidth: 0,
                // mr: open ? 3 : "auto",
                // justifyContent: "center",
              }}
            />
          ) : (
            <ExpandMore
              className="icon-list-1"
              sx={{
                color: "#094067",
                // minWidth: 0,
                // mr: open ? 3 : "auto",
                // justifyContent: "center",
              }}
            />
          )}
        </ListItemButton>
        <Collapse in={ReqExpand} timeout="auto" unmountOnExit>
          {admin_nav.map((text, idx) => (
            <ListItem
              component={Link}
              to={text.path}
              key={idx}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                selected={selectedIndex === text.isSelected}
                onClick={(event) => handleListItemClick(event, text.isSelected)}
                component="div"
                to={text.path}
                key={idx}
                sx={{
                  borderRadius: "6px",

                  "&:hover": {
                    background: "#90b4ce",
                    "& .icon-list-1": {
                      color: "#FFFFFE",
                    },
                    "& .text-list-1": {
                      color: "#FFFFFE",
                    },
                  },
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  pl: open ? 4 : 2.5,
                }}
              >
                <ListItemIcon
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  className="text-list-1"
                  primary={text.name}
                  sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />
    </>
  );
};

const CourseEnqRoutes = ({ open }) => {
  const [Expand, setExpand] = React.useState(false);
  const [ReqExpand, setReqExpand] = React.useState(false);

  const handleClickExpand = () => {
    setExpand(!Expand);
  };
  const handleClickReqExpand = () => {
    setReqExpand(!ReqExpand);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const admin_nav = [
    // {
    //   icon: <ListAltRoundedIcon />,
    //   path: "/enq-form",
    //   name: "Enquiry Form",
    // },
    {
      isSelected: 1,
      icon: <FactCheckRounded />,
      path: "/enquiry-table",
      name: "Course-Enq List",
    },
  ];

  return (
    <>
      <List component="div">
        <ListItemButton
          sx={{
            borderRadius: "6px",
            "&:hover": {
              background: "#90b4ce",
              "& .icon-list-1": {
                color: "#FFFFFE",
              },
              "& .text-list-1": {
                color: "#FFFFFE",
              },
            },
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={handleClickReqExpand}
        >
          <ListItemIcon
            className="icon-list-1"
            sx={{
              color: "#094067",
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <LocalLibraryRoundedIcon />
          </ListItemIcon>
          <ListItemText
            className="text-list-1"
            sx={{ color: "#094067", opacity: open ? 1 : 0 }}
            primary="Course-Enq"
          />
          {ReqExpand ? (
            <ExpandLess
              className="icon-list-1"
              sx={{
                color: "#094067",
                // minWidth: 0,
                // mr: open ? 3 : "auto",
                // justifyContent: "center",
              }}
            />
          ) : (
            <ExpandMore
              className="icon-list-1"
              sx={{
                color: "#094067",
                // minWidth: 0,
                // mr: open ? 3 : "auto",
                // justifyContent: "center",
              }}
            />
          )}
        </ListItemButton>
        <Collapse in={ReqExpand} timeout="auto" unmountOnExit>
          {admin_nav.map((text, idx) => (
            <ListItem
              component={Link}
              to={text.path}
              key={idx}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                selected={selectedIndex === text.isSelected}
                onClick={(event) => handleListItemClick(event, text.isSelected)}
                component="div"
                to={text.path}
                key={idx}
                sx={{
                  borderRadius: "6px",

                  "&:hover": {
                    background: "#90b4ce",
                    "& .icon-list-1": {
                      color: "#FFFFFE",
                    },
                    "& .text-list-1": {
                      color: "#FFFFFE",
                    },
                  },
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  pl: open ? 4 : 2.5,
                }}
              >
                <ListItemIcon
                  className="icon-list-1"
                  sx={{
                    color: "#094067",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  className="text-list-1"
                  primary={text.name}
                  sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />
    </>
  );
};


export { FilingsRoutes, JobSuppRoutes, AdminRoutes, CourseEnqRoutes };
