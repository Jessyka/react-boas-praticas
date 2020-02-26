import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const getRemoveCell = (removerDado, id) =>
{
    return removerDado ?
        <TableCell>
            <Button
                variant={"contained"}
                color={"primary"}
                onClick={() => removerDado(id)}
            >
                Remover
            </Button>
        </TableCell>
        :
        null;
}

const getRemoveTitle = removerDado => {
    return removerDado ?
        <TableCell>Remover</TableCell>
        :
        null;
}

const Tabela = props => {
    const {campos, dados, removerDados} = props;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {campos.map(campo => <TableCell>{campo.titulo}</TableCell>)}
                    {getRemoveTitle(removerDados)}
                </TableRow>
            </TableHead>
            <TableBody>
                {dados.map(dado => {
                    return (
                        <TableRow>
                            {campos.map(item => <TableCell key={`${item.id}${item[item.campo]}`}>{dado[item.campo]}</TableCell>)}
                            {getRemoveCell(removerDados, dado.id)}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default Tabela;
