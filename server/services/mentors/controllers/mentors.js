const Axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent();

const axios = Axios.create({ httpsAgent,timeout:10000 });



const YEARLY_TO_HOURLY=40*52;
const MONTHLY_TO_HOURLY=40;

const mentorsQuery={
	"and": [{
		"skill/role": {
			"text": "Recruitment",
			"experience": "5-plus-years"
		}
	}, {
		"opento": {
			"term": "mentoring"
		}
	}, {
		"opento": {
			"term": "freelance-gigs"
		}
	}, {
		"compensation": {
			"amount": 200,
			"currency": "USD$",
			"periodicity": "hourly"
		}
	}]
}
/**
 * Get Mentors from Torre API
 * @param  {} req
 * @param  {} res
 */
exports.postMentors = async (req, res) => {
  const {offset,size} = req.query;
	const aggregate=true;
	const endpoint="https://search.torre.co/people/_search/?";
  try{
    const response=await axios.post(
      endpoint + `offset=${offset}&size=${size}&aggregate=${aggregate}`, 
      mentorsQuery,
      {headers: {'Content-Type': 'application/json'}},
    )
    if(response.data.results){

			const results=response.data.results.filter(x=>x.compensations.freelancer);

			const mentorsData=results.map(x=>{
				let compesationAmount=x.compensations.freelancer.amount;
				if(x.compensations.freelancer.periodicity==="monthly") compesationAmount=compesationAmount/MONTHLY_TO_HOURLY;
				if(x.compensations.freelancer.periodicity==="yearly") compesationAmount=compesationAmount/YEARLY_TO_HOURLY;

				return {
					id:x.subjectId,
					username:x.username,
					name:x.name,
					professionalHeadline:x.professionalHeadline,
					picture:x.picture,
					weight: x.weight,
					compensation:{
						currency: x.compensations.freelancer.currency.slice(0,3),
						amount:compesationAmount
					}
				}
			});
      return res.status(200).json({mentors:mentorsData})

    }else{
      throw response.data.error;
    }
  }catch(err) {
      return res.status(400).json({error:`${err}`})
  }
}


/**
 * Get Mentors from Torre API
 * @param  {} req
 * @param  {} res
 */
exports.getMentor= async (req, res) => {
	const {username} = req.params;
	const endpoint="https://torre.bio/api/bios/";
  if(!username) return res.status(400).json({error:`You need to include a valid Mentor Username`})
  console.log("endpoi")
  try{
    const response=await axios.get(
      endpoint + `${username}`,
      {headers: {'Content-Type': 'application/json'}},
    )
    if(response.data.person){

			const results=response.data.person;
			delete results["flags"]
      return res.status(200).json({mentor:results})

    }else{
      throw response.data.error;
    }
  }catch(err) {
      return res.status(400).json({error:`${err}`})
  }
}