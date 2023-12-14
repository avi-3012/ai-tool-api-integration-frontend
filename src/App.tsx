import { useEffect, useState } from "react";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";

function App() {
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(base64Image);
  }, [base64Image]);
  return (
    <div className="flex flex-row h-[100vh] w-full box-border min-w-[768px]">
      <div className="flex flex-row h-[100vh] w-full">
        <div className="h-full min-w-[550px] w-[70%]">
          <LeftSection
            setBase64Image={setBase64Image}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </div>
        <div className="h-full min-w-[218px] w-[30%]">
          <RightSection base64Image={base64Image} setImageUrl={setImageUrl} setSelectedFile={setSelectedFile} />
        </div>
      </div>
    </div>
  );
}

export default App;
