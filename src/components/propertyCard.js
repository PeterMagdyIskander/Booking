import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const PropertyCard = (props) => {
  return (
    <Link to={`/p/${props.id}`}>
      <div>
        <h1>{props.properties[props.propertyKey].name}</h1>
        <button>view more info</button>
      </div>
    </Link>
  );
};

function mapStateToProps({ properties }, { propertyKey,id }) {
  return {
    propertyKey,
    id,
    properties,
  };
}

export default withRouter(connect(mapStateToProps)(PropertyCard));
