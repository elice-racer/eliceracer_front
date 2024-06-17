import styled from "styled-components";
import { imgPaths } from "../../../utils/path";

interface ProfileImgProps {
  userImg: string | null;
}
function ProfileImg({ userImg }: ProfileImgProps) {
  return <Wrapper>{userImg ? <Img src={userImg} alt="🥕" /> : <Img src={imgPaths.DEFAULT_PROFILE_IMG} alt="🥕" />}</Wrapper>;
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
