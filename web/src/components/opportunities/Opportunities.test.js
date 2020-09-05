import React from 'react'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../../test-utils'
import Opportunities from './Opportunities'

describe('Opportunities', () => {


  it('should render several pages', () => {

    const payload={
      "opportunities": [
        {
          "id": "KWNaMorO",
          "objective": "Frontend Software Engineer - Javascript/React Lead Developer",
          "type": "full-time-employment",
          "organizations": "Enveritas",
          "locations": "United States",
          "remote": true,
          "deadline": "2020-09-22T04:30:00.000Z",
          "status": "open",
          "skills": [
            "Software Development 5+",
            "Javascript 5+",
            "React 5+",
            "Front End 5+"
          ]
        },
        {
          "id": "qdPm2mrb",
          "objective": "Sr .Net/React Engineer",
          "type": "full-time-employment",
          "organizations": "AccelOne",
          "locations": "Argentina",
          "remote": true,
          "deadline": "2020-09-26T04:30:00.000Z",
          "status": "open",
          "skills": [
            "Fullstack Development 3+",
            "React 3+",
            "Computer Science 3+",
            "Software 3+"
          ]
        },
        {
          "id": "Vrojvpdy",
          "objective": "Desarrollador Web Front (React,angular,Vuejs)",
          "type": "full-time-employment",
          "organizations": "WIGILABS (GlobalSoft)",
          "locations": "Bogotá, Colombia",
          "remote": false,
          "deadline": null,
          "status": "open",
          "skills": [
            "CSS 1+",
            "HTML 1+",
            "Javascript 1+",
            "React 1+",
            "SQL 1+",
            "Linux 1+",
            "REST API 0+",
            "Node.js 0+",
            "Angular 0+",
            "Testing 0+",
            "Mobile Development 0+"
          ]
        },
        {
          "id": "PW9oj3dg",
          "objective": "Frontend Developer - React",
          "type": "full-time-employment",
          "organizations": "Sonar Telematics",
          "locations": "Medellín, Medellin, Antioquia, Colombia",
          "remote": false,
          "deadline": "2020-09-14T04:30:00.000Z",
          "status": "open",
          "skills": [
            "React 0+",
            "Redux 0+",
            "Javascript 0+",
            "REST API 0+",
            "GraphQL 0+",
            "HTML5 0+",
            "CSS 0+"
          ]
        },
        {
          "id": "VroNjmdy",
          "objective": "Senior React Engineer.",
          "type": "full-time-employment",
          "organizations": "hometime",
          "locations": "Remote",
          "remote": true,
          "deadline": "2020-09-08T04:30:00.000Z",
          "status": "open",
          "skills": [
            "React 3+",
            "Engineering 3+",
            "JS developer 3+",
            "Javascript 3+"
          ]
        },
        {
          "id": "8wD12bdl",
          "objective": "Programador React Native",
          "type": "full-time-employment",
          "organizations": "EmpleApp",
          "locations": "Remote",
          "remote": true,
          "deadline": null,
          "status": "open",
          "skills": [
            "React Native 0+",
            "React 0+",
            "Programar 0+"
          ]
        },
        {
          "id": "2wzVEAwq",
          "objective": "Senior Software Engineer (React or Angular)",
          "type": "full-time-employment",
          "organizations": "Gistia Labs",
          "locations": "Remote",
          "remote": true,
          "deadline": "2020-09-27T04:30:00.000Z",
          "status": "open",
          "skills": [
            "Software development 3+",
            "React 3+",
            "Angular 3+"
          ]
        },
        {
          "id": "6WZ6GMW1",
          "objective": "Remote React Developer Job",
          "type": "full-time-employment",
          "organizations": "X-Team",
          "locations": "Remote",
          "remote": true,
          "deadline": "2020-09-26T04:30:00.000Z",
          "status": "open",
          "skills": [
            "Software development 1+",
            "React 1+"
          ]
        },
        {
          "id": "ZW5aJLWa",
          "objective": "React",
          "type": "full-time-employment",
          "organizations": "Hintt",
          "locations": "Remote",
          "remote": true,
          "deadline": "2020-09-08T04:30:00.000Z",
          "status": "open",
          "skills": [
            "React 2+",
            "Frontend 3+",
            "Frontend developer 3+",
            "Javascript 2+",
            "Angular 2+"
          ]
        },
        {
          "id": "2wzVBgwq",
          "objective": "Fullstack React & Node Developer",
          "type": "full-time-employment",
          "organizations": "Nearsure",
          "locations": "Remote",
          "remote": true,
          "deadline": "2020-10-02T04:30:00.000Z",
          "status": "open",
          "skills": [
            "Software engineering 5+",
            "Software development 5+",
            "React 5+"
          ]
        },
        {
          "id": "Yd6GKgrp",
          "objective": "Developer FullStack JAVASCRIPT / REACT (Preferible si conoce GOLANG)",
          "type": "full-time-employment",
          "organizations": "LiciMatic",
          "locations": "Remote",
          "remote": true,
          "deadline": null,
          "status": "open",
          "skills": [
            "Node.js 1+",
            "React 1+",
            "Golang 0+",
            "PostgreSQL 0+",
            "google cloud 0+"
          ]
        },
        {
          "id": "8W3PN2wN",
          "objective": "Desarrolladores Full Stack PHP (Laravel), React Native, React JS, Javascript.",
          "type": "full-time-employment",
          "organizations": "Netgou",
          "locations": "Remote",
          "remote": true,
          "deadline": "2020-10-21T04:30:00.000Z",
          "status": "open",
          "skills": [
            "PHP and HTML5 1+",
            "Laravel 1+",
            "React 1+",
            "React Native 1+",
            "React.js 1+",
            "Javascript 1+"
          ]
        }
      ],
      "total": 12
    }
    
    render(<Opportunities />,{
      initialState: { opportunities:{opportunities:[payload.opportunities],current:payload.opportunities.slice(0,10),total:payload.total,globalPage:1 },query:{searching:false,expression:""}},
    })

    expect(screen.getByText("Frontend Software Engineer - Javascript/React Lead Developer")).toBeInTheDocument(); //Page 1 - First Result
    fireEvent.click(screen.getAllByTitle("Next page")[0]) // Click Next Page
    expect(screen.getByText("Desarrolladores Full Stack PHP (Laravel), React Native, React JS, Javascript.")).toBeInTheDocument(); //Page 2 - Last Result

  })
});