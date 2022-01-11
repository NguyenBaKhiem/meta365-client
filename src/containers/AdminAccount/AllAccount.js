import React, { useState, useEffect } from "react";
import { useMedia } from "react-use";
import {
  AlignCenter,
  Checkbox,
  CopyIcon,
  FlexRight,
  Status,
  Title
} from "./StyledAdminAccount";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import AdminTable from "@Components/AdminTable";
import copy_icon from "@Assets/images/copy.png";
import Button from "@Components/Button";
import EditAccount from "./EditAccount";
import BlockModal from "./BlockModal";
import AdminFilter from "@Components/AdminFilter";
import Text from "@Components/Text";
import { userServices } from "@Services";
import { useNavigate } from "react-router-dom";

const AllAccount = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [tableData, setTableData] = useState([1, 1]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoles()
    fetchUsers({ status: 1 });
  }, []);

  const fetchRoles = () => {
    userServices.getAllRoles().then((roles) => {
      setRoles(roles);
    });
  };

  const fetchUsers = (filter = {}) => {
    setLoading(true);
    userServices
      .getUsers(filter)
      .then((res) => {
        if(res.code===403){
          return navigate("/403")
        }
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
    fetchUsers({ page });
    setPage(page);
  };

  const onBlockUser = async () => {
    await userServices.updateUserById(selectedUser.id, { status: 2 });
    setShowBlockModal(false);
    setSelectedUser({});
    fetchUsers({ status: 1 });
  };

  const onUpdateRole = async (role) => {
    await userServices.assignRole(selectedUser.id, role);
    setShowEditModal(false);
    window.location.reload()
  }

  const onSearchAccount = () => {};

  const copyTextToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <Title>All Accounts</Title>
      </div>
      <AdminFilter onSearch={onSearchAccount} />
      <AdminTable pages={totalPages} activePage={page} pageChange={changePage}>
        <table>
          <thead>
            <tr>
              <th>
                <AlignCenter>
                  <Checkbox type="checkbox" />
                  <Text color={colors.text_header} type={"body1"}>
                    Account
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <Text color={colors.text_header} type={"body1"}>
                  Email
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"body1"}>
                  Wallet
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"body1"}>
                  Status
                </Text>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              if (belowSM)
                return (
                  <tr key={index}>
                    <td>
                      <AlignCenter>
                        <Text color={colors.text_header} type={"body1"}>
                          Ronald Richards
                        </Text>
                        <Status />
                      </AlignCenter>
                      <Text color={colors.accent} type={"body1"}>
                        Admin
                      </Text>
                    </td>
                    <td>
                      <FlexRight>
                        <Button
                          color={colors.primary}
                          width={"80px"}
                          onClick={() => {
                            setSelectedUser(item);
                            setShowEditModal(true);
                          }}
                        >
                          <Text color={colors.text_header} type={"body2"}>
                            edit
                          </Text>
                        </Button>
                      </FlexRight>
                    </td>
                  </tr>
                );
              return (
                <tr key={index}>
                  <td>
                    <AlignCenter>
                      <Checkbox type="checkbox" />
                      <div>
                        <AlignCenter>
                          <Text color={colors.text_header} type={"body1"}>
                            {item.fullName ? item.fullName : "Updating..."}
                          </Text>
                          <Status />
                        </AlignCenter>
                        <Text color={colors.accent} type={"body1"}>
                          {item.role}
                        </Text>
                      </div>
                    </AlignCenter>
                  </td>
                  <td>
                    <Text color={colors.text_header} type={"body1"}>
                      {item.email ? item.email : "Updating..."}
                    </Text>
                  </td>
                  <td>
                    <AlignCenter>
                      <Text color={colors.text_header} type={"body1"}>
                        {item.public_address}
                      </Text>
                      <CopyIcon
                        src={copy_icon}
                        onClick={() => {
                          copyTextToClipboard(item.public_address);
                        }}
                      />
                    </AlignCenter>
                  </td>
                  <td>
                    <Text color={colors.text_header} type={"body1"}>
                      Active
                    </Text>
                  </td>
                  <td>
                    <FlexRight>
                      <Button
                        color={"rgba(225, 98, 110, 0.2);"}
                        width={"80px"}
                        onClick={() => {
                          setSelectedUser(item);
                          setShowBlockModal(true);
                        }}
                      >
                        <Text color={"#E1626E"} type={"body2"}>
                          Block
                        </Text>
                      </Button>
                      <Button
                        color={colors.primary}
                        width={"80px"}
                        onClick={() => {setShowEditModal(true); setSelectedUser(item)}}
                      >
                        <Text color={colors.text_header} type={"body2"}>
                          EDIT
                        </Text>
                      </Button>
                    </FlexRight>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AdminTable>
      {showEditModal && (
        <EditAccount
          onCloseModal={() => {
            setShowEditModal(false);
          }}
          isBlock={() => {
            setShowBlockModal(true);
            setShowEditModal(false);
          }}
          roles={roles}
          data={selectedUser}
          onUpdate={(e)=>onUpdateRole(e)}
        />
      )}
      {showBlockModal && (
        <BlockModal
          onCloseModal={() => {
            setShowBlockModal(false);
          }}
          data={selectedUser}
          onBlock={onBlockUser}
        />
      )}
    </>
  );
};

export default AllAccount;
