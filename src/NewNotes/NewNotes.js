import {
  faHouse,
  faComments,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import "../NewNotes/NewNotes.css";

const NewNotes = () => {
  const [documentContent, setDocumentContent] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const navigate = useNavigate();
  const docName = sessionStorage.getItem("docName");
  const [newNoteName, setNewNoteName] = useState(docName || " ");
  const [isEditMode, setIsEditMode] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "color",
    "background",
    "align",
  ];

  const handleBackToHomeClick = () => {
    navigate("/home");
    sessionStorage.removeItem("docName");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsChatVisible(!isChatVisible);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleNewNoteNameChange = (event) => {
    setNewNoteName(event.target.value);
  };

  const handleSaveEditToggle = () => {
    if (isEditMode) {
      setNewNoteName(newNoteName);
      sessionStorage.setItem("docName",newNoteName)
      console.log("Creating new note with name:", newNoteName);
      setIsEditMode(false);
    } else {
      // Enable Edit mode
      setIsEditMode(true);
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-dark d-flex justify-content-center align-items-center cursor-pointer"
              style={{ width: "40px", height: "40px", margin: "1rem" }}
              onClick={handleBackToHomeClick}
            >
              <FontAwesomeIcon icon={faHouse} className="text-light" />
            </div>
            <div
              className="d-flex align-items-center"
              style={{ marginLeft: "0.28rem" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newNoteName}
                onChange={handleNewNoteNameChange}
                style={{ marginLeft: "0.5rem" }}
                disabled={!isEditMode}
              />
              <button
                style={{ marginLeft: "0.7rem", borderRadius: "50%" }}
                className="btn btn-dark"
                onClick={handleSaveEditToggle}
              >
                {isEditMode ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-dark d-flex justify-content-center align-items-center cursor-pointer"
              style={{ width: "40px", height: "40px", margin: "1rem" }}
              onClick={handleOpenModal}
            >
              <FontAwesomeIcon icon={faComments} className="text-light" />
            </div>
          </div>
        </div>
      </div>

      <ReactQuill
        style={{ height: "50rem" }}
        value={documentContent}
        onChange={setDocumentContent}
        modules={modules}
        formats={formats}
      />

      {isChatVisible && (
        <div
          className="modal justify-content-start"
          style={{
            display: isModalOpen ? "block" : "none",
            width: "18rem",
            height: "15rem",
            position: "fixed",
            top: "35%",
            left: "16%", // Adjust this value to fine-tune the left position
            transform: "translateY(-50%)",
          }}
        >
          <div className="modal-content">
            <h4 className="modal-header">Chat</h4>
            <div className="modal-body">
              <textarea
                style={{ width: "16rem", height: "3.5rem" }}
                value={textValue}
                onChange={handleTextChange}
                maxLength={200}
                placeholder="Type your message here (max 200 characters)"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-info" onClick={handleCloseModal}>
                send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewNotes;
