import { Typography } from "@mui/material";
import { createHashRouter, Outlet } from "react-router-dom";
import { EditCategoryView } from "../modules/products/EditCategoryView";
import { NewCategoryView } from "../modules/products/NewCategoryView";
import { ProductTypePricingView } from "../modules/products/ProductTypePricingView";
import { DrawerLayout } from "./layouts/DrawerLayout";
import { NewTicketView } from "../modules/products/NewTicketView";
import { ProductTicketOverviewView } from "../modules/products/ProductTicketOverviewView";
import { AllReservationsView } from "../modules/reservations/AllReservationsView";
import { EditTicketView } from "../modules/products/EditTicketView";
import CreateUser from "../modules/users/CreateUser";
import AllUser from "../modules/users/AllUser";
import ViewUser from "../modules/users/ViewUser";
import EditProfile from "../modules/users/EditProfile";

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <DrawerLayout>
        <Typography paragraph>start page</Typography>
      </DrawerLayout>
    ),
  },
  {
    path: "/products",
    element: (
      <DrawerLayout>
        <Outlet />
      </DrawerLayout>
    ),
    children: [
      {
        path: "new-category",
        element: <NewCategoryView />,
      },
      {
        path: "edit-category",
        element: <EditCategoryView />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategoryView />,
      },
      {
        path: "product-type-pricing",
        element: <ProductTypePricingView />,
      },
      {
        path: "product-ticket-overview",
        element: <ProductTicketOverviewView />,
      },
      {
        path: "new-ticket",
        element: <NewTicketView />,
      },
      {
        path: "edit-ticket/:id",
        element: <EditTicketView />,
      },
    ],
  },
  {
    path: "/reservations",
    element: (
      <DrawerLayout>
        <Outlet />
      </DrawerLayout>
    ),
    children: [
      {
        path: "all-reservations",
        element: <AllReservationsView />,
      },
    ],
  }, {
    path: "/user",
    element: (
      <DrawerLayout>
        <Outlet />
      </DrawerLayout>
    ),
    children: [
      {
        path: "create",
        element: <CreateUser />,
      }, {
        path: "view",
        element: <ViewUser />,
      }, {
        path: "all-users",
        element: <AllUser />,
      }, {
        path: "edit",
        element: <EditProfile />,
      }
    ],
  },
]);
