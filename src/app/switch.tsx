import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface checkState {
  checked: boolean;
  setChecked: (bool: boolean) => void;
}

export default function SwitchLabels({ checked, setChecked }: checkState) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <FormControlLabel
      className="text-base text-center text-gray-800 md:text-lg lg:text-xl"
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Table View"
      labelPlacement="start"
    />
  );
}
