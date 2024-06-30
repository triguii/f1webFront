import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import getColorPilots from '@/config/colors'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (

        <div>
          <h4>Posició : {label}</h4>
          <p>{`Recompte Alonso :  ${payload[0].payload['Alonso']} cops`}</p>
          <p>{`Recompte Vettel :  ${payload[0].payload['Vettel']} cops`}</p>
  
        </div>

    )
  }
  return null;
};


export default function VictoryBar ({graphsData}) {
    const colorPilots = getColorPilots()

    let barData = []
    try{
        barData = [
            {"Posición" : 1, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 1 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 1 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 2, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 2 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 2 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 3, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 3 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 3 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 4, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 4 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 4 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 5, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 5 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 5 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 6, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 6 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 6 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 7, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 7 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 7 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 8, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 8 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 8 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 9, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 9 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 9 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 10, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 10 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 10 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 11, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 11 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 11 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 12, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 12 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 12 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 13, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 13 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 13 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 14, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 14 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 14 && v["Piloto"] == 'Vettel')).length},
            {"Posición" : 15, "Alonso" : graphsData[0].filter((v) => (v["Posición"] == 15 && v["Piloto"] == 'Alonso')).length, "Vettel" : graphsData[1].filter((v) => (v["Posición"] == 15 && v["Piloto"] == 'Vettel')).length},

        ]
    } catch {
        barData = []
    }

    
    return(
      <div>
        <BarChart
        width={1000}
        height={800}
        data={barData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="Posición" label="Posició"/>
        <YAxis label={{ value: "Recompte", angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip/>}/>
        <Legend />
        <Bar dataKey="Alonso" fill={colorPilots['4']}  />
        <Bar dataKey="Vettel" fill={colorPilots['20']}  />
      </BarChart>
      </div>
    )
}