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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (

        <div>
          <h4>{label}</h4>
          <p>{`Pilot :  ${payload[0].payload['Piloto']}`}</p>
          <p>{`Temps de volta :  ${payload[0].payload['Tiempo']}`}</p>
          <p>{`Posició : ${payload[0].payload['Posición']}`}</p>
          <p>{`Volta :  ${payload[0].payload['Vuelta']}`}</p>

  
        </div>

    )
  }
  return null;
};



export default function ScatterTiempos ({graphsData, outliers}){

    const colorPilots = getColorPilots()
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
      setFilteredData ([])
      if (!outliers && graphsData[0]) {
        const minTime = graphsData[0].reduce((min, obj) => {
          return obj["Tiempo sec"] < min && obj["Tiempo sec"] ? obj["Tiempo sec"] : min;
        }, Infinity);
  
        graphsData.map((element) => (setFilteredData(filteredData => [...filteredData, element.filter((element2) => (element2["Tiempo sec"] < (minTime + 10)))])))
  
      } else {
  
        graphsData.map((element) => (setFilteredData(filteredData => [...filteredData, element])))
  
      }


    }, [outliers, graphsData])



    return(graphsData ?    
    <ScatterChart
        width={900}
        height={700}
        margin={{
          top: 20,
          right: 40,
          bottom: 20,
          left: 40
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="Vuelta" name="Vuelta" label="Vuelta" allowDuplicatedCategory={false}/>
        <YAxis type="number" allowDuplicatedCategory={false} dataKey="Tiempo sec" name="Tiempo (s)" label={{ value: "Tiempo (s)", angle: -90, position: 'insideLeft' }}  domain={['dataMin', 'dataMin + 20']}/>

        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />}/>
        <Legend />
        {filteredData.map((element, index) => {
          return(<Scatter line key={index} name={element[0] ? element[0]["Piloto"] : ''} data={element} fill={element[0] ? colorPilots[(element[0]["driverId"]).toString()] : ''} />)
          
        })}
      </ScatterChart>
      : '')


}