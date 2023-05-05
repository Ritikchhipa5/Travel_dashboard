import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider, TextField, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PriceType, SubCategoryType } from "../../../shared/types";
import { SpaceY } from "../../../shared/components/Utils";
import { getSubcategoriesPrices } from "../utils";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { poster } from "../../../shared";

type FormType = Omit<PriceType, "id" | "subcategory_id">;
export const SubcategoryListForm: React.FC<{
  subCategory: SubCategoryType;
  subCategoriesWithPrices:
    | {
        subcategory_id: string;
        prices: PriceType[];
      }[]
    | undefined;
  onSaveCb: () => void;
}> = ({ subCategory, subCategoriesWithPrices, onSaveCb }) => {
  const { control, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      adult_price: 0,
      child_price: 0,
      product_type: "",
      quantity: 0,
    },
  });

  const { mutateAsync: onSavePrice } = useMutation(poster("/price-lists"));

  const onFormError: SubmitErrorHandler<FormType> | undefined = (err) => {
    const messages = Object.entries(err).map(([name, { type }]) => ({
      name,
      type,
    }));

    return messages.map(({ name, type }) => toast.error(`${name} - ${type}`));
  };

  const onSave = async (data: FormType) => {
    try {
      await onSavePrice({
        category_id: subCategory.category_id,
        prices: [
          ...(subCategoriesWithPrices || []).map((item) => item.prices).flat(),
          {
            id: null,
            product_type: data.product_type,
            quantity: data.quantity,
            child_price: data.child_price,
            adult_price: data.adult_price,
            subcategory_id: subCategory.id,
          },
        ],
      });
    } catch (error) {
      if (
        // @ts-ignore
        error?.message.includes(
          "Cannot read properties of undefined (reading 'length')"
        )
      ) {
        onSaveCb();
        reset();
        return toast.success("Data saved successfully");
      }
      // @ts-ignore
      return toast.error(JSON.stringify(error?.message));
    }

    onSaveCb();
    reset();
  };

  return (
    <Grid key={subCategory.id} container direction="column" rowGap={3}>
      <SpaceY />
      <Divider />
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid
          item
          container
          sm={8}
          md={8}
          lg={8}
          alignItems="center"
          columnGap={2}
        >
          <Typography variant="body1">Product Sub-Category</Typography>
          <TextField
            variant="outlined"
            disabled
            defaultValue={subCategory.name}
          />
        </Grid>
      </Grid>
      <Grid item container columnGap={1}>
        <Grid item>
          <Grid item container alignItems="center" style={{ height: 55 }}>
            Product Type
          </Grid>
          <Grid item container alignItems="center" style={{ height: 55 }}>
            Adult
          </Grid>
          <Grid item container alignItems="center" style={{ height: 55 }}>
            Child
          </Grid>
          <Grid item container alignItems="center" style={{ height: 55 }}>
            Ticket Quantity
          </Grid>
        </Grid>
        {getSubcategoriesPrices(
          Number(subCategory.id),
          subCategoriesWithPrices || []
        ).map((price) => (
          <Grid item key={price.id}>
            <Grid item>
              <TextField
                value={price.product_type}
                disabled
                onChange={(e) => {}}
                style={{ width: 80 }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                value={price.adult_price}
                disabled
                onChange={(e) => {}}
                style={{ width: 80 }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                value={price.child_price}
                disabled
                onChange={(e) => {}}
                style={{ width: 80 }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                value={price.quantity}
                disabled
                onChange={(e) => {}}
                style={{ width: 80 }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Grid item>
            <Controller
              name="product_type"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  style={{ width: 80 }}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="adult_price"
              rules={{ required: true, min: 1 }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  style={{ width: 80 }}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="child_price"
              rules={{ required: true, min: 1 }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  style={{ width: 80 }}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="quantity"
              rules={{ required: true, min: 1 }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  style={{ width: 80 }}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <Button
            variant="contained"
            onClick={handleSubmit(onSave, onFormError)}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
