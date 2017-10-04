### Dev:
- "npm run watch" for local watch and dev bundle generation

- "npm run build" for final output

______________________________________

### Lib user


##### *Scripts loading inside your template html*
```html
	<!-- Your own javascript for UI handling / framework , your scripts, etc. -->
    <script type="text/javascript" src="scripts/main.js"></script>

    <!-- Mandatory -->
    <script src="../dist/dev/ve.core.js"></script>

    <!-- Add-on API's . Only load if you require them-->
	<script src="../dist/dev/ve.public_templates.js"></script>
	<script src="../dist/dev/ve.private_templates.js"></script>
	<script src="../dist/dev/ve.id_rights.js"></script>
    <script src="../dist/dev/ve.bisnode.js"></script>
```

The library exposes the following objects into the global context:

```javascript
Object {} VeLib.core
Object {} VeLib.public_templates
Object {} VeLib.private_templates  // if appropriate script is imported only
Object {} VeLib.id_rights // if appropriate script is imported only
Object {} VeLib.bisnode
```
___

**Available actions on each object and their results**

Notes:
* A promise with () means an empty returned object in the success callback*
* All operations from add-on must be acted on only after loading the core, like in the examples

###### CORE
```javascript
	VeLib.core = {
    	init({ descriptor_id: [ String descriptor_id ] , initialState: [Object ]}){ return Promise() }
        // Sets up the library data and authentication using the url params and must be called immediately
    	// Optional domain if the library with the template is hosted at your specific url
        // Optional descriptor_id can be specified so that it can be missing in the URL.
        // Usage: VeLib.core.init("mydomain", "Hstzse-").then(() => { *your code here* })

		getMyRoles() { retrurn Array[role, role ... ]}
		// Returns a list of roles based on the token information

		runFlowTask({ taskName: String , [ body: Object ]) { return Promise() }
		// input is a flow action statement eg: send.notification, will call envelopes/1oc5owc/jobs/send.notification
		// return flow data depending on flow state and particularities / integrations
		// When used with public templates, it must be made sure that it is ran only
		// after 'public_templates.init()' is successful. This call requires the envelope to be created already.

    }

```
##### Private template

<i> Note: </i> Functions to be used while inside the Verified platform filling step, which can be determined by checking the existence role:

```javascript
const defaultOwnerRole = {
	label: 'roles',
	name: '/roles/owner'
}
```
If this is the only role returned by the <b>core.getMyRoles</b> function, it means it is running inside the Verified platform filling step.

<b>VeLib.private_templates</b> methods:

```javascript
        getTemplateData(){ return Promise(Object data) }
        // Useful if some data has already been submitted, you could load this data
        // in your variables for initialization purposes

        putTemplateData(Object userData){ return Promise() }
        // input is an object with all the required userData property-value fields present

        // Only to be used in special cases where the adding recipients step needs to take place inside the Verified platform envelope creation stage. (Fills in the second step automatically)

		saveRecipients(Array [recipientObject]){ return Promise }
        // Array of recipients, if the objects already include an "id" property, they will be saved ( PUT action). Otherwise, they will be inserted.

        removeRecipient(Object recipientObject){ return Promise }
        // A recipient object where the only mandatory property is the 'id' property . Useful for cases where the template editing mode is re-opened, in conjuction with the saveRecipients method.

```
##### Public template

VeLib.public_templates methods:

```javascript
	init() { return Promise(Object statusInfo)
	// Object statusInfo = { needsContextCreation: false || true }
    // Will return true if no data already present in the template
    // Future use: If the iframe has been opened for the first time ( not forwarded)

	getTemplateInterface() { return Promise(Array [Object templateObject] ) }
	// a templateObject array is returned, methods on these objects are explained a further bit down.
   	 // commonly you would use var template = returnedTemplateObjects[0]

	submitFormData(boolean [value]){ return Promise() }
	// This should be done as late as possible, to avoid unnecessary creation of envelopes and other objects. This submits the data put into all templateObject interfaces. No remote action is done on them until this 'global' function is called.
    // In the case of submitting user data more than once for intermediary steps, it should be run in the form of submitUserData(true), to avoid the creation of a second envelope.

	getAvailableSigningMethods(){ return Promise( Array [String signingMethod] ) }
	// an example would be ["bankid-se", "email"]

	publish(){ return Promise(String urlForSigning) }
	// must be called to finalize process if needsContextCreation is false.
    // if instead you want to forward, you will need to issue a forward action instead
	// For immediate signing, the user would have to be redirected using the urlForSigning provided

	addRecipient(Object RecipientObject){ return Promise() }
	// Remotely adds a recipient to the envelope
	// RecipientObject must be of the form:
	// {
	//    email: String - Your email or somebody else's for forward
	//    familyName: String
	//    givenName: String
	//    signingMethod: String - One of the available signing methods returned by using getAvailableSigningMethods
// }

```

##### Bisnode

VeLib.bisnode methods:

```javascript
	getCompanyInfo(String orgNumber){ return Promise(data) }
	getPersonInfo(String personSSN){ return Promise(data) }
```


##### The templateObject methods

```javascript
	setData() { return void }
	// A sync/ non-remote action for bootstraping the template data for global submission (submitFormData)

	getData() { return Object userDataThatHasBeenAlreadySet}
	// useful if you want to check what user data is going to be submitted for a specific template at a specific moment

	getInfo() { return Object descriptorInformation }
	// If you want to get more details about the template, from the envelope definition. No need to call this unless you are explicitly looking for something
```

##### ID rights API

```javascript

getCompanyAuthorities(String organisationNumber) {
    return Array(Object authorityObject])
}
```
___

#### Practical example of method chaining and operations for a case of public template use

```javascript

// Call this chunk on initial page load

var onYourPageLoadCallback = () => {
  VeLib.core.init({}).then() => {
      return VeLib.public_templates.init()
  })
  .then((statusInfo) => {
     myScope.iShouldDisplaySomeForwardingMessage = !statusInfo.needsContextCreation
     return VeLib.public_templates.getTemplateInterface()
  })
  .then((templateObjects) => {
      myScope.template = templateObjects[0]
      // i save this into an outside context so i can run methods on it when the user submits
  })

}
  // Call this chunk after the user has filled in all data, including the recipient form with all the necessary data required from a recipient,

  var onYourSubmitAction = () => {
      // Call this code as a handler the final "submit" or "send button" you provide
      myScope.template.setData(myScope.myGatheredData)
      VeLib.public_templates.submitFormData()
      .then(() => { return VeLib.public_templates.getAvailableSigningMethods() })
      .then((availableMethods) => {
          return VeLib.public_templates.addRecipient({
              email: myScope.recipient.email,
              familyName: myScope.recipient.familyName,
              givenName: myScope.recipient.givenName
              signingMethod: availableMethods[0]
          })        
      })
      .then(() => { VeLib.public_templates.publish()})
      .then((redirectUrl) => myInterface.displayRedirectingInSecondsPage(redirectUrl))
}
//Feel free to break the flow at anytime and do additional operations in/on your UI if that is needed, but make sure to maintain the order of operations.
```
