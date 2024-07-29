import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import "./Card.css"

export default function OutlinedCard({ jsonPath, title, keyToDisplay, link }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(jsonPath);
        
        // Verifica se a resposta é JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jsonPath]);

  // Exibir mensagem de carregamento ou erro
  if (loading) return <Typography variant="body1">Loading...</Typography>;
  if (error) return <Typography variant="body1">Error: {error.message}</Typography>;

  // Obtém o valor da chave especificada do JSON e arredonda se for número
  let valueToDisplay = jsonData ? jsonData[keyToDisplay] : "Dados não carregados";
  if (typeof valueToDisplay === 'number') {
    valueToDisplay = valueToDisplay.toFixed(2);
  } else if (!jsonData) {
    valueToDisplay = "Dados não carregados";
  } else {
    valueToDisplay = jsonData[keyToDisplay] || "Chave não encontrada";
  }

  return (
    <Link to={link} className='link'>
      <Box sx={{ minWidth: 500, maxWidth: 600 }}>
        <Card sx={{ height: 300, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" component="div">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 2 }}>
              {valueToDisplay}
            </Typography>
            <Typography variant="h5" component="div" sx={{ mt: 'auto' }}>
              clique aqui para ver a tabela
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}
