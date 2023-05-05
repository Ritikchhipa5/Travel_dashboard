import { Checkbox, Grid, Paper, TextField, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { SpaceY } from "../../../shared/components/Utils";
import { FormTypeNewTicket } from "../NewTicketView";
import { SelectInput } from "../../../shared/components/Input";

export enum AdditionPriceEnum {
  NONE = "NONE",
  PREMIUM = "PREMIUM",
  PREMIUM_S = "PREMIUM_S",
}

export const NewTicketPricingSection: React.FC<{
  control: Control<FormTypeNewTicket, any>;
}> = ({ control }) => {
  return (
    <Paper elevation={8} style={{ padding: 20 }}>
      <Typography variant="h5">Pricing</Typography>
      <Grid container>
        <Grid item direction="column" sm={4} md={4} lg={4}>
          <Controller
            name="pricing-type-1"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                width={300}
                label="Type"
                setValue={onChange}
                value={value}
                options={
                  [
                    { text: "Adult", value: "Adult" },
                    { text: "Child", value: "Child" },
                    { text: "N/A", value: "N/A" },
                  ] || []
                }
              />
            )}
          />
          <SpaceY />
          <Grid item container>
            <Controller
              name="pricing-type-2"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Grid item sm={5} md={5}>
                  <SelectInput
                    width={140}
                    label="Type"
                    setValue={onChange}
                    value={value}
                    options={
                      [
                        { text: "Adult", value: "Adult" },
                        { text: "Child", value: "Child" },
                        { text: "N/A", value: "N/A" },
                      ] || []
                    }
                  />
                </Grid>
              )}
            />
            <Controller
              name="pricing-age-limit-1"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Grid item sm={5} md={5}>
                  <TextField
                    type="number"
                    label="Age limit"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              )}
            />
          </Grid>
          <SpaceY />
          <Controller
            name="pricing-currency"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                width={300}
                label="Currency"
                setValue={onChange}
                value={value}
                options={[{ text: "USD", value: "USD" }] || []}
              />
            )}
          />
        </Grid>
        <Grid item direction="column" sm={4} md={4} lg={4}>
          <Controller
            name="window-price-1"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Window Price"
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
              />
            )}
          />
          <SpaceY />
          <Controller
            name="window-price-2"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Window Price"
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item direction="column" sm={4} md={4} lg={4}>
          <Controller
            name="sale-price-1"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Sale Price ($)"
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
              />
            )}
          />
          <SpaceY />
          <Controller
            name="sale-price-2"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Sale Price ($)"
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Controller
          name="additional-price"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Grid container direction="column">
              <Grid item container>
                <Checkbox
                  onClick={() => onChange(AdditionPriceEnum.NONE)}
                  checked={value === AdditionPriceEnum.NONE}
                />
                None
              </Grid>
              <Grid item container>
                <Grid item sm={4} md={4} lg={4}>
                  <Checkbox
                    onClick={() => onChange(AdditionPriceEnum.PREMIUM)}
                    checked={value === AdditionPriceEnum.PREMIUM}
                  />
                  Premium
                </Grid>
                <Grid item sm={4} md={4} lg={4}>
                  <Controller
                    name="premium-price"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        type="number"
                        value={value}
                        onChange={onChange}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item sm={4} md={4} lg={4}>
                  <Checkbox
                    onClick={() => onChange(AdditionPriceEnum.PREMIUM_S)}
                    checked={value === AdditionPriceEnum.PREMIUM_S}
                  />
                  Premium S
                </Grid>
                <Grid item sm={4} md={4} lg={4}>
                  <Controller
                    name="premium-s-price"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        type="number"
                        value={value}
                        onChange={onChange}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        />
        <Grid item direction="column" sm={4} md={4} lg={4}>
          <SpaceY />
        </Grid>
      </Grid>
    </Paper>
  );
};
