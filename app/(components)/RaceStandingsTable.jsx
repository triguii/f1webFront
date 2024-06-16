import React from "react"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'Piloto Nombre', headerName: 'Nombre', width: 130 },
    { field: 'Piloto', headerName: 'Apellido', width: 130 },
    {
      field: 'Posicion Carrera',
      headerName: 'Posicion final',
      type: 'number',
      width: 130,
    },
    {
        field: 'Posicion Salida',
        headerName: 'Posicion clasificada',
        type: 'number',
        width: 150,
      },
      {
        field: 'Vueltarapida',
        headerName: 'Vuelta más rápida',
        width: 150,
      },
      {
        field: 'Puntos Carrera',
        headerName: 'Puntos conseguidos',
        width: 150,
      },
  ];

export default function RaceStandingsTable ({standingsData}){


    return (    
    <div style={{ height: 400, width: 900 }}>
    <DataGrid
      rows={standingsData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 24 },
        },
      }}
      
    />
  </div>)
}