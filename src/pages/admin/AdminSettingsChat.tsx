import { styled } from "styled-components";
import ComingSoonPage from "../../components/commons/CommingSoon";

function AdminSettingsChat() {
  return (
    <Wrapper>
      <ComingSoonPage />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AdminSettingsChat;
