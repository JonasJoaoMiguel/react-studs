import './MyForm.css'
import { useState } from 'react'

const MyForm = ({ user }) => {
    // 6 - controlled inputs
    // 3 - gerenciamento de dados
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [bio, setBio] = useState("");
    const [role, setRole] = useState("");

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); //extremamente necessário para não dar reload na page ao enviar
        console.log("enviando o formulário")
        console.log(name, email, bio, role);
        // 7 - limpando formulario
        setName('')
        setEmail('')
        setBio('')
        setRole('')
    }


    // console.log(name);
    // console.log(email);

    return (
        <div>
            {/* 1 - criação de form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text"
                        name="name"
                        placeholder="Digite aqui seu nome"
                        onChange={handleName}
                        value={name} />
                </div>
                {/* 2 - label envolvendo input */}
                <label>
                    <span>E-mail</span>
                    {/* 4 - simplificação da manipulação de state */}
                    <input type="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                {/* 8 - textarea */}
                <label>
                    <span>Bio:</span>
                    <textarea name="bio"
                        placeholder="descrição do usuário"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}></textarea>
                </label>
                {/* 9 - select */}
                <label>
                    <span>Função no sistema</span>
                    <select name="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="user">Usuário</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Administrador</option>
                    </select>
                </label>
                <input type="submit" value="Enviar"></input>
            </form>
        </div>
    )
}

export default MyForm
