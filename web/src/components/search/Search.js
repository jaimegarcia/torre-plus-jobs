import React from "react";
import { connect } from "react-redux";

import ChipInput from 'material-ui-chip-input'
import { setQuery} from "../../services/query/queryActions";
import { clearOpportunities,setGlobalPage } from "../../services/opportunities/opportunitiesActions";

export const generateFullExpresion=(...expressions)=>{
  let fullExpression={"and":[]};
  for(const expression of expressions){
    if(expression["or"].length>0)fullExpression["and"].push(expression);
  }

  return fullExpression;
}
export const generatePartExpression=(chips,type)=>{

  const newExpression={}

  newExpression["or"]=[];
  for(const chip of chips) {
    if(type==="skill/role"){
      newExpression["or"].push({"skill/role":{"text":chip,"experience":"potential-to-develop"}})
    }else if(type==="organization"){
      newExpression["or"].push({"organization":{"term":chip}})
    }
  }
  return newExpression;
  
}
/** Generate Expressions by mergings and with ors (Skills and Organizations)
 * @param  {} {dispatch} Redux dispatcher
 */
function Search({ dispatch }) {
  const [skillsExpression, setSkillsExpression] = React.useState({"or":[]});
  const [orgsExpression, setOrgsExpression] = React.useState({"or":[]});


  const setFullExpression=(...expressions)=>{

    const fullExpression=generateFullExpresion(...expressions);
    dispatch(clearOpportunities());
    dispatch(setQuery("expression", fullExpression));
    dispatch(setGlobalPage(1));

  }
  const handleSkillsChange=(chips)=>{
    const newSkillsExpression=generatePartExpression(chips,"skill/role");
    setSkillsExpression(newSkillsExpression);
    setFullExpression(newSkillsExpression,orgsExpression);

    
  }
  const handleOrganizationsChange=(chips)=>{
    const newOrgsExpression=generatePartExpression(chips,"organization");
    setOrgsExpression(newOrgsExpression);
    setFullExpression(skillsExpression,newOrgsExpression);

  }
  return (
    <React.Fragment>
      <ChipInput
        data-testid="chip-input-skills"
        defaultValue={[]}
        onChange={(chips) => handleSkillsChange(chips)}
        variant="outlined"
        color="primary"
        placeholder="Search Skills/Roles: eg.React, Software Engineer"
        fullWidth={true}
      />
      <br/><br/><br/>
      <ChipInput
        data-testid="chip-input-orgs"
        defaultValue={[]}
        onChange={(chips) => handleOrganizationsChange(chips)}
        variant="outlined"
        color="primary"
        placeholder="Search Organizations: eg.Torre, Google"
        fullWidth={true}
      />
  </React.Fragment>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Search);
