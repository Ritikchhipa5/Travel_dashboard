import {
  Checkbox,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { SpaceY } from "../../../shared/components/Utils";
import { Fragment, useEffect } from "react";
import { Calendar } from "../../../shared/components/Calendar";
import { WeekDayPicker } from "../../../shared/components/Input";
import { FormTypeNewTicket } from "../NewTicketView";
import { EditTourSchedule } from "./EditTourSchedule";

export const NewTicketScheduleSection: React.FC<{
  watch: UseFormWatch<FormTypeNewTicket>;
  control: Control<FormTypeNewTicket, any>;
  setValue: UseFormSetValue<FormTypeNewTicket>;
  getValues: UseFormGetValues<FormTypeNewTicket>;
  ticketId?: string;
  edit?: boolean;
}> = ({ control, getValues, setValue, watch, edit = false, ticketId }) => {
  if (watch("ticket-type") !== "Guide Tour") return null;

  return (
    <>
      <Paper elevation={8} style={{ padding: 20 }}>
        <Grid container justifyContent="space-between">
          <Typography variant="h5">Tour Schedule</Typography>
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => {
              setValue("tour-schedule", [
                ...watch("tour-schedule"),
                {
                  id: uuidv4(),
                  time: "",
                  dateEnd: "",
                  dateStart: "",
                  maxPeople: 0,
                  week_days: [],
                },
              ]);
            }}
          >
            Add
          </Link>
        </Grid>
        <Grid container>
          {watch("tour-schedule").map((item) => (
            <Fragment key={item.id}>
              <Grid item container style={{ marginBottom: 30 }}>
                <Grid item sm={4} md={4} xl={4}>
                  <Controller
                    name="tour-schedule"
                    rules={{
                      required: watch("ticket-type") === "Guide Tour",
                    }}
                    control={control}
                    render={({ field: { value } }) => (
                      <input
                        type="time"
                        value={
                          value.find(({ time }) => time === item.time)?.time
                        }
                        onChange={(e) =>
                          setValue("tour-schedule", [
                            ...value.map((ts) =>
                              ts.id === item.id
                                ? {
                                    ...ts,
                                    time: e.target.value,
                                  }
                                : { ...ts }
                            ),
                          ])
                        }
                        required
                      />
                    )}
                  />
                  <SpaceY />
                  <Controller
                    name="tour-schedule"
                    rules={{
                      required: watch("ticket-type") === "Guide Tour",
                      min: 1,
                    }}
                    control={control}
                    render={({ field: { value } }) => (
                      <TextField
                        label="Max People"
                        type="number"
                        value={
                          value.find(
                            ({ maxPeople }) => maxPeople === item.maxPeople
                          )?.maxPeople
                        }
                        onChange={(e) =>
                          setValue("tour-schedule", [
                            ...value.map((ts) =>
                              ts.id === item.id
                                ? {
                                    ...ts,
                                    maxPeople: Number(e.target.value),
                                  }
                                : { ...ts }
                            ),
                          ])
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={4} md={4} xl={4} direction="column">
                  <Controller
                    name="tour-schedule"
                    rules={{
                      required: watch("ticket-type") === "Guide Tour",
                    }}
                    control={control}
                    render={({ field: { value } }) => (
                      <Grid item>
                        <Calendar
                          label="Date Start"
                          value={
                            value.find(
                              ({ dateStart }) => dateStart === item.dateStart
                            )?.dateStart
                          }
                          setValue={(val) =>
                            setValue("tour-schedule", [
                              ...value.map((ts) =>
                                ts.id === item.id
                                  ? {
                                      ...ts,
                                      dateStart: val,
                                    }
                                  : { ...ts }
                              ),
                            ])
                          }
                        />
                      </Grid>
                    )}
                  />
                  <Controller
                    name="tour-schedule"
                    rules={{
                      required: watch("ticket-type") === "Guide Tour",
                    }}
                    control={control}
                    render={({ field: { value } }) => (
                      <Grid>
                        <Calendar
                          label="Date End"
                          value={
                            value.find(
                              ({ dateEnd }) => dateEnd === item.dateEnd
                            )?.dateEnd
                          }
                          setValue={(val) =>
                            setValue("tour-schedule", [
                              ...value.map((ts) =>
                                ts.id === item.id
                                  ? {
                                      ...ts,
                                      dateEnd: val,
                                    }
                                  : { ...ts }
                              ),
                            ])
                          }
                        />
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item sm={4} md={4} xl={4}>
                  <Grid container justifyContent="space-between">
                    <Grid item>Repeat</Grid>
                    <Grid item>
                      {edit && ticketId && (
                        <EditTourSchedule
                          ticketId={ticketId}
                          id={item.id}
                          control={control}
                          getValues={getValues}
                          setValue={setValue}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Controller
                    name="tour-schedule"
                    rules={{
                      required: watch("ticket-type") === "Guide Tour",
                    }}
                    control={control}
                    render={({ field: { value } }) => (
                      <Grid>
                        <WeekDayPicker
                          defaultValue={
                            value.find(({ id: valueId }) => valueId === item.id)
                              ?.week_days || []
                          }
                          onChange={(val) =>
                            setValue("tour-schedule", [
                              ...value.map((ts) =>
                                ts.id === item.id
                                  ? {
                                      ...ts,
                                      week_days: val,
                                    }
                                  : { ...ts }
                              ),
                            ])
                          }
                        />
                      </Grid>
                    )}
                  />
                </Grid>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Paper>
    </>
  );
};
