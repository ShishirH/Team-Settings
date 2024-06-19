'use client';
import Image from "next/image";
import React, {useEffect, useState} from "react";

import GridEntry from "@/app/components/GridEntry";
import GridHeader from "@/app/components/GridHeader";
import {Styles, userDetails} from "@/app/types/types";
import PaginationBar from "@/app/components/PaginationBar";
import {prepareData} from "@/app/data/data";
import DisplayInfoWithButton from "@/app/components/DisplayInfoWithButton";

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
    const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

    let endIndex = currentPage * NUMBER_OF_ITEMS_PER_PAGE;
    let startIndex = (currentPage - 1) * NUMBER_OF_ITEMS_PER_PAGE;

    const deleteSelected = () => {
        let arr = userData;

        arr = arr.filter((val, index) => !selectedEntries.includes('' + index))
        setUserData(arr);
        uncheckAllCheckboxes();
    }

    const handleSelectedEntries = (str: string, remove?: boolean) => {
        let arr: string[] = [];
        if (str === 'ALL') {
            setSelectedEntries([]);

            if (remove)
                return;

            for (let i = startIndex; i < endIndex; i++) {
                arr.push('' + i);
            }
            setSelectedEntries(arr);
        } else {
            // Validate before pushing
            arr = selectedEntries;

            if (remove) {
                arr = arr.filter((item) => item !== str)
            } else {
                arr = [...arr, str];
            }

            setSelectedEntries(arr)
        }
    }

    useEffect(() => {
        prepareData().then((data) => {
            setUserData([...data, ...data]);
        })
    }, []);

    function uncheckAllCheckboxes() {
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('.form-checkbox');
        checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = false;
        });
    }

    useEffect(() => {
        setSelectedEntries([]);
        uncheckAllCheckboxes();
    }, [currentPage]);

    return (
      <div style={styles.gridRoot}>
          <DisplayInfoWithButton title={'Team members'} displayText={userData.length + ' members'} btnText={'Delete Selected'} btnOnClick={deleteSelected} />
          <GridHeader setSelectedEntries={handleSelectedEntries} selectedEntries={selectedEntries}/>
          {userData.slice(startIndex, endIndex).map((userDetail, index) => {
              return <GridEntry
                  key={index}
                  userDetails={userDetail}
                  index={'' + index}
                  selectedEntries={selectedEntries}
                  setSelectedEntries={handleSelectedEntries}
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
