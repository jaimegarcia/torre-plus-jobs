import React from 'react'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../../test-utils'
import Search,{generatePartExpression,generateFullExpresion} from './Search';
import { getByTestId, getByTitle,within } from '@testing-library/react';

const skillChips=["React","Vue","Javascript"];
const organizationChips=["Stripe","Torre","Google"];

describe('Search', () => {

  it('should generate and expression from skills', () => {

    const fullExpression=generateFullExpresion(generatePartExpression(skillChips,"skill/role"),{"or":[]});

    expect(fullExpression).toEqual({"and":[{"or":[{"skill/role":{"text":"React","experience":"potential-to-develop"}},{"skill/role":{"text":"Vue","experience":"potential-to-develop"}},{"skill/role":{"text":"Javascript","experience":"potential-to-develop"}}]}]})

  })
  it('should generate and expression from orgs', () => {


    const fullExpression=generateFullExpresion({"or":[]},generatePartExpression(organizationChips,"organization"));

    expect(fullExpression).toEqual({"and":[{"or":[{"organization":{"term":"Stripe"}},{"organization":{"term":"Torre"}},{"organization":{"term":"Google"}}]}]})

  })
  it('should generate and expression from skills and orgs', () => {


    const fullExpression=generateFullExpresion(generatePartExpression(skillChips,"skill/role"),generatePartExpression(organizationChips,"organization"));

    expect(fullExpression).toEqual({"and":[{"or":[{"skill/role":{"text":"React","experience":"potential-to-develop"}},{"skill/role":{"text":"Vue","experience":"potential-to-develop"}},{"skill/role":{"text":"Javascript","experience":"potential-to-develop"}}]},{"or":[{"organization":{"term":"Stripe"}},{"organization":{"term":"Torre"}},{"organization":{"term":"Google"}}]}]})

  })

  it('should generate chips', () => {



    const addChip=(chip,input)=>{
      fireEvent.change(input, {
        target: {value: chip}
      })
      fireEvent.blur(input);
    }
    render(<Search />);

    for(const chip of skillChips) addChip(chip,within(screen.getByTestId('chip-input-skills')).getByRole('textbox')); //Add "React","Vue","Javascript" to SkillChips
    for(const chip of organizationChips) addChip(chip,within(screen.getByTestId('chip-input-orgs')).getByRole('textbox')); //Add "Stripe","Google","Torre" to OrgChips
    
    for(const chip of skillChips.concat(organizationChips)){
      expect(screen.getAllByText(chip)[0]).toBeInTheDocument(); //
    }
    
  })
});