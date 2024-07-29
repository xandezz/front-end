import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const TableTicketMedio = ({ jsonPath }) => {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sales metrics table">
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">Valor Total</TableCell>
            <TableCell align="right">{data.ValorTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Quantidade de Vendas</TableCell>
            <TableCell align="right">{data.QuantidadeDeVendas}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Ticket Médio</TableCell>
            <TableCell align="right">{data.TicketMedio?.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTicketMedio;


