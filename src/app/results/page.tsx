"use client";
import { Box, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ResultContext } from "../context/ResultContext";
import SimpleLineChart from "../../components/page";

const Page = () => {
  const x = [1, 5, 3, 7, 10, 34, 37, 40, 50, 70];
  const y = [5, 4, 8, 20, 50, 40, 57, 65, 70, 99];
  const time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { results } = useContext(ResultContext);
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
    <Container sx={{ display: "flex" }}>
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
          <Typography variant="h6">wpm</Typography>
          <Typography variant="h2">{finalResult.wpm}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">acc</Typography>
          <Typography variant="h2">{`${finalResult.accuracy}%`}</Typography>
        </Box>
        <Box paddingTop={"1em"}>
          <Typography variant="body1">test type</Typography>
          <Typography variant="h6">english 10k</Typography>
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
            <Typography variant="h6">raw</Typography>
            <Typography variant="h4">{finalResult.rawSpeed}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">characters</Typography>
            <Typography variant="h4">{`${finalResult.correctChar}/${finalResult.incorrectChar}/${finalResult.extraChar}/${finalResult.missedChar}`}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">consistency</Typography>
            <Typography variant="h4">89</Typography>
          </Box>
          <Box>
            <Typography variant="h6">time</Typography>
            <Typography variant="h4">{finalResult.time}</Typography>
          </Box>
        </Container>
      </Container>
    </Container>
  );
};

export default Page;
