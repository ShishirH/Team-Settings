'use client';
import React from "react";
import {Styles} from "@/app/types/types";
import Image from "next/image";
import PreviousIcon from "@/assets/icons/previous.svg";
import NextIcon from "@/assets/icons/next.svg";
import Button from "@/app/components/Button";

const styles: Styles = {
    gridRoot: {
        paddingLeft: '2%',
        paddingRight: '2%',
        alignItems: 'center',
        justifyContent: "space-around",
        height: '68px'
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
    btn: {
        padding: '10px',
        display: 'inline-flex',
        gap: '8px',
        border: '1px solid #D0D5DD',
        width: 'fit-content',
        borderRadius: '8px',
        alignItems: 'center'
    },
    pageBtn: {

    }
}

type NavigationBarProps = {
    currentPage: number;
    numberOfPages: number;
    maxNumberOfPagesToDisplay?: number;
    setCurrentPage: (value: number) => void;
}

const PaginationBar: React.FC<NavigationBarProps> = ({currentPage, numberOfPages, setCurrentPage, maxNumberOfPagesToDisplay=7}) => {
    return (
        <div className="flex" style={styles.gridRoot}>
            <Button
                style={styles.btn}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Image
                    src={PreviousIcon}
                    alt={'previous'}
                    style={styles.icon}
                    width={20}
                    height={20}
                />
                Previous
            </Button>

            <div className={"inline-flex"}>
                {(currentPage < numberOfPages - 4) && (
                    <div>
                        <Button
                        onClick={() => setCurrentPage(currentPage)}>
                        {currentPage}
                        </Button>

                        <Button
                            onClick={() => setCurrentPage(currentPage + 1)}>
                            {currentPage + 1}
                        </Button>

                        <Button
                            onClick={() => setCurrentPage(currentPage + 2)}>
                            {currentPage + 2}
                        </Button>
                    </div>)}

                {numberOfPages > maxNumberOfPagesToDisplay && (<Button disabled={true}>
                    ...
                </Button>)}

                <Button
                    onClick={() => setCurrentPage(numberOfPages - 2)} >
                    { numberOfPages - 2 }
                </Button>
                <Button
                    onClick={() => setCurrentPage(numberOfPages - 1)} >
                    { numberOfPages - 1 }
                </Button>

                <Button
                    onClick={() => setCurrentPage(numberOfPages)} >
                    { numberOfPages }
                </Button>
            </div>

            <Button
                style={styles.btn}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === numberOfPages}
            >
                Next

                <Image
                    src={NextIcon}
                    alt={'next'}
                    style={styles.icon}
                    width={20}
                    height={20}
                />

            </Button>
        </div>
    )
}

export default PaginationBar;