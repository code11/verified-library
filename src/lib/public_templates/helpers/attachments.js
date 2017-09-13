const state = VeLib.core.state
const configs = VeLib.core.configs
const callForData = VeLib.core.remote.callForData
const callAndReturnLocation = VeLib.core.remote.callAndReturnLocation

export let AttachmentsHelpers = {

	buildFilesUrl: () => {
		let url = `${ configs.get().envelopesUrl }`
		url += `/${ state.get().remoteEntities.envelope.id}`
		url += `${ configs.get().documentsAppendix }`
		url += `/${ configs.get().remoteEntities.document.id }`
		url += '/files'
		console.log("Built url is", url)
		return url
	},

	getUploadUrl: ({ name }) => {
		let url = this.buildFilesUrl()

		return callForData({
			method: "POST",
			url: url,
			body: {
				fileType: "attachment",
				name: name || "Uploaded file"
			}
		})
	},
	uploadFile: ({ file, name }) => {

		return this.getUploadUrl({ name }).then((response) => {
			return callForData({
				method: "PUT",
				url: response.url,
				disableToken: true,
				body: file,
				headers: {
					"Content-Type": "application/octet-stream"
				}
			})
		})
	},

	getAllFiles: () => {
		let url = this.buildFilesUrl()

		return callForData({ method: "GET", url: url })
		.then((files) => {
			let getFilePromises = []

			files.forEach((file) => {
				getFilePromises.push(
					callForData({
						method: "GET",
						url: file.uid + "/url?asObject=1"
					})
				)
			})

			return Promise.all(getFilePromises).then((fileUrls) => {

				console.log("Get all files promise was completed")

				files = files.map((file, index) => {
					file.downloadUrl = fileUrls[index].url
				})

				return files
			})
		})
	},
	removeFile: ( uid ) => {
		return callForData({
			method: "DELETE",
			url: uid
		})
	}
}
