import './App.css';
import { Component } from 'react'
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import TodoDetail from './TodoDetail';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Register from './Register';
import firebaseApp from './firebase';
import Logout from './Logout';
import Login from './Login';
import { getList, setDone, del } from './api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], 
      showMenu: false, 
      currentUser: undefined };
    this.setDone = this.setDone.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this)
    this.authStateChanged = this.authStateChanged.bind(this);

  }

  componentDidMount() {
    onAuthStateChanged(getAuth(firebaseApp), this.authStateChanged);
  }

  async authStateChanged(user) {
    this.setState((state) => ({ currentUser: user }));
    if(user) {
      const newData = await getList(user);
      this.setState.apply((state) => ({data: newData}));
    } else
      this.setState((state) => ({data:[]}));
  }

  showMenu(evt) {
    evt.preventDefault(); //сбрасываем настройки
    this.setState((state) => ({ showMenu: !this.state.showMenu }))
  }


  render() {
    return (
      /* HashRouter - маршрутизатор - отслеживает изм-е интернет-адреса
      Routes - коммутатор - хранит список маршрутов
      Route - создаёт отдельный маршрут, связывает его с компонетом
      */

      <HashRouter>
        <nav className="navbar is-dark">
          <div className='navbar-brand'>
            <NavLink
              to="/"
              className={({ isActive }) =>
                'navbar-item is-uppercase' +
                (isActive ? ' is-active' : '')
              }>
              {this.state.currentUser ? this.state.currentUser.email : "Todos"}
            </NavLink>
            <a href='/'
              className={this.state.showMenu ?
                'navbar-burger is-active' : 'navbar-burger'}
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
            <div className='navbar-start'>
              {this.state.currentUser && (
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    'navbar-item' + (isActive ? ' is-active' : '')
                  }>

                  Создать дело
                </NavLink>
              )}

              {this.state.currentUser && (
                <NavLink to="/login" className={({ isActive }) =>
                  'navbar-item' + (isActive ? 'is-active' : '')}>
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
              <div className='navbar-end'>
                <NavLink to="/logout" className={({ isActive }) =>
                  'navbar-item' + (isActive ? 'is-active' : '')}>
                  Выйти
                </NavLink>
              </div>
            )}
          </div>
        </nav>
        <main className='content px-6 mt-6'>

          <Routes>
            <Route path="/" element={
              <TodoList list={this.state.data} ff
                setDone={this.setDone}
                delete={this.delete} 
                currentUser={this.currentUser}/>
            } />

            <Route path="/add" element={
              <TodoAdd add={this.add}
                            currentUser ={this.state.currentUser} />
            } />
            <Route path="/:key" element={
              <TodoDetail getDeed={this.getDeed} 
              currentUser = {this.currentUser}/> //в пропе element записывается целевой компонент
            } />
            <Route path="/register" element={
              <Register currentUser={this.state.currentUser} />
            } />
            <Route path="/login" element={<Login currentUser={this.state.currentUser} />} />
            <Route path="/logout" element={<Logout currentUser={this.state.currentUser} />} />
          </Routes>
        </main>
      </HashRouter>
    );
  }


  async setDone(key) {
    await setDone(this.state.currentUser, key);
    const deed = this.state.data.find((curent) => curent.key === key);

    if (deed)
      deed.done = true;
    this.setState((state) => ({}))
  }

  async delete(key) {
    await del (this.state.currentUser, key);
    const newData = this.state.data.filter((curent) => curent.key !== key);
    this.setState((state) => ({ data: newData }))
  }

  add(deed) {
    this.state.data.push(deed);
    this.setState((state) => ({}));/* почему возвращает пустой объект???  Мы добавляем новое дело в массив из свойства data
                                     объекта состояния и изменяем состояние, не меняя значений его свойств)
                                     */

  }
  getDeed(key) {
    // key = +key; //преобразование индентификатора в число
    return this.state.data.find((item) => item.key === key);
  }
}