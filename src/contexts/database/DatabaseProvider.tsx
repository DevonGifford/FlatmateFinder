import React, { createContext, useEffect, useState } from "react";
import { RawApplicantProfile } from "@/lib/types/rawapplicant-type";
import { collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebase/config";

export type DatabaseDataType = RawApplicantProfile[] | null;

export type DatabaseContextProps = {
  applicantPool: DatabaseDataType;
  isLoading: boolean;
  error: string;
  setApplicantPool: React.Dispatch<React.SetStateAction<DatabaseDataType>>;
  fetchDatabase: () => Promise<void>;
  updateDatabase: (newData: Partial<RawApplicantProfile[]>) => void;
};

export const DatabaseContext = createContext<DatabaseContextProps>({
  applicantPool: null,
  isLoading: false,
  error: "",
  setApplicantPool: () => {},
  fetchDatabase: async () => {},
  updateDatabase: () => {},
});

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [applicantPool, setApplicantPool] = useState<DatabaseDataType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicantPool = async () => {
      try {
        setIsLoading(true);
        setError("");
        fetchDatabase(); //development - setApplicantPool(mockData);
      } catch (err) {
        setError("Try again or tell Devon");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicantPool();
  }, []);

  const fetchDatabase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "applicants"));
      const fetchedData: RawApplicantProfile[] = [];

      querySnapshot.forEach((doc) => {
        const {
          uuid,
          firstForm,
          secondForm,
          thirdForm,
          rankings,
          photo,
          applicationDate,
        } = doc.data();

        if (uuid && firstForm && secondForm && thirdForm && applicationDate) {  //🎯change to doc?
          const profile: RawApplicantProfile = {
            id: doc.id,
            uuid,
            firstForm,
            secondForm,
            thirdForm,
            applicationDate,
            rankings,
            photo,
          };
          fetchedData.push(profile);
        }
      });

      setApplicantPool(fetchedData);
    } catch (err) {
      console.error("Error processing fetched data:", err);
      setError("Something went wrong while processing data");
    }
  };

  const updateDatabase = (newData: Partial<RawApplicantProfile[]>) => {
    if (!applicantPool || !newData || newData.length === 0 || !newData[0]?.id) {
      return;
    }

    const indexToUpdate = applicantPool.findIndex(
      (profile) => profile.id === newData[0]!.id
    );

    if (indexToUpdate !== -1) {
      const updatedData = [...applicantPool];
      updatedData[indexToUpdate] = {
        ...updatedData[indexToUpdate],
        ...newData[0],
      };
      setApplicantPool(updatedData);
    } else {
      setError("Something went wrong with saving data");
    }
  };

  const userContextValue: DatabaseContextProps = {
    applicantPool,
    isLoading,
    error,
    setApplicantPool,
    updateDatabase,
    fetchDatabase,
  };

  return (
    <DatabaseContext.Provider value={userContextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};
