import { useCallback, useEffect, useState } from "react";
import { StlViewer } from "react-stl-viewer";
import { HexColorPicker } from "react-colorful";
import { useDropzone } from "react-dropzone";

import * as S from "./styles.home";
import api from "../../lib/api";

const style = {
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
};

const Home = () => {
  const [model, setModel] = useState(
    "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
  );
  const [selectedFile, setSelectedFile] = useState<File>();
  const [modelColor, setModelColor] = useState("#ffffff");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);

    let formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    const response = await api.post("/upload", formData, {
      onUploadProgress: (event) => {
        setUploading(true);
        let progress: number = Math.round((event.loaded * 100) / event.total);

        setUploadProgress(progress);

        if (progress === 100) setUploading(false);
      },
    });

    setModel(`http://192.168.10.253:3333/models/${response.data}`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    console.log("Ola");
  }, [selectedFile]);

  return (
    <S.Container>
      <S.Menu>
        <S.Dropzone {...getRootProps({ className: "dropzone" })}>
          <S.DropzoneInput {...getInputProps()} />
          <S.DropzoneText>Drag&drop your STL file here</S.DropzoneText>
        </S.Dropzone>
        <HexColorPicker color={modelColor} onChange={setModelColor} />
      </S.Menu>
      <S.Content>
        {uploading ? (
          <S.UploadingContent>
            <S.UploadProgressBar progress={uploadProgress} />
            <S.UploadProgressText>{uploadProgress}%</S.UploadProgressText>
          </S.UploadingContent>
        ) : (
          <StlViewer
            style={style}
            modelProps={{
              color: modelColor,
            }}
            orbitControls
            showAxes
            shadows
            url={model}
          />
        )}
      </S.Content>
    </S.Container>
  );
};

export default Home;
