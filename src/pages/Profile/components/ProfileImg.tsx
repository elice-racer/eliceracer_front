import styled from "styled-components";
import { imgPaths } from "../../../utils/path";

function ProfileImg() {
  return (
    <Wrapper>
      <Img src={imgPaths.DEFAULT_PROFILE_IMG} />
    </Wrapper>
  );
}

export default ProfileImg;

const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`;

const Wrapper = styled.div`
  width: 30px;
  height: 30px;
`;
