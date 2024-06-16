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
        background: 'rgba(249, 245, 255, 1)',
        color: 'rgba(127, 86, 217, 1)',
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
                <div>
                    {currentPage <= numberOfPages - 2 && (
                        <Button
                            onClick={() => setCurrentPage(currentPage)}
                            style={styles.statusActive}
                        >
                            {currentPage + 'A'}
                        </Button>
                    )}

                    {currentPage + 1 <= numberOfPages - 2 && (
                        <Button
                            onClick={() => setCurrentPage(currentPage + 1)}>
                            {currentPage + 1 + 'B'}
                        </Button>
                    )}

                    {currentPage + 2 <= numberOfPages - 2 && (
                        <Button
                            onClick={() => setCurrentPage(currentPage + 2)}>
                            {currentPage + 2 + 'C'}
                        </Button>
                    )}
                </div>

                {numberOfPages > maxNumberOfPagesToDisplay && (<Button disabled={true}>
                    ...
                </Button>)}

                {currentPage <= numberOfPages - 2 && (
                    <Button
                        onClick={() => setCurrentPage(numberOfPages - 2)} >
                        { numberOfPages - 2 + 'D'}
                    </Button>
                )}

                {currentPage <= numberOfPages - 1 && (
                    <Button
                        onClick={() => setCurrentPage(numberOfPages - 1)} >
                        { numberOfPages - 1 + 'E'}
                    </Button>
                )}

                {currentPage < numberOfPages && (
                    <Button
                        onClick={() => setCurrentPage(numberOfPages)} >
                        { numberOfPages + 'F'}
                    </Button>
                )}
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