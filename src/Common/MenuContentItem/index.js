import React, { useState, useRef, useEffect } from "react";
import { map, isNil, includes } from "lodash";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as ExpandArrowIcon } from "../../assets/icons/tableArrow.svg";
import {
  ACCENT2,
  BLACK,
  DARK1,
  BRANDCOLOR,
  ACCENT2HOVER
} from "../../Constants/colors";

export default function MenuContentItem({ list }) {
  const [expandState, setExpandState] = useState(null);
  const { listName, links } = list;
  const expandLinksContainerEl = useRef();

  useEffect(() => {
    if (!expandLinksContainerEl.current) {
      return;
    }
    map(expandLinksContainerEl.current.firstElementChild.children, el => {
      if (includes(el.firstElementChild.classList, "active")) {
        setExpandState(true);
      }
    });
  }, []);

  const expandLinks = () => {
    if (isNil(links)) {
      return;
    }
    setExpandState(prevstate => !prevstate);
  };

  const renderListNameLink = () => {
    return (
      <ItemsContainer>
        <StyledNavLink
          to={listName.link}
          exact
          activeClassName="active"
          expanded={expandState}
        >
          <div className="icon-container">{list.icon}</div>
          <div className="link-name" to={listName.link}>
            {listName.output}
          </div>
        </StyledNavLink>
      </ItemsContainer>
    );
  };

  const renderLinkList = () => {
    return (
      <ItemsContainer>
        <ExpandRow onClick={expandLinks} expanded={expandState}>
          <div className="icon-container">{list.icon}</div>
          <div className="link-name">{listName.output}</div>
          {links && (
            <ExpandArrowIconContainer expanded={expandState}>
              <ExpandArrowIcon />
            </ExpandArrowIconContainer>
          )}
        </ExpandRow>
        {links && (
          <ExpandLinksContainer
            ref={expandLinksContainerEl}
            expanded={expandState}
            element={expandLinksContainerEl}
          >
            <div>
              {map(links, (link, index) => (
                <ExpandNavLinkContainer key={index}>
                  <ExpandNavLink
                    exact
                    activeClassName="active"
                    className="link-name"
                    to={link.link}
                  >
                    {link.output}
                  </ExpandNavLink>
                </ExpandNavLinkContainer>
              ))}
            </div>
          </ExpandLinksContainer>
        )}
      </ItemsContainer>
    );
  };

  return listName.link ? renderListNameLink() : renderLinkList();
}

const ExpandRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 240px;
  height: 50px;
  color: ${({ expanded }) => (expanded ? BLACK : ACCENT2)};
  border-radius: 0px 3.41px 3.41px 0px;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: ${ACCENT2HOVER};
    cursor: pointer;
    color: ${BLACK};
  }

  svg {
    margin-left: 27px;
    fill: ${({ expanded }) => (expanded ? BRANDCOLOR : ACCENT2)};
  }

  .link-name {
    margin-left: 19px;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 50px;
    background-color: ${({ expanded }) =>
      expanded ? BRANDCOLOR : "transperent"};
    border-radius: 0 5px 5px 0;
    opacity: 1;
    transition: all 0.25s ease-in-out;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${ACCENT2};
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 240px;
  height: 50px;
  color: ${({ expanded }) => (expanded ? BLACK : ACCENT2)};
  border-radius: 0px 3.41px 3.41px 0px;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: ${ACCENT2HOVER};
    cursor: pointer;
    color: ${BLACK};
  }

  svg {
    margin-left: 27px;
    fill: ${({ expanded }) => (expanded ? BRANDCOLOR : ACCENT2)};
  }

  .link-name {
    margin-left: 19px;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 50px;
    border-radius: 0 5px 5px 0;
    opacity: 1;
    transition: all 0.25s ease-in-out;
  }

  &.active {
    color: ${BLACK};
    svg {
      fill: ${BRANDCOLOR};
    }
    &:before {
      background-color: ${BRANDCOLOR};
    }
  }
`;

const ExpandArrowIconContainer = styled.div`
  position: absolute;
  right: 11px;
  svg {
    transform: ${({ expanded }) =>
      expanded ? "rotate(90deg)" : "rotate(0deg)"};
    transition: 0.5s ease;
  }
`;

const ExpandLinksContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-left: 56px;
  height: ${({ expanded, element }) =>
    expanded
      ? element
        ? `${element.current.firstElementChild.offsetHeight}px`
        : "0px"
      : "0px"};
  transition: 0.5s ease;
`;

const ExpandNavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: ${ACCENT2};
  height: 32px;
`;

const ExpandNavLink = styled(NavLink)`
  border-radius: 4px;
  padding: 10px;
  transition: all 0.25s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgba(123, 124, 177, 0.07);
    color: ${DARK1};
    font-weight: 600;
  }
  &.active {
    background-color: rgba(123, 124, 177, 0.07);
    color: ${DARK1};
    font-weight: 600;
  }
`;
