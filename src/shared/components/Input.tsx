import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  Grid,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { filePoster } from "..";
import { WeekDays } from "../types";
import { useEffect, useState } from "react";

export type TypeOption = { value: string; text: string };

export const SelectInput: React.FC<{
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  label: string;
  options: TypeOption[];
  width?: number;
}> = ({ setValue, value, label, options, width = 150 }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  return (
    <FormControl fullWidth style={{ width }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {options.map((op) => (
          <MenuItem value={op.value}>{op.text}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const MultipleSelect: React.FC<{
  options: TypeOption[];
  placeholder: string;
  width?: number | string;
  value: string[];
  onChange: (event: SelectChangeEvent<number[]>) => void;
}> = ({ options, placeholder, width = 150, value, onChange }) => {
  return (
    <>
      <InputLabel>{placeholder}</InputLabel>
      <Select
        multiple
        style={{ width }}
        displayEmpty
        // @ts-ignore
        value={value}
        label={placeholder}
        onChange={onChange}
        input={<OutlinedInput />}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map(({ text, value }) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export type TypeInputFileData = {
  fileName: string;
  data: string;
  fileId: number;
};

export const FileInput: React.FC<{
  onChange: (data: TypeInputFileData) => void;
}> = ({ onChange }) => {
  const saveFile = useMutation(filePoster);
  return (
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      onChange={(event) => {
        let reader = new FileReader();
        reader.onloadend = function () {
          saveFile.mutate(event?.target?.files?.[0] as File, {
            onSuccess(data) {
              onChange({
                fileName: event?.target?.files?.[0]?.name || "",
                data: reader?.result?.toString() || "",
                fileId: data.id as number,
              });
            },
          });
        };
        if (!event?.target?.files?.[0]) return;
        reader.readAsDataURL(event?.target?.files?.[0]);
      }}
    />
  );
};

export const WeekDayPicker: React.FC<{
  onChange: (val: WeekDays[]) => void;
  defaultValue: WeekDays[];
}> = ({ onChange, defaultValue }) => {
  const [value, setValue] = useState<WeekDays[]>(defaultValue);

  useEffect(() => {
    console.log(value);
    onChange(value);
  }, [value]);

  return (
    <Grid container>
      <Grid item>
        Monday
        <Checkbox
          checked={value.includes(WeekDays.Monday)}
          onClick={() =>
            setValue((prev) =>
              prev.includes(WeekDays.Monday)
                ? prev.filter((item) => item !== WeekDays.Monday)
                : [...prev, WeekDays.Monday]
            )
          }
        />
      </Grid>
      <Grid item>
        Tuesday
        <Checkbox
          checked={value.includes(WeekDays.Tuesday)}
          onClick={() =>
            setValue((prev) =>
              prev.includes(WeekDays.Tuesday)
                ? prev.filter((item) => item !== WeekDays.Tuesday)
                : [...prev, WeekDays.Tuesday]
            )
          }
        />
      </Grid>
      <Grid item>
        Wednesday
        <Checkbox
          checked={value.includes(WeekDays.Wednesday)}
          onClick={() =>
            setValue((prev) =>
              prev.includes(WeekDays.Wednesday)
                ? prev.filter((item) => item !== WeekDays.Wednesday)
                : [...prev, WeekDays.Wednesday]
            )
          }
        />
      </Grid>
      <Grid item>
        Thursday
        <Checkbox
          checked={value.includes(WeekDays.Thursday)}
          onClick={() =>
            setValue((prev) =>
              prev.includes(WeekDays.Thursday)
                ? prev.filter((item) => item !== WeekDays.Thursday)
                : [...prev, WeekDays.Thursday]
            )
          }
        />
      </Grid>
      <Grid item>
        Friday
        <Checkbox
          checked={value.includes(WeekDays.Friday)}
          onClick={() =>
            setValue((prev) =>
              prev.includes(WeekDays.Friday)
                ? prev.filter((item) => item !== WeekDays.Friday)
                : [...prev, WeekDays.Friday]
            )
          }
        />
      </Grid>
      <Grid item>
        Saturday
        <Checkbox
          checked={value.includes(WeekDays.Saturday)}
          onClick={() =>
            setValue((prev) =>
              prev.includes(WeekDays.Saturday)
                ? prev.filter((item) => item !== WeekDays.Saturday)
                : [...prev, WeekDays.Saturday]
            )
          }
        />
      </Grid>
      <Grid item>
        Sunday
        <Checkbox
          checked={value.includes(WeekDays.Sunday)}
          onClick={() =>
            setValue((prev) =>
              prev.includes(WeekDays.Sunday)
                ? prev.filter((item) => item !== WeekDays.Sunday)
                : [...prev, WeekDays.Sunday]
            )
          }
        />
      </Grid>
    </Grid>
  );
};
