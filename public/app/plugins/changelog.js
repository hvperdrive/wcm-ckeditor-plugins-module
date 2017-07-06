"use-strict";

(function(CKEDITOR) {
	angular.module("ckeditor-plugins_0.0.55")
		.factory("ckeditorPluginChangelog", [

			"CKEditorConfig",
			"DialogService",

			function ckeditorPluginChangelog(
				CKEditorConfig,
				DialogService
			) {
				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["changelog"],
						}],
						extraPlugins: "changelog",
					},
					plugin: {
						init: function(editor) {
							var updateWidget = function(entries, container) {
								if (!entries.length) {
									return;
								}

								container.setHtml(entries.map(function(entry) {
									return "<p class=\"wcm-changelog__entry\" data-status=\"" + entry.status + "\"><span class=\"wcm-changelog__status wcm-changelog__status--" + entry.status + "\">" + entry.status + "</span><span class=\"wcm-changelog__message\">" + entry.message + "</span></p>";
								}).join(""));
							};

							editor.widgets.add("changelog", {
								template: [
									"<div class=\"wcm-changelog\">",
										"<div class=\"wcm-changelog__entries\">", // eslint-disable-line
											"<p class=\"wcm-changelog__entry\" data-placeholder=\"true\">No entries yet</p>", // eslint-disable-line
										"</div>", // eslint-disable-line
									"</div>",
								].join(""),
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-changelog");
								},
								downcast: function() {
									updateWidget(this.data.entries, this.element.getChild(0));
								},
								init: function() {
									var widget = this;
									var data = {
										entries: [],
									};
									var newData = null;
									var entries = widget.element.getChild(0).getChildren();

									for (var i = 0; i < entries.count(); i += 1) {
										var entry = entries.getItem(i);

										if (entry.getAttribute("data-placeholder")) {
											continue;
										}

										data.entries.push({
											status: entry.getAttribute("data-status"),
											message: entry.getText(),
										});
									}

									widget.setData("entries", data.entries);

									widget.on("edit", function() {
										newData = angular.copy(widget.data);
										DialogService.openModal({
											templateUrl: CKEditorConfig.modulePath + "templates/changelogModal.tpl.html",
											data: newData,
											controller: ["$scope", function($scope) {
												$scope.statuses = ["NEW", "IMPROVED", "FIXED"];

												$scope.addEntry = function() {
													$scope.ngDialogData.entries.push({
														status: "NEW",
														message: "New entry",
													});
												};

												$scope.removeEntry = function(index) {
													$scope.ngDialogData.entries.splice(index, 1);
												};
											}],
											appendClassName: "ngdialog--lg",
										}).then(function() {
											widget.setData("entries", newData.entries);
											updateWidget(newData.entries, widget.element.getChild(0));
											editor.fire("change");
										});
									});
								}
							});

							editor.ui.addButton("changelog", {
								label: "Add a changelog",
								command: "changelog",
								toolbar: "insert",
								icon: "/assets/modules/" + CKEditorConfig.name + "_" + CKEditorConfig.version + "/img/changelog.png",
								hidpi: true,
							});
						},
					},
				};
			},
		]);
})(window.CKEDITOR);
