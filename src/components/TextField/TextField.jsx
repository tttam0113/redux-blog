import React from 'react';

const TextField = props => {
    const { label, textarea = false, ...rest } = props;
    
    return (
        <div className="text-field text-field--fullwidth">
            <label className="text-field__label">{label}</label>
            {textarea ? (
                <textarea className="text-field__textarea" {...rest} />
            ) : (
                <input className="text-field__input"  type="text" {...rest} />
            )}
        </div>
    );
};

export default TextField;
