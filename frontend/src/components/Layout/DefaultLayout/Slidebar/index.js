import classNames from 'classnames/bind';
import styles from './Slidebar.module.scss';

const cx = classNames.bind(styles);

function Sliderbar() {
    return (
        <aside className={cx('wrapper')}>
            <h2>Sliderbar</h2>
        </aside>
    );
}

export default Sliderbar;
