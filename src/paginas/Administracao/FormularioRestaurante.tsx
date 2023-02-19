import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

export const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post("http://0.0.0.0:8000/api/v2/restaurantes/", {
      nome: nomeRestaurante
    })
      .then(() => alert(`Restaurante ${nomeRestaurante} cadastrado com sucesso!`))
  }

  return (
    <form onSubmit={aoSubmeterFormulario}>
      <TextField
        label="Nome do restaurante"
        variant="standard"
        value={nomeRestaurante}
        onChange={event => setNomeRestaurante(event.target.value)}
      />
      <Button type='submit' variant='outlined'>Testar</Button>
    </form>
  )
}
