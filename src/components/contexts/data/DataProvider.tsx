import React, { createContext, useEffect, useState } from "react";
import { ApplicantProfile } from "@/lib/types/applicant-type";
import { collection, getDocs } from "firebase/firestore";

import db from "@/lib/firebase/config";
// import mockDB from "../../../assets/realmock-db.json"; //👈 For development

// Define the data type
export type DatabaseDataType = ApplicantProfile[] | null;
// Create the context
export type DataContextProps = {
  data: DatabaseDataType;
  setData: React.Dispatch<React.SetStateAction<DatabaseDataType>>;
  updateDataContext: (newData: Partial<ApplicantProfile[]>) => Promise<void>;
  fetchDataProcess: () => Promise<void>;
  handleRefresh: () => void;
};
export const DataContext = createContext<DataContextProps>({
  data: null, // Set defualt value
  setData: () => {},
  updateDataContext: async () => {},
  fetchDataProcess: async () => {},
  handleRefresh: () => {},
});

// Create the context provider
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<DatabaseDataType>(null); // Set a default empty o ruse mockDB for development...
  const [refresh, setRefresh] = useState<boolean>(false); // State to trigger refresh

  // const mockData = mockDB as ApplicantProfile[]; //👈 For development

  // ⏳ FETCHING DATA ON LOAD & CUSTOM-REFRESH
  useEffect(() => {
    console.log("🎭DataContext/useEffect :  💢 Triggered");
    const fetchData = async () => {
      try {
        fetchDataProcess(); //👈 For production
        // setData(mockData); //👈 For development
        console.log("new data set");
        console.log("refresh state:", refresh);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetching function
  }, [refresh]); // Add 'refresh' state as a dependency

  /**
   * ✅ TRIGGER FOR RE-FETCHING DATA
   * Handles fetching user firestore document by checking if the document exists and sets it to state.
   */
  const handleRefresh = () => {
    console.log("Refresh Triggered 💢");
    setRefresh((prevState) => !prevState); // Toggle 'refresh' state
  };

  /**
   * ✅ HANDLES FETCHING DATA
   * Handles fetching user firestore document by checking if the document exists and sets it to state.
   * @param {string} userId - The ID of the user whose data is being fetched.
   * @returns {Promise<void>} A Promise that resolves once the fetch process completes.
   */
  const fetchDataProcess = async () => {
    console.log("🎭DataContext/fetchUserDataProcess :  💢 Triggered");
    const querySnapshot = await getDocs(collection(db, "applicants"));

    //- Extract data from querySnapshot
    const data: ApplicantProfile[] = [];
    querySnapshot.forEach((doc) => {
      const applicantData = doc.data(); // Extract data from Firestore document

      // Check if the necessary fields exist before constructing the profile
      if (
        applicantData.uuid &&
        applicantData.firstForm &&
        applicantData.secondForm &&
        applicantData.thirdForm &&
        applicantData.applicationDate
      ) {
        const profile: ApplicantProfile = {
          id: doc.id, // Assuming id refers to uuid
          uuid: applicantData.uuid,
          firstForm: applicantData.firstForm,
          secondForm: applicantData.secondForm,
          thirdForm: applicantData.thirdForm,
          applicationDate: applicantData.applicationDate,
        };
        data.push(profile);
      } else {
        console.log("Incomplete data found:", applicantData);
      }
    });

    //- Set the data to state
    console.log(
      "🎭DataContext/fetchUserDataProcess :   ✔ Success - fetched and set data:",
      data
    );
    setData(data);
  };

  /**
   * 🔮 HANDLES UPDATING CONTEXT:
   * Updates the user profile in the context with new data.
   * @param {Partial<ApplicantProfile>} newData - The new data to update in the user profile.
   * @returns {Promise<void>} A Promise that resolves once the update process completes.
   */
  const updateDataContext = async (newData: Partial<ApplicantProfile[]>) => {
    console.log("🎭DataContext/updateApplicantProfile: 💢 Triggered", newData);
  };

  const userContextValue: DataContextProps = {
    data,
    setData,
    updateDataContext,
    fetchDataProcess,
    handleRefresh,
  };
  return (
    <DataContext.Provider value={userContextValue}>
      {children}
    </DataContext.Provider>
  );
};
