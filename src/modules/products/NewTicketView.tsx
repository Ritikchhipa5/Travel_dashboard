import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { SpaceY } from "../../shared/components/Utils";
import { v4 as uuidv4 } from "uuid";
import { FileInput, TypeInputFileData } from "../../shared/components/Input";
import { toast } from "react-toastify";
import { useForm, Controller, SubmitErrorHandler } from "react-hook-form";
import { Button, Checkbox } from "@mui/material";
import { poster } from "../../shared";
import { useMutation } from "@tanstack/react-query";
import { WeekDays } from "../../shared/types";
import { NewTicketProductSection } from "./components/NewTicketProductSection";
import {
  AdditionPriceEnum,
  NewTicketPricingSection,
} from "./components/NewTicketPricingSection";
import { NewTicketScheduleSection } from "./components/NewTicketScheduleSection";

export type FormTypeNewTicket = {
  company: string;
  "title-en": string;
  "title-kr": string;
  category: string[];
  "sub-category": string[];
  "ticket-type": string;
  city: string;
  template: string;
  "out-of-stack": number;
  description: string;
  "schedule-page": "YES" | "NO";
  "pricing-type-1": string;
  "pricing-age-limit-1": number;
  "window-price-1": string;
  "sale-price-1": number;
  "pricing-type-2": string;
  "pricing-age-limit-2": number;
  "window-price-2": string;
  "sale-price-2": number;
  "pricing-currency": string;
  "additional-price": AdditionPriceEnum;
  status: "In Stock" | "Out Stock";
  "premium-price": number;
  "premium-s-price": number;
  "card-image": TypeInputFileData;
  "wide-images": TypeInputFileData[];
  "gallery-images": TypeInputFileData[];
  "tour-schedule": {
    id: string;
    time: string;
    maxPeople: number;
    dateStart: string;
    dateEnd: string;
    week_days: WeekDays[];
  }[];
};

export const NewTicketView = () => {
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

  const saveData = useMutation(poster("/tickets"));

  const onFormError: SubmitErrorHandler<FormTypeNewTicket> | undefined = (
    err
  ) => {
    const messages = Object.entries(err).map(([name, { type }]) => ({
      name,
      type,
    }));

    return messages.map(({ name, type }) => toast.error(`${name} - ${type}`));
  };

  const onSubmit = async (data: FormTypeNewTicket) => {
    try {
      await saveData.mutateAsync({
        company_id: Number(data.company),
        city_id: Number(data.city),
        title_en: data["title-en"],
        title_kr: data["title-kr"],
        ticket_template: "cocoa",
        ticket_type: "Regular",
        status: data["status"],
        out_of_stock_alert: data["out-of-stack"],
        currency: data["pricing-currency"],
        additional_price_type: "None",
        additional_price_amount: 0,
        show_in_schedule_page:
          data["ticket-type"] === "Guide Tour" ? "YES" : "NO",
        announcement: "announcement",
        card_image: {
          id: data["card-image"].fileId,
          priority: 0,
          priority_type: "Card_image",
        },
        tickets_categories:
          data?.category?.map((item) => ({
            category_id: Number(item),
          })) || [],
        wide_images: [
          {
            id: 2,
            priority: 0,
            priority_type: "Wide",
          },
        ],
        gallery_images: [
          {
            id: 3,
            priority: 0,
            priority_type: "Gallery",
          },
        ],
        tickets_subcategories: [
          {
            subcategory_id: 2,
          },
        ],
        tickets_prices: [
          {
            type: data["pricing-type-1"],
            age_limit: null,
            window_price: data["window-price-1"],
            sale_price: data["sale-price-1"],
          },
          {
            type: data["pricing-type-2"],
            age_limit: null,
            window_price: data["window-price-2"],
            sale_price: data["sale-price-2"],
          },
        ],
        tickets_content: [
          // {
          //   name: "Article r1",
          //   content: "Content of Article 1",
          // },
          // {
          //   name: "Article 1",
          //   content: "Content of Article 2",
          // },
        ],
        tickets_schedule:
          data["ticket-type"] === "Guide Tour"
            ? [
                ...data["tour-schedule"].map((item) => ({
                  date_start: item.dateStart,
                  date_end: item.dateEnd,
                  max_people: item.maxPeople,
                  week_days: item.week_days,
                  time: item.time,
                })),
              ]
            : [],
      });
    } catch (error) {
      if (
        // @ts-ignore
        error?.message.includes(
          "Cannot read properties of undefined (reading 'length')"
        )
      ) {
        return toast.success("Data saved successfully");
      }
      // @ts-ignore
      return toast.error(JSON.stringify(error?.message));
    }

    toast.success("Data saved successfully");
  };

  return (
    <Grid direction="column">
      <Typography variant="h4">New Ticket</Typography>
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
      <NewTicketPricingSection control={control} />
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        <Typography variant="h5">Show in the Schedule Page</Typography>
        <Grid container>
          <Grid item>
            <Typography variant="body1">
              Do you like to show this ticket in the Tour Schedule page?
            </Typography>
          </Grid>
          <Grid item>
            <Controller
              name="schedule-page"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Checkbox
                    onClick={() => onChange("YES")}
                    checked={value === "YES"}
                  />
                  YES
                  <Checkbox
                    onClick={() => onChange("NO")}
                    checked={value === "NO"}
                  />
                  NO
                </>
              )}
            />
          </Grid>
        </Grid>
      </Paper>
      <SpaceY />
      <NewTicketScheduleSection
        control={control}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />

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
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
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
      </Grid>
    </Grid>
  );
};
