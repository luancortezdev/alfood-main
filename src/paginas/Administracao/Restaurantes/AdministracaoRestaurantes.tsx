import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

export const AdministracaoRestaurantes = () => {
  const navigate = useNavigate()
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>("restaurantes/")
      .then(res => setRestaurantes(res.data))
      .catch(err => console.log(err))
  }, [])

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
        setRestaurantes([...listaRestaurantes])
      })
      .catch(err => console.log(err))
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                {/* [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ] */}
                <Button onClick={() => navigate(`/admin/restaurantes/${restaurante.id}`)}>editar</Button>
              </TableCell>
              <TableCell>
                <Button color="error" onClick={() => excluir(restaurante)}>excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
