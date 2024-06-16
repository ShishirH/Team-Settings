'use client';
import Image from "next/image";
import React, {useEffect, useState} from "react";

import GridEntry from "@/app/components/GridEntry";
import GridHeader from "@/app/components/GridHeader";
import {Styles, userDetails} from "@/app/types/types";
import PaginationBar from "@/app/components/PaginationBar";
import {prepareData} from "@/app/data/data";

const NUMBER_OF_ITEMS_PER_PAGE = 10;

export default function Home() {
    const styles: Styles = {
        gridRoot: {
            paddingTop: '1%',
            alignItems: 'center'
        },
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userData, setUserData] = useState<userDetails[]>([]);

    useEffect(() => {
        prepareData().then((data) => {
            setUserData(data);
        })
    }, []);

    let endIndex = currentPage * NUMBER_OF_ITEMS_PER_PAGE;
    let startIndex = (currentPage - 1) * NUMBER_OF_ITEMS_PER_PAGE;

    return (
      <div style={styles.gridRoot}>
          <GridHeader />
          {userData.slice(startIndex, endIndex).map((userDetail, index) => {
              return <GridEntry
                  key={index}
                  {...userDetail}
              />
          })}

          <PaginationBar
              currentPage={currentPage}
              maxNumberOfPagesToDisplay={6}
              numberOfPages={userData.length / NUMBER_OF_ITEMS_PER_PAGE}
              setCurrentPage={setCurrentPage}
          />
      </div>
    );
}
