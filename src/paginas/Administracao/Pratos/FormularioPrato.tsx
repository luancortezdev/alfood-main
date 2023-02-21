import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import http from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'
import Itag from '../../../interfaces/ITag'

export const FormularioPrato = () => {

  const [nomePrato, setNomePrato] = useState('')
  const [descricaoPrato, setDescricaoPrato] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState<Itag[]>([])
  const [restaurante, setRestaurante] = useState('')
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    http.get<{ tags: Itag[] }>("tags/")
      .then(res => setTags(res.data.tags))
    http.get<IRestaurante[]>("restaurantes/")
      .then((res) => setRestaurantes(res.data))
  }, [])

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImagem(event.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('nome', nomePrato)
    formData.append('descricao', descricaoPrato)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)
    if (imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        setNomePrato('')
        setDescricaoPrato('')
        setTag('')
        setRestaurante('')
        alert('Prato cadastrado com sucesso!')
      })
      .catch(err => console.log(err))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterFormulario}>
        <TextField
          label="Nome do prato"
          variant="standard"
          value={nomePrato}
          onChange={event => setNomePrato(event.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Descrição do prato"
          variant="standard"
          value={descricaoPrato}
          onChange={event => setDescricaoPrato(event.target.value)}
          fullWidth
          required
        />
        <FormControl margin='dense' fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select labelId='select-tag' value={tag} onChange={event => setTag(event.target.value)}>
            {tags.map(tag => (
              <MenuItem key={tag.value} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin='dense' fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select labelId='select-restaurante' value={restaurante} onChange={event => setRestaurante(event.target.value)}>
            {restaurantes.map(restaurante => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={selecionarArquivo} />
        <Button sx={{ marginTop: 1 }} fullWidth type='submit' variant='outlined'>Salvar</Button>
      </Box>
    </Box>
  )
}