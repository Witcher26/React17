import './App.css';
import { Component } from 'react'
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import TodoDetail from './TodoDetail';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';

const date1 = new Date(2021, 7, 19, 14, 5);
const date2 = new Date(2021, 7, 19, 15, 23);

const initialData = [
  {
    title: "Изучить Реакт",
    desc: "Да поскорее!",
    image: '',
    done: true,
    createAt: date1.toLocaleString(),
    key: date1.getTime()
  },

  {
    title: "Написать первое приложение Реакт",
    desc: "Список запланированных дел",
    image: '',
    done: false,
    createAt: date2.toLocaleString(),
    key: date2.getTime()
  }

];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: initialData, showMenu: false, };
    this.setDone = this.setDone.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this)

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
              Todos
            </NavLink>
            <a href='/'
              className={this.state.showMenu ?
                'navbar-burger is-active' : 'navbar-burger'}
              onclick={this.showMenu}>

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
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  'navbar-item' + (isActive ? ' is-active' : '')
                }>

                Создать дело
              </NavLink>
            </div>
          </div>
        </nav>
        <main className='content px-6 mt-6'>

          <Routes>
            <Route path="/" element={
              <TodoList list={this.state.data}
                setDone={this.setDone}
                delete={this.delete} />
            } />

            <Route path="/add" element={
              <TodoAdd add={this.add} />
            } />
            <Route path="/key" element={
              <TodoDetail getDeed={this.getDeed} /> //в пропе element записывается целевой компонент
            } />
          </Routes>
        </main>
      </HashRouter>
    );
  }


  setDone(key) {
    const deed = this.state.data.find((curent) => curent.key === key);

    if (deed)
      deed.done = true;
    this.setState((state) => ({}))
  }

  delete(key) {
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
    key = +key; //преобразование индентификатора в число
    return this.state.data.find((item) => item.key === key);
  }
}