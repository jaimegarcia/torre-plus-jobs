const Axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent();

const axios = Axios.create({ httpsAgent,timeout:10000 });


const formatPrice = (x) => {
  return x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(".00","");

};

/**
 * Get Opportunities List from Torre API
 * @param  {Number} req.query.offset Cursor to API
 * @param  {Number} req.query.size Size of Pagination
 * @param  {Object} req.body.query Query with Skills and Organizations to look on API
 */
exports.postOpportunities = async (req, res) => {
	const {offset,size} = req.query;
  const {query} = req.body;
  if(!offset || !size  || !query) return res.status(400).json({error:`You need to include a size, offset and query`});

	const aggregate=true;
	const endpoint="https://search.torre.co/opportunities/_search/?";
	
  try{
    const response=await axios.post(
      endpoint + `offset=${offset}&size=${size}&aggregate=${aggregate}`, 
      query,
      {headers: {'Content-Type': 'application/json'}},
    )
    if(response.data.results){

			const results=response.data.results;

			
			const opportunitiesData=results.map((x)=>{
				const skills=x.skills.map((skill)=>`${skill.name} ${skill.experience.replace("potential-to-develop","0+").replace(/-plus-year(s\b|\b)/,"+")}`);

      
        let compensation=x.compensation && x.compensation.data && x.compensation.data.minAmount>0 &&
        `${x.compensation.data.currency} ${formatPrice(x.compensation.data.minAmount)} ${x.compensation.data.maxAmount?" - "+formatPrice(x.compensation.data.maxAmount):""} /${x.compensation.data.periodicity}`
        compensation=compensation || "To Be Defined";
				return {
					id:x.id,
					objective:x.objective,
					type:x.type,
					organizations:x.organizations.length ?x.organizations.map(x=>x.name).join(", "):"",
					locations:x.locations.length ?x.locations.join(", "):"Remote",
					remote:x.remote,
					weight: x.weight,
					deadline:x.deadline,
					status:x.status,
					compensation,
					skills
				}
      });
      return res.status(200).json({opportunities:opportunitiesData,total:response.data.total})

    }else{
      throw response.data.error;
    }
  }catch(err) {
      return res.status(400).json({error:`${err}`})
  }
}




/**
 * Get Opportunity Detail from Torre API
 * @param  {String} req.params.id ID of the Opportunity
 */
exports.getOpportunity = async (req, res) => {
	const {id} = req.params;
	const endpoint="https://torre.co/api/opportunities/";
  if(!id) return res.status(400).json({error:`You need to include a valid Opportunity ID`})
  
  try{
    const response=await axios.get(
      endpoint + `${id}`,
      {headers: {'Content-Type': 'application/json'}},
    )
    if(response.data){

			const results=response.data;
      delete results["attachments"];
      delete results["owner"];
      const skills=results.strengths.map((skill)=>`${skill.name} ${skill.experience.replace("potential-to-develop","0+").replace(/-plus-year(s\b|\b)/,"+")}`);
      results.skills=skills;
      delete results["strengths"];
      results.compensation=results.compensation && results.compensation.minAmount>0 &&
      `${results.compensation.currency} ${formatPrice(results.compensation.minAmount)} ${results.compensation.maxAmount?" - "+formatPrice(results.compensation.maxAmount):""} /${results.compensation.periodicity}`
      results.compensation=results.compensation || "To Be Defined";
      return res.status(200).json({opportunity:results}) //TODO: Improve comparison

    }else{
      throw response.data.error;
    }
  }catch(err) {
      return res.status(400).json({error:`${err}`})
  }
}
