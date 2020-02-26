import React, { Fragment } from 'react';
import Header from '../../Components/Header/Header';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

const sobreStyle = makeStyles({
    titulo: {
        textAlign: 'center',
        color: '#7986cb'
    }
});

const Sobre = () =>{
    const classes = sobreStyle();
    return (
        <Fragment>
            <Header />
            <Container maxWidth={"sm"}>
                <Typography className={classes.titulo} variant={'h1'} component={'h2'}>
                    Sobre
                </Typography>
                <Typography variant={'body1'} component={'p'}>Produzimos e editamos livros em diversos formatos.</Typography>
            </Container>
        </Fragment>
    );
}
export default Sobre;
