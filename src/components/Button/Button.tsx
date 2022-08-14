import React from "react";
import "./Button.scss";

export interface ButtonProps {
    label: string;
}

const Button = (props: ButtonProps) => {
    return (
        <button style={{ border: "none", padding: "10px 20px", backgroundColor: "lightblue" }}>{props.label}</button>
    );
};

export default Button;
