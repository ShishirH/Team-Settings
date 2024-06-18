import React from "react";
import Image, {StaticImageData} from "next/image";
import {Styles} from "@/app/types/types";

export type UserSocialInfoProps = {
    name: string;
    userName: string;
    avatar: string;
}

let styles: Styles = {
    userSocialContainer: {
        background: 'rgb(var(--foreground-rgb), #FFF)',
        width: '24%',
        display: 'flex',
        height: 'fit-content',
        padding: '20px',
        gap: '10px',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'var(--default-font)',
        fontWeight: 'var(--bold-font-weight)',
        textWrap: 'nowrap'
    },
    handle: {
        color: 'rgb(var(--detail-font-color))',
        fontFamily: 'var(--default-font)',
        fontWeight: 'var(--regular-font-weight)'
    },
    profilePicture: {
        height: '40px',
        width: '40px',
        borderRadius: '999999px',

    },
    userTextContainer: {
        display: 'flex',
        height: 'fit-content',
        width: 'fit-content',
        flexDirection: 'column',
    }
}

const UserSocialInfo: React.FC<UserSocialInfoProps> = ( { name, userName, avatar }) => {
    return (
        <div style={styles.userSocialContainer}>
            <Image
                alt={'profilePicture'}
                src={avatar}
                style={styles.profilePicture}
                width={40}
                height={40}
            />
            <div style={styles.userTextContainer}>
                <p style={styles.name}> {name} </p>
                <p style={styles.handle}> {'@' + userName} </p>
            </div>
        </div>
    )
}

export default UserSocialInfo;