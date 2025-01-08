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
      className="text-base text-black"
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Hide Posters"
      labelPlacement="start"
    />
  );
}
