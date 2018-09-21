$(document).ready(function () {
	getBabysHeightData();
	getBabysWeightData();

	//test
	loadBabysStatusChart();
	loadBabysSleepChart();

	console.log('baby history ready');
	$('#roundPreloader').fadeOut();
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
	// console.log(data);
	// console.log(labels);
	var ctx = $('#babysHeightChart');
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
					label: "Height",
					backgroundColor: 'rgba(0, 180, 50, 0.4)',
					borderColor: '#388e3c',
					data: data,
					lineTension: 0,
					pointHoverRadius: 10
				},
				{
					label: "High height",
					backgroundColor: 'rgba(0, 57, 92, 0.2)',
					borderColor: '#0091ea',
					data: ["50", "52", "56", "62", "70", "80", "92", "106"],
					lineTension: 0,
					fill: "1"
				},
				{
					label: "Low height",
					backgroundColor: 'rgba(0, 57, 92, 0.2)',
					borderColor: '#0091ea',
					data: ["40", "41", "43", "46", "50", "55", "61", "68"],
					lineTension: 0,
					fill: "-1"
				}
			],
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						suggestedMin: 30,
						// suggestedMax: 10
						// stepSize: 5
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
					backgroundColor: 'rgba(0, 180, 50, 0.4)',
					borderColor: '#388e3c',
					data: data,
					lineTension: 0,
					pointHoverRadius: 10
				},
				{
					label: "High weight",
					backgroundColor: 'rgba(0, 57, 92, 0.2)',
					borderColor: '#0091ea',
					data: ["3", "3.5", "4.5", "6", "8", "10.5"],
					lineTension: 0,
					fill: "1"
				},
				{
					label: "Low weight",
					backgroundColor: 'rgba(0, 57, 92, 0.2)',
					borderColor: '#0091ea',
					data: ["2", "2.2", "2.6", "3.2", "4", "5"],
					lineTension: 0,
					fill: "-1"
				}
			],
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						suggestedMin: 1,
						// suggestedMax: 10
						// stepSize: 5
					}
				}]
			}
		}
	});
}


function loadBabysSleepChart(labels, data) {

	var ctx = $('#babysSleepChart');
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["24 May, 2018", "24 May, 2018", "24 May, 2018", "24 May, 2018", "24 May, 2018", "24 May, 2018", "24 May, 2018", "2 July, 2018"],
			datasets: [{
				label: "Sleeping line",
				fill: false,
				steppedLine: true,
				borderColor: '#388e3c',
				data: ["1", "2", "2", "2", "1", "1", "2", "2"],
				lineTension: 0,
				pointHoverRadius: 10
			}, ],
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						suggestedMin: 0,
						suggestedMax: 3,
						stepSize: 1,
						callback: function (value, index, values) {
							if (value == 2) {
								return "sleep";
							} else if (value == 1) {
								return "awake";
							}
						}
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
			labels: ['Sleep', 'Play', 'Eat', 'Laugh', 'Cry'],
			datasets: [{
					label: "Babys' Current Status",
					backgroundColor: 'rgba(0, 180, 50, 0.2)',
					borderColor: '#388e3c',
					data: [40, 30, 30, 20, 30],
				},
				// {
				// 	label: "Default Status",
				// 	backgroundColor: 'rgba(0, 57, 92, 0.2)',
				// 	borderColor: '#0091ea',
				// 	data: [40, 30, 40, 20, 30],
				// }
			],
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
