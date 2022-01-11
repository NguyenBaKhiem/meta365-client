import Button from "@Components/Button";
import Card from "@Components/Card";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Text from "../../../components/Text";
import { colors } from "../../../theme/colors";
import { InfoHeader, SelectButton } from "../../Marketplace/StyledMarketplace";
import { InfoDetail } from "../StyledMyLand";
import { Badge, OffSale, OnSale } from "./style";

const /**
 *
 *
 * @return {*} 
 */
CardDetail = (props) => {
  const { buttonName, data, id, selectedItem, handleSelectItem } = props;
  const [active, setActive] = React.useState(false);
  useEffect(() => {
    if (selectedItem.length === 0) return setActive(false);
    
    for (let item of selectedItem) {
      setActive(false);
      if (item.id === id) {
        setActive(true);
        break;
      }
    }
  }, [selectedItem]);
  
  return (
    <>
      <Card image={data.thumbnail} id={data.nftId}>
        {!data.onSale && (
          <SelectButton
            active={active}
            onClick={() =>
              handleSelectItem({
                id: data.nftId,
                landCode: data.landCode,
              }, !active)
            }
          ></SelectButton>
        )}
        <Badge>
          <span>{data.rank}</span>
        </Badge>
        {data.onSale ? (
          <OnSale>
            <span>ONSALE</span>
          </OnSale>
        ): <OffSale><span>OFFSALE</span></OffSale>}
        <InfoHeader>
          <Text type={"body2"} color={colors.text_header}>
            {`${data.landCode}-${data.nftId}`}
          </Text>
          {/* <Text type={"body1"} color={colors.accent}>
            {data.onSale && (
              <>
                {data.originalLandPrice !== undefined
                  ? data.originalLandPrice
                  : data.price}
                UCC
              </>
            )}
          </Text> */}
        </InfoHeader>
        <InfoDetail>
          <Text type={"body1"} color={colors.text_body}>
            Direction
          </Text>
          <Text type={"body1"} color={colors.text_header}>
            {data.direction}
          </Text>
        </InfoDetail>
        <InfoDetail style={{ marginBottom: "6px" }}>
          <Text type={"body1"} color={colors.text_body}>
            Area
          </Text>
          <Text type={"body1"} color={colors.text_header}>
            {data.squares}
          </Text>
        </InfoDetail>
        <Link to={`/detail/${data.nftId}`}>
          <Button color={colors.new_button} width="100%">
            {buttonName}
          </Button>
        </Link>
      </Card>
    </>
  );
};

export default CardDetail;
