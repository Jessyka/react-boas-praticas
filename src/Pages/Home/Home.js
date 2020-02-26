import React, {Component, Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Header from '../../Components/Header/Header';
import Tabela from '../../Components/Tabela/Tabela';
import Form from '../../Components/Formulario/Formulario';
import PopUp from '../../utils/PopUp';
import ApiService from '../../utils/ApiService';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            autores: [],
        };
    }

    removeAutor = id => {

        const {autores} = this.state;

        const autoresAtualizado = autores.filter(autor => {
            return autor.id !== id;
        });
        ApiService.RemoveAutor(id)
            .then(res => {
                if (res.message === 'deleted') {
                    this.setState({autores: [...autoresAtualizado]})
                    PopUp.exibeMensagem("error", "Autor removido com sucesso");
                }
            })
            .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a API ao tentar remover o autor"));

    }

    escutadorDeSubmit = dados => {
        const autor = {
            nome: dados.nome,
            livro: dados.livro,
            preco: dados.preco
        }

        ApiService.CriaAutor(JSON.stringify(autor))
            .then(res => {
                if (res.message === 'success') {
                    this.setState({autores: [...this.state.autores, res.data]});
                    PopUp.exibeMensagem("success", "Autor adicionado com sucesso");
                }

            })
            .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a API ao tentar criar o autor"));


    }


    componentDidMount() {
        ApiService.ListaAutores()
            .then(res => {
                if (res.message === 'success') {
                    this.setState({autores: [...this.state.autores, ...res.data]})
                }

            })
            .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a API ao tentar listar os autores"));
    }

    getCampos = () => {
        return [
            {titulo: 'Autores', campo: 'nome'},
            {titulo: 'Livros', campo: 'livro'},
            {titulo: 'Preços', campo: 'preco'}
        ]
    }

    render() {

        return (
            <Fragment>
                <Header/>
                <div className="container mb-10">
                    <h1>App de livros</h1>
                    <Form escutadorDeSubmit={this.escutadorDeSubmit}/>
                    <Tabela
                        campos={this.getCampos()}
                        dados={this.state.autores}
                        removerDados={this.removeAutor}/>
                </div>
            </Fragment>
        );
    }

}

export default Home;
