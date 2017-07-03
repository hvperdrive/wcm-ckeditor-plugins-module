"use strict";

(function() {
	angular.module("pelorus.services")
		.service("CKEditorConfigService", [

			function CKEditorConfigService() {
				var buses = [ "1", "13", "17", "19", "20", "21", "22", "23", "30", "31", "32", "33", "34", "36", "68", "81", "82", "83", "84", "85", "87", "89", "93", "95", "97", "99", "99S", "180", "181", "182", "183", "191", "290", "291", "295", "410", "411", "412", "413", "414", "416", "417", "418", "427", "429", "500", "507", "600", "601", "602", "605", "610", "620", "621", "629", "640", "641", "642", "720", "730", "760", "761", "762", "763", "764", "770", "771", "772", "776" ]; // eslint-disable-line
				var trams = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "15", "24" ];

				this.publicTransportLines = [].concat(
					trams.map(function(line) {
						return {
							name: "Buslijn " + line,
							icon: "ov-icon-" + line + "-tramlijn",
						};
					}),
					buses.map(function(line) {
						return {
							name: "Tramlijn " + line,
							icon: "ov-icon-" + line + "-buslijn",
						};
					})
				);

				this.$get = function() {
					return {
						publicTransportLines: this.publicTransportLines,
					};
				};
			},
		]);
})();
