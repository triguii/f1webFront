'use client'

import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  LineChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line
} from "recharts";

import QualyTable from "./QualyTable";
import getColorPilots from "@/config/colors";
import getName2Id from "@/config/name2id";

export default function QualyPlot({ pilots, pilotsObject }) {

  const colorPilots = getColorPilots()
  const name2id = getName2Id()

  const [qualyData, setQualyData] = useState([
    { "Sesión": 'Q1' },
    { "Sesión": 'Q2' },
    { "Sesión": 'Q3' }
  ])
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableData([])
    setQualyData([
      { "Sesión": 'Q1' },
      { "Sesión": 'Q2' },
      { "Sesión": 'Q3' }
    ])

    qualyData[0] = { "Sesión": 'Q1' }
    qualyData[1] = { "Sesión": 'Q2' }
    qualyData[2] = { "Sesión": 'Q3' }

    pilots.map(element => {
      fetch("https://flask-api-lake.vercel.app/api/getQualyData/355/" + pilotsObject[element])
        .then((response) => response.json())
        .then((data) => {
          let Q1Data = qualyData[0]
          let Q2Data = qualyData[1]
          let Q3Data = qualyData[2]
          data[0].Piloto = element
          data[0]['Q1 s'] = data[0]["Q1 ms"] ? data[0]["Q1 ms"] / 1000 : null
          data[0]['Q2 s'] = data[0]["Q2 ms"] ? data[0]["Q2 ms"] / 1000 : null
          data[0]['Q3 s'] = data[0]["Q3 ms"] ? data[0]["Q3 ms"] / 1000 : null
          Q1Data[element] = data[0]['Q1 s']
          Q2Data[element] = data[0]['Q2 s']
          Q3Data[element] = data[0]['Q3 s']

          setQualyData([Q1Data, Q2Data, Q3Data])
          setTableData(tableData => [...tableData, data[0]])

          
        })



    })
  }, [pilots])

  return (
    <div style={{ float: 'right' }}>
      <div style={{ float: 'left' }}>
        <QualyTable qualyData={tableData} />
      </div>
      <LineChart
        width={900}
        height={700}
        data={qualyData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
        style={{ float: 'right' }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="Sesión" name="Sesión" allowDuplicatedCategory={false} />
        <YAxis type="number" name="Tiempo (s)" domain={['dataMin - 1', 'dataMax + 1']} />

        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        {Object.entries(qualyData[0]).map((element, index) => {
          return (
            element[0] != 'Sesión' ?
              <Line type="linear" dataKey={element[0]} stroke={colorPilots[name2id[element[0]]]} dot={{ strokeWidth: 6 }} />
              : ''
          )
        })}


      </LineChart>
    </div>
  )
}