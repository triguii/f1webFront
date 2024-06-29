import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import getColorPilots from '@/config/colors'


export default function RacePosition ({graphsData}){

    const colorPilots = getColorPilots()


    return(    
    <LineChart width={1500} height={1000} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="Vuelta" label="Volta" name="Vuelta"/>
        <YAxis domain={[1, 22]} label={{ value: 'Posición',label :"Posició", angle: -90, position: 'insideLeft' }} reversed/>
        <Tooltip />
        <Legend />
        {graphsData.map((element, index) => {
            element.sort((a, b) => {
                return a.Vuelta - b.Vuelta; // Ascending order
                
            });
          return(<Line dataKey="Posición" key={index} dot= {false} type="monotone" name={element[0] ? element[0]["Piloto"] : ''} data={element} stroke={element[0] ? colorPilots[(element[0]["driverId"]).toString()] : ''} />)
        })}

      </LineChart>)
}