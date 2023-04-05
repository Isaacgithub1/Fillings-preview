import React from "react";
import { useSignOut } from "react-auth-kit";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider, { dividerClasses } from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useValue } from "../../Context/ContextProvider";
import {
  AdminRoutes,
  CourseEnqRoutes,
  FilingsRoutes,
  JobSuppRoutes,
} from "./SidebarRoutes";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: `rgb(0 0 0 / 6%) 0px 5px 5px -3px, rgb(0 0 0 / 4%) 0px 8px 10px 1px, rgb(0 0 0 / 4%) 0px 3px 14px 2px`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    boxShadow: `rgb(0 0 0 / 6%) 0px 5px 5px -3px, rgb(0 0 0 / 4%) 0px 8px 10px 1px, rgb(0 0 0 / 4%) 0px 3px 14px 2px`,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // boxShadow: "rgb(0 0 0 / 6%) 0px 5px 5px -3px, rgb(0 0 0 / 4%) 0px 8px 10px 1px, rgb(0 0 0 / 4%) 0px 3px 14px 2px",
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function HeaderBar(props) {
  const {
    state: { isLogged, apps, currentUser, headerbar, home },
    dispatch,
  } = useValue();
  const [currentApp, setCurrentApp] = React.useState(apps[0]);

  React.useEffect(() => {
    setCurrentApp(apps[0]);
  }, [apps]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      green: {
        main: "#004643",
      },
      background: {
        main: "#d8eefe",
      },
      teritiary: {
        main: "#ef4565",
      },
      bg: {
        main: "#FFFFFE",
      },
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = useSignOut();

  const handleClick = () => {
    signOut();
    dispatch({ type: "LOGGED_OUT", payload: true });
  };

  // const auth = useAuthUser();
  const ButtonWithOptions = ({
    text,
    variant,
    color,
    onClick,
    size,
    sx,
    linkTo,
  }) => (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      size={size}
      sx={sx}
      component={Link}
      to={linkTo}
    >
      {text}
    </Button>
  );

  const options = [
    { text: "StreamLine-Filings", value: "Filings", href: "/enq-admin" },
    { text: "Admin", value: "Admin", href: "/admin" },
    { text: "Job-Support", value: "Job-Support", href: "/job-supp-table" },
    { text: "Course-Enquiry", value: "Course-Enquiry", href: "/enquiry-table" },
  ];

  const filteredOptions = options.filter((option) =>
    apps.includes(option.value)
  );

  const ButtonGroup = () => {
    const handlesetCurrentApp = (value) => {
      // code to set the current app
      setCurrentApp(value);
    };

  return (
    <>
      {filteredOptions.map((option) => (
        <ButtonWithOptions
          key={option.value}
          variant="text"
          color="primary"
          size="small"
          linkTo={option.href}
          sx={{
            p: 1,
            m: 1,
            float: "right",
            fontWeight: "600",
            letterSpacing: "1px",
            ...(option.value === currentApp && { backgroundColor: `rgba(9, 64, 103, 0.08)` }),
          }}
          text={option.text}
          onClick={() => handlesetCurrentApp(option.value)}
        />
      ))}
    </>
  );
};

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <CssBaseline />
          <AppBar
            sx={{ display: home || isLogged === false ? "none" : "block" }}
            position="fixed"
            color="background"
            open={open}
          >
            <Toolbar>
              <Box sx={{ display: "flex", flexGrow: 1 }}>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuRoundedIcon color="teritiary" />
                </IconButton>

                <Button
                                  to="/"
                                //   onClick={}
                  component={Link}
                  sx={{ textTransform: "none" }}
                >
                  <Typography
                    variant="h6"
                    color={"#094067"}
                    sx={{
                      fontWeight: "bold",
                      flexGrow: 1,
                      float: "right",
                      fontFamily: "Poppins",
                    }}
                    noWrap
                    component="div"
                  >
                    Intellecto Global Services
                  </Typography>
                </Button>
              </Box>

              <ButtonGroup />

              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  p: 1,
                  m: 1,
                  float: "right",
                  // left: "1150px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                {currentUser || "Login"}
                {/* .replace(/['"]+/g, "") */}
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer
            transitionDuration={500}
            variant="permanent"
            sx={{
              display: home || isLogged === false ? "none" : "block",
              "& .MuiDrawer-paper": {
                backgroundColor: "#d8eefe",
              },
            }}
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon color="teritiary" />
                ) : (
                  <ChevronLeftIcon color="teritiary" />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            {/* app Switch */}

            {currentApp === "Filings" && <FilingsRoutes {...{ open }} />}
            {currentApp === "Job-Support" && <JobSuppRoutes open={open} />}
            {currentApp === "Admin" && <AdminRoutes open={open} />}
            {currentApp === "Course-Enquiry" && <CourseEnqRoutes open={open} />}

            <List style={{ marginTop: `auto` }}>
              <Divider />
              <ListItem key={1} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={handleClick}
                  component={Link}
                  to={"/login"}
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
                    <LogoutRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    className="text-list-1"
                    primary={"Logout"}
                    sx={{ color: "#094067", opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box
            sx={{
              flexGrow: 1,
              paddingTop: "96px",
              paddingLeft: "38px",
              paddingRight: "38px",
              bgcolor: "#FFFFFE",
              width: "100vw",
              minHeight: "100vh",
            }}
          >
            {props.children}
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
