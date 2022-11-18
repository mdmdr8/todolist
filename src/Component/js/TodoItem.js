import { Component } from 'react';
import '../css/TodoItem.css';

// TodoItem 컴포넌트는 체크 값이 활성화되어 있으면 
// 우측에 체크마크(✓ &#x2713;)를 보여주고 마우스가 위에 있을 때에는 좌측에 엑스마크(× &times;)를 보여준다.
// 이 컴포넌트의 영역이 클릭되면 체크박스가 활성화되며 중간줄이 그어지며 좌측의 엑스가 클릭되면 삭제된다.

// content: todo 내용
// isComplete : 체크박스 on/off 상태를 의미하며, 오늘 할 일의 완료 유무를 판단
// id : TodoItem 의 Key 값
// onToggle : 체크박스를 on/off 시키는 함수
// onRemove : TodoItem 을 삭제시키는 함수

class TodoItem extends Component{
    render() {
        const {content, isComplete, id, onToggle, onRemove} = this.props;

        return(
            <div className="todo-item" onClick={() => onToggle(id)}>
                {/* e.stopPropagation()을 실행해야 해당 dom의 부모의 클릭 이벤트에 연결되어 있는 onToggle이 실행되지 않는다. */}
                <div className='todo-item-remove' onClick={(e)=>{e.stopPropagation(); onRemove(id)}}>
                    &items;
                </div>
                <div className={`todo-item-content ${isComplete? 'isComplete':''}`}>
                    <div>
                        {content}
                    </div>
                </div>
                {
                    isComplete && (<div className='isComplete-mark'>✓</div>)
                }
            </div>
        )
    }
}

export default TodoItem;