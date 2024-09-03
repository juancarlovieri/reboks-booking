import React from "react";
import Switch from "@mui/material/Switch";
import "./MacroDialogContent.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { getAppContext } from "./App";
import { createTheme, ThemeProvider } from "@mui/material";

export default function MacroDialogContent() {
  const {
    isMacroEnabled,
    setMacroEnabled,
    macroTime,
    setMacroTime,
    isGodMode,
    setGodMode,
  } = getAppContext();

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
        <DateTimePicker
          slotProps={{
            popper: { disablePortal: true },
            dialog: { disablePortal: true },
          }}
          value={macroTime}
          onChange={setMacroTime}
        />
      </div>
      <div>
        <span>Enable God Mode:</span>
        <Switch
          checked={isGodMode}
          onChange={(e) => setGodMode(e.target.checked)}
        />
      </div>
    </>
  );
}
