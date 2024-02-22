import React, { useState } from "react";
import "../MainPage/MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createDocument, webscoket } from "../utils/Utils";

const MainPage = () => {
  const [newNotes, setNewNotes] = useState(false);
  const navigate = useNavigate();

  const createNewNotes = async () =>{
    setNewNotes(true);
    const response = await webscoket()
    console.log(response.data);
    if(response.data){
      const response = await createDocument()
      console.log(response);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div
            onClick={()=> {createNewNotes()}}
            className="col-4 col-sm-4 col-lg-3"
          >
            <div
              className="single_advisor_profile wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="advisor_thumb">
                <FontAwesomeIcon style={{ fontSize: "15rem" }} icon={faPlus} />
              </div>
              <div className="single_advisor_details_info">
                <h6>Add New Notes</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {newNotes && navigate("/newnotes")}
    </>
  );
};

export default MainPage;
