import { Component } from 'react';
import TodoListTemplate from './Component/js/TodoListTemplate';
import Form from './Component/js/Form';
import TodoItemList from './Component/js/TodoItemList';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // input: "", useState사용으로 인해 제거
      todos: [
      ]
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleInitInfo = this.handleInitInfo.bind(this);
  }

  componentDidMount() {
    this.handleInitInfo()
  }

  handleInitInfo() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(todos => this.setState({ todos: todos }))
      .catch(err => console.log(err))
  }


  // handleChange(event) {
  //   this.setState({
  //     input: event.target.value
  //   });
  // }

  // concat가 push같은 역할을 한다.
  // 리액트 state에서 배열을 다룰 경우 절대로 push 함수를 사용하면 안된다.
  // push를 통해 데이터를 추가하면 배열에 값이 추가되지만 가리키고 있는 배열은 똑같기때문에 비교할 수 없게 된다.
  // 나중에 최적화 시 배열을 비교하여 리렌더링을 방지하게 되는데 push를 사용하면 최적화를 할 수 없다. 
  handleCreate(inputValue) {
    const { todos } = this.state;
    if (inputValue === "") {
      alert("오늘 할 일을 입력해주세요!");
      return;
    }
    // 화면에서 먼저 변경사항을 보여주는 방법으로 이용
    this.setState({
      // input: "",
      // concat을 사용하여 배열에 추가
      todos: todos.concat({
        id: 0,
        content: inputValue,
        isComplete: false
      })
    });
    //처리
    const data = {
      body: JSON.stringify({ "content": inputValue }),
      headers: { 'Content-Type': 'application/json' },
      method: 'post'
    }
    fetch("/api/todos", data)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitInfo();
        }
      })
      .catch(err => console.log(err));
  }

  // handleKeyPress(event) {
  //   if (event.key === "Enter") {
  //     this.handleCreate();
  //   }
  // }

  handleToggle(id) {
    const { todos } = this.state;

    const isComplete = todos.find(todo => todo.id === id).isComplete;
    if (!window.confirm(isComplete ? "미완료 처리 하시겠습니까?" : "완료 처리 하시겠습니까?")) {
      return;
    }
    // 파라미터로 받은 id를 가지고 몇 번쨰 아이템인지 찾는다.
    const index = todos.findIndex(todo => todo.id === id);
    // 선택한 객체를 저장한다.
    const selected = todos[index];
    // 배열을 복사한다.
    const nextTodos = [...todos];
    // 기존의 값을 복사하고 isComplete값을 덮어쓴다.
    nextTodos[index] = {
      ...selected,
      isComplete: !selected.isComplete
    }
    this.setState({
      todos: nextTodos
    });

    const data = {
      headers: { 'Content-Type': 'application/json' },
      method: 'put'
    }
    fetch("/api/todos/" + id, data)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.satus);
        } else {
          return this.handleInitInfo();
        }
      })
      .catch(err => console.log(err));
  }

  //삭제
  handleRemove(id) {
    const { todos } = this.state;

    const removeContent = todos.find(todo => todo.id === id).content;
    if (!window.confirm("'" + removeContent + "'을 삭제하시겠습니까?")) {
      return;
    }

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });

    const data = {
      headers: { 'Content-Type': 'application/json' },
      method: 'delete'
    }
    tetch("/api/todos/" + id, data)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return this.handleInitInfo();
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <TodoListTemplate form={(
        <Form
          // value={this.state.input}
          // onChange={this.handleChange}
          onCreate={this.handleCreate}
        // onKeyPress={this.handleKeyPress}
        />)}>
        <TodoItemList
          todos={this.state.todos}
          onToggle={this.handleToggle}
          onRemove={this.handleRemove} />
      </TodoListTemplate>
    );
  }
}

export default App;
