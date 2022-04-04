import { ChangeEvent, useState } from "react";
import { StlViewer } from "react-stl-viewer";
import { HexColorPicker } from "react-colorful";
import { useDropzone } from "react-dropzone";

import * as S from "./styles.home";
import api from "../../lib/api";

const url =
  "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl";

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: "model/stl",

    onDropAccepted: async (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);

      let formData = new FormData();

      formData.append("file", acceptedFiles[0] as Blob);

      const response = await api.post("/upload", formData);

      console.log(response.data);

      setModel(response.data);
    },
  });

  return (
    <S.Container>
      <S.Menu>
        <S.Dropzone {...getRootProps({ className: "dropzone" })}>
          <S.DropzoneInput {...getInputProps()} />
          <S.DropzoneText>Drag&drop your 3D file here</S.DropzoneText>
        </S.Dropzone>
        <HexColorPicker color={modelColor} onChange={setModelColor} />
      </S.Menu>
      <S.Content>
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
      </S.Content>
    </S.Container>
  );
};

export default Home;
