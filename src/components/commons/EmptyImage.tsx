import styled from "styled-components";
import { imgPaths } from "../../utils/path";

export default function EmptyImage() {
  return <Image src={imgPaths.EMPTY} />;
}

const Image = styled.img`
  width: 120px;
  height: 120px;
`;
