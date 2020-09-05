const Axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent();

const axios = Axios.create({ httpsAgent,timeout:10000 });

const endpoint="https://search.torre.co/opportunities/_search/?";


/**
 * Get Mentors from Torre API
 * @param  {} req
 * @param  {} res
 */
exports.postOpportunities = async (req, res) => {
	const {offset,size} = req.query;
	const {query} = req.body;
  const aggregate=true;
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
					compensations:x.compensations,
					skills
				}
			});
      return res.status(200).json({opportunities:opportunitiesData})

    }else{
      throw response.data.error;
    }
  }catch(err) {
      return res.status(400).json({error:`${err}`})
  }
}