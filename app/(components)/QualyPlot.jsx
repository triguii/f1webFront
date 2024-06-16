'use client'

import React, { useEffect, useState } from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

import QualyTable from "./QualyTable";

export default function QualyPlot ( {pilots, pilotsObject} ){

    const [qualyData, setQualyData] = useState([])

    useEffect(() =>  {
        setQualyData([])

        pilots.map(element => {        
            fetch("http://127.0.0.1:8080/api/getQualyData/355/" + pilotsObject[element])
            .then((response) => response.json())
            .then((data) => {
                data[0].Piloto = element
                data[0]['Q1 s'] = data[0]["Q1 ms"] / 1000
                data[0]['Q2 s'] = data[0]["Q2 ms"] / 1000
                data[0]['Q3 s'] = data[0]["Q3 ms"] / 1000
                setQualyData(qualyData => [...qualyData, data[0]])
            })
            
    })
    },[pilots])

    console.log(qualyData)

    return(
      <div style={{float: 'right'}}>
        <div style={{float: 'left'}}>
        <QualyTable qualyData={qualyData}/>
        </div>
        <ScatterChart
        width={900}
        height={700}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
        style={{float: 'right'}}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="Piloto" name="Piloto" allowDuplicatedCategory={false}/>
        <YAxis type="number"  name="Tiempo (s)"  domain={['dataMin - 1', 'dataMax + 1']}/>

        <Tooltip cursor={{ strokeDasharray: "3 3" }}/>
        <Legend />
        <Scatter name="Q1" data={qualyData} dataKey="Q1 s" fill="#8884d8"  />
        <Scatter name="Q2" data={qualyData} dataKey="Q2 s" fill="#82ca9d"  />
        <Scatter name="Q3" data={qualyData} dataKey="Q3 s" fill="red"  />

      </ScatterChart>
      </div>
    )
}