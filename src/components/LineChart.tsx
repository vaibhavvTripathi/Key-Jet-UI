'use client'
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


type Props = {
    wpm : Array<number>
    raw : Array<number>
    time : Array<number>
}
export default function SimpleLineChart(props : Props) {
  const wpm = props.wpm;
  const raw = props.raw;
  const time = props.time;
  
  return (
    <LineChart
      height={350}
      series={[
        { data: wpm, label: 'wpm' },
        { data: raw, label: 'raw' },
      ]}
      xAxis={[{ scaleType: 'point', data: time, label: 'time' }]}
      yAxis={[{ label: 'words per minute'}]}
    />
  );
}