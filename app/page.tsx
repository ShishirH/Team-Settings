'use client';
import Image from "next/image";
import React, {useState} from "react";

import GridEntry from "@/app/components/GridEntry";
import GridHeader from "@/app/components/GridHeader";
import {Styles} from "@/app/types/types";
import {userData} from "@/app/data/data";
import PaginationBar from "@/app/components/PaginationBar";

const NUMBER_OF_ITEMS_PER_PAGE = 10;

export default function Home() {

    const [currentPage, setCurrentPage] = useState(1);
    const styles: Styles = {
        gridRoot: {
            paddingTop: '1%',
            alignItems: 'center'
        },
    }

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
              numberOfPages={userData.length / NUMBER_OF_ITEMS_PER_PAGE}
              setCurrentPage={setCurrentPage}
          />

      </div>
    );
}
