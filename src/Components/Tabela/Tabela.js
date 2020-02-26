import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class Tabela extends Component {

    render() {

        const {autores, removeAutor} = this.props;

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Autores</TableCell>
                        <TableCell>Livros</TableCell>
                        <TableCell>Preços</TableCell>
                        <TableCell>Remover</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {autores.map(autor => {
                    return(
                        <TableRow key={autor.id}>
                            <TableCell>{autor.nome}</TableCell>
                            <TableCell>{autor.nome}</TableCell>
                            <TableCell>{autor.nome}</TableCell>
                            <TableCell>
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={() => removeAutor(autor.id)}
                                >
                                    Remover
                                </Button>
                            </TableCell>
                        </TableRow>

                    )
                    })}
                </TableBody>
            </Table>
        );
    }
}

export default Tabela;
