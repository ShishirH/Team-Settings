import {Styles} from "@/app/types/types";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
}

const styles: Styles = {
    pageBtn: {
        padding: '12px',
        height: '40px',
        width: '40px',
        borderRadius: '8px'
    }
}

const Button: React.FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button style={styles.pageBtn} {...props}>
            {children}
        </button>
    )
}

export default Button;