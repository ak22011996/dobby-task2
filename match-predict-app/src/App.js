import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
				webTableData : []
			}
	}
	getTableDataFromWeb = function() {
		fetch('http://localhost:3000/getTableData', {
		  headers: {
			'Content-Type': 'application/json'
		  }
		})
		.then(res => res.json())
		.then(res => {
			//this.refreshPage();
			this.webTableData= res.response;
		})
	}
	
	predictMatch = function (){
		var club1= document.getElementById("club1Id").value;
		var club2= document.getElementById("club2Id").value;
		var webData = this.webTableData;
		var result="";
		var club1Data;
		var club2Data;
		var clubsTobeCompare = this.webTableData.filter(function(clubData){
			if(clubData.club.toLowerCase() == club1.toLowerCase()){
				club1Data = clubData;
				return clubData;
			} else if(clubData.club.toLowerCase() == club2.toLowerCase()){
				club2Data = clubData;
				return clubData;
			}
		});
		if(clubsTobeCompare.length == 2){
			var matchedPlayedByClub1 = club1Data.played;
			var matchedPlayedByClub2 = club2Data.played;
			var matchWonByClub1 = club1Data.won;
			var matchWonByClub2 = club2Data.won;
			var probOfClub1 = (matchWonByClub1/matchedPlayedByClub1);
			var probOfClub2 = (matchWonByClub2/matchedPlayedByClub2);
			if(probOfClub1>probOfClub2){
				result=club1 + " will win";
			} else if(probOfClub1<probOfClub2){
				result=club2 + " will win";
			} else {
				result="the match will be a draw";
			}
			
		} else {
			alert("Please enter valid club name");
		}
		document.getElementById("webData").innerText=result;
	}
	
	refreshPage = function() {
	  window.location.reload();
	}
	render() {
		this.getTableDataFromWeb();
		return (
			<div >
				<h1 style={{color:"blue"}}>Enter the club name to predict Result</h1>
				<input id="club1Id" placeholder="Enter Club Name"></input>
				<input id="club2Id" placeholder="Enter Club Name"></input>
				<button id="callButton" onClick={()=>this.predictMatch()}>Predict</button>
				<h1 id="webData"></h1>
			</div>
		);
	}
}