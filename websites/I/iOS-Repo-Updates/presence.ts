const presence = new Presence({
		clientId: "1077062637336150117",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/emAYnQy.png",
		startTimestamp: browsingTimestamp
	},
	path = document.location.pathname.split("/");
	if (document.location.pathname === "/" || !document.location.pathname) {
		presenceData.details = "Browsing Home";
		presenceData.buttons = [
			{
				label: "Open",
				url: document.URL
			}
		];
	} else if (document.location.pathname.startsWith("/news")) {
		presenceData.details = "Browsing Latest packages";
		presenceData.buttons = [
			{
				label: "Open",
				url: document.URL
			}
		];
	} else if (document.location.pathname.startsWith("/popular")) {
		presenceData.details = "Browsing Popular packages";
		presenceData.buttons = [
			{
				label: "Open",
				url: document.URL
			}
		];
	} else if (document.location.pathname.startsWith("/repository")) {
		if (path[1] && path[2] && path[3] && path[4]) {
			presenceData.details = `Browsing ${document.querySelector("span.breakword").textContent}`;
			presenceData.state = document.querySelector("li.list-group-item > a").textContent;
			presenceData.buttons = [
				{
					label: "View Package",
					url: document.URL
				},
				{
					label: "View Repository",
					url: document.querySelector("li.list-group-item > a").getAttribute("href")
				}
			];
			presenceData.largeImageKey = document.querySelector("img.img-rounded").getAttribute("src");
		} else if (path[1] && path[2] && !path[3]) {
			presenceData.details = "Browsing Repository";
			presenceData.state = document.querySelector("span.breakword").textContent;
			presenceData.largeImageKey = document.querySelector("img.img-rounded").getAttribute("src");
			presenceData.buttons = [
				{
					label: "Add Repository",
					url: `https://www.ios-repo-updates.com/share/${path[2]}`
				},
				{
					label: "View Repository",
					url: document.URL
				}
			];
		}
	} else if (document.location.pathname.startsWith("/repositories")) {
		if (path[2] === "popular") {
			presenceData.details = "Browsing Popular repositories";
			presenceData.buttons = [
				{
					label: "Open",
					url: document.URL
				}
			];
		} else {
			presenceData.details = "Browsing Repositories";
			presenceData.buttons = [
				{
					label: "Open",
					url: document.URL
				}
			];
		}
	} else if (document.location.pathname.startsWith("/share")) {
		presenceData.details = "Browsing Repository share";
		presenceData.state = document.querySelector("span.breakword").textContent.slice(4);
		presenceData.largeImageKey = document.querySelector("img.img-rounded").getAttribute("src");
		presenceData.buttons = [
			{
				label: "Add Repository",
				url: document.URL
			},
			{
				label: "View Repository",
				url: `https://www.ios-repo-updates.com/repository/${path[2]}`
			}
		];
	} else if (document.location.pathname.startsWith("/search")) {
		presenceData.details = "Searching for:";
		presenceData.state = document.querySelector<HTMLInputElement>("input#s.form-control").value || null;
	}
	presence.setActivity(presenceData);
});