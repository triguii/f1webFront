import React from "react"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'Posicion Carrera',
    headerName: 'Posició a la cursa',
    type: 'number',
    width: 150,
  },
  {
    field: 'Posicion Mundial',
    headerName: 'Posició al mundial',
    type: 'number',
    width: 130,
  },
  { field: 'Piloto Nombre', headerName: 'Nom', width: 130 },
  { field: 'Piloto', headerName: 'Cognom', width: 130 },

  {
    field: 'Posicion Salida',
    headerName: 'Posició clasificada',
    type: 'number',
    width: 150,
  },
  {
    field: 'Vueltarapida',
    headerName: 'Volta més ràpida',
    width: 150,
  },
  {
    field: 'Puntos Carrera',
    headerName: 'Punts aconseguits',
    width: 150,
  },
];

export default function RaceStandingsTable({ standingsData }) {
  
  console.log(standingsData)
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'Posicion Carrera',
      sort: 'asc',
    },
  ]);


  return (
    <div style={{ height: 400, width: 1050 }}>
      <DataGrid
        rows={standingsData}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 24 },
          },
        }}

      />
    </div>)
}