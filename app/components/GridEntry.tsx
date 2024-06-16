import React from "react";
import UserSocialInfo, {UserSocialInfoProps} from "@/app/components/UserSocialInfo";
import Image from "next/image";

import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import GreenDot from '../../assets/icons/greendot.svg'

type GridEntryProps = {
    userSocialInfoProps: UserSocialInfoProps
}

const styles: Styles = {
    gridRoot: {
        paddingLeft: '2%',
        paddingRight: '2%',
        alignItems: 'center'
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
    }
}

const GridEntry: React.FC<GridEntryProps> = (props) => {
    return (
        <div className={"grid grid-cols-12 gap-1"} style={styles.gridRoot}>
            <div>
                <input type={"checkbox"}/>
            </div>
            <div className={"col-span-3"}>
                <UserSocialInfo name={props.userSocialInfoProps.name} handle={props.userSocialInfoProps.handle} imageURL={props.userSocialInfoProps.imageURL} />
            </div>
            <div className={'flex justify-center'} style={styles.statusActive}>
                <Image
                    src={GreenDot}
                    alt={'active'}
                    style={styles.icon}
                    width={8}
                    height={8}
                />
                <p> Active </p>
            </div>
            <div className={"col-span-2"} style={styles.infoText}>
                Product Designer
            </div>
            <div className={"col-span-2"} style={styles.infoText}>
                olivia@untitledui.com
            </div>
            <div className={"col-span-2"}>
                Design Product Marketing
            </div>
            <div className={"flex"}>
                <Image
                    src={DeleteIcon}
                    alt={'delete'}
                    style={styles.icon}
                    width={20}
                    height={20}
                />
                <Image
                    src={EditIcon}
                    alt={'edit'}
                    style={styles.icon}
                    width={20}
                    height={20}
                />
            </div>
        </div>
    )
}

export default GridEntry;