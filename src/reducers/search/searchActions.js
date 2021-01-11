export const SEARCH = "SEARCH";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

export const searchWithFilters = (
	e,
	query,
	firebase,
	history = null,
	emitSearchFunction,
	filters
) => {
	console.log("searching with filters");
	if (e) e.preventDefault();
	let results = [];
	//filter on javascript side

	firebase.db
		.collection("weddings")
		.orderBy("nameLowerCase")
		.startAt(query.toLowerCase())
		.endAt(query.toLowerCase() + "\uf8ff")
		.limit(25)
		.get()
		.then((snapshot) => {
			console.log("finished filtering");
			console.log(results);
			snapshot.forEach((doc) => {
				let weddingEntry = doc.data();

				/////////filtering
				let isDateFilterEnabled =
					!!filters.dateStart && !!filters.dateEnd;
				let isGroomFilterEnabled = filters.groomName !== "";
				let isBrideFilterEnabled = filters.brideName !== "";

				//apply date filters
				let ceremonyDate = weddingEntry.ceremonyDate.toDate();
				ceremonyDate.setHours(0, 0, 0, 0);
				ceremonyDate = ceremonyDate.getTime();
				let fromDate = new Date(
					filters.dateStart.replace("-", "/")
				).getTime();
				let toDate = new Date(
					filters.dateEnd.replace("-", "/")
				).getTime();
				let isDateBetween =
					fromDate <= ceremonyDate && ceremonyDate <= toDate;
				//apply groomFilters
				let groomName = weddingEntry.groomNameLowercase;
				let isLikeGroomName = groomName.includes(filters.groomName);
				//apply brideFilters
				let brideName = weddingEntry.brideNameLowercase;
				let isLikeBrideName = brideName.includes(filters.brideName);

				//only add to the results the entries that meet the filter (or ignore filter if not used)
				if (
					(isDateBetween || !isDateFilterEnabled) &&
					(isLikeGroomName || !isGroomFilterEnabled) &&
					(isLikeBrideName || !isBrideFilterEnabled)
				) {
					results.push({ id: doc.id, data: doc.data() });
				}
			});
			emitSearchFunction(query, results);
			if (history) history.push(SEARCH);
		})
		.catch((error) => console.log(error));
};
