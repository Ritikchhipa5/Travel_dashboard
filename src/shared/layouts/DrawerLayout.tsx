import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { DrawerListElement } from "../types";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

const drawerWidth = 240;

const items: DrawerListElement[] = [
  {
    text: "Product",
    icon: <PrecisionManufacturingIcon />,
    subItems: [
      {
        text: "New Product Category",
        icon: <AddBoxIcon />,
        path: "/products/new-category",
      },
      {
        text: "Edit Product Category",
        icon: <EditIcon />,
        path: "/products/edit-category",
      },
      {
        text: "Product Type Pricing",
        icon: <AttachMoneyIcon />,
        path: "/products/product-type-pricing",
      },
      {
        text: "All Products and Tickets",
        icon: <FormatListBulletedIcon />,
        path: "/products/product-ticket-overview",
      },
      {
        text: "New Ticket",
        icon: <ConfirmationNumberIcon />,
        path: "/products/new-ticket",
      },
    ],
  },
  {
    text: "Reservations",
    icon: <AirplaneTicketIcon />,
    subItems: [
      {
        text: "All Reservations",
        icon: <FormatListBulletedIcon />,
        path: "/reservations/all-reservations",
      },
    ],
  }, {
    text: "Users",
    icon: <AirplaneTicketIcon />,
    subItems: [
      {
        text: "Create",
        icon: <FormatListBulletedIcon />,
        path: "/user/create",
      },  {
        text: "All Users",
        icon: <FormatListBulletedIcon />,
        path: "/user/all-users",
      },
    ],
  },
];

export const DrawerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Tamice Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map(({ text, icon, subItems, path }) => {
            const exist = (els: string[]): boolean => {
              return Boolean(els.find((el) => el === text));
            };
            return (
              <>
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      subItems?.length
                        ? setExpandedItems((prev) =>
                            exist(prev)
                              ? [...prev.filter((item) => item !== text)]
                              : [...prev, text]
                          )
                        : navigate(path || "")
                    }
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                    {subItems?.length && (
                      <ListItemIcon>
                        {exist(expandedItems) ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                </ListItem>
                {subItems?.length && (
                  <Collapse
                    in={exist(expandedItems)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {subItems.map(({ text, path, icon }) => (
                        <ListItemButton
                          onClick={() => navigate(path)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>{icon}</ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
