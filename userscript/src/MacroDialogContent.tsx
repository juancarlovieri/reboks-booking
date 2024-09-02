import React, { useContext } from "react";
import { useCallback } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import "./MacroDialogContent.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { useEffect } from "react";

import { CronJob } from "cron";
import { AppContext, getAppContext } from "./App";

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
      <div>
        <DateTimePicker value={macroTime} onChange={setMacroTime} />
      </div>
    </>
  );
}
