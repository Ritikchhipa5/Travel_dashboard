import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Divider,
} from "@mui/material";
import { useState } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { FormTypeNewTicket } from "../NewTicketView";
import { SpaceY } from "../../../shared/components/Utils";
import { Calendar } from "../../../shared/components/Calendar";
import { WeekDayPicker } from "../../../shared/components/Input";
import { useMutation } from "@tanstack/react-query";
import { poster } from "../../../shared";
import { useNavigate } from "react-router-dom";

export const EditTourSchedule: React.FC<{
  control: Control<FormTypeNewTicket, any>;
  setValue: UseFormSetValue<FormTypeNewTicket>;
  getValues: UseFormGetValues<FormTypeNewTicket>;
  id: string;
  ticketId: string;
}> = ({ id, getValues, setValue, control, ticketId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: onRemoveTourSchedule } = useMutation(
    poster(`/tickets/${ticketId}/ticket-schedules/${id}`, "DELETE")
  );

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
      >
        <DialogTitle>Tour Schedule Edit</DialogTitle>
        <DialogContent>
          <Grid item container style={{ marginBottom: 30, minWidth: 500 }}>
            <Grid item sm={4} md={4} xl={4}>
              <Controller
                name="tour-schedule"
                control={control}
                render={({ field: { value } }) => (
                  <input
                    type="time"
                    value={
                      value.find(({ id: valueId }) => valueId === id)?.time
                    }
                    onChange={(e) =>
                      setValue("tour-schedule", [
                        ...value.map((ts) =>
                          ts.id === id
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
                  min: 1,
                }}
                control={control}
                render={({ field: { value } }) => (
                  <TextField
                    label="Max People"
                    type="number"
                    value={
                      value.find(({ id: valueId }) => valueId === id)?.maxPeople
                    }
                    onChange={(e) =>
                      setValue("tour-schedule", [
                        ...value.map((ts) =>
                          ts.id === id
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
                control={control}
                render={({ field: { value } }) => (
                  <Grid item>
                    <Calendar
                      label="Date Start"
                      value={
                        value.find(({ id: valueId }) => valueId === id)
                          ?.dateStart
                      }
                      setValue={(val) =>
                        setValue("tour-schedule", [
                          ...value.map((ts) =>
                            ts.id === id
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
                control={control}
                render={({ field: { value } }) => (
                  <Grid>
                    <Calendar
                      label="Date End"
                      value={
                        value.find(({ id: valueId }) => valueId === id)?.dateEnd
                      }
                      setValue={(val) =>
                        setValue("tour-schedule", [
                          ...value.map((ts) =>
                            ts.id === id
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
              <Grid>
                <Button
                  variant="outlined"
                  onClick={async () => {
                    await onRemoveTourSchedule({});
                    navigate(0);
                  }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <SpaceY />
          <Divider />
          <SpaceY />
          <Grid container>
            <Controller
              name="tour-schedule"
              control={control}
              render={({ field: { value } }) => (
                <Grid>
                  <WeekDayPicker
                    defaultValue={
                      value.find(({ id: valueId }) => valueId === id)
                        ?.week_days || []
                    }
                    onChange={(val) =>
                      setValue("tour-schedule", [
                        ...value.map((ts) =>
                          ts.id === id
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
        </DialogContent>
      </Dialog>
    </>
  );
};
