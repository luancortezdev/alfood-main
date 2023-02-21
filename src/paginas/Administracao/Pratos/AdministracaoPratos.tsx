import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

export const AdministracaoPratos = () => {
  const navigate = useNavigate()
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>("pratos/")
      .then(res => setPratos(res.data))
      .catch(err => console.log(err))
  }, [])

  const excluir = (pratoAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
        setPratos([...listaPratos])
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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map(prato => (
            <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer"><img src={prato.imagem} alt="imagem do restaurante" width="80px" /></a>
              </TableCell>
              <TableCell>
                {/* [ <Link to={`/admin/pratos/${prato.id}`}>editar</Link> ] */}
                <Button sx={{ color: 'green' }} onClick={() => navigate(`/admin/pratos/${prato.id}`)}>editar</Button>
              </TableCell>
              <TableCell>
                <Button color="error" onClick={() => excluir(prato)}>excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
