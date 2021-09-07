import { connect } from "react-redux";
import properties from "../reducers/properties";
import PropertyCard from "./propertyCard";

const propertiesPage = (props) => {
  return (
    <div>
      <h1>all properties authedUser:{props.authedUser}</h1>
      <ol>
        {props.propertyKeys.map((propertyKey) => (
          <li key={props.properties[propertyKey].id}>
            <PropertyCard propertyKey={propertyKey} id={props.properties[propertyKey].id} />{" "}
          </li>
        ))}
      </ol>
    </div>
  );
};

function mapStateToProps({ properties, authedUser }) {
  console.log("hi",properties);
  const propertyKeys=Object.keys(properties);
  return {
    propertyKeys,
    properties,
    authedUser,
  };
}

export default connect(mapStateToProps)(propertiesPage);
