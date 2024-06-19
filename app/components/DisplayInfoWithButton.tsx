import {Styles} from "@/app/types/types";
import Button from "@/app/components/Button";

type DisplayInfoProps = {
    title: string;
    displayText: string;
    btnText: string;
    btnOnClick: () => void;
}

const DisplayInfoWithButton: React.FC<DisplayInfoProps> = ({title, displayText, btnText, btnOnClick}) => {

    const styles: Styles = {
        root: {
            width: '100%',
            height: '80px',
            background: 'rgb(var(--background-color))',
            paddingLeft: 'var(--base-padding-left)',
            paddingRight: 'var(--base-padding-left)',
        },
        title: {
            fontFamily: 'var(--default-font)',
            fontWeight: 'var(--bold-font-weight)',
            fontSize: '24px',
            color: 'rgba(16, 24, 40, 1)'
        },
        displayText: {
            background: 'rgba(249, 245, 255, 1)',
            color: 'rgba(127, 86, 217, 1)',
            padding: '2px 8px',
            borderRadius: '16px',
            height: '100%',
            textAlign: 'center',
            verticalAlign: 'center'
        },
        btn: {
            borderRadius: '8px',
            height: '40px',
            padding: '10px 16px',
            background: 'rgba(166, 138, 229, 1)',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            color: '#FFF'
        }
    }

    return (
        <div className={"grid grid-cols-12 gap-1 items-center"} style={styles.root}>
            <div className={"inline-flex col-span-10 gap-2"} style={{height: '30px'}}>
                <p style={styles.title}>
                    { title }
                </p>

                <p className={"inline-flex items-center justify-center"} style={styles.displayText}>
                    { displayText }
                </p>
            </div>

            <div className={"col-span-2 justify-self-end"}>
                <Button onClick={() => btnOnClick()} style={styles.btn}>
                    { btnText }
                </Button>
            </div>
        </div>
    )
}

export default DisplayInfoWithButton;