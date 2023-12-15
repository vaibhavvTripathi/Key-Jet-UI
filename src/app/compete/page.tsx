"use client";
import CompeteGraph from "@/components/CompeteGraph";
import Type from "@/components/Type";
import React, { useContext } from "react";
import { CompeteContext } from "../context/CompeteContext";
import { Process } from "@/models/competeModel";
import RaceGate from "@/components/RaceGate";
import { Typography } from "@mui/material";
import RaceGround from "@/components/RaceGround";
import RealtimePlayerUpdates from "@/components/RealtimePlayerUpdates";

function Page() {
  const { raceStarted, roomId } = useContext(CompeteContext);
  return (
    <>
      {(raceStarted === Process.RACE_NOT_STARTED) && <RaceGate />}
      {(raceStarted === Process.RACE_INITIALIZING || Process.RACE_STARTED) && (
        <RaceGround />
      )}

      {/* {raceStarted===Process.RACE_STARTED && <CompeteGraph />} */}
      {/* <Type /> */}
    </>
  );
}

export default Page;
