import { useEffect ,useState} from "react";
import { connect } from "react-redux";
import PropertyCard from "./propertyCard";
import  { hideLoading, showLoading }  from "react-redux-loading-bar";
import { getProperties } from "../utils/api";

import { receiveProperties } from "../actions/properties"
const PropertiesPage = (props) => {
const [properties,setProperties]=useState(null);
const [loading,setLoading]=useState(false);
const {dispatch}=props;
  useEffect(() => {
    dispatch(showLoading());
    getProperties().then(AllProperties=>{
      console.log('KEKL',AllProperties);
      setProperties(AllProperties)
      dispatch(receiveProperties(AllProperties));
      
      setLoading(true);
      dispatch(hideLoading());
    })
  });


  return (
    <div>
      {
        loading &&
        <div>
        <h1>all properties</h1>
      <ol>
        {properties.map((property) => (
          <li key={property.id}>
            <PropertyCard property={property} id={property.id} />{" "}
          </li>
        ))}
      </ol>
         </div>
      }
    </div>
  );
};


export default connect()(PropertiesPage);
