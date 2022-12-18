import { Component } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import TodoDetail from './TodoDetail';
import Register from './Register';
import Logout from './Logout';
import Login from './Login';
import { getList, setDone, del } from './api';
import firebaseApp from './firebase';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showMenu: false,
      currentUser: undefined
    };
    this.setDone = this.setDone.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this);
    this.authStateChanged = this.authStateChanged.bind(this);
  }

  async setDone(key) {
    await setDone(this.state.currentUser, key);
    const deed = this.state.data.find( // key = +key; //преобразование индентификатора в число
      (current) => current.key === key
    );
    if (deed)
      deed.done = true;
    this.setState((state) => ({}));
  }

  async delete(key) {
    await del(this.state.currentUser, key);
    const newData = this.state.data.filter(
      (current) => current.key !== key
    );
    this.setState((state) => ({ data: newData }));
  }

  add(deed) {
    this.state.data.push(deed);
    this.setState((state) => ({})); /* почему возвращает пустой объект???  Мы добавляем новое дело в массив из свойства data
    объекта состояния и изменяем состояние, не меняя значений его свойств)
    */
  }

  showMenu(evt) {
    evt.preventDefault();
    this.setState((state) => ({ showMenu: !state.showMenu }));
  }

  getDeed(key) {
    return this.state.data.find((current) => current.key === key);
  }

  async authStateChanged(user) {
    this.setState((state) => ({ currentUser: user }));
    if (user) {
      const newData = await getList(user);
      this.setState((state) => ({ data: newData }));
    } else
      this.setState((state) => ({ data: [] }));
  }

  componentDidMount() {
    onAuthStateChanged(getAuth(firebaseApp), this.authStateChanged);
  }

  render() {
          /* HashRouter - маршрутизатор - отслеживает изм-е интернет-адреса
      Routes - коммутатор - хранит список маршрутов
      Route - создаёт отдельный маршрут, связывает его с компонетом
      */
    return (
      <div className='has-background-primary-light'>
      <HashRouter>
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={({ isActive }) =>
                'navbar-item is-uppercase' +
                  (isActive ? ' is-active' : '')
              }
            >
              {this.state.currentUser ?
                    this.state.currentUser.email :
                    'Todos'
              }
            </NavLink>
            <a href="/"
               className={this.state.showMenu ?
                          'navbar-burger is-active' :
                          'navbar-burger'}
               onClick={this.showMenu}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={this.state.showMenu ?
                          'navbar-menu is-active' :
                          'navbar-menu'}
               onClick={this.showMenu}>
            <div className="navbar-start">
              {this.state.currentUser &&
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' is-active' : '')
                  }
                >
                  Создать дело
                </NavLink>
              }
              {!this.state.currentUser && (
                <NavLink to="/login"
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' is-active' : '')
                  }
                >
                  Войти
                </NavLink>
              )}
              {!this.state.currentUser && (
                <NavLink to="/register"
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' is-active' : '')
                  }
                >
                  Зарегистрироваться
                </NavLink>
              )}
            </div>
            {this.state.currentUser && (
              <div className="navbar-end">
                <NavLink to="/logout"
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' is-active' : '')
                  }
                >
                  Выйти
                </NavLink>
              </div>
            )}
          </div>
        </nav>
        
        <main className="content px-6 mt-6">
          <Routes>
            <Route path="/" element={
              <TodoList list={this.state.data}
                        setDone={this.setDone}
                        delete={this.delete}
                        currentUser={this.state.currentUser} />
            } />
            <Route path="/add" element={ //в пропе element записывается целевой компонент
              <TodoAdd add={this.add}
                       currentUser={this.state.currentUser} />
            } />
            <Route path="/:key" element={
              <TodoDetail getDeed={this.getDeed}
                          currentUser={this.state.currentUser} />
            } />
            <Route path="/register" element={
              <Register currentUser={this.state.currentUser} />
            } />
            <Route path="/logout" element={
              <Logout currentUser={this.state.currentUser} />
            } />
            <Route path="/login" element={
              <Login currentUser={this.state.currentUser} />
            } />
          </Routes>
        </main>
      </HashRouter>
      </div>
    );
  }
}
