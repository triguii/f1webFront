'use client'

import { useState, useEffect } from "react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";

import getColorPilots from "@/config/colors";


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (

      <div>
        <h4>{label}</h4>
        <p>{`Posició : ${payload[0].payload['Posicion Mundial']}`}</p>
        <p>{`Punts ${payload[0].payload['Puntos Mundial']}`}</p>

      </div>


    )
  }

  return null;
};


export default function Standings2010({ standingsData, dataMin = false }) {

  const colorPilots = getColorPilots()

  return (

    <BarChart
      layout="vertical"
      width={1500}
      height={1000}
      data={standingsData}
      margin={{
        top: 5,
        right: 100,
        left: 100,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      {dataMin ? <XAxis type="number" domain={['dataMin - 10', 'dataMax + 10']} /> : <XAxis type="number" />}

      <YAxis type="category" dataKey="Piloto" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="Puntos Mundial" fill="#8884d8">
        {
          standingsData.map((element, index) => (
            <Cell key={index} fill={colorPilots[element.id]} />
          ))
        }

      </Bar>
    </BarChart>
  )
}