
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebaseStorageService from "../firebaseStorageService";

const ImageUploadPreview = ({ basePath, existingImageUrl, handleUploadFinish, handleUploadCancel }) => {
	const [uploadProgess, setUploadProgress] = useState(-1);
	const [imageUrl, setImageUrl] = useState("");
	const fileInputRef = useRef();
	useEffect(() => {
		if (existingImageUrl) {
			setImageUrl(existingImageUrl);
		} else {
			setUploadProgress(-1);
			setImageUrl("");
			fileInputRef.current.value = null;
		}
	}, [existingImageUrl]);

	async function handleFileChanged(e) {
		const files = e.target.files;
		const file = files[0];
		if (!file) {
			alert("File select failed. Please try again.");
			return;
		}
		const generatedFileId = uuidv4();
		try {
			const downloadUrl = await firebaseStorageService.uploadFile(
				file,
				`${basePath}/${generatedFileId}`,
				setUploadProgress
			);
			setImageUrl(downloadUrl);
			handleUploadFinish(downloadUrl);
		} catch (error) {
			setUploadProgress(-1);
			fileInputRef.current.value = null;
			alert(error.message);
			throw error;
		}
	}

	function handleCancelImageClick() {
		firebaseStorageService.deleteFile(imageUrl);
		fileInputRef.current.value = null;
		setImageUrl("");
		setUploadProgress(-1);
		handleUploadCancel();
	}

	return (
		<div className="image-upload-preview-container">
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChanged}
				ref={fileInputRef}
				hidden={uploadProgess > -1 || imageUrl}
			/>
			{!imageUrl && uploadProgess > -1 ? (
				<div>
					<label htmlFor="file">Upload Progress:</label>
					<progress id="file" value={uploadProgess} max="100">
						{uploadProgess}%
					</progress>
					<span>{uploadProgess}%</span>
				</div>
			) : null}
			{imageUrl ? (
				<div className="image-preview">
					<img src={imageUrl} alt={imageUrl} className="image" />
					<button type="button" onClick={handleCancelImageClick} className="primary-button">
						Cancel image
					</button>
				</div>
			) : null}
		</div>
	);
};

export default ImageUploadPreview;
