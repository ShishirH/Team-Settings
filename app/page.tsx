'use client';
import Image from "next/image";
import React, {useEffect, useState} from "react";

import GridEntry from "@/app/components/GridEntry";
import GridHeader from "@/app/components/GridHeader";
import {Styles, userDetails} from "@/app/types/types";
import PaginationBar from "@/app/components/PaginationBar";
import {prepareData} from "@/app/data/data";
import DisplayInfoWithButton from "@/app/components/DisplayInfoWithButton";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import {supabase} from "@/app/constants";
import {userInfo} from "node:os";

const NUMBER_OF_ITEMS_PER_PAGE = 10;

export default function Home() {
    const styles: Styles = {
        gridRoot: {
            paddingTop: '1%',
            alignItems: 'center'
        },
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [name, setName] = useState<string>('');
    const [roles, setRoles] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [userData, setUserData] = useState<userDetails[]>([]);
    const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    let endIndex = currentPage * NUMBER_OF_ITEMS_PER_PAGE;
    let startIndex = (currentPage - 1) * NUMBER_OF_ITEMS_PER_PAGE;

    const deleteSelected = () => {
        let arr = userData;

        for (let id of selectedEntries) {
            const dbPromise = supabase
                .from('UserInfo')
                .delete()
                .eq('id', id)

            dbPromise.then();
        }

        setSelectedEntries([]);
        setIsChecked(false);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    }

    const editSelected = () => {
        if (showModal)
            return;

        for (let id of selectedEntries) {
            let entry = userData.filter((row) => row.id === id);

            if (entry) {
                let update: Record<string, any> = {};

                if (name && name !== '') {
                    update['name'] = name;
                }

                if (selectedRole && selectedRole !== '') {
                    update['role'] = selectedRole;
                }

                if (email && email !== '') {
                    update['email'] = email;
                }

                update['id'] = entry[0].id;

                const dbPromise = supabase
                    .from('UserInfo')
                    .update(update)
                    .eq('id', id)

                dbPromise.then();
            }
        }

        setSelectedEntries([]);
        setIsChecked(false);

        setTimeout(() => {
            setShowEditModal(false);
        }, 2000);
    }

    const deleteById = (id: number) => {
        let arr = userData;

        arr = arr.filter((val) => val.id !== id)
        setUserData(arr);
        setShowModal(false);
    }

    const handleSelectedEntries = (id: number, remove?: boolean) => {
        let arr: number[] = [];
        if (id === -1) {
            setSelectedEntries([]);

            if (remove)
                return;

            for (let i = startIndex; i < endIndex; i++) {
                arr.push(userData[i].id);
            }
            setSelectedEntries(arr);
        } else {
            // Validate before pushing
            arr = selectedEntries;

            if (remove) {
                arr = arr.filter((item) => item !== id)
            } else {
                // Add
                arr = [...arr, id];
            }

            setSelectedEntries(arr)
        }
    }

    useEffect(() => {
        prepareData().then((data) => {
            setUserData([...data]);
        })

        const changes = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'UserInfo' },
                (payload) => {
                    prepareData().then((data) => {
                        setUserData([...data]);
                    })
                }
            )
            .subscribe();
    }, []);

    useEffect(() => {
        setSelectedEntries([]);
    }, [currentPage]);

    useEffect(() => {
        if (selectedEntries && selectedEntries.length >= 1) {
            let rolesSet: Set<string> = new Set();
            let row = userData.filter((entry) => {
                rolesSet.add(entry.role);

                if (entry.id === selectedEntries[0]) {
                    setSelectedRole(entry.role);
                    return true;
                }

                return false;
            });
            if (row.length > 0) {
                setName(row[0].name);
                setRoles(Array.from(rolesSet.values()));
                setEmail(row[0].email);
            }
        }
    }, [selectedEntries]);

    return (
      <div style={styles.gridRoot}>
          <DisplayInfoWithButton
              title={'Team members'}
              displayText={userData.length + ' members'}
              btnText={'Delete Selected'}
              btnOnClick={() => setShowModal(true)}
              btnDisabled={!(selectedEntries.length > 0)}
          />
          <GridHeader
              setSelectedEntries={handleSelectedEntries}
              selectedEntries={selectedEntries}
              isChecked={isChecked}
              toggleIsChecked={() => setIsChecked(!isChecked)}
          />
          {userData.slice(startIndex, endIndex).map((userDetail, index) => {
              return <GridEntry
                  key={index}
                  userDetails={userDetail}
                  index={'' + index}
                  selectedEntries={selectedEntries}
                  showModal={setShowModal}
                  showEditModal={setShowEditModal}
                  setSelectedEntries={setSelectedEntries}
              />
          })}

          {showModal && <ConfirmationModal
              title={"Are you sure you want to delete this user?"}
              alternativeTitle={"Are you sure you want to delete selected users?"}
              showAlternateTitle={(selectedEntries.length > 1)}
              confirmationTitle={"Users deleted successfully!"}
              onConfirm={() => deleteSelected()}
              onCancel={() => setShowModal(false)}
          />}
          {showEditModal && (
              <ConfirmationModal
                  title={"Edit User Details"}
                  confirmationTitle={"User Details changed!"}
                 onConfirm={() => editSelected()}
                  onCancel={() => setShowEditModal(false)}
              >
                  <label>Name</label>
                  <input type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>

                  <label>Role</label>
                  <select
                      className="form-control"
                      id="searchType"
                      onChange={e => setSelectedRole(e.target.value)}
                      value={selectedRole}
                  >
                      {roles.map((role, index) => <option key={index} value={role}> {role} </option> )}
                  </select>

                  <label>Email</label>
                  <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>

              </ConfirmationModal>)
          }

          <PaginationBar
              currentPage={currentPage}
              maxNumberOfPagesToDisplay={6}
              numberOfPages={userData.length / NUMBER_OF_ITEMS_PER_PAGE}
              setCurrentPage={setCurrentPage}
          />
      </div>
    );
}
