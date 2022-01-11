import show_icon from "@Assets/images/arrow-dropdown.png";
import checked_icon from "@Assets/images/checkedbox1.png";
import unchecked_icon from "@Assets/images/checkedbox2.png";
import filter from "@Assets/images/filter.png";
import search_icon from "@Assets/images/search.png";
import Button from "@Components/Button";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useEffect, useState } from "react";
import { useDebounce, useMedia } from "react-use";
import {
  ApplyButton, Box, Content, Dropdown,
  Header, Input, InputPrice, Label, Name, PriceWrapper, ProjectItem, ProjectsList, SearchProject, SelectInput, StatusWrapper, Wrapper
} from "./style";

function Filter(props) {
  const {
    handleClick,
    data,
    dataPrice,
    name,
    handleMin,
    handleMax,
    onClose,
    filterPrice,
    filterProjects,
    projectsData,
  } = props;
  const belowSM = useMedia(breakpoints.sm);
  const [expandStatus, setExpandStatus] = useState(true);
  const [expandPrice, setExpandPrice] = useState(true);
  const [expandUnits, setExpandUnits] = useState(true);
  const [expandProjects, setExpandProjects] = useState(true);
  const [type, setType] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState([]);

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },
    500,
    [searchValue]
  );

  useEffect(() => {
    if (name === "my-land") handleClick({ saleType: type });
    if (name === "marketplace") handleClick(selectedActivity, selectedUnit);
    if (name === "land") handleClick(type);
  }, [type, selectedActivity]);

  useEffect(() => {
    handleClick(selectedActivity, selectedUnit);
  }, [selectedUnit]);

  useEffect(() => {
    filterProjects(selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    onSearchProject();
  }, [debouncedValue]);

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  const handleSelected = (input) => {
    if (selectedProject.indexOf(input) === -1) {
      let newState = [...selectedProject, input];
      setSelectedProject(newState);
    } else {
      let newState = selectedProject.filter((item) => {
        return item !== input;
      });
      setSelectedProject(newState);
    }
  };

  const onSearchProject = () => {
    if (debouncedValue === "") setProjects(projectsData);
    else {
      if (projects) {
        let arr = projects.filter((item) =>
          item.name.toLowerCase().includes(debouncedValue.toLowerCase())
        );
        setProjects(arr);
      }
    }
  };

  const handleSelectedActivities = (input) => {
    if (selectedActivity.indexOf(input) === -1) {
      let newState = [...selectedActivity, input];
      setSelectedActivity(newState);
    } else {
      let newState = selectedActivity.filter((item) => {
        return item !== input;
      });
      setSelectedActivity(newState);
    }
  };

  const handleSelectedUnit = (input) => {
    if (selectedUnit.indexOf(input) === -1) {
      let newState = [...selectedUnit, input];
      setSelectedUnit(newState);
    } else {
      let newState = selectedUnit.filter((item) => {
        return item !== input;
      });
      setSelectedUnit(newState);
    }
  };

  return (
    <Wrapper>
      <div>
        <Header>
          <div>
            <img src={filter} alt="" />
            <Text color={colors.text_header} type="button">
              Filter
            </Text>
          </div>
          {belowSM && (
            <Box>
              <div
                onClick={() => {
                  onClose(false);
                }}
              >
                <Text color={colors.new_primary} type="button">
                  CLEAR ALL
                </Text>
              </div>
              <div
                onClick={() => {
                  onClose(false);
                }}
              >
                <Text color={colors.new_primary} type="button">
                  APPLY FILTER
                </Text>
              </div>
            </Box>
          )}
        </Header>

        {props.filterByStatus && (
          <Dropdown>
            <Name onClick={() => setExpandStatus(!expandStatus)}>
              <span>Status</span>
              <img
                src={show_icon}
                alt="icon"
                style={
                  expandStatus
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
              />
            </Name>
            {expandStatus && (
              <Content>
                {name === "marketplace" ? (
                  <StatusWrapper>
                    {data &&
                      data.map((item, index) => (
                        <Label htmlFor={item.id} key={`${name}+${index}`}>
                          <SelectInput
                            style={
                              selectedActivity.includes(item.id)
                                ? {
                                    background: "#4285F4",
                                  }
                                : {
                                    background: "rgba(66, 133, 244, 0.1)",
                                  }
                            }
                          >
                            <Input
                              id={item.id}
                              name={name}
                              value={item.id}
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectedActivities(e.target.value)
                              }
                            />

                            <Text
                              color={
                                selectedActivity.includes(item.id)
                                  ? "#F6F9FF"
                                  : "#4285F4"
                              }
                              type="body2"
                            >
                              {item.name}
                            </Text>
                          </SelectInput>
                        </Label>
                      ))}
                  </StatusWrapper>
                ) : (
                  <StatusWrapper>
                    {data &&
                      data.map((item, index) => (
                        <Label htmlFor={item.id} key={`${name}+${index}`}>
                          <SelectInput
                            style={
                              type === item.id
                                ? {
                                    background: "#4285F4",
                                  }
                                : {
                                    background: "rgba(66, 133, 244, 0.1)",
                                  }
                            }
                          >
                            <Input
                              id={item.id}
                              name={name}
                              value={item.id}
                              type="radio"
                              onClick={() => {
                                if (item.id === type) {
                                  setType("");
                                } else {
                                  setType(item.id);
                                }
                              }}
                            />

                            <Text
                              color={type === item.id ? "#F6F9FF" : "#4285F4"}
                              type="body2"
                            >
                              {item.name}
                            </Text>
                          </SelectInput>
                        </Label>
                      ))}
                  </StatusWrapper>
                )}
              </Content>
            )}
          </Dropdown>
        )}

        {props.filterByPrice && (
          <>
            <Name onClick={() => setExpandPrice(!expandPrice)}>
              <span>Price</span>
              <img
                src={show_icon}
                alt="icon"
                style={
                  expandStatus
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
              />
            </Name>
            {expandPrice && (
              <Content>
                <PriceWrapper>
                  <InputPrice
                    type="number"
                    placeholder="Min"
                    onChange={(e) => handleMin(e.target.value)}
                  />
                  <Text color={colors.sub_text} type="body2">
                    to
                  </Text>
                  <InputPrice
                    type="number"
                    placeholder="Max"
                    onChange={(e) => handleMax(e.target.value)}
                  />
                </PriceWrapper>
                <ApplyButton>
                  <Button
                    color={colors.background2}
                    width="100%"
                    onClick={() => {
                      filterPrice();
                    }}
                  >
                    APPLY
                  </Button>
                </ApplyButton>
              </Content>
            )}
          </>
        )}

        {props.filterByUnits && (
          <Dropdown>
            <Name onClick={() => setExpandUnits(!expandUnits)}>
              <span>Units</span>
              <img
                src={show_icon}
                alt="icon"
                style={
                  expandStatus
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
              />
            </Name>
            {expandUnits && (
              <Content>
                <StatusWrapper>
                  {dataPrice &&
                    dataPrice.map((item, index) => (
                      <Label htmlFor={item.unit} key={`${name}+${index}`}>
                        <SelectInput
                          style={
                            selectedUnit.includes(item.unit)
                              ? {
                                  background: "#4285F4",
                                }
                              : {
                                  background: "rgba(66, 133, 244, 0.1)",
                                }
                          }
                        >
                          <Input
                            id={item.unit}
                            name={name}
                            value={item.unit}
                            type="checkbox"
                            onChange={(e) => handleSelectedUnit(e.target.value)}
                          />

                          <Text
                            color={
                              selectedUnit.includes(item.unit)
                                ? "#F6F9FF"
                                : "#4285F4"
                            }
                            type="body2"
                          >
                            {item.name}
                          </Text>
                        </SelectInput>
                      </Label>
                    ))}
                </StatusWrapper>
              </Content>
            )}
          </Dropdown>
        )}

        {props.filterByProject && (
          <>
            <Name
              onClick={() => {
                setExpandProjects(!expandProjects);
              }}
            >
              <span>Project</span>
              <img
                src={show_icon}
                alt="icon"
                style={
                  expandStatus
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
              />
            </Name>
            {expandProjects && (
              <Content>
                <SearchProject>
                  <img src={search_icon} alt="search" />
                  <input
                    type="text"
                    placeholder="Search project"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                </SearchProject>
                <ProjectsList>
                  {projects && projects.length > 0 ? (
                    projects.map((item, index) => {
                      return (
                        <ProjectItem
                          key={index}
                          onClick={() => {
                            handleSelected(item.id);
                          }}
                        >
                          <img
                            src={
                              !selectedProject.includes(item.id)
                                ? unchecked_icon
                                : checked_icon
                            }
                            alt="checkbox"
                          />
                          <Text color={colors.text_header} type="body1">
                            {item.name}
                          </Text>
                        </ProjectItem>
                      );
                    })
                  ) : (
                    <Text
                      color={colors.text_header}
                      type="body1"
                      style={{ textAlign: "center" }}
                    >
                      No project found
                    </Text>
                  )}
                </ProjectsList>
              </Content>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default Filter;
