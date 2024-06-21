import styled from "styled-components";
import { imgPaths } from "../../utils/path";

interface EmptyImageProps {
  message: string;
}

export default function EmptyImage({ message }: EmptyImageProps) {
  return (
    <Wrapper>
      <Image src={imgPaths.EMPTY} />
      <Message>{message}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray2};
`;
