import React from "react";
import Image from "next/image";

import ArrowDownIcon from '../../assets/icons/arrowDown.svg'
import HelpIcon from '../../assets/icons/help.svg'

const styles: Styles = {
    gridRoot: {
        paddingLeft: '2%',
        paddingRight: '2%',
        alignItems: 'center',
        background: 'rgb(var(--background-header))',
        borderBottom: '1px solid rgb(var(--border-header-color))',
        height: '44px',
        width: '100%'
    },
    statusActive: {
        background: '#ECFDF3',
        color: '#027A48',
        borderRadius: '9999px',
        width: 'fit-content',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    infoText: {
        color: 'rgb(var(--detail-font-color))',
        fontFamily: 'var(--default-font)',
        fontWeight: 'var(--regular-font-weight)'
    },
    headerText: {
        fontSize: 'var(--font-size-header)',
        color: 'rgb(var(--detail-font-color))',
        fontWeight: 'var(--bold-font-weight)',
        lineHeight: '18px',
        textAlign: 'left',
    }
}

const GridHeader: React.FC = () => {
    return (
        <div className={"grid grid-cols-12 gap-1"} style={styles.gridRoot}>
            <div>
                <input type={"checkbox"}/>
            </div>
            <div className={"col-span-3"} style={styles.headerText}>
                Name
            </div>
            <div className={'flex justify-center'} style={styles.headerText}>
                <p> Status </p>
                <Image
                    src={ArrowDownIcon}
                    alt={'status'}
                    style={styles.icon}
                    width={9}
                    height={9}
                />
            </div>
            <div className={'flex justify-center col-span-2'} style={styles.headerText}>
                <p> Role </p>
                <Image
                    src={HelpIcon}
                    alt={'helpIcon'}
                    style={styles.icon}
                    width={9}
                    height={9}
                />
            </div>
            <div className={"col-span-2"} style={styles.headerText}>
                Email address
            </div>
            <div className={"col-span-3"} style={styles.headerText}>
                Teams
            </div>
        </div>
    )
}

export default GridHeader;