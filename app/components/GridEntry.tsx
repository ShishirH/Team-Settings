import React from "react";
import UserSocialInfo, {UserSocialInfoProps} from "@/app/components/UserSocialInfo";
import Image from "next/image";

import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import GreenDot from '../../assets/icons/greendot.svg'
import RedDot from '../../assets/icons/reddot.svg'
import {Styles, userDetails} from "@/app/types/types";

type GridEntryProps = {
    userSocialInfoProps: UserSocialInfoProps
}

const styles: Styles = {
    gridRoot: {
        paddingLeft: '2%',
        paddingRight: '1%',
        alignItems: 'center',
        borderBottom: '1px solid rgb(var(--border-header-color))',
        height: '80px'
    },
    statusActive: {
        background: '#ECFDF3',
        color: '#027A48',
        borderRadius: '9999px',
        width: '100px',
        padding: '2px 8px',
        gap: '5px'
    },
    statusInactive: {
        background: 'lightpink',
        color: 'deeppink',
        borderRadius: '9999px',
        width: 'fit-content',
        padding: '2px 8px',
        gap: '5px'
    },
    infoText: {
        color: 'rgb(var(--detail-font-color))',
        fontFamily: 'var(--default-font)',
        fontWeight: 'var(--regular-font-weight)',
        wordWrap: 'break-word'
    },
    checkBoxContainer: {
        display: 'inline-flex',
        alignItems: 'center'
    }
}

const GridEntry: React.FC<userDetails> = (props) => {
    return (
        <div className={"grid grid-cols-12 gap-1"} style={styles.gridRoot}>
            <div className={"col-span-3"} style={styles.checkBoxContainer}>
                <div className={""}>
                    <input type={"checkbox"}/>
                </div>
                <UserSocialInfo name={props.name} userName={props.userName} avatar={props.avatar}/>
            </div>
            {props.status ? (
                <div className={'flex justify-center col-span-1'} style={styles.statusActive}>
                    <Image
                        src={GreenDot}
                        alt={'active'}
                        style={styles.icon}
                        width={8}
                        height={8}
                    />
                    <p> Active </p>
                </div>
            ): (
                <div className={'flex justify-center col-span-1'} style={styles.statusInactive}>
                    <Image
                        src={RedDot}
                        alt={'inactive'}
                        style={styles.icon}
                        width={8}
                        height={8}
                    />
                    <p> Inactive </p>
                </div>
            )}
            <div className={"col-span-2 p-10p p-5p"} style={styles.infoText}>
                {props.role}
            </div>
            <div className={"col-span-2"} style={styles.infoText}>
                {props.email}
            </div>
            <div className={"flex col-span-3 ml-4 flex-wrap"}>
                {props.teams.map((team, index) => {
                    if (index < 3)
                        return (
                            <div key={index} style={{
                                color: `rgb(var(--text-color-${team}))`,
                                background: `rgb(var(--background-role-${team}))`,
                                padding: '2px 8px',
                                borderRadius: '16px',
                                textTransform: 'capitalize',
                                marginRight: '5px'
                            }}>
                                {team}
                            </div>
                        )
                    else if (index == 4)
                        return (
                            <div key={index} style={{
                                color: `rgb(52, 64, 84)`,
                                background: `rgb(242, 244, 247)`,
                                padding: '2px 8px',
                                borderRadius: '16px',
                                textTransform: 'capitalize'
                            }}>
                                +{props.teams.length - 3}
                            </div>
                        )
                })}
            </div>
            <div className={"flex col-span-1 justify-center gap-6"}>
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