  'use client'

import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

import { Slider, Select, MenuItem } from '@mui/material';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      payload.length > 1 ? 
      <div>
        <h4>{label}</h4>
        <p>{`Puntos Alonso : ${payload[0].payload.Alonso}`}</p>
        <p>{`Puntos Vettel : ${payload[1].payload.Vettel}`}</p>
        <p>{`Posición Alonso : ${payload[1].payload['Posicion Alonso']}`}</p>
        <p>{`Posición Vettel : ${payload[1].payload['Posicion Vettel']}`}</p>
        <p>{`Carrera : ${payload[0].payload.raceName}`}</p>
        <p>{`Ronda : ${payload[0].payload.round}`}</p>

      </div>
      :
      <div>
      <h4>{label}</h4>
      <p>{`Puntos Alonso : ${payload[0].payload.Alonso}`}</p>
      <p>{`Posición Alonso : ${payload[0].payload['Posicion Alonso']}`}</p>
      <p>{`Carrera: ${payload[0].payload.raceName}`}</p>
      <p>{`Ronda : ${payload[0].payload.round}`}</p>


    </div>

    );
  }

  return null;
};

export default function StandingsTimeGraph ({}) {

    const [standingsData, setStandingsData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [años, setAños] = useState([2003, 2009 ]);
    const [filterStandingsData, setFilterStandingsData] = useState(false)

    const [graphType, setGraphType] =useState('points');

    const handleChangeGraph = (event) => {
      setGraphType(event.target.value);
    };


    useEffect(() => {

        let datatoappend = []

      
        fetch("http://127.0.0.1:8080/api/getDriverStandings/4")
        .then((response) => response.json())
        .then((data) => {

            datatoappend.push(...data)

            fetch("http://127.0.0.1:8080/api/getDriverStandings/20")
            .then((response) => response.json())
            .then((data) => {
   
              data.forEach(element => {
                
                const foundElement = datatoappend.find(obj => obj.raceId === element.raceId);
                if (foundElement){
                  foundElement.Vettel = element.points20
                  foundElement["Posicion Vettel"] = element["Posicion Vettel"]
                }

              });

              datatoappend.sort((a, b) => {
                if (a.year != b.year){
                    return a.year - b.year; // Ascending order
                }
                else {
                    return a.round - b.round;
                }
                // To sort in descending order, use: return b.age - a.age;
            });
            datatoappend = datatoappend.filter(obj => obj.year >= años[0] && obj.year <= años[1])

            setStandingsData(datatoappend)
            setFilterStandingsData(datatoappend)


            setLoading(false)
    
            });  
    
        });

    }, [])

    const handleChange = (event, newValue) => {
      setAños(newValue);
    };

    useEffect(() => {
      if (!loading){
        let datatofilter = standingsData

        datatofilter = datatofilter.filter(obj => obj.year >= años[0] && obj.year <= años[1])

        setFilterStandingsData(datatofilter)
      }
    }, [años])



    return( loading? '' :
        <>
        {graphType == 'points' ? <h2 style={{textAlign: 'center'}}>Evolución de puntos conseguidos por carrera en cada temporada</h2> : 
        <h2 style={{textAlign: 'center'}}>Evolución de posición en el mundial en cada carrera</h2>
        }
        <h4 style={{textAlign: 'center'}}>Seleccionar año/s</h4>
        <Slider
          getAriaLabel={() => 'Año'}
          value={años}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={2003}
          max={2009}
          sx={{width: '10rem', marginLeft: '47%'}}
        />
        <Select
          labelId="selectType"
          id="selectType"
          value={graphType}
          label="Valor"
          onChange={handleChangeGraph}
          sx={{marginLeft: '1rem'}}
        >
          <MenuItem value={'position'}>Posición Mundial</MenuItem>
          <MenuItem value={'points'}>Puntos Mundial</MenuItem>
        </Select>
        <div style={{marginLeft: '20%'}}>

        <LineChart
        width={1700}
        height={1000}
        data={filterStandingsData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        {graphType == 'position' ?
        <YAxis reversed={true}  domain={[1, 'dataMax']}/>
        :
        <YAxis/>}
        <Tooltip  content={<CustomTooltip />}/>
        <Legend />
        
        <Line
          type="monotone"
          dataKey={graphType == 'position' ? "Posicion Alonso" : "Alonso"}
          stroke="#8884d8"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey={graphType == 'position' ? "Posicion Vettel" : "Vettel"}
          stroke="#82ca9d"
          strokeWidth={3}
        />
      </LineChart>
      </div>
      </>
    )
}