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
  } from "recharts";
  


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
  
          <div>
            <h4>{label}</h4>
            <p>{`Posicion : ${payload[0].payload['Posicion Mundial']}`}</p>
            <p>{`Puntos ${payload[0].payload['Puntos Mundial']}`}</p>
    
          </div>

  
      )
    }
  
    return null;
  };


export default function Standings2010 ({standingsData, dataMin = false}){


    return (
      
    <BarChart
        layout="vertical"
        width={1000}
        height={1000}
        data={standingsData}
        margin={{
          top: 5,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {dataMin ? <XAxis type="number" domain={['dataMin - 10', 'dataMax + 10']}/> : <XAxis type="number"/>}
        
        <YAxis type="category" dataKey="Piloto"/>
        <Tooltip content={<CustomTooltip />}/>
        <Legend />
        <Bar dataKey="Puntos Mundial" fill="#8884d8" />
      </BarChart>
       )
}