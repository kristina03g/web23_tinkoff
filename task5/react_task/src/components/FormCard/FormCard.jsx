import React from "react";
import './FormCard.css';

function FormCard(props) {
    return (
        <div className="form-card">
            <p className="form-card-title">{props.header}</p>
            {props.type !== "textarea" ?
                <input className="form-card-input" placeholder={props.placeholder} defaultValue={props.value} onChange={(e) => {props.setValue(e.target.value)}} />
                :
                <textarea className="form-card-input" cols="40" rows="7" placeholder={props.placeholder} defaultValue={props.value} onChange={(e) => {props.setValue(e.target.value)}}/>
            }
        </div>
    );
}

export default FormCard;