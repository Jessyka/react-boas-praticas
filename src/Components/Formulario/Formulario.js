import React, {Component} from 'react';
import FormValidator from '../../utils/FormValidator';
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toast from "../Toast/Toast";

class Formulario extends Component {

    constructor(props) {
        super(props)

        this.validador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um nome'
            },
            {
                campo: 'livro',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um livro'
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                args: [{ min: 0, max: 99999 }],
                validoQuando: true,
                mensagem: 'Entre com um valor numérico'
            }
        ])

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido(),
            mensagem: {
                open: false,
                texto: '',
                tipo: ''
            }
        }

        this.state = this.stateInicial
    }

    escutadorDeInput = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    submitFormulario = () => {
        const validacao = this.validador.valida(this.state)

        if (validacao.isValid) {
            this.props.escutadorDeSubmit(this.state)
            this.setState(this.stateInicial)
        } else {
            const { nome, livro, preco } = validacao
            const campos = [nome, livro, preco]
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid
            })
            const erros = camposInvalidos.reduce(
                (erros, campo) => erros + campo.mensagem + '. ',
                ''
            )

            this.setState({
                mensagem: {
                    mensagem: erros,
                    tipo: 'error',
                    open: true
                }
            })
        }
    }

    render() {

        const {nome, livro, preco} = this.state;

        return (
            <>
                <Toast
                    open={this.state.mensagem.open}
                    handleClose={() =>
                        this.setState({mensagem: {open: false}})
                    }
                    severity={this.state.mensagem.tipo}
                >
                    {this.state.mensagem.mensagem}
                </Toast>
                <form>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <TextField
                                variant={"outlined"}
                                id={'nome'}
                                name={'nome'}
                                label={'Nome'}
                                value={nome}
                                onChange={this.escutadorDeInput}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                variant={"outlined"}
                                id={'livro'}
                                name={'livro'}
                                label={'Livro'}
                                value={livro}
                                onChange={this.escutadorDeInput}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                variant={"outlined"}
                                id={'preco'}
                                name={'preco'}
                                label={'Preço'}
                                value={preco}
                                onChange={this.escutadorDeInput}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                onClick={() => this.submitFormulario()}
                            >
                                Salvar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    }
}

export default Formulario;
