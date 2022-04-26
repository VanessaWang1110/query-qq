import styles from './Spinning.module.scss'

type SpinningProps = {
    visible: boolean;
    children: React.ReactNode;
}

const Spinning = (props: SpinningProps) => {
    const { visible, children } = props;
    return <div>
        {visible && <><div className={styles.mask} />
            <div className={styles.loading} /></>}
        {children}
    </div>

}

export default Spinning;