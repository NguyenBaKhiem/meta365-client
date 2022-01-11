import React from "react";

const InfiniteScroll = () => {
  const fetchDataSelling2 = (filter = {}) => {
    setLoading(true);
    nftServices
      .getNFTOnSale({ limit: 20, ...filter })
      .then((res) => {
        let all = new Set([...myLandData, ...res.results]);
        setMyLandData([...all]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const fetchOwnedData2 = (filter = {}) => {
    setLoading(true);
    nftServices
      .getOwnNFTs({ limit: 20, ...filter })
      .then((res) => {
        let all = new Set([...myLandData, ...res.results]);
        setMyLandData([...all]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    if (selectedType === "holding") fetchOwnedData2({ page: pageNum });
    else fetchDataSelling2({ saleType: selectedType, page: pageNum });
  }, [pageNum]);
  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return <></>;
};

export default InfiniteScroll;
