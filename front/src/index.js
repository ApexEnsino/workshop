// Importar complementos
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos.css'

// Classe
class Pagina extends React.Component{

    // Props e State
    constructor(props){
	
	// Construtor da classe Props
        super(props);

	// State
        this.state = {
            dados : []
        }

    }

    // Após criar o componente selecionar os dados
    componentDidMount(){
        fetch("http://localhost:4000/", {method:"GET"})
        .then(resposta => resposta.json())
        .then((resultado) => {
            this.setState({
                dados : resultado
            })
        })
    }

    // Método para efetuar o cadastro
    cadastrar = () => {
        fetch("http://localhost:4000", {
            method: 'POST',
            body: JSON.stringify({'nome' : this.state.nome, 'idade' : this.state.idade}),
            headers: {"Content-Type": "application/json"}
        })
        .then(resposta => resposta.json())
        .then((resultado) => {

            // Copiar array
            var vetor = this.state.dados;

            // Adicionar dados vindos do back-end
            vetor.push(resultado);

            // Sobrepor dados do array
            this.setState({dados:vetor});
        });
    }

    // Método para excluir
    excluir = (codigo) => {
      fetch("http://localhost:4000/"+codigo, {method: 'DELETE'})
      .then(res => res.json())
      .then((resultado) => {
          // Retornar mensagem
          alert(resultado.mensagem)

          // Atualizar página
          window.location.reload(false);
        }
      )
    }

    // Enviar o que for digitado aos states de nome e idade
    aoTeclar = (e) => {
      let nam = e.target.name;
      let val = e.target.value;
      this.setState({[nam]: val});
    }

    // Render
    render(){
        return(

            <div>
                <form className="col-6 offset-3">
                    <input type="text" placeholder="Nome" className="form-control" name="nome" onChange={this.aoTeclar}/>
                    <input type="number" placeholder="Idade" className="form-control" name="idade" onChange={this.aoTeclar}/>
                    <input type="button" value="Cadastrar" className="btn btn-primary" onClick={this.cadastrar} />
                </form>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Idade</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.dados.map((obj) => (
                            <tr>
                                <td>{obj.codigo}</td>
                                <td>{obj.nome}</td>
                                <td>{obj.idade}</td>
                                <td><button className="btn btn-danger" onClick={() => this.excluir(obj.codigo)}>Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

}

// Selecionando o id root
ReactDOM.render(<Pagina />, document.getElementById("root"));