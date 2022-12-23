import axios from "axios";

export default class PostService {
	//static url = "http://www.wptest.site";
	//static url = "https://www.zvspeleo.ru";

	static async authTry(token) {
		if (token) {
			return { isAuth: false, JWT: "", error: false };
		}
		return { isAuth: false, JWT: "", error: false };
	}

	static checkNonce(nonce) {
		if (nonce) return nonce;
		const e = document.getElementById("_wpnonce");
		if (e) return e.value;
		return "x";
	}

	static async getRequests(nonce, auth) {
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=requests_get",
			data: { nonce: "x", auth: false },
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
	static async getSportsmen(nonce, auth) {
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=sportsmen_get",
			data: { nonce: "x", auth: false },
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
	static async saveSportsman(sportsman, nonce, auth) {
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=sportsman_save",
			data: { nonce: "x", auth: false, sportsman },
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
	static async delSportsman(id, nonce, auth) {
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=sportsman_del",
			data: { nonce: "x", auth: false, id },
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
	static async saveLocation(location, nonce, auth) {
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=location_save",
			data: { nonce: "x", auth: false, location },
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
	static async getLocations(location, nonce, auth) {
		console.log("get locs");
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=locations_get",
			data: { nonce: "x", auth: false, location },
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		console.log("resp", response.data);
		return response;
	}
	static async delLocation(id, nonce, auth) {
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=location_del",
			data: { nonce: "x", auth: false, id },
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
	static async searchLocation(query, nonce, auth) {
		const data = typeof query === "string" ? { name: query } : { id: query };
		data.auth = false;
		data.nonce = "x";
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=location_search",
			data,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
	static async searchSportsman(query, nonce, auth) {
		const data = typeof query === "string" ? { name: query } : { id: query };
		data.auth = false;
		data.nonce = "x";
		const response = await axios({
			method: "POST",
			url: this.url + "/wp-admin/admin-ajax.php?action=sportsman_search",
			data,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
		return response;
	}
}
