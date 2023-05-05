import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { SpaceY } from "../../shared/components/Utils";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { poster } from "../../shared";
import { useMutation } from "@tanstack/react-query";
import { SelectInput } from "../../shared/components/Input";
import { v4 as uuidv4 } from "uuid";
import {
  useGetFullCategories,
  useGetCities,
  useGetCompanies,
} from "../../shared/hooks";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SubCategoryType } from "../../shared/types";

type FormType = {
  company: string;
  city: string;
  subCategories: Omit<SubCategoryType, "category_id">[];
  category: string;
};

export const EditCategoryView = () => {
  const { control, handleSubmit, watch, setValue, reset } = useForm<FormType>({
    defaultValues: {
      company: "",
      city: "",
      subCategories: [],
      category: "",
    },
  });

  const { companiesOptions } = useGetCompanies();

  const { citiesOptions } = useGetCities(watch("company"));

  const { categoriesOptions, refetchCategories } = useGetFullCategories(
    watch("city")
  );

  const { mutateAsync: onSave } = useMutation(
    poster(`/categories/${watch("category")}`, "PUT")
  );

  const onSubmit = async (data: FormType) => {
    const categoryName = categoriesOptions?.find(
      (c) => c.id.toString() === data.category
    )?.name;
    try {
      await onSave({
        city_id: data.city,
        name: categoryName,
        subcategories: data.subCategories.map((sc) => ({
          id: null,
          name: sc.name,
        })),
      });
    } catch (e) {
      if (
        // @ts-ignore
        e?.message.includes(
          "Cannot read properties of undefined (reading 'length')"
        )
      ) {
        return toast.success("Data saved successfully");
      }
      // @ts-ignore
      return toast.error(JSON.stringify(e?.message));
    }
    refetchCategories();
  };

  return (
    <Grid direction="column">
      <Typography variant="h4">Edit Product Category & Sub-Category</Typography>
      <SpaceY />
      <SpaceY />
      <Paper elevation={8} style={{ padding: 20 }}>
        <Typography variant="body1">
          Add Product Category & Sub-Category
        </Typography>
        <SpaceY />
        <Grid container columnGap={5}>
          <Grid item>
            <Controller
              name="company"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  width={300}
                  label="Company"
                  setValue={onChange}
                  value={value}
                  options={companiesOptions || []}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Grid item>
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
            </Grid>
          </Grid>
        </Grid>
        <SpaceY />
        <Grid container columnGap={5}>
          <Controller
            name="category"
            rules={{ required: true }}
            control={control}
            render={({ field: { value } }) => (
              <Grid item>
                <SelectInput
                  width={300}
                  label="Categories"
                  setValue={(val) => {
                    setValue("category", val as string);
                    setValue(
                      "subCategories",
                      categoriesOptions?.find(
                        (c) => c.id.toString() === (val as string)
                      )?.subcategories || []
                    );
                  }}
                  value={value}
                  options={
                    categoriesOptions?.map((item) => ({
                      text: item.name,
                      value: item.id.toString(),
                    })) || []
                  }
                />
              </Grid>
            )}
          />
          <Controller
            name="subCategories"
            rules={{ required: true }}
            control={control}
            render={({ field: { value } }) => (
              <Grid item>
                {value?.map((item) => (
                  <TextField
                    key={item.id}
                    value={item.name}
                    onChange={(e) => {
                      setValue("subCategories", [
                        ...value.map((valueItem) =>
                          valueItem.id === item.id
                            ? { ...valueItem, name: e.target.value }
                            : valueItem
                        ),
                      ]);
                    }}
                  />
                ))}
              </Grid>
            )}
          />
          <Grid item>
            <div>
              <IconButton
                onClick={() =>
                  setValue("subCategories", [
                    ...watch("subCategories"),
                    {
                      id: "null-" + uuidv4(),
                      name: "",
                    },
                  ])
                }
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  setValue("subCategories", [
                    ...watch("subCategories").slice(0, -1),
                  ])
                }
              >
                <RemoveIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <SpaceY />
        <Grid container columnGap={1}>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => reset()}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
