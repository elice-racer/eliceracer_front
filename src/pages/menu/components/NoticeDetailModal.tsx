import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

import { Backdrop } from "@mui/material";

import { AxiosNotice, Notice } from "../../../servies/notice";

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
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
      console.log(e);
    }
  };
  useEffect(() => {
    if (noticeId) {
      fetchNoticeById();
    }
  }, [noticeId]);

  if (!el) return null;

  return ReactDom.createPortal(
    <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isOpen} onClick={onClose}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{notice?.title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{notice?.content}</ModalBody>
      </ModalContainer>
    </Backdrop>,
    el
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  height: 700px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;

  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;

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

const CloseButton = styled.button`
  border: none;
  font-size: 2rem;

  position: absolute;

  top: 12px;
  right: 12px;

  cursor: pointer;
`;

const ModalBody = styled.div`
  font-size: 1.2em;
  color: #000;
  margin-top: 24px;
`;
