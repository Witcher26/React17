import logo from './logo.svg';
import './App.css';
import { Component } from 'react'
import { render } from '@testing-library/react';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';

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
    this.state = { data: initialData };
    this.setDone = this.setDone.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);

  }


  render() {
    return (
      <div>
        <nav className="navbar is-light">
          <div className='navbar-brand'>
            <span className='navbar-item is-uppercase'>
              Todos
            </span>
          </div>
        </nav>
        <main className='content px-6 mt-6'>
          <TodoList list={this.state.data} setDone={this.setDone} delete ={this.delete}/>
          <TodoAdd />
        </main>
      </div>
    );
  }

  setDone(key) {
    const deed = this.state.data.find(
      (curent) => curent.key === key
    );

    if (deed)
      deed.done = true;
    this.setState((state) => ({}))
  }

  delete(key) {
    const newData = this.state.data.filter(
      (curent) => curent.key !== key
    );
    this.setState((state) => ({data: newData}))
  }

  add(deed) {
    this.state.data.push(deed);
    this.setState( (state) => ({}));
  }
}

