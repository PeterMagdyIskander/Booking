
import { connect } from "react-redux";
import PropertyCard from "./propertyCard";
const PropertiesPage = (props) => {
  const{propertyIds,properties}=props;
  return (
        <div>
        <h1>all properties</h1>
      <ol>
        {propertyIds.map((id) => (
          <li key={id}>
            <PropertyCard property={properties[id]} id={properties[id].id} />{" "}
          </li>
        ))}
      </ol>
         </div>
     
  );
};

function mapStateToProps({properties}){
  let propertyIds=Object.keys(properties);
  return {
    propertyIds,
    properties,
  }
}
export default connect(mapStateToProps)(PropertiesPage);
