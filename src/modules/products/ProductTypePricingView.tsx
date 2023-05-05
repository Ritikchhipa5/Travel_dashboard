import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { SpaceY } from "../../shared/components/Utils";
import { SelectInput } from "../../shared/components/Input";
import { Controller, useForm } from "react-hook-form";
import {
  useGetAllCategories,
  useGetPriceLists,
  useGetSubCategories,
} from "../../shared/hooks";
import { SubCategoryType } from "../../shared/types";
import { SubcategoryListForm } from "./components/SubcategoryListForm";
type FormType = {
  category: string;
  city: string;
  subCategory: string[];
};

export const ProductTypePricingView = () => {
  const { control, watch } = useForm<FormType>({
    defaultValues: {
      category: "",
    },
  });

  const { allCategoriesOptions } = useGetAllCategories();

  const { subCategories, refetchSubCategories } = useGetSubCategories([
    watch("category"),
  ]);

  const { subcategoryWithPrices, refetchPriceLists } = useGetPriceLists(
    watch("category")
  );

  return (
    <Grid direction="column">
      <Typography variant="h4">New Product</Typography>
      <SpaceY />
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        <Typography variant="body1">Enter Product Pricing</Typography>
        <SpaceY />
        <Grid container justifyContent="space-between" alignItems="center">
          <Controller
            name="category"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                width={300}
                label="category"
                setValue={onChange}
                value={value}
                options={allCategoriesOptions || []}
              />
            )}
          />
        </Grid>

        {subCategories &&
          subCategories.map((subCategory: SubCategoryType) => (
            <SubcategoryListForm
              onSaveCb={() => {
                refetchPriceLists();
                refetchSubCategories();
              }}
              key={JSON.stringify(subCategory)}
              subCategoriesWithPrices={subcategoryWithPrices}
              subCategory={subCategory}
            />
          ))}
        <SpaceY />
      </Paper>
    </Grid>
  );
};
