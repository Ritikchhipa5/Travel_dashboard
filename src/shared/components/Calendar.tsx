import { Calendar as ReactCalendar } from "react-date-range";
import moment from "moment";
import { Dialog, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const Calendar: React.FC<{
  setValue: (val: string) => void;
  value: string | undefined;
  label: string;
}> = ({ setValue, value, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TextField
        label={label}
        value={value}
        disabled
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
      >
        <DialogTitle>Calendar</DialogTitle>
        <ReactCalendar
          onChange={(date) => {
            setValue(moment(date).format("YYYY-MM-DD"));
            setIsOpen(false);
          }}
          showMonthAndYearPickers={false}
          color={"transparent"}
        />
      </Dialog>
    </>
  );
};
