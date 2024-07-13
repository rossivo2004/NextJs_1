import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Button.scss'

import './Button.scss';

const cx = classNames.bind(styles);

function Button({ to, href, primary = false, outline = false, disabled = false, children, className, onClick, small = false, large = false, ...passProps }) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps
    }

    if (disabled) {
        delete props.onClick;
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', { [className]: className, primary, outline, disabled, small, large })

    return (<Comp className={classes} {...props}>
        <span className={cx('title')}>{children}</span>
    </Comp>);
}

export default Button;