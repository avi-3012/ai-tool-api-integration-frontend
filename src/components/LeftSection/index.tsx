import React, { ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import { CameraAlt } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const NoFileSelected = ({ handleFileChange }) => {
  return (
    <div className="flex flex-col w-[200px] h-[100px] justify-center items-center">
      <div className="mb-4">
        <CameraAlt sx={{ fontSize: 48 }} />
      </div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </div>
  );
};

const FileSelected = ({
  file,
  handleFileChange,
}: {
  file: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center overflow-hidden">
      <div className="mb-4 w-full px-4 box-border flex justify-center">
        <img src={file} alt="" className="w-[400px]" />
      </div>
      <div className="flex gap-2">

     
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Change Image
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      <Button
        component="label"
        variant="contained"
        color="success"
        startIcon={<DownloadIcon />}
      >
        <a href={file} download> Download</a>
      </Button>
      </div>
    </div>
  );
};

const LeftSection = ({setBase64Image, imageUrl, setImageUrl, selectedFile, setSelectedFile}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file.type !== "image/jpeg") {
      alert("Only JPEG files are supported!");
      return;
    }
    setSelectedFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  return (
    <div className="flex justify-center h-full items-center">
      {selectedFile ? (
        <FileSelected file={imageUrl} handleFileChange={handleFileChange} />
      ) : (
        <NoFileSelected handleFileChange={handleFileChange} />
      )}
    </div>
  );
};

export default LeftSection;
