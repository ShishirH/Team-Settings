import React from "react";
import UserSocialInfo, {UserSocialInfoProps} from "@/components/UserSocialInfo";
import Image from "next/image";

import DeleteIcon from '../assets/icons/delete.svg'
import EditIcon from '../assets/icons/edit.svg'
import GreenDot from '../assets/icons/greendot.svg'
import RedDot from '../assets/icons/reddot.svg'
import {Styles, userDetails} from "@/app/types/types";
import {revisedRandId} from "@/app/utils";

type GridEntryProps = {
    userDetails: userDetails;
    setSelectedEntries: (val: number[]) => void;
    selectedEntries: number[];
    index: string;
    showModal: (b: boolean) => void;
    showEditModal: (b: boolean) => void;
}

const styles: Styles = {
    gridRoot: {
        paddingLeft: 'var(--base-padding-left)',
        paddingRight: 'var(--base-padding-right)',
        alignItems: 'center',
        borderBottom: '1px solid rgb(var(--border-header-color))',
        height: '80px'
    },
    statusActive: {
        background: '#ECFDF3',
        color: '#027A48',
        borderRadius: '9999px',
        width: 'fit-content',
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
    },
}

const GridEntry: React.FC<GridEntryProps> = ({userDetails, setSelectedEntries, selectedEntries, index, showModal, showEditModal}) => {
    let idStr = revisedRandId();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedEntries.includes(userDetails.id)) {
            setSelectedEntries(selectedEntries.filter((id) => id !== userDetails.id));
        } else {
            setSelectedEntries([...selectedEntries, userDetails.id]);
        }
    };

    return (
        <>
            <div className={"grid grid-cols-12 gap-1"} style={styles.gridRoot}>
                <div className={"col-span-3"} style={styles.checkBoxContainer}>
                    <div className="flex">
                        <input
                            type="checkbox"
                            id={idStr}
                            className="form-checkbox"
                            checked={selectedEntries.includes(userDetails.id)}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={idStr}></label>
                    </div>
                    <UserSocialInfo name={userDetails.name} userName={userDetails.userName}
                                    avatar={userDetails.avatar}/>
                </div>
                {userDetails.status ? (
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
                ) : (
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
                    {userDetails.role}
                </div>
                <div className={"col-span-2"} style={styles.infoText}>
                    {userDetails.email}
                </div>
                <div className={"flex col-span-3 ml-4 flex-wrap"}>
                    {userDetails.teams.map((team, index) => {
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
                                    +{userDetails.teams.length - 3}
                                </div>
                            )
                    })}
                </div>
                <div className={"flex col-span-1 justify-center gap-6"}>
                    <div className={'iconContainer'}
                         onClick={() => {
                             setSelectedEntries([userDetails.id]);
                             showModal(true)
                         }}
                    >
                        <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 4.99999H4.16667M4.16667 4.99999H17.5M4.16667 4.99999V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V4.99999H4.16667ZM6.66667 4.99999V3.33332C6.66667 2.8913 6.84226 2.46737 7.15482 2.15481C7.46738 1.84225 7.89131 1.66666 8.33333 1.66666H11.6667C12.1087 1.66666 12.5326 1.84225 12.8452 2.15481C13.1577 2.46737 13.3333 2.8913 13.3333 3.33332V4.99999M8.33333 9.16666V14.1667M11.6667 9.16666V14.1667" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className={'iconContainer'}
                         onClick={() => {
                             setSelectedEntries([userDetails.id]);
                             showEditModal(true)
                         }}
                    >
                        <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_695_29)">
                                <path
                                    d="M14.1666 2.49999C14.3855 2.28112 14.6453 2.1075 14.9313 1.98905C15.2173 1.8706 15.5238 1.80963 15.8333 1.80963C16.1428 1.80963 16.4493 1.8706 16.7353 1.98905C17.0213 2.1075 17.2811 2.28112 17.5 2.49999C17.7188 2.71886 17.8924 2.97869 18.0109 3.26466C18.1294 3.55063 18.1903 3.85713 18.1903 4.16665C18.1903 4.47618 18.1294 4.78268 18.0109 5.06865C17.8924 5.35461 17.7188 5.61445 17.5 5.83332L6.24996 17.0833L1.66663 18.3333L2.91663 13.75L14.1666 2.49999Z"
                                    stroke="#667085" strokeWidth="1.66667" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_695_29">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridEntry;