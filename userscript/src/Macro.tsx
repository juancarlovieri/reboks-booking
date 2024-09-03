import { useCallback, useEffect, useState } from "react";
import { getAppContext } from "./App";
import axios from "axios";

export default function Macro() {
  const { isMacroEnabled, macroTime } = getAppContext();
  const [time, setTime] = useState(-1);

  const book = useCallback(async () => {
    const result = [...document.getElementsByClassName("selected")]
      .map((el) => el.children[0].innerHTML)
      .join("|");
    console.log(result);

    const params = (
      document.getElementById("params") as HTMLInputElement | undefined
    )?.value;
    console.log(
      `https://reboks.nus.edu.sg/nus_public_web/public/facilities/group_booking?table_exclusive_length=10&add_cart=Add+to+shopping+cart&result=${result}&params=${params}`
    );

    try {
      const data = await axios.get(
        `https://reboks.nus.edu.sg/nus_public_web/public/facilities/group_booking?table_exclusive_length=10&add_cart=Add+to+shopping+cart&result=${result}&params=${params}`
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [document, axios]);

  const updateTime = useCallback(async () => {
    const data = await axios.get(
      "https://reboks.nus.edu.sg/nus_public_web/public/facilities/group_booking"
    );

    var el = document.createElement("html");
    el.innerHTML = data.data;

    setTime(
      parseInt(
        el
          .getElementsByClassName("system-clock-label")[0]
          ?.children[0].getAttribute("data-time") ?? "-1"
      )
    );
  }, [axios]);

  useEffect(() => {
    console.log("Timing delta: " + (time - Date.now() / 1000));
    if (!isMacroEnabled) return;
    if (macroTime) {
      console.log(macroTime.unix() - time);
      const id = setTimeout(() => {
        // -500ms offset on target
        // Pushing on -200, 0, 200

        // book();
        setTimeout(book, 300);
        setTimeout(book, 500);
        setTimeout(book, 700);

        console.log("Pushed updates");
      }, (macroTime.unix() - time) * 1000 - 500);
      return () => clearTimeout(id);
    }
  }, [time]);

  useEffect(() => {
    updateTime();
  }, [isMacroEnabled, macroTime]);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime((time) => time + 1000);
  //   }, 1000);
  //   return () => clearInterval(id);
  // });

  return null;
}
