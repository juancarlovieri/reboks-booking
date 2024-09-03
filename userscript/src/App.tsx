import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import * as Dialog from "@radix-ui/react-dialog";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import MacroDialogContent from "./MacroDialogContent";
import clsx from "clsx";
import Macro from "./Macro";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GodFeatures from "./GodFeatures";

interface AppContextProps {
  isMacroEnabled: boolean;
  setMacroEnabled: (_: boolean) => void;
  macroTime: Dayjs | null;
  setMacroTime: (_: Dayjs | null) => void;
  isGodMode: boolean;
  setGodMode: (_: boolean) => void;
}

export const AppContext = React.createContext<AppContextProps | null>(null);

export function getAppContext() {
  const context = useContext(AppContext);

  if (context == null) throw new Error("Context used outside provider.");

  return context;
}

function App() {
  const setNext9 = (dt: Dayjs) => {
    return dt
      .hour(dt.hour() < 9 ? 9 : 33)
      .minute(0)
      .second(0)
      .millisecond(0);
  };
  const defaultTime = dayjs();
  const changedTime: Dayjs = setNext9(defaultTime);

  const [isMacroEnabled, setMacroEnabled] = useState(false);
  const [isGodMode, setGodMode] = useState(true);
  const [macroTime, setMacroTime] = useState<Dayjs | null>(changedTime);

  useEffect(() => {
    let el = document.getElementById("trigger")?.style;
    if (isMacroEnabled) {
      if (el) {
        el.backgroundColor = "var(--green-6)";
      }
    } else {
      if (el) {
        el.backgroundColor = "white";
      }
    }
  }, [isMacroEnabled]);

  return (
    <div className="App IconButton">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppContext.Provider
          value={{
            isMacroEnabled,
            setMacroEnabled,
            macroTime,
            setMacroTime,
            isGodMode,
            setGodMode,
          }}
        >
          <TimePicker value={macroTime} />
          <Macro />
          <GodFeatures />
          <Dialog.Root>
            <Dialog.Trigger asChild id="trigger">
              <div className={"IconButton"}>
                <HamburgerMenuIcon />
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="DialogOverlay" />
              <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle" />
                <Dialog.Description className="DialogDescription">
                  <MacroDialogContent />
                </Dialog.Description>
                {/* <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close> */}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </AppContext.Provider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
