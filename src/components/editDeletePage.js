import { connect } from "react-redux";
import EditDeleteCard from "./editDeleteCard";

const EditDeletePage = (props) => {
  return (
    <div>
      <h1>all properties that you can edit</h1>
      <ol>
        {props.propertyIds.map((propertyId) => (
          <li key={propertyId}>
            <EditDeleteCard id={propertyId} />{" "}
          </li>
        ))}
      </ol>
    </div>
  );
};

function mapStateToProps({authedUser }) {
  const propertyIds=authedUser.propertyIds;
  return {
    propertyIds,
  };
}

export default connect(mapStateToProps)(EditDeletePage);
