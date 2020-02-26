import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';
import Tabela from "../../Components/Tabela/Tabela";

class Autores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nomes: []
        };
    }

    componentDidMount(){
        ApiService.ListaNomes()
                .then(res => {
                    if(res.message === 'success'){
                        PopUp.exibeMensagem('success', 'Autores Listados com sucesso');
                        this.setState({nomes: [...this.state.nomes, ...res.data]});
                    }
                })
                .catch(err => PopUp.exibeMensagem('error', 'Falha na comunicação com a API ao listar os autores'));
    }

    getCampos = () => {
        return [
            { titulo: 'Autores', campo: 'nome' }
        ]
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Página de Autores</h1>
                    <Tabela
                        campos={this.getCampos()}
                        dados={this.state.nomes} />
                </div>
            </Fragment>
        );
    }

}
export default Autores;
