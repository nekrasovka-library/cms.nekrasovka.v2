import React from "react";
import {
  HeaderPageDropdownContainer,
  HeaderPageDropdownLink,
} from "../constructor.header.styles.js";
import Icon from "../../../../../nekrasovka-ui/Icon/icon";

const ConstructorHeaderDropdown = ({
  pages,
  projectId,
  setIsDropdownOpen,
  mainPageId,
  pageId,
}) => {
  return (
    <HeaderPageDropdownContainer>
      {pages.map((page) => {
        return (
          <HeaderPageDropdownLink
            $isActive={page.id === pageId}
            key={page.id}
            to={`/projects/${projectId}/${page.id}`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {mainPageId === page.id ? (
              <Icon icon="home" height={10} width={10} />
            ) : (
              <div />
            )}
            <span>{page.name}</span>
          </HeaderPageDropdownLink>
        );
      })}
    </HeaderPageDropdownContainer>
  );
};

export default ConstructorHeaderDropdown;
