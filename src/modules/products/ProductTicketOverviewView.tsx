import { Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { SpaceY } from "../../shared/components/Utils";
import { Controller, useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetTickets } from "../../shared/hooks";
import { Table } from "../../shared/components/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

type FormType = {
  name: string;
  code: string;
};

export const ProductTicketOverviewView = () => {
  const navigate = useNavigate();
  const { control, watch } = useForm<FormType>({
    defaultValues: {
      name: "",
      code: "",
    },
  });

  const { tickets, loadingTickets, refetchTickets } = useGetTickets({
    code: watch("code"),
    name: watch("name"),
  });

  return (
    <Grid direction="column">
      <Typography variant="h4">Product & Ticket Overview</Typography>
      <SpaceY />
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Grid item>
                <TextField
                  label="Search by Name"
                  value={value}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            )}
          />
          <Controller
            name="code"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Grid item>
                <TextField
                  label="Search by Code"
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
        {loadingTickets ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : Boolean(tickets?.length) ? (
          <Table<{
            "Ticket Code": string;
            "Ticket Name": string;
            Status: string;
            Action: string;
          }>
            data={
              tickets?.map((item: any) => ({
                "Ticket Code": item["Ticket Code"],
                "Ticket Name": item["Ticket Name"],
                Status: item["Status"],
                Action: (
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <IconButton
                      onClick={() =>
                        navigate(`/products/edit-ticket/${item.id}`)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={async () => {
                        console.log("deleting", item.id);
                        refetchTickets();
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ),
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
