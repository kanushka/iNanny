$(document).ready(function () {
	getBabysHeightData();
	getBabysWeightData();
	getBabysLastActivities();
	getBabysActivityGroups();

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


function getBabysLastActivities(limit = 20) {
	let data = null;

	$.get(`${BASE_URL}babies/activities/limit/${limit}`,
		function (data, status) {
			console.log(data);

			// convert data to arrays and show data in chart
			data = convertActivityListToArrays(data.activities);
			loadBabysSleepChart(data.labels, data.data);
		});
}

function convertActivityListToArrays(activityList) {
	let dates = [];
	let activity = [];

	// reverse array
	activityList.reverse();

	for (let key in activityList) {
		if (activityList.hasOwnProperty(key)) {
			dates.push(formatTime(new Date(activityList[key].added_at)));
			activity.push((activityList[key].status) > 1 ? 2 : 1);
		}
	}

	return {
		labels: dates,
		data: activity
	};
}

function loadBabysSleepChart(labels, data) {

	var ctx = $('#babysSleepChart');
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: "Sleeping line",
				fill: false,
				steppedLine: true,
				borderColor: '#388e3c',
				data: data,
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
								return "awake";
							} else if (value == 1) {
								return "sleep";
							}
						}
					}
				}]
			}
		}
	});
}


function getBabysActivityGroups(limit = 1) {
	let data = null;

	$.get(`${BASE_URL}babies/activities/day-limit/${limit}/group`,
		function (data, status) {
			console.log(data);

			// convert data to arrays and show data in chart
			data = convertActivityGroupsToArrays(data.status);
			loadBabysStatusChart(data.labels, data.data);
		});
}

function convertActivityGroupsToArrays(activityList) {
	let status = [];
	let count = [];

	// reverse array
	activityList.reverse();

	for (let key in activityList) {
		if (activityList.hasOwnProperty(key)) {
			status.push(activityList[key].status);
			count.push((activityList[key].count) * 5);
		}
	}

	return {
		labels: status,
		data: count
	};
}

function loadBabysStatusChart(labels, data) {
	var ctx = $('#babysStatusChart');
	var myLineChart = new Chart(ctx, {
		type: 'radar',
		data: {
			labels: labels,
			datasets: [{
					label: "Babys' Current Status",
					backgroundColor: 'rgba(0, 180, 50, 0.2)',
					borderColor: '#388e3c',
					data: data,
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

var formatTime = function (date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
};
