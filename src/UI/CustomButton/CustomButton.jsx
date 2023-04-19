import styles from './CustomButton.module.scss';

export default function CustomButton(props) {
    const fullStyle = {
        width: props.width,
        height: props.height,
        background: props.color,
        border: props.border ? props.border : '1px solid gray',
    };
    return (
        <button
            disabled={props.disabled}
            onClick={() => props.onClick()}
            style={fullStyle}
            className={styles.btn}
        >
            {props.text}
        </button>
    );
}
