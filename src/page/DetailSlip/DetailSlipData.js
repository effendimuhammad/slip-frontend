import React, { useState } from "react";
import DetailModal from "./DetailSlip.js";
import { Button } from "react-bootstrap";

const ParentComponent = () => {
  const [detailData, setDetailData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const updateDetailData = (updatedItem) => {
    setDetailData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div>
      <Button onClick={handleShowModal}>Show Details</Button>
      <DetailModal
        show={showModal}
        handleClose={handleCloseModal}
        detailData={detailData}
        updateDetailData={updateDetailData}
      />
    </div>
  );
};

export default ParentComponent;
