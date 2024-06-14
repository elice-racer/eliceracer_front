import styled from "styled-components";
import { paths } from "../../../utils/path";
import { AxiosNotice, CreateNotice } from "../../../services/notice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useSetRecoilState } from "recoil";
import { loadingAtom } from "../../../recoil/LoadingAtom";

function AdminAddNotice() {
  const [error, setError] = useState("");
  const setLoading = useSetRecoilState(loadingAtom);
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState<CreateNotice>({ title: "", content: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };
  // todo 모달
  const fetchCreateNotice = async () => {
    setLoading(true);
    try {
      const res = await AxiosNotice.postNotice(noticeData);

      if (res.status === 201) navigate(paths.ADMIN_NOTICE_LIST);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setError(e.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Flex>
        <TitleBar>
          <Title>공지 등록</Title>
          <SubmitBtn onClick={fetchCreateNotice}>
            <Text>등록 완료</Text>
          </SubmitBtn>
        </TitleBar>
        <InputsWrapper>
          <Input onChange={onChange} type="text" name="title" value={noticeData?.title} placeholder="제목" />
          <TextArea onChange={onChangeTextArea} name="content" value={noticeData?.content} placeholder="내용" />
        </InputsWrapper>
        <Text className="error">{error}</Text>
      </Flex>
    </Container>
  );
}

export default AdminAddNotice;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Flex = styled.div`
  width: 60%;
`;

const TitleBar = styled.div`
  display: flex;
  gap: 6px;
  border-bottom: solid 2px ${({ theme }) => theme.colors.purple2};
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitBtn = styled.button`
  border-color: ${({ theme }) => theme.colors.purple2};
  width: 80px;
  height: 30px;
  border-radius: 6px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.purple3};
  &.error {
    color: tomato;
  }
`;

const Input = styled.input`
  margin-top: 6px;
  background-color: ${({ theme }) => theme.colors.gray1};
  border: none;
  padding: 12px;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray1};

  border: none;
  padding: 12px;
`;
