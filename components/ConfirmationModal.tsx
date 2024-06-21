import React, {useState} from "react";
import {Styles} from "@/app/types/types";
import Button from "@/components/Button";
import Image from "next/image";

import ConfirmationCheck from '../assets/icons/confirmationCheck.svg';

const styles: Styles = {
    root: {
        width: '400px',
        height: 'fit-content',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        background: 'rgb(var(--background-color))',
        zIndex: 1,
        position: "absolute",
        top: '40%',
        left: '40%',
        borderRadius: '12px',
        boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08)',

},
    title: {
        fontFamily: 'var(--default-font)',
        fontWeight: 'var(--bold-font-weight)',
        fontSize: '20px',
        textAlign: 'left',
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
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        width: '170px',
        gap: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

type ConfirmationModalProps = {
    title: string;
    confirmationTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
    children?: React.ReactNode;
    alternativeTitle?: string;
    showAlternateTitle?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
    const [wasConfirmed, setWasConfirmed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    if (isVisible) {
        if (!wasConfirmed) {
            return (
                <div style={styles.root}>
                    <div style={styles.title}>
                        { (props.showAlternateTitle) ? props.alternativeTitle : props.title }
                    </div>

                    { props.children }

                    <div className={"inline-flex gap-3 pt-8"}>
                        <Button
                            onClick={() => props.onCancel()}
                            className={"regularButton"}
                            style={styles.btn}
                        >
                            { 'Cancel' }
                        </Button>

                        <Button
                            className={"confirmButton"}
                            onClick={() => {
                            props.onConfirm()
                            setWasConfirmed(true);
                        }}
                            style={styles.btn}
                        >
                            { 'Confirm' }
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={styles.root}>
                    <Image
                        src={ConfirmationCheck}
                        alt={"confirmed"}
                        height={48}
                        width={48}
                        style={{
                            paddingBottom: '10px'
                        }}
                    />

                    <div style={styles.title}>
                        {props.confirmationTitle}
                    </div>
                </div>
            )
        }
    }
}

export default ConfirmationModal;