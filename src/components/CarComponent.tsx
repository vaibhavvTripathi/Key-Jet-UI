import { quote } from "@/app/context/TypeContext";
import { calculateTypedWordsPercentage } from "@/utill";
import { Box, Container, colors } from "@mui/material";
import React from "react";
import Car from "../Images/CarPic.png";
import Image from "next/image";

const CarComponent = ({ result }: { result: Result }) => {
  const percentage = calculateTypedWordsPercentage(
    result?.wpm,
    result?.time,
    quote.split(" ").length,
    !Boolean(!result || !result.wpm)
  );
  const carPosition = percentage > 100 ? 100 : percentage;

  const scaleMarkers = [10, 20, 30, 40, 50, 60, 70, 80, 90].map(
    (percent) => percent + "%"
  );

  // Styles for the car
  const carStyle: React.CSSProperties = {
    left: `${5 + carPosition}%`,
    transform: "translate(-50%, -50%)",
    transition: "left 0.5s ease-in-out", // Add transition for smooth movement
    display: "block",
    top: 40,
    position: "absolute",
  };

  const trackStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "60px",
    border: "1px solid black",
    background: `linear-gradient(to right, rgba(220, 220, 220, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(220, 220, 220, 0.6) 1px, transparent 1px)`,
    backgroundSize: "20px 20px",
  };

  return (
    <Container sx={{ ...trackStyle, width: "100%" }}>
      <Image style={carStyle} src={Car.src} alt={""} width={60} height={60} />
    </Container>
  );
};

export default CarComponent;
