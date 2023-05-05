import {
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Table } from "../../shared/components/Table";
import { SpaceY } from "../../shared/components/Utils";
import { Controller, useForm } from "react-hook-form";
import { useGetReservations } from "../../shared/hooks";

type FormType = {
  customerName: string;
  phone: string;
  email: string;
};

export const AllReservationsView = () => {
  const { control, watch } = useForm<FormType>({
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
    },
  });

  const { reservationsList, loadingReservationsList } = useGetReservations();

  console.log({ reservationsList });
  return (
    <Grid direction="column">
      <Typography variant="h4">All Reservations</Typography>
      <SpaceY />
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Controller
            name="customerName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Grid item>
                <TextField
                  label="Search by Customer Name"
                  value={value}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Grid item>
                <TextField
                  label="Search by Phone Number"
                  value={value}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Grid item>
                <TextField
                  label="Search by Email"
                  value={value}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            )}
          />
        </Grid>
      </Paper>
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        {loadingReservationsList ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : Boolean(reservationsList?.length) ? (
          <Table<{
            "Order Number": string;
            Customer: string;
            "Purchased Date": string;
            "Departure Date": string;
            Rep: string;
            "Ticket Sent Status": string;
            Payment: string;
            Action: string;
            Status: string;
          }>
            data={
              reservationsList?.map((reservation) => ({
                "Order Number": reservation.order_number,
                Customer: reservation.customer,
                "Purchased Date": reservation.order_date,
                "Departure Date": reservation.departure_date,
                Rep: reservation.created_by,
                "Ticket Sent Status": reservation.ticket_sent_status,
                Payment: reservation.payment_type,
                Action: "",
                Status: reservation.status,
              })) || []
            }
          />
        ) : (
          "No data to show"
        )}
      </Paper>
    </Grid>
  );
};
