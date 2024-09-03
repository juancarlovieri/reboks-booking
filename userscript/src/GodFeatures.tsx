import React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { getAppContext } from "./App";

function ExtendDateButton() {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(), e.preventDefault();
        $(".datepicker").datepicker(
          "option",
          "maxDate",
          new Date(2545827584000)
        );
      }}
    >
      Extend Date
    </button>
  );
}

function PopulateFilterButton() {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(), e.preventDefault();
        const url = new URL(window.location.href);

        url.searchParams.set("group_filter_one", "94");
        url.searchParams.set("group_filter_two", "108");

        window.location.replace(url);
      }}
    >
      Populate Filters
    </button>
  );
}

export default function GodFeatures() {
  const { isGodMode } = getAppContext();
  useEffect(() => {
    const tmpDiv = document.createElement("span");

    ReactDOM.render(ExtendDateButton(), tmpDiv);

    document.getElementById("date_filter_from")?.parentNode?.append(tmpDiv);
  }, []);

  useEffect(() => {
    if (!isGodMode) return;
    const tmpDiv = document.createElement("span");

    ReactDOM.render(PopulateFilterButton(), tmpDiv);

    document.getElementById("group_filter_two")?.parentNode?.append(tmpDiv);
    return () => {
      document
        .getElementById("group_filter_two")
        ?.parentNode?.removeChild(tmpDiv);
    };
  }, [isGodMode]);
  return null;
}
