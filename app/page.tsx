import Image from "next/image";
import React from "react";
import UserSocialInfo, {UserSocialInfoProps} from "@/app/components/UserSocialInfo";
import {firstNamesArr, lastNamesArr} from "@/app/constants";

import userSocial0 from '../assets/images/userSocial0.png';
import userSocial1 from '../assets/images/userSocial1.png';
import userSocial2 from '../assets/images/userSocial2.png';
import userSocial3 from '../assets/images/userSocial3.png';
import userSocial4 from '../assets/images/userSocial4.png';
import GridEntry from "@/app/components/GridEntry";
import userSocialInfo from "@/app/components/UserSocialInfo";
import GridHeader from "@/app/components/GridHeader";

export default function Home() {

    const styles: Styles = {
        gridRoot: {
            paddingTop: '1%',
            alignItems: 'center'
        },
    }

    const images = [userSocial0, userSocial1, userSocial2, userSocial3, userSocial4];

    return (
      <div style={styles.gridRoot}>
          <GridHeader />
          {Array.from({length: 10}).map((_, index) => {
              let randomNumber = Math.floor((Math.random() * firstNamesArr.length));
              let randomImage = Math.floor((Math.random() * 5))

              let userSocialProps: UserSocialInfoProps = {
                  name: `${firstNamesArr[randomNumber]} ${lastNamesArr[randomNumber]}`,
                  handle: `@${firstNamesArr[randomNumber]}`,
                  imageURL: images[randomImage]
              }

              return <GridEntry userSocialInfoProps={userSocialProps}
                  key={index}
              />
          })}
      </div>
    );
}
