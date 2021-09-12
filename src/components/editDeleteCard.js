import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const EditDeleteCard = (props) => {
  return (
    <Link to={`/EditDeleteProperty/${props.id}`}>
      <div>
        <h1>{props.properties[props.propertyKey].name}</h1>
        <button>Edit Property</button>
      </div>
    </Link>
  );
};

function mapStateToProps({ properties }, {id }) {
    const propertiesKeys=Object.keys(properties);
    for(let i=0;i<propertiesKeys.length;i++){
        if(properties[i].id===id){
            var propertyKey=i;
            break;
        }
    }
  return {
    propertyKey,
    id,
    properties,
  };
}

export default withRouter(connect(mapStateToProps)(EditDeleteCard));
