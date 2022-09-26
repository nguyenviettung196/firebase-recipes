import firebase from "./firebaseConfig";
import {
	addDoc,
	doc,
	getDoc,
	collection as firestoreCollection,
	query,
	where,
	orderBy,
	limit,
	startAfter,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

const firestore = firebase.firestore;

const createDocument = (collection, document) => {
	return addDoc(firestoreCollection(firestore, collection), document);
	// return firestore.collection(collection).add(document);
};

const readDocument = (collection, id) => {
	return getDoc(doc(firestoreCollection(firestore, collection), id));
};

// const readDocuments = async ({ collection }) => {
// 	const collectionRef = firestoreCollection(firestore, collection);
// 	const firestoreQuery = query(collectionRef);
// 	return getDocs(firestoreQuery);
// };

const readDocuments = async ({
	collection,
	queries,
	orderByField,
	orderByDirection,
	perPage,
	cursorId,
}) => {
	const collectionRef = firestoreCollection(firestore, collection);
	const queryContraints = [];
	if (queries && queries.length > 0) {
		for (const query of queries) {
			queryContraints.push(
				where(query.field, query.condition, query.value)
			);
		}
	}

	if (orderByField && orderByDirection) {
		queryContraints.push(orderBy(orderByField, orderByDirection));
	}
	if (perPage) {
		queryContraints.push(limit(perPage));
	}
	if (cursorId) {
		queryContraints.push(startAfter(document));
	}
	const firestoreQuery = query(collectionRef, ...queryContraints);

	return getDocs(firestoreQuery);
};

const updateDocument = (collection, id, document) => {
	return updateDoc(
		doc(firestoreCollection(firestore, collection), id),
		document
	);
};

const deleteDocument = (collection, id) => {
	return deleteDoc(doc(firestoreCollection(firestore, collection), id));
};
const firestoreService = {
	createDocument,
	readDocument,
	readDocuments,
	updateDocument,
	deleteDocument,
};

export default firestoreService;
