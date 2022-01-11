import ban_icon from "@Assets/images/ban.png";
import AdminFilter from "@Components/AdminFilter";
import AdminTable from "@Components/AdminTable";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { landServices } from "@Services";
import { colors } from "@Theme/colors";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandItem from "./LandItem";
import {
  AlignCenter,
  Center, NoData,
  Title
} from "./StyledAdminLand";

const AllLand = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddNFT, setShowAddNFT] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = (filter = {}) => {
    setLoading(true);
    landServices
      .getLands(filter)
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setTableData(results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const changePage = (page) => {
    fetchLands({ page });
    setPage(page);
  };

  const renderTable = useCallback(() => {
    return (
      <AdminTable pages={totalPages} activePage={page} pageChange={changePage}>
        <table>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Project
                  </Text>
                </AlignCenter>
              </th>
              <th style={{ width: "15%" }}>
                <Text color={colors.text_header} type={"button"}>
                  Land Code
                </Text>
              </th>
              <th style={{ width: "15%" }}>
                <Text color={colors.text_header} type={"button"}>
                  Starting Price
                </Text>
              </th>
              <th style={{ width: "20%" }}>
                <Text color={colors.text_header} type={"button"}>
                  Date of Commencement
                </Text>
              </th>
              <th style={{ width: "15%" }}>
                <Center>
                  <Text color={colors.text_header} type={"button"}>
                    Status
                  </Text>
                </Center>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => {
                return <LandItem key={index} add={false} landData={item} />;
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
  }, [showAddNFT, tableData, totalPages]);

  const onSearchLand = (e) => {
    const searchQuery = e.target.value
      ? {
          landCode: e.target.value,
        }
      : {};

    fetchLands(searchQuery);
  };

  return (
    <>
      <AlignCenter style={{ marginBottom: "30px" }}>
        <Title>Lands</Title>
        <div style={{ marginTop: "30px" }}>
          <Link to="add">
            <Button width={"112px"} color={colors.primary}>
              Add new land
            </Button>
          </Link>
        </div>
      </AlignCenter>

      <AdminFilter
        onSearch={onSearchLand}
        placeholder={"search by land code"}
      />
      {renderTable()}
    </>
  );
};

export default AllLand;
