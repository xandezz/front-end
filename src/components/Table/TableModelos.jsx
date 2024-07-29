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

const TableModelos = ({ jsonPath, title }) => {
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
        setData(result.modelos_quantidades);
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
        <TableContainer component={Paper} className='tablemodelos'>
        <Table sx={{ minWidth: 650 }} aria-label="model quantities table">
            <TableHead>
            <TableRow>
                <TableCell>Modelo</TableCell>
                <TableCell align="right">Quantidade Vendida</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {Object.entries(data).map(([model, quantity], index) => (
                <TableRow key={index}>
                <TableCell component="th" scope="row">{model}</TableCell>
                <TableCell align="right">{quantity}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
};

export default TableModelos;
