import React, { isValidElement, useState } from 'react';
import '../css/Form.css';


// const Form = ({value, onChange,onCreate, onKeyPress}) =>{
const Form = ({ onCreate }) => {
    // React Hook>클래스 타입에서는 사용 안함
    const [input, setInput] = useState('');

    // input값 변경
    const handleChange = (event) => {
        setInput(event.target.value);
    }

    // Enter key event
    const handleKeyPress = (event) => {
        if (isValidElement.key === 'Enter') {
            onCreate(input);
            setInput('');
        }
    }
    return (
        <div className='form'>
            <input
                value={input}
                placeholder="오늘 할 일을 입력하세요"
                onChange={handleChange}
                onKeyPress={handleKeyPress} />
            <div className='create-button' onClick={() => {
                onCreate(input);
                setInput('');
            }}>
                추가
            </div>
        </div>
    );

}

export default Form;