import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const Menu = styled.div`
  // just for styling
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const menuContext = createContext();

function Menus({ children }) {
  const [openMenu, setOpenMenu] = useState("");
  const [position, setPosition] = useState(null);

  const open = setOpenMenu;
  const close = () => setOpenMenu("");

  return (
    <menuContext.Provider
      value={{ openMenu, open, close, position, setPosition }}
    >
      {children}
    </menuContext.Provider>
  );
}

function Toggle({ opens }) {
  const { open, openMenu, close, setPosition } = useContext(menuContext);

  function handleClick(e) {
    e.stopPropagation(); // what we did is we stopped this click event to move further up the dom tree
    console.log("click");
    opens === "" || opens !== openMenu ? open(opens) : close();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, name }) {
  const { openMenu, close, position } = useContext(menuContext);
  const { myref } = useOutsideClick(() => {
    console.log("click outside the modal");
    close();
  }, false); // bubbling phase as by default,  we made it to capture events in the capturing phase hence outside click was getting detected whenever we click anywhere
  if (name !== openMenu) return null;

  return createPortal(
    <StyledList ref={myref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, onClick, disabled }) {
  const { close } = useContext(menuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
