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
import UnblockModal from "./UnblockModal";
import AdminFilter from "@Components/AdminFilter";
import Text from "@Components/Text";
import { userServices } from "@Services";
import { useNavigate } from "react-router-dom";

function copyToClipboard(text) {
  if(navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Could not copy text: ', err);
      });
  } else {
    const dummyElement = document.createElement('span');
    dummyElement.style.whiteSpace = 'pre'
    dummyElement.textContent = text;
    document.body.appendChild(dummyElement)

    const selection = window.getSelection();
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNode(dummyElement)
    selection.addRange(range)

    document.execCommand('copy');

    selection.removeAllRanges()
    document.body.removeChild(dummyElement)
  }
}


const AllBlockedAccount = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [tableData, setTableData] = useState([1, 1]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    fetchUsers({ status: 2 });
  }, []);

  const fetchUsers = (filter = {}) => {
    setLoading(true);

    userServices
      .getUsers(filter)
      .then((res) => {
        if(res.code===403){
          return navigate('/403')
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

  const onUnBlockUser = async () => {
    await userServices.updateUserById(selectedUser.id, { status: 1 });
    setShowBlockModal(false);
    setSelectedUser({});
    fetchUsers({ status: 2 });
  };

  const onSearchAccount = () => {};

  const copyTextToClipboard = async (text) => {
    copyToClipboard(text);
  };

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <Title>Blocked Accounts</Title>
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
                            setShowBlockModal(true);
                          }}
                        >
                          <Text color={colors.text_header} type={"body2"}>
                            Unblock
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
                      Blocked
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
                          Unblock
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

      {showBlockModal && (
        <UnblockModal
          onCloseModal={() => {
            setShowBlockModal(false);
          }}
          data={selectedUser}
          onUnblock={onUnBlockUser}
        />
      )}
    </>
  );
};

export default AllBlockedAccount;
