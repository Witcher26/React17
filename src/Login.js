import { Component } from "react";
import { Navigate } from "react-router-dom";
import { register } from "./auth";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.clearFormData = this.clearFormData.bind(this);
        this.handleEmailChange = this.handleEmailChange(this);
        this.handleFormSubmit = this.handleFormSubmit(this);
        this.handlePasswordChange= this.handlePasswordChange(this);

    }

    clearFormData(){
        this.formData = {
            email: "",
            password: "",
        }
    }

    handlePasswordChange(evt){
        this.formData.password = evt.target.value;
    }

    handleEmailChange(evt){
        this.formData.email = evt.target.value;
    }

    async handleFormSubmit (evt){
        evt.preventDefault();
        const result = await register(this.formData.email,
                                     this.formData.password);
            if(typeof result != 'object'){
                console.log(result);
            }
    }
    render(){
        if(this.props.currentUser){
            return <Navigate to="/" replace />
        }

        else
        return (
            <section>
                <h1>
                    Регистрация
                </h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="field">
                        <label className="label">Адрес электронной почты</label>
                        <div className="control">
                            <input type="email" className="input" onChange={this.handleEmailChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Пароль</label>
                        <div className="control">
                            <input type="password" className="input" onChange={this.handlePasswordChange}/>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset" className="button is-link is-light" value="Сброс"/>
                        </div>
                        <div className="control">
                            <input type="submit" className="button is-primary" value="Зарегистрироваться" />
                    </div>
                    </div>
                </form>
            </section>
        )
    }


}