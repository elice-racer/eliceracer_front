import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { AxiosNotice, OmitNotice } from "../../../services/notice";
import { useNavigate, useParams } from "react-router-dom";
import { loadingAtom } from "../../../recoil/LoadingAtom";
import { paths } from "../../../utils/path";

function AdminEditNotice() {
  const { id: noticeId } = useParams<string>();

  if (!noticeId) return;
  const [error, setError] = useState("");
  const setLoading = useSetRecoilState(loadingAtom);
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState<OmitNotice>({ title: "", content: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  const fetchUpdateNotice = async () => {
    if (noticeData.title.trim() === "") return alert("제목을 입력해주세요.");
    if (noticeData.content.trim() === "") return alert("내용을 입력해주세요.");

    try {
      setLoading(true);
      const res = await AxiosNotice.updateNotice(noticeId, noticeData);
      if (res.statusCode === 200) {
        alert("성공적으로 수정되었습니다!");
        navigate(`${paths.ADMIN_NOTICE_LIST}/${noticeId}`);
      }
      setLoading(false);
    } catch (e: any) {
      setError(e.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Flex>
        <TitleBar>
          <Title onClick={() => navigate(paths.ADMIN_NOTICE_LIST)}>공지 수정</Title>
          <SubmitBtn onClick={() => fetchUpdateNotice()}>
            <Text>수정 완료</Text>
          </SubmitBtn>
        </TitleBar>
        <InputsWrapper>
          <Text className="error">{error}</Text>
          <Input onChange={onChange} type="text" name="title" value={noticeData?.title} placeholder="제목" />
          <TextArea onChange={onChangeTextArea} name="content" value={noticeData?.content} placeholder="내용" />
        </InputsWrapper>
        <Text className="error">{}</Text>
      </Flex>
    </Container>
  );
}

export default AdminEditNotice;

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Flex = styled.div`
  width: 60vw;
`;

const TitleBar = styled.div`
  display: flex;
  gap: 6px;
  border-bottom: solid 2px ${({ theme }) => theme.colors.purple2};
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  cursor: pointer;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitBtn = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.purple2};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.purple3};
  &.error {
    color: tomato;
  }
`;

const Input = styled.input`
  margin-top: 6px;
  border: 1px solid ${({ theme }) => theme.colors.purple3};
  padding: 12px;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.purple3};
  padding: 12px;
`;
