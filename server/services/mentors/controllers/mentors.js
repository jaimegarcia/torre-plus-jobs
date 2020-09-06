
const Axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent();

const axios = Axios.create({ httpsAgent,timeout:10000 });



const YEARLY_TO_HOURLY=40*52;//Weekly Hours * 52 Weeks
const MONTHLY_TO_HOURLY=40*4;//Weekly Hours * 4 Weeks

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
 * Get Mentors List from Torre API based on MentorsQuery
 * @param  {Number} req.query.offset Cursor to API
 * @param  {Number} req.query.size Size of Pagination
 */
exports.postMentors = async (req, res) => {
	const {offset,size} = req.query;
	if(!offset || !size) return res.status(400).json({error:`You need to include a size and offset`});
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
					compensation:{ //Separate Currency USD, Symbol $, and rounded amount 25.12
						currency: x.compensations.freelancer.currency.slice(0,3),
						symbol:x.compensations.freelancer.currency.slice(3,4),
						amount:Math.round(compesationAmount*100)/100
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
 * Get Mentor BIO from Torre API
 * @param  {String} req.params.username username of the Mentor
 */
exports.getMentor= async (req, res) => {
	const {username} = req.params;
	const endpoint="https://torre.bio/api/bios/";
  if(!username) return res.status(400).json({error:`You need to include a valid Mentor Username`});
  try{
    const response=await axios.get(
      endpoint + `${username}`,
      {headers: {'Content-Type': 'application/json'}},
    )
    if(response.data.person){
			//Separate Currency USD, Symbol $, and rounded amount 25.12. Format is different than list, so is necessary to filter opportunities
			const results=response.data.person;
			const opportunities=response.data.opportunities;

			const gigsOportunities=opportunities.filter(x=>x.interest==="gigs");
			const currencySymbol=gigsOportunities.filter(x=>x.field==="desirable-compensation-currency")[0].data;

			let amount=gigsOportunities.filter(x=>x.field==="desirable-compensation-amount")[0].data;

			let periodicity=gigsOportunities.filter(x=>x.field==="desirable-compensation-periodicity")[0].data;

			if(periodicity==="monthly") amount=amount/MONTHLY_TO_HOURLY;
			if(periodicity==="yearly") amount=amount/YEARLY_TO_HOURLY;
			results.compensation= { 
				amount:Math.round(amount*100)/100,
				currency:currencySymbol.slice(0,3),
				symbol:currencySymbol.slice(3,4),
			}
			delete results["flags"];

      return res.status(200).json({mentor:results})

    }else{
      throw response.data.error;
    }
  }catch(err) {
      return res.status(400).json({error:`${err}`})
  }
}