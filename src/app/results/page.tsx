"use client";
import { Box, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ResultContext } from "../context/ResultContext";
import SimpleLineChart from "../../components/LineChart";

const Page = () => {
  const { results } = useContext(ResultContext);
  let x = [0];
  let y = [0];
  let time = [0];
  if (results.length > 0) {
    x = results?.map((result) => result?.wpm);
    y = results?.map((result) => result?.rawSpeed);
    time = results?.map((result) => result?.time);
  }

 
  const finalResult: Result =
    results.length != 0
      ? results[results.length - 1]
      : {
          time: 0,
          rawSpeed: 0,
          wpm: 0,
          accuracy: 0,
          correctChar: 0,
          incorrectChar: 0,
          extraChar: 0,
          missedChar: 0,
        };

  return (
    <Container sx={{ display: "flex",mt:10}}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: "5em",
          padding: "0.5em",
          width: "fit-content",
          minWidth: "11em",
        }}
      >
        <Box>
          <Typography variant="h2">wpm</Typography>
          <Typography variant="h1">{finalResult.wpm}</Typography>
        </Box>
        <Box>
          <Typography variant="h2">acc</Typography>
          <Typography variant="h1">{`${finalResult.accuracy}%`}</Typography>
        </Box>
        <Box paddingTop={"1em"}>
          <Typography variant="body1">test type</Typography>
          <Typography variant="h4">english 10k</Typography>
        </Box>
      </Container>
      <Container>
        <SimpleLineChart wpm={x} raw={y} time={time} />
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <Typography variant="h4">raw</Typography>
            <Typography variant="h4">{finalResult.rawSpeed}</Typography>
          </Box>
          <Box>
            <Typography variant="h4">characters</Typography>
            <Typography variant="h4">{`${finalResult.correctChar}/${finalResult.incorrectChar}/${finalResult.extraChar}/${finalResult.missedChar}`}</Typography>
          </Box>
          <Box>
            <Typography variant="h4">consistency</Typography>
            <Typography variant="h4">89</Typography>
          </Box>
          <Box>
            <Typography variant="h4">time</Typography>
            <Typography variant="h4">{finalResult.time}</Typography>
          </Box>
        </Container>
      </Container>
    </Container>
  );
};

export default Page;
