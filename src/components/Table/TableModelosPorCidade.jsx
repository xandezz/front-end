import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "./Tables.css";

const TableModelosPorCidade = ({ jsonPath, title }) => {
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

  // Ordenar as cidades por quantidade vendida em ordem decrescente
  const sortedData = Object.entries(data)
    .sort((a, b) => b[1].quantidade_vendida - a[1].quantidade_vendida);

  return (
    <>
        <h2 className='title'>{title}</h2>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sales by city table">
            <TableHead>
            <TableRow>
                <TableCell>Cidade</TableCell>
                <TableCell>Modelo Mais Vendido</TableCell>
                <TableCell align="right">Quantidade Vendida</TableCell>
                <TableCell>Modelos e Quantidades</TableCell>
                <TableCell>Total Vendido</TableCell> {/* Nova coluna */}
            </TableRow>
            </TableHead>
            <TableBody>
            {sortedData.map(([cidade, detalhes]) => {
                // Calcular o total vendido
                const totalVendido = Object.values(detalhes.modelos_quantidades).reduce((acc, quantidade) => acc + quantidade, 0);

                return (
                    <TableRow key={cidade}>
                    <TableCell component="th" scope="row">{cidade || "Indefinido"}</TableCell>
                    <TableCell>{detalhes.modelo_mais_vendido}</TableCell>
                    <TableCell align="right">{detalhes.quantidade_vendida}</TableCell>
                    <TableCell>
                        {Object.entries(detalhes.modelos_quantidades).map(([modelo, quantidade]) => (
                        <div key={modelo}>{modelo}: {quantidade}</div>
                        ))}
                    </TableCell>
                    <TableCell align="right">{totalVendido}</TableCell> {/* Exibir total vendido */}
                    </TableRow>
                );
            })}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
};

export default TableModelosPorCidade;
