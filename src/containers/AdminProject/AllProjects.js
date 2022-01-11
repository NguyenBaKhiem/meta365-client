import ban_icon from "@Assets/images/ban.png";
import AdminFilter from "@Components/AdminFilter";
import AdminTable from "@Components/AdminTable";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { projectServices } from "@Services";
import { colors } from "@Theme/colors";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectItem from "./ProjectItem";
import { AlignCenter, Center, NoData, Title } from "./StyledAdminProject";

const AllProjects = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = (filter = {}) => {
    setLoading(true);
    projectServices
      .getProjects(filter)
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setTableData(results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const changePage = (page) => {
    fetchProjects({ page });
    setPage(page);
  };

  const onSearchProject = async (e) => {
    const searchQuery = e.target.value
      ? {
          name: e.target.value,
        }
      : {};
      fetchProjects(searchQuery);
  };

  const renderTable = useCallback(() => {
    return (
      <AdminTable pages={totalPages} activePage={page} pageChange={changePage}>
        <table>
          <thead>
            <tr>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Project
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                  Investor
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                  Investment
                </Text>
              </th>
              <th>
                <Center>
                  <Text color={colors.text_header} type={"button"}>
                    Status
                  </Text>
                </Center>
              </th>
              <th>
                
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => {
                return <ProjectItem key={index} add={false} itemData={item} />;
              })
            ) : (
              <tr>
                <td colSpan="6">
                  <NoData>
                    <img src={ban_icon} alt="met365" />
                    <Text color={colors.text_body} type="button">
                      No items to display
                    </Text>
                  </NoData>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminTable>
    );
  }, [tableData, totalPages]);

  return (
    <>
      <AlignCenter style={{ marginBottom: "32px", marginTop: "30px" }}>
        <Title>Project</Title>
        <Link to="add">
          <Button width={"112px"} color={colors.primary}>
            Add new
          </Button>
        </Link>
      </AlignCenter>
      <AdminFilter onSearch={onSearchProject} />
      {renderTable()}
    </>
  );
};

export default memo(AllProjects);
