import styled from "styled-components";

interface MobileHeaderProps {
  toggleMenu: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export default function MobileHeader({ toggleMenu, isOpen, children }: MobileHeaderProps) {
  return (
    <>
      <HamburgerButton onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerButton>
      <MenuPanel isOpen={isOpen}>
        <CloseButton onClick={toggleMenu}>X</CloseButton>
        <MenuContent>{children}</MenuContent>
      </MenuPanel>
    </>
  );
}

const HamburgerButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 500;

  display: none;

  span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px;
    background: #333;
    transition: 0.3s;
  }

  @media ${({ theme }) => theme.device.mobileL} {
    display: block;
  }
`;

const MenuPanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: #fff;
  color: #fff;
  transform: ${props => (props.isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
`;

const MenuContent = styled.div`
  margin-top: 60px;
  ul {
    list-style: none;
    padding: 0;
    li {
      padding: 15px 20px;
      cursor: pointer;
      &:hover {
        background: ${({ theme }) => theme.colors.purple1};
      }
    }
  }
`;
