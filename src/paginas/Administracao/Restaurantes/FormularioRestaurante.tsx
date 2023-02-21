import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'

export const FormularioRestaurante = () => {
  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((res) => setNomeRestaurante(res.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => alert(`Restaurante atualizado com sucesso!`))
    } else {
      http.post("restaurantes/", {
        nome: nomeRestaurante
      })
        .then(() => alert(`Restaurante cadastrado com sucesso!`))
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterFormulario}>
        <TextField
          label="Nome do restaurante"
          variant="standard"
          value={nomeRestaurante}
          onChange={event => setNomeRestaurante(event.target.value)}
          fullWidth
          required
        />
        <Button sx={{ marginTop: 1 }} fullWidth type='submit' variant='outlined'>Salvar</Button>
      </Box>
    </Box>
  )
}
