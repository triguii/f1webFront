import React from "react"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'Piloto', headerName: 'Piloto', width: 130 },
    {
        headerName: 'Posicion Clasificada',
      field: 'Posición',
      type: 'number',
      width: 130,
    },
    {
        headerName: 'Tiempo Q1',
        field: 'Q1',
        width: 200,
      },
      {
        headerName: 'Tiempo Q2',
        field: 'Q2',
        width: 200,
      },
      {
        headerName: 'Tiempo Q3',
        field: 'Q3',
        width: 200,
      },
  ];

export default function QualyTable ({qualyData}){

    return (    
    <div style={{ height: 400, width: 900 }}>
    <DataGrid
      rows={qualyData}
      getRowId={(row) => row.driverId}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 24 },
        },
      }}
      
    />
  </div>)
}