// 동적인 '리스트'를 렌더링하는 경우, 클래스형 컴포넌트를 사용하는 것이 컴포넌트 성능 최적화를 하기에 유리하다.
import { Component } from 'react';
import TodoItem from './TodoItem';

// todos: todo 객체들이 들어있는 배열
// onToggle : 체크박스를 on/off 하는 함수
// onRemove : todo 객체를 삭제하는 함수
class TodoItemList extends Component{
    render() {
        const {todos, onToggle, onRemove} = this.props;

        return(
            <div>
                <div>
                    <TodoItem content="TodoItem1"/>
                    <TodoItem content="TodoItem2"/>
                    <TodoItem content="TodoItem3"/>
                </div>
            </div>
        )
    }
}

export default TodoItemList;