import React from 'react';

const TextField = ({label, value, onChange }) => (
    <div className="text-field text-field--fullwidth">
        <label className="text-field__label">{label}</label>
        <input
            type="text"
            className="text-field__input"
            placeholder=""
            value={value}
            onChange={onChange}
        />
    </div>
);

export default TextField;