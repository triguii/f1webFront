import React from "react"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import getColorPilots from '@/config/colors'


function timeStringToSeconds(timeString) {
    const [minutes, rest] = timeString.split(':');
    const [seconds, milliseconds] = rest.split('.');

    const minutesInSeconds = parseFloat(minutes) * 60;
    const secondsPart = parseFloat(seconds);
    const millisecondsPart = parseFloat(milliseconds) / 1000;

    const totalSeconds = minutesInSeconds + secondsPart + millisecondsPart;

    return parseFloat(totalSeconds);
}


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
  
          <div>
            <h4>{label}</h4>
            <p>{`Diferencia de temps :  ${parseFloat(payload[0].payload['Diff']).toFixed(2)} s`}</p>

    
          </div>

      )
    }
    return null;
  };

export default function TimeDiffBar({ graphsData }) {
    const colorPilots = getColorPilots()

    let barData = []

    try {

        graphsData[1].map((element, index) => {
            if (!(element.VRapida.endsWith("N")) && !(graphsData[0][index].VRapida.endsWith("N"))) {
                const elementToAdd = {
                    "NumRonda": index,
                    "Carrera": element.Carrera,
                    "Diff": parseFloat(timeStringToSeconds(element.VRapida) - timeStringToSeconds(graphsData[0][index].VRapida))
                }

                barData.push(elementToAdd)
            }

        })
    } catch {
        barData = []
    }


    return (
        <BarChart
            width={1000}
            height={800}
            data={barData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="Carrera" label="Carrera" />
            <YAxis label={{ value: "Diferencia de tiempo a favor de Alonso en sus vueltas más rápidas (s)", angle: -90, position: 'insideLeft', offset: -5 }}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Bar dataKey="Diff" name="Diferencia de temps a favor de Alonso (s)">
                {
                  barData.map((entry, index) => (
                    <Cell key={index} fill={barData[index].Diff > 0 ? colorPilots['4'] : colorPilots['20']}/>
                  ))
                }
            </Bar>
        </BarChart>
    )
}