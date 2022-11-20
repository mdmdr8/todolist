// 동적인 '리스트'를 렌더링하는 경우, 클래스형 컴포넌트를 사용하는 것이 컴포넌트 성능 최적화를 하기에 유리하다.
import { Component } from 'react';
import TodoItem from './TodoItem';

// todos: todo 객체들이 들어있는 배열
// onToggle : 체크박스를 on/off 하는 함수
// onRemove : todo 객체를 삭제하는 함수
// shouldComponentUpdate메서드를 따로 구현하지 않으면 언제나 true를 반환하기 때문에 
// 이를 구현하는 경우에는 업데이트에 영향을 끼치는 조건을 return해주면 된다.
class TodoItemList extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const { todos, onToggle, onRemove } = this.props;
        console.log(todos);

        const todoList = todos.map(
            ({ id, content, isComplete }) => (
                <TodoItem
                    id={id}
                    content={content}
                    isComplete={isComplete}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id} />
            )
        );
        // 배열 렌더링시 key값이 있어야한다. 없는 경우에 map함수의 두 번째 파라미터인 index를 사용하면된다.
        // 없는 경우에 map함수의 두 번째 파라미터인 index를 사용하면 되지만 권장하지 않는다
        // key값이 있어야만 컴포넌트가 리렌더링 될 때 더욱 효율적으로 작동할 수 있다.
        return (
            <div>
                {todoList}
            </div>
        )
    }
}

export default TodoItemList;