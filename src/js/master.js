const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const daylight = {
	january: {
		sunrise: '9',
		sunset: '5'
	},
	february: {
		sunrise: '8',
		sunset: '6'
	},
	march: {
		sunrise: '7',
		sunset: '7'
	},
	april: {
		sunrise: '7',
		sunset: '9'
	},
	may: {
		sunrise: '6',
		sunset: '9'
	},
	june: {
		sunrise: '5',
		sunset: '10'
	},
	july: {
		sunrise: '6',
		sunset: '10'
	},
	august: {
		sunrise: '6',
		sunset: '9'
	},
	september: {
		sunrise: '7',
		sunset: '8'
	},
	october: {
		sunrise: '8',
		sunset: '7'
	},
	november: {
		sunrise: '8',
		sunset: '5'
	},
	december: {
		sunrise: '9',
		sunset: '4'
	}
}

formatAMPM = function(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;

	if ((ampm === 'AM' && hours <= getSunRiseAndSunSet().sunrise) || (ampm === 'PM' && hours >= getSunRiseAndSunSet().sunset))  {
		if (!document.body.classList.contains('dark-mode')) {
			document.body.classList.add('dark-mode');
		}
	} else {
		if (document.body.classList.contains('dark-mode')) {
			document.body.classList.remove('dark-mode');
		}
	}

	return strTime;
};

getSunRiseAndSunSet = function() {
	var date = new Date();
	var month = monthNames[date.getMonth()];

	return {
		sunrise: daylight[month].sunrise,
		sunset: daylight[month].sunset,
	}
};

getTime = function() {
	var time = document.getElementById('time');
	var now = new Date();
	now.toUTCString();
	var millis = now.getTime() + (now.getTimezoneOffset() * 60000)
	now.setTime(millis - (-120 * 60000))

	time.innerHTML = formatAMPM(now);
};

currentTime = function () {
	getTime();
	setInterval(function(){
		getTime();
	},1000);
  };

imageDefer = function () {
	var imgDefer = document.getElementsByTagName('img');
	for (var i = 0; i < imgDefer.length; i++) {
		if (imgDefer[i].getAttribute('data-src-x1')) {
			if (window.devicePixelRatio >= 2) {
				imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src-x2'));
			} else {
				imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src-x1'));
			}
		}
	}
};

copyRight = function () {
	var copyRight = document.getElementById('copyright'),
		year = new Date();

	copyRight.innerHTML = year.getFullYear();
};

// onload
getSunRiseAndSunSet();
currentTime();
imageDefer();
copyRight();

// google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-116960412-1', 'auto');
ga('send', 'pageview');
