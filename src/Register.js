import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { register } from './api';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      errorEmail: '',
      errorPassword: '',
      errorPasswordConfirm: ''
    };
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.handlePasswordConfirmBlur =
         this.handlePasswordConfirmBlur.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearFormData();
  }

  clearFormData() {
    this.formData = {
      email: '',
      password: '',
      passwordConfirm: ''
    };
  }

  handleEmailBlur(evt) {
    this.formData.email = evt.target.value;
  }

  handlePasswordBlur(evt) {
    this.formData.password = evt.target.value;
  }

  handlePasswordConfirmBlur(evt) {
    this.formData.passwordConfirm = evt.target.value;
  }

  resetErrorMessages() {
    this.setState((state) => ({
      errorEmail: '',
      errorPassword: '',
      errorPasswordConfirm: ''
    }));
  }

  validate() {
    this.resetErrorMessages();
    if (!this.formData.email) {
      this.setState((state) => ({
        errorEmail: 'Адрес электронной почты не указан'
      }));
      return false;
    }
    if (!this.formData.password) {
      this.setState((state) => ({
        errorPassword: 'Пароль не указан'
      }));
      return false;
    }
    if (!this.formData.passwordConfirm) {
      this.setState((state) => ({
        errorPasswordConfirm: 'Повтор пароля не указан'
      }));
      return false;
    }
    if (this.formData.password !== this.formData.passwordConfirm) {
      this.setState((state) => ({
        errorPassword: 'Введенные пароли не совпадают',
        errorPasswordConfirm: 'Введенные пароли не совпадают'
      }));
      return false;
    }
    return true;
  }

  showErrorMessage(code) {
    this.resetErrorMessages();
    if (code === 'auth/email-already-in-use') {
      this.setState((state) => ({
        errorEmail: 'Пользователь с таким адресом электронной ' +
                    'почты уже зарегистрирован'
      }));
    } else if (code === 'auth/weak-password') {
      this.setState((state) => ({
        errorPassword: 'Слишком простой пароль',
        errorPasswordConfirm: 'Слишком простой пароль'
      }));
    }
  }

  async handleFormSubmit(evt) {
    evt.preventDefault();
    if (this.validate()) {
      const result = await register(this.formData.email,
                                    this.formData.password);
      if (typeof result !== 'object')
        this.showErrorMessage(result);
    }
  }

  render() {
    if (this.props.currentUser)
      return <Navigate to="/" replace />;
    else
      return (
        <section>
          <h1>Регистрация</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="field">
              <label className="label">Адрес электронной почты</label>
              <div className="control">
                <input type="email" className="input"
                       onBlur={this.handleEmailBlur} />
              </div>
              {this.state.errorEmail &&
                <p className="help is-danger">
                  {this.state.errorEmail}
                </p>
              }
            </div>
            <div className="field">
              <label className="label">Пароль</label>
              <div className="control">
                <input type="password" className="input"
                       onBlur={this.handlePasswordBlur} />
              </div>
              {this.state.errorPassword &&
                <p className="help is-danger">
                  {this.state.errorPassword}
                </p>
              }
            </div>
            <div className="field">
              <label className="label">Повтор пароля</label>
              <div className="control">
                <input type="password" className="input"
                       onBlur={this.handlePasswordConfirmBlur} />
              </div>
              {this.state.errorPasswordConfirm &&
                <p className="help is-danger">
                  {this.state.errorPasswordConfirm}
                </p>
              }
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <input type="reset"
                       className="button is-link is-light"
                       value="Сброс" />
              </div>
              <div className="control">
                <input type="submit" className="button is-primary"
                       value="Зарегистрироваться" />
              </div>
            </div>
          </form>
        </section>
      );
  }
}