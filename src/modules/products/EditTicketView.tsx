import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { SpaceY } from "../../shared/components/Utils";
import { v4 as uuidv4 } from "uuid";
import { FileInput, TypeInputFileData } from "../../shared/components/Input";
import { toast } from "react-toastify";
import { useForm, Controller, SubmitErrorHandler } from "react-hook-form";
import { Button } from "@mui/material";
import { poster } from "../../shared";
import { useMutation } from "@tanstack/react-query";
import { WeekDays } from "../../shared/types";
import { NewTicketProductSection } from "./components/NewTicketProductSection";
import {
  AdditionPriceEnum,
  NewTicketPricingSection,
} from "./components/NewTicketPricingSection";
import { NewTicketScheduleSection } from "./components/NewTicketScheduleSection";
import { useParams } from "react-router-dom";
import { useGetTicketData } from "../../shared/hooks";
import { useEffect } from "react";
import { FormTypeNewTicket } from "./NewTicketView";

export const EditTicketView = () => {
  const { id } = useParams();

  const { ticketData } = useGetTicketData(id || "");
  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<FormTypeNewTicket>({
      defaultValues: {
        company: "",
        "title-en": "",
        "title-kr": "",
        category: [],
        "ticket-type": "",
        status: "In Stock",
        "sub-category": [],
        city: "",
        template: "",
        "out-of-stack": 0,
        description: "",
        "pricing-type-1": "",
        "pricing-age-limit-1": 0,
        "window-price-1": "",
        "sale-price-1": 0,
        "pricing-type-2": "",
        "pricing-age-limit-2": 0,
        "window-price-2": "",
        "sale-price-2": 0,
        "pricing-currency": "",
        "premium-price": 0,
        "premium-s-price": 0,
        "additional-price": AdditionPriceEnum.NONE,
        "card-image": undefined,
        "wide-images": [],
        "gallery-images": [],
        "tour-schedule": [
          {
            dateEnd: "",
            dateStart: "",
            id: uuidv4(),
            maxPeople: 0,
            time: "",
            week_days: [],
          },
        ],
      },
    });

  useEffect(() => {
    if (!ticketData) return;
    console.log(ticketData);
    setValue("company", ticketData.company_id.toString());
    setValue("city", ticketData.city_id.toString());
    setValue("title-en", ticketData.title_en);
    setValue("title-kr", ticketData.title_kr);
    setValue(
      "category",
      // @ts-ignore
      ticketData.categories.map((item) => item.id.toString())
    );
    setValue(
      "sub-category",
      // @ts-ignore
      ticketData.subcategories.map((item) => item.id.toString())
    );
    setValue("template", ticketData.ticket_template);
    setValue("ticket-type", ticketData.ticket_type);
    // @ts-ignore
    setValue("status", ticketData.status);
    setValue(
      "tour-schedule",
      ticketData?.ticket_schedules?.map((item) => ({
        dateEnd: item.date_end,
        dateStart: item.date_start,
        id: item.id,
        maxPeople: Number(item.max_people),
        time: item.time,
        week_days: item.week_days,
      })) || []
    );
  }, [ticketData]);

  //   const saveData = useMutation(poster("/tickets"));

  //   const onFormError: SubmitErrorHandler<FormTypeNewTicket> | undefined = (
  //     err
  //   ) => {
  //     const messages = Object.entries(err).map(([name, { type }]) => ({
  //       name,
  //       type,
  //     }));

  //     return messages.map(({ name, type }) => toast.error(`${name} - ${type}`));
  //   };

  //   const onSubmit = async (data: FormTypeNewTicket) => {
  //     try {

  //     } catch (error) {
  //       if (
  //         // @ts-ignore
  //         error?.message.includes(
  //           "Cannot read properties of undefined (reading 'length')"
  //         )
  //       ) {
  //         return toast.success("Data saved successfully");
  //       }
  //       // @ts-ignore
  //       return toast.error(JSON.stringify(error?.message));
  //     }

  //     toast.success("Data saved successfully");
  //   };

  return (
    <Grid direction="column">
      <Typography variant="h4">Edit Ticket</Typography>
      <SpaceY />
      <SpaceY />
      <NewTicketProductSection control={control} watch={watch} />
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        <Grid container>
          <Grid item sm={5} md={5} lg={5}>
            <Typography variant="h5">Short Description</Typography>
          </Grid>
          <Grid item sm={5} md={5} lg={5}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Description"
                  value={value}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
      <SpaceY />
      {/* <NewTicketPricingSection control={control} />
      <SpaceY /> */}

      <NewTicketScheduleSection
        ticketId={id as string}
        edit
        control={control}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      {/* 
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        <Typography variant="h5">Image</Typography>
        <Grid container direction="column">
          <Controller
            name="card-image"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <Grid container item>
                  <Typography>Card Image</Typography>
                  <FileInput onChange={onChange} />
                </Grid>
                <Grid container>
                  {value && <img src={value.data} width={100} />}
                </Grid>
              </>
            )}
          />

          <SpaceY />

          <Controller
            name="wide-images"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <Grid container item>
                  <Typography>Wide Image</Typography>
                  <FileInput onChange={(data) => onChange([...value, data])} />
                </Grid>
                <Grid container>
                  {value.map((item) => (
                    <img src={item.data} width={100} />
                  ))}
                </Grid>
              </>
            )}
          />

          <SpaceY />
          <Controller
            name="gallery-images"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <Grid container item>
                  <Typography>Gallery Image</Typography>
                  <FileInput onChange={(data) => onChange([...value, data])} />
                </Grid>
                <Grid container>
                  {value.map((item) => (
                    <img src={item.data} width={100} />
                  ))}
                </Grid>
              </>
            )}
          />
          <SpaceY />
        </Grid>
      </Paper>
      <SpaceY /> */}
      {/* <Paper elevation={8} style={{ padding: 20 }}>
        <Typography variant="h5">Contents</Typography>
        <Grid container direction="column">
          <Grid container></Grid>
        </Grid>
      </Paper>
      <SpaceY />
      <Grid container columnGap={2} justifyContent="flex-end">
        <Grid item>
          <Button
            onClick={handleSubmit(onSubmit, onFormError)}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">Cancel</Button>
        </Grid>
      </Grid> */}
    </Grid>
  );
};
