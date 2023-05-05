import { Checkbox, Grid, Paper, TextField, Typography } from "@mui/material";
import { SpaceY } from "../../../shared/components/Utils";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { MultipleSelect, SelectInput } from "../../../shared/components/Input";
import {
  useGetCategories,
  useGetCities,
  useGetCompanies,
  useGetSubCategories,
} from "../../../shared/hooks";
import { FormTypeNewTicket } from "../NewTicketView";

export const NewTicketProductSection: React.FC<{
  watch: UseFormWatch<FormTypeNewTicket>;
  control: Control<FormTypeNewTicket, any>;
}> = ({ watch, control }) => {
  const { companiesOptions } = useGetCompanies();
  const { citiesOptions } = useGetCities(watch("company"));
  const { categoriesOptions } = useGetCategories(watch("city"));
  const { subCategories } = useGetSubCategories(watch("category"));
  return (
    <Paper elevation={8} style={{ padding: 20 }}>
      <Typography variant="h5">Add Product Category & Sub-Category</Typography>
      <SpaceY />
      <Grid container columnGap={2}>
        <Grid item direction="column" xs={5} md={5} lg={5}>
          <Controller
            name="company"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Company"
                setValue={onChange}
                value={value}
                options={companiesOptions || []}
              />
            )}
          />
          <SpaceY />
          <Controller
            name="title-en"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Title(EN)"
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
              />
            )}
          />
          <SpaceY />
          <Controller
            name="category"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultipleSelect
                onChange={onChange}
                placeholder="Product Category"
                options={categoriesOptions || []}
                value={value}
                width="100%"
              />
            )}
          />
          <SpaceY />
          <Controller
            name="template"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                width={300}
                label="Ticket template"
                setValue={onChange}
                value={value}
                options={[{ text: "top rock", value: "1" }] || []}
              />
            )}
          />
          <SpaceY />
          <Controller
            name="ticket-type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                width={300}
                label="Ticket type"
                setValue={onChange}
                value={value}
                options={
                  [
                    { text: "Regular", value: "Regular" },
                    { text: "Bar/QR code", value: "Bar/QR code" },
                    { text: "Guide Tour", value: "Guide Tour" },
                    { text: "Musicals & Shows", value: "Musicals & Shows" },
                    { text: "Hard copy", value: "Hard copy" },
                    { text: "SIM card", value: "SIM card" },
                  ] || []
                }
              />
            )}
          />
        </Grid>
        <Grid item direction="column" xs={5} md={5} lg={5}>
          <Controller
            name="city"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                width={300}
                label="City"
                setValue={onChange}
                value={value}
                options={citiesOptions || []}
              />
            )}
          />
          <SpaceY />
          <Controller
            name="title-kr"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Title(KR)"
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
              />
            )}
          />
          <SpaceY />
          <Controller
            name="sub-category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultipleSelect
                onChange={onChange}
                placeholder="Sub Category"
                options={
                  subCategories?.map((item) => ({
                    text: item.name,
                    value: item.id.toString(),
                  })) || []
                }
                value={value}
                width="100%"
              />
            )}
          />
          <SpaceY />
          {(watch("ticket-type") === "Bar/QR code" ||
            watch("ticket-type") === "Guide Tour") && (
            <Controller
              name="out-of-stack"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Out of Stack Alert"
                  value={value}
                  type="number"
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          )}
          <SpaceY />

          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                Status
                <Checkbox
                  onClick={() => onChange("In Stock")}
                  checked={value === "In Stock"}
                />
                In Stock
                <Checkbox
                  onClick={() => onChange("Out Stock")}
                  checked={value === "Out Stock"}
                />
                Out Stock
              </>
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
