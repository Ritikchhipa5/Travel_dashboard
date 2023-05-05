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
import { useGetCities, useGetCompanies } from "../../shared/hooks";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormType = {
  company: string;
  city: string;
  subCategory: string[];
  category: string;
};

export const NewCategoryView = () => {
  const { control, handleSubmit, watch, setValue, reset } = useForm<FormType>({
    defaultValues: {
      company: "",
      city: "",
      subCategory: [""],
      category: "",
    },
  });

  const { companiesOptions } = useGetCompanies();

  const { citiesOptions } = useGetCities(watch("company"));

  const { mutateAsync: onSave } = useMutation(poster("/categories"));

  const onSubmit = async (data: FormType) => {
    try {
      await onSave({
        city_id: Number(data.city),
        name: data.category,
        subcategories: data.subCategory.map((item) => ({ name: item })),
      });
      toast.success("Data saved successfully");
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
  };

  const onFormError: SubmitErrorHandler<FormType> | undefined = (err) => {
    const messages = Object.entries(err).map(([name, { type }]) => ({
      name,
      type,
    }));

    return messages.map(({ name, type }) => toast.error(`${name} - ${type}`));
  };

  return (
    <Grid direction="column">
      <Typography variant="h4">New Product Category & Sub-Category</Typography>
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
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Grid item>
                <TextField
                  label="Category"
                  value={value}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            )}
          />
          <div>
            <IconButton
              onClick={() =>
                setValue("subCategory", [...watch("subCategory"), ""])
              }
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                setValue("subCategory", [...watch("subCategory").slice(0, -1)])
              }
            >
              <RemoveIcon />
            </IconButton>
          </div>
          <Grid item>
            <Controller
              name="subCategory"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {value.map((item, index) => (
                    <TextField
                      key={index}
                      value={item}
                      onChange={(e) => {
                        setValue("subCategory", [
                          ...value.map((itm, idx) =>
                            idx === index ? e.target.value : itm
                          ),
                        ]);
                      }}
                      label="Sub-Category"
                      variant="outlined"
                    />
                  ))}
                </>
              )}
            />
          </Grid>
        </Grid>
        <SpaceY />
        <Grid container columnGap={1}>
          <Grid item>
            <Button
              // disabled={
              //   Boolean(companiesError) ||
              //   Boolean(citiesError) ||
              //   Boolean(saveError)
              // }
              variant="contained"
              onClick={handleSubmit(onSubmit, onFormError)}
            >
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
