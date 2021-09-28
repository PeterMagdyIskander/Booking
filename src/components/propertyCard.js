import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const PropertyCard = (props) => {
  return (
    <Link to={`/property/${props.id}`}>
      <div>
        <h1>{props.property.name}</h1>
        <button>view more info</button>
      </div>
    </Link>
  );
};


export default withRouter(connect()(PropertyCard));
