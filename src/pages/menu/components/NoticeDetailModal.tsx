import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

import { AxiosNotice, Notice } from "../../../services/notice";
import { ModalProps } from "../../admin/adminProjects/components/UpdateTeamModal";
import { Modal } from "../../../components/commons/Modal";

// import { Backdrop } from "@mui/material";
// import IconButton from "../../../components/commons/IconButton";

interface NoticeModalProps extends ModalProps {
  isOpen: boolean;
  noticeId: string | null;
}

export default function NoticeDetailModal({ isOpen, onClose, noticeId }: NoticeModalProps) {
  const el = document.getElementById("modal") as HTMLElement;

  const [notice, setNotice] = useState<Notice | null>(null);

  const fetchNoticeById = async () => {
    try {
      if (!noticeId) return;
      const res = await AxiosNotice.getNoticeId(noticeId);
      if (res.statusCode === 200 && res.data) {
        setNotice(res.data);
      }
    } catch (e) {
      console.log("notice get error!!!");
    }
  };
  useEffect(() => {
    if (noticeId) {
      fetchNoticeById();
    }
  }, [noticeId]);

  if (!el) return null;

  return ReactDom.createPortal(
    <>
      {/* <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer }} open={isOpen} onClick={onClose} /> */}
      <Modal isOpen={isOpen} onClose={onClose} width="500px" height="680px">
        <ModalHeader>
          <ModalTitle>{notice?.title}</ModalTitle>
          {/* <IconButton onClick={onClose}>
            <CloseButton>&times;</CloseButton>
          </IconButton> */}
        </ModalHeader>
        <ModalSubTitle>
          <Text>{notice?.user.realName} 매니저</Text>
          <Wrapper>
            <Flex>
              <Text>작성일 {notice?.createdAt.toString().split("T")[0]}</Text>
              <Text className="date">{notice?.createdAt.toString().split("T")[1].split(".")[0]}</Text>
            </Flex>
            <Flex>
              <Text className="date">수정일 {notice?.updatedAt.toString().split("T")[0]}</Text>
              <Text className="date">{notice?.updatedAt.toString().split("T")[1].split(".")[0]}</Text>
            </Flex>
          </Wrapper>
        </ModalSubTitle>
        <ModalBody>{notice?.content}</ModalBody>
      </Modal>
    </>,
    el
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #000;
  padding-bottom: 4px;
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
`;

// const CloseButton = styled.div`
//   border: none;
//   font-size: 2rem;

//   position: absolute;

//   cursor: pointer;
// `;

const ModalSubTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalBody = styled.div`
  font-size: 1.2em;
  color: #000;
  margin-top: 24px;
`;

const Text = styled.p``;

const Wrapper = styled.div``;

const Flex = styled.div`
  display: flex;
  gap: 6px;
`;
