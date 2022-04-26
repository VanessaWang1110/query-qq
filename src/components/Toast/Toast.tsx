import styles from './Toast.module.scss';

const Toast = (msg: string) => {
    let toast = document.getElementById('toast');
    if (!document.getElementById('toast')) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.innerHTML = `<span class=${styles.errorIcon}>X</span><span>${msg}</span>`;
        toast.style.padding = '16px 24px';
        toast.style.width = '300px';
        toast.style.height = 'auto';
        toast.style.left = '50%';
        toast.style.position = 'fixed';
        toast.style.transform = 'translateX(-150px)';
        toast.style.background = '#fff';
        toast.style.borderRadius = '2px';
        toast.style.boxShadow = '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d';
        document.getElementById('root')?.append(toast)
    } else {
        if (toast) {
            toast.innerHTML = `Error: ${msg}`;
        }
    }
    setTimeout(() => {
        if (toast) {
            document.getElementById('root')?.removeChild(toast)
        }
    }, 3000)
}

export default Toast;