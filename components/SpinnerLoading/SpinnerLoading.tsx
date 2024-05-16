import styles from './SpinnerLoading.module.css'

interface Props {
    width?: number
    height?: number
}

const SpinnerLoading = ({ width, height }: Props) => {
    return (
        <main className={styles.container}>
            <span className={styles.loading} style={{ width: width, height: height }} />
        </main>
    )
}

export default SpinnerLoading
