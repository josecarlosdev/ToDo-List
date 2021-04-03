import React, {Component} from "react";

const User = () =>{
    return (
        <div className="user">
            <div className="col-md-12">
                <div>
                    <label>Usuário</label>
                    <input
                        type="text"
                        className="form-control"
                        id="user"
                        required
                        value ={Usuario}
                        onChange={this.handleChange}
                        name="user"
                    />
                </div>
                <br />
                <button className="btn btn-success" onClick={} >Entrar</button>
            </div>
        </div>
    )
}
export default User