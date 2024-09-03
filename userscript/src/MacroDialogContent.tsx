import React from "react";
import Switch from "@mui/material/Switch";
import "./MacroDialogContent.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { getAppContext } from "./App";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          "&.MuiMultiSectionDigitalClock-root": {
            width: "100px",
            ".MuiMenuItem-root": {
              width: "80px",
            },
          },
        },
      },
    },
  },
});

export default function MacroDialogContent() {
  const { isMacroEnabled, setMacroEnabled, macroTime, setMacroTime } =
    getAppContext();

  return (
    <>
      <div>
        <span>Enable macro:</span>
        <Switch
          checked={isMacroEnabled}
          onChange={(e) => setMacroEnabled(e.target.checked)}
        />
      </div>
      <div style={{ fontSize: "20px !improtant" }}>
        <ThemeProvider theme={theme}>
          <DateTimePicker
            slotProps={{
              textField: { InputProps: { size: "medium" }, size: "medium" },
              popper: { disablePortal: true },
              dialog: { disablePortal: true },
            }}
            value={macroTime}
            onChange={setMacroTime}
          />
        </ThemeProvider>
      </div>
    </>
  );
}
