import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Button from "@material-ui/core/Button";
import MicIcon from "@material-ui/icons/Mic";
import SaveIcon from "@material-ui/icons/Save";

const options = {
 language: "en-US",
};

function CreateArea(props) {
 const [isExpanded, setExpanded] = useState(false);
 const [note, setNote] = useState({ title: "", content: "" });
 const [summarizedText, setSummarizedText] = useState(""); // New state for summarized text

 const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition(options);

  // Correctly placed useEffect hook
  useEffect(() => {
    if (transcript) {
      setNote((prevNote) => ({ ...prevNote, content: transcript }));
    }
 }, [transcript]); 
 if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
 }

 const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
 };

 const submitNote = (event) => {
    props.onAdd({ ...note });
    setNote({ title: "", content: "" });
    resetTranscript();
    event.preventDefault();
 };

 const expand = () => {
    setExpanded(true);
 };

 const handleListen = () => {
    if (listening) {
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
 };

 const summarizeContent = async () => {
    try {
      const response = await fetch("https://fbba-103-147-209-201.ngrok-free.app/summarize", {
        method: "POST",
        body: note.content,
      });

      if (response.ok) {
        const result = await response.json();
        setSummarizedText(result.msg);
        setNote((prevNote) => ({ ...prevNote, content: result.msg }));
      } else {
        console.error("Error fetching summarized text");
      }
    } catch (error) {
      console.error("Error:", error);
    }
 };

// Dependency array ensures this effect runs when transcript changes

 return (
    <form className="create-note">
      {isExpanded && (
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
      )}

      <textarea
        name="content"
        onClick={expand}
        onChange={handleChange}
        value={note.content || transcript}
        placeholder="Take a note..."
        rows={isExpanded ? 3 : 1}
      />

      <Button className="speech" onClick={handleListen}>
        <MicIcon />
      </Button>

      <Button className="summarize" style={{ backgroundColor: "#EAEAEA" , fontFamily:"cursive"}} onClick={summarizeContent} disabled={!note.content && !transcript}>
        Summarize
      </Button>

      <span style={{ marginRight: "10px" }} />

      <Button className="save" style={{ backgroundColor: "#EAEAEA", fontFamily:"cursive" }} onClick={submitNote} disabled={!note.content && !transcript}>
        Save
      </Button>
    </form>
 );
}

export default CreateArea;
