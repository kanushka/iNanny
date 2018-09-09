$(document).ready(function () {
	getBabysHeightData();
	getBabysWeightData();
	//test
	loadBabysStatusChart();
});


function getBabysHeightData() {
	let data = null;

	$.get(`${BASE_URL}user/HistoryController/getBabysHeightHistory`,
		function (data, status) {
			console.log(data);

			// convert data to arrays and show data in chart
			data = convertHeightListToArrays(data.height);
			loadBabysHeightChart(data.labels, data.data);
		});
}

function convertHeightListToArrays(heightList) {
	let dates = [];
	let height = [];

	for (let key in heightList) {
		if (heightList.hasOwnProperty(key)) {
			dates.push(formatDate(new Date(heightList[key].added_at)));
			height.push(heightList[key].height);
		}
	}

	return {
		labels: dates,
		data: height
	};
}

function loadBabysHeightChart(labels, data) {
	var ctx = $('#babysHeightChart');
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: "Height",
				// backgroundColor: '#388e3c',
				borderColor: '#388e3c',
				data: data,
				lineTension: 0,
			}],
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						suggestedMin: 30,
						// suggestedMax: 10
						stepSize: 5
					}
				}]
			}
		}
	});
}

function getBabysWeightData() {
	let data = null;

	$.get(`${BASE_URL}user/HistoryController/getBabysWeightHistory`,
		function (data, status) {
			console.log(data);

			// convert data to arrays and show data in chart
			data = convertWeightListToArrays(data.weight);
			loadBabysWeightChart(data.labels, data.data);
		});
}

function convertWeightListToArrays(weightList) {
	let dates = [];
	let weight = [];

	for (let key in weightList) {
		if (weightList.hasOwnProperty(key)) {
			dates.push(formatDate(new Date(weightList[key].added_at)));
			weight.push(weightList[key].weight);
		}
	}

	return {
		labels: dates,
		data: weight
	};
}

function loadBabysWeightChart(labels, data) {
	var ctx = $('#babysWeightChart');
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: "Weight",
				// backgroundColor: '#388e3c',
				borderColor: '#388e3c',
				data: data,
				lineTension: 0,
			}],
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						suggestedMin: 1,
						// suggestedMax: 10
						stepSize: 0.5
					}
				}]
			}
		}
	});
}


function loadBabysStatusChart(labels, data) {
	var ctx = $('#babysStatusChart');
	var myLineChart = new Chart(ctx, {
		type: 'radar',
		data: {
			labels: ['Sleepin', 'Playing', 'Eating', 'Laughing', 'Crying'],
			datasets: [{
				label: "Babys' Status",
				// backgroundColor: '#388e3c',
				borderColor: '#388e3c',
				data: [40, 10, 4, 10, 20],				
			}],
		},
		options: {

		}
	});
}



function formatDate(date) {
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return day + ' ' + monthNames[monthIndex] + ', ' + year;
}
