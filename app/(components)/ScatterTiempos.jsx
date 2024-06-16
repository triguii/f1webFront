'use client'

import { useState, useEffect, React } from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell
  } from "recharts";

import getColorPilots from '@/config/colors'



export default function ScatterTiempos ({graphsData}){

    const colorPilots = getColorPilots()

    return(graphsData ?    
    <ScatterChart
        width={900}
        height={700}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="Vuelta" name="Vuelta" label="Vuelta"/>
        <YAxis type="number" dataKey="Tiempo sec" name="Tiempo (s)" label={{ value: "Tiempo (s)", angle: -90, position: 'insideLeft' }}  domain={['dataMin', 'dataMax - 20']}/>

        <Tooltip cursor={{ strokeDasharray: "3 3" }}/>
        <Legend />
        {graphsData.map((element, index) => {
          return(<Scatter key={index} name={element[0]["Piloto"]} data={element} fill={colorPilots[(element[0]["driverId"]).toString()]} />)
          
        })}
      </ScatterChart>
      : '')


}