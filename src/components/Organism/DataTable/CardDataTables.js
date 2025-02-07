import React from "react";
import { Card } from "react-bootstrap";
// import DataTable from "../../Molecule/DataTables/DataTable.js";
import DataTable1 from "../../Molecule/DataTables/DataTable1.js";

const UserCard = ({ users }) => {
  return (
    <Card className="bg-light equal-card">
      <Card.Body>
        <Card.Text>
          {/* <DataTable data={users} /> */}
          <DataTable1 data1={users} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
