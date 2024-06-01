import { Col } from "react-bootstrap";
import { BASE_URL } from "../../mocks/handlers";

export default function ScoopOptions({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`${BASE_URL}/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
}
