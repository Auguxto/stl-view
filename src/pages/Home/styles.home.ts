import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: row;

  width: 100vw;
  height: 100vh;

  background: red;

  overflow: hidden;
`;

export const Menu = styled.div`
  width: 25%;
  min-width: 300px;
  height: 100vh;

  background: #282c34;

  .react-colorful {
    margin: 50px auto;
    width: 80%;
  }

  .react-colorful__saturation-pointer {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }

  .react-colorful__hue-pointer {
    width: 16px;
    border-radius: 3px;
  }
`;

export const Dropzone = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 80%;
  height: 150px;

  border: 5px dashed #20232a;

  border-radius: 10px;

  margin: 20px auto;

  position: relative;
`;

export const DropzoneText = styled.span`
  font-weight: bold;

  color: #20232a;
`;

export const DropzoneInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  position: absolute;
  outline: none;
`;

export const Content = styled.div`
  width: 100%;
  height: 100vh;

  background: #20232a;
`;

export const UploadingContent = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  background: #20232a;
`;

export const UploadProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => `${props.progress * 2}px`};
  height: 10px;

  border-radius: 5px;

  background: #6ff542;
`;

export const UploadProgressText = styled.div`
  font-weight: bold;

  color: #ffffff;

  margin-top: 5px;
`;
