import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Navbar from '../components/Navbar';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    document.title = children.props.title;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-fluid')}>
                {/* <Header link={children.props.link} title={children.props.title} /> */}
                <div className={cx('content')}>{children}</div>
                <Navbar link={children.props.link} title={children.props.title} />
            </div>
        </div>
    );
}

export default DefaultLayout;
