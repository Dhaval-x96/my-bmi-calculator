import { useRef, useState } from 'react';

export default function Bmi() {
    // const emailRef = useRef(); use ref in html element  -> <input id="email" type="text" ref={emailRef} />
    // const passwordRef = useRef();

    // 2. This approuch becomes complex as form element increase
    // const [inputEmail, setInputEmail] = useState('');
    // const [inputPassword, setInputPassword] = useState('');
    // const handleEmail = (event) => {
    //     setInputEmail(event.target.value);
    // }

    // const handlePassword = (event) => {
    //     setInputPassword(event.target.value);
    // }

    // 3.
    const [bmi, setBmi] = useState('');
    const [form, setForm] = useState({
        weight: '',
        height: '',
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Convert height to meters
        const heightMetaData = form.height.split(".");
        const heightInMeters = (heightMetaData[0] * 0.3048) + (heightMetaData[1] * 0.0254);
        const calculatedBmi = (form.weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(calculatedBmi);
    };

    const handleReload = (event) => {
        setBmi('');
        setForm({
            weight: '',
            height: '',
        })

    }

    // UI 
    return <form className="form-container" onSubmit={handleSubmit}>
        <div>
            <label className="form-label" htmlFor="weight">Weight (kg) :</label>
            <input className="form-input" type="text" id="weight" value={form.weight} onChange={handleChange} />
        </div>
        <div>
            <label className="form-label" htmlFor="height">Height(inch):</label>
            <input className="form-input" type="text" id="height" value={form.height} onChange={handleChange} />
        </div>

        <button className="form-button" type="submit">Submit</button>&nbsp;
        <button className="form-reload-button" type="button" disabled={!form.weight || !form.height} onClick={handleReload}>Reload</button>
        {bmi ? (
            <p>Your BMI is: {bmi}</p>
        ) : null}
    </form>
}