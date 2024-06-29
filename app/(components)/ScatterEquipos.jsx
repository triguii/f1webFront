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

import getTeamColors from "@/config/teamColors";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
  
          <div>
            <h4>{label}</h4>
            <p>{`Posició : ${payload[0].payload['Posicion Carrera']}`}</p>
            <p>{`Equip :  ${payload[0].payload['Equipo']}`}</p>
            <p>{`Pilot :  ${payload[0].payload['Piloto']}`}</p>

    
          </div>

      )
    }
    return null;
  };


export default function ScatterEquipos ({graphsData}){

    const teamColors = getTeamColors()

    return(
    graphsData ?    
    <ScatterChart
        width={1300}
        height={700}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="Equipo" name="Equipo" allowDuplicatedCategory={false}/>
        <YAxis reversed type="number"  dataKey="Posicion Carrera" name="Posición" label={{ value: "Posición", angle: -90, position: 'insideLeft' }}  domain={['1', 'dataMax']}/>
        <ZAxis range={[100, 101]}/>
        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />}/>
        
        
        <Scatter data={graphsData} fill="red">
        {graphsData.map((entry, index) => (
            <Cell fill={teamColors[entry.Equipo]} />
        ))}

        </Scatter>
          
      
      </ScatterChart>
      : ''
    )
}