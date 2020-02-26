import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';
import Tabela from "../../Components/Tabela/Tabela";

class Livros extends Component {

    constructor(props) {
        super(props);

        this.state = {
            livros: [],
            titulo: 'Livros'
        };
    }

    componentDidMount(){
        ApiService.ListaLivros()
                    .then(res => {
                        if(res.message === 'success'){
                            PopUp.exibeMensagem('success', 'Livros listados com sucesso');
                            this.setState({livros : [...this.state.livros, ...res.data]});

                        }
                    })
                    .catch(err => PopUp.exibeMensagem('error', 'Falha na comunicação com a API ao listar os livros'));
    }

    getCampos = () => {
        return [
            { titulo: this.state.titulo, campo: 'livro' }
        ]
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Página de Livros</h1>
                    <Tabela
                        campos={this.getCampos()}
                        dados={this.state.livros} />
                </div>
            </Fragment>
        );
    }

}
export default Livros;
