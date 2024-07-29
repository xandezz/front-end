import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "./Tables.css"

const TableClientesPorCidade = ({ jsonPath, title }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(jsonPath);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jsonPath]);

  if (loading) return <Typography variant="body1">Loading...</Typography>;
  if (error) return <Typography variant="body1">Error: {error.message}</Typography>;

  return (
    <>
      <h2 className='title'>{title}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="city sales table">
          <TableHead>
            <TableRow>
              <TableCell>Cidade</TableCell>
              <TableCell>ID Entrada</TableCell>
              <TableCell>ID Layouts</TableCell>
              <TableCell>Nome Cliente</TableCell>
              <TableCell>Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([city, details]) => (
              <TableRow key={details.id_entrada}>
                <TableCell component="th" scope="row">{city}</TableCell>
                <TableCell>{details.id_entrada}</TableCell>
                <TableCell>{details.id_layouts}</TableCell>
                <TableCell>{details.nome_cliente}</TableCell>
                <TableCell>{details.valor_total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>    
  );
};

export default TableClientesPorCidade;
