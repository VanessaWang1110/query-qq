import { useState } from 'react';
import styles from './QueryQQ.module.scss';
import { QQInfo } from './type';
import axios from 'axios';
import { Spinning } from '../components/Spinning';
import { Toast } from '../components/Toast';
import debounce from 'lodash/debounce';

const QueryQQ = () => {
    const [qqInfo, setQQInfo] = useState<QQInfo | null>();
    const [spinning, setSpinning] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const queryQQRun = (qq: string) => {
        axios.get(`https://api.uomg.com/api/qq.info?qq=${qq}`)
            .then((response) => {
                if (!response.data.msg) {
                    setQQInfo(response.data)
                } else {
                    setQQInfo(null);
                    Toast(response.data.msg);
                }
                setSpinning(false);
            })
            .catch((error) => {
                setSpinning(false);
            });
    }

    const onChange = (value: string) => {
        if (value) {
            if (/^[1-9][0-9]{4,9}$/gim.test(value)) {
                setSpinning(true);
                setShowError(false);
                queryQQRun(value)
            } else {
                setQQInfo(null);
                setShowError(true);
            }
        } else {
            setShowError(false);
            setQQInfo(null);
        }
    }

    return <Spinning visible={spinning} >
        <div className={styles.wrapper}>
            <h1>QQ号查询</h1>
            <label>QQ</label>
            <input className={styles.input} data-testid="textInput" onChange={debounce(({ target: { value } }: { target: { value: string } }) => { onChange(value) }, 600)}></input>
            {showError && <div className={styles.error}>Please input correct format</div>}
            {qqInfo && <div className={styles.content}>
                <img className={styles.logo} src={qqInfo.qlogo} alt='logo' />
                <div className={styles.info}>
                    <span className={styles.name}>{qqInfo.name}</span>
                    <span className={styles.qq}>{qqInfo.qq}</span>
                </div>
            </div>}
        </div>
    </Spinning>

}

export default QueryQQ;