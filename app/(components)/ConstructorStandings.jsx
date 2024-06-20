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
          <p>{`Puntos ${payload[0].payload.team} : ${payload[0].payload["Puntos Ferrari"]}`}</p>
          <p>{`Puntos ${payload[1].payload.team2} : ${payload[1].payload["Puntos RedBull"]}`}</p>
          <p>{`Posición ${payload[0].payload.team} : ${payload[0].payload["Posición Ferrari"]}`}</p>
          <p>{`Posición ${payload[1].payload.team2} : ${payload[1].payload["Posición RedBull"]}`}</p>
          <p>{`Carrera : ${payload[0].payload.raceName}`}</p>
          <p>{`Ronda : ${payload[0].payload.round}`}</p>
  
        </div>
        :
        <div>
        <h4>{label}</h4>
        <p>{`Puntos ${payload[0].payload.team} : ${payload[0].payload["Puntos Ferrari"]}`}</p>
        <p>{`Posición ${payload[0].payload.team} : ${payload[0].payload["Posición Ferrari"]}`}</p>
        <p>{`Carrera: ${payload[0].payload.raceName}`}</p>
        <p>{`Ronda : ${payload[0].payload.round}`}</p>
   
      </div>


    )
  }

  return null;
};

export default function ConstructorsTimeGraph ({}) {

    const [standingsData, setStandingsData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [años, setAños] = useState([1997, 2009 ]);
    const [filterStandingsData, setFilterStandingsData] = useState(false)

    const [graphType, setGraphType] =useState('points');

    const handleChangeGraph = (event) => {
      setGraphType(event.target.value);
    };



    useEffect(() => {

        let datatoappend = []

      
        fetch("http://127.0.0.1:8080/api/getConstructorStandings/6")
        .then((response) => response.json())
        .then((data) => {

            datatoappend.push(...data)

            fetch("http://127.0.0.1:8080/api/getConstructorStandings/9")
            .then((response) => response.json())
            .then((data) => {

   
              data.forEach(element => {
                
                const foundElement = datatoappend.find(obj => obj.raceId === element.raceId);
                if (foundElement){
                  foundElement["Puntos RedBull"] = element.points9
                  foundElement["Posición RedBull"] = element["Posición Red Bull"]
                  foundElement["Puntos carrera RedBull"] = element["Puntos carrera Red Bull"]
                  foundElement.team2 = element.team

                }

              });

              fetch("http://127.0.0.1:8080/api/getConstructorStandings/19")
              .then((response) => response.json())
              .then((data) => {
     
                data.forEach(element => {
                  
                  const foundElement = datatoappend.find(obj => obj.raceId === element.raceId);
                  if (foundElement){
                    foundElement["Puntos RedBull"] = element.points19
                    foundElement["Puntos Jaguar"] = element.points19
                    foundElement["Posición Jaguar"] = element["Posición Jaguar"]
                    foundElement["Posición RedBull"] = element["Posición Jaguar"]
                    foundElement["Puntos carrera RedBull"] = element["Puntos carrera Jaguar"]

                    foundElement.team2 = element.team

                  }
  
                });

                fetch("http://127.0.0.1:8080/api/getConstructorStandings/24")
                .then((response) => response.json())
                .then((data) => {
       
                  data.forEach(element => {
                    
                    const foundElement = datatoappend.find(obj => obj.raceId === element.raceId);
                    if (foundElement){
                      foundElement["Puntos RedBull"] = element.points24
                      foundElement["Puntos Stewart"] = element.points24
                      foundElement["Posición Stewart"] = element["Posición Stewart"]
                      foundElement["Posición RedBull"] = element["Posición Stewart"]
                      foundElement["Puntos carrera RedBull"] = element["Puntos carrera Stewart"]



                      foundElement.team2 = element.team

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

                datatoappend.forEach((element, index) => {

                  if (index == 0){
                    element["Puntos acumulados Ferrari"] = element["Puntos carrera Ferrari"]
                    element["Puntos acumulados RedBull"] = 0

                  }
                  else{
                  
                    element["Puntos acumulados Ferrari"] = datatoappend[index-1]["Puntos acumulados Ferrari"] + element["Puntos carrera Ferrari"]
                    element["Puntos acumulados RedBull"] = datatoappend[index-1]["Puntos acumulados RedBull"] + (element["Puntos carrera RedBull"] ? element["Puntos carrera RedBull"] : 0)
                  }
                })
    
                setStandingsData(datatoappend)
                setFilterStandingsData(datatoappend)
    
    
                setLoading(false)
    
    
        
                }); 
  
              });  
  
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
        graphType == 'position' ? <h2 style={{textAlign: 'center'}}>Evolución de posición en el mundial cada temporada</h2> :
        <h2 style={{textAlign: 'center'}}>Evolución de puntos acumulaods conseguidos historicamente desde 1997</h2>
        }
        
        <h4 style={{textAlign: 'center'}}>Seleccionar año/s</h4>
        <Slider
          getAriaLabel={() => 'Año'}
          value={años}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={1997}
          max={2009}
          sx={{width: '10rem', position:'absolute', left: '47%',marginBottom: '1rem'}}
        />
        <Select
          labelId="selectType"
          id="selectType"
          value={graphType}
          label="Valor"
          onChange={handleChangeGraph}
          sx={{marginLeft: '50rem'}}
        >
          <MenuItem value={'position'}>Posición Mundial</MenuItem>
          <MenuItem value={'points'}>Puntos Mundial</MenuItem>
          <MenuItem value={'pointsRa'}>Puntos en cada carrera</MenuItem>
          <MenuItem value={'pointsAcc'}>Puntos acumulados</MenuItem>

        </Select>
        <div style={{marginLeft: '20%'}}>

        <LineChart
        width={2000}
        height={1000}
        data={filterStandingsData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5
        }}
        style={{position:'absolute', left: '10%',marginTop: '5rem'}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        {graphType == 'position' ?
        <YAxis reversed={true}  domain={[1, 'dataMax']}/>
        : graphType == 'pointsAcc' ?
        <YAxis scale="sqrt" domain={['auto', 'auto']}/>
        :<YAxis />
      }
        <Tooltip  content={<CustomTooltip />}/>
        <Legend />
        <Line
          type="monotone"
          dataKey= {graphType == 'points' ? "Puntos Ferrari" : graphType == 'position' ? "Posición Ferrari" : graphType == 'pointsAcc' ? "Puntos acumulados Ferrari" : "Puntos carrera Ferrari"}
          stroke="#8884d8"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey={graphType == 'points' ? "Puntos RedBull" : graphType == 'position' ? "Posición RedBull" : graphType == 'pointsAcc' ? "Puntos acumulados RedBull" : "Puntos carrera RedBull"}
          stroke="#82ca9d"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey={graphType == 'points' ? "Puntos Jaguar" : graphType == 'position' ? "Posición Jaguar" : graphType == 'pointsAcc' ? "Puntos acumulados Jaguar" : "Puntos carrera Jaguar"}
          stroke="blue"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey={graphType == 'points' ? "Puntos Stewart" : graphType == 'position' ? "Posición Stewart" : graphType == 'pointsAcc' ? "Puntos acumulados Stewart" : "Puntos carrera Stewart"}
          stroke="pink"
          strokeWidth={3}
        />
      </LineChart>
      </div>
      </>
    )
}