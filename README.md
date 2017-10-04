#Verified library for templates

Master will not point to anything, checkout individual branches.

I will list versions bump notices here and the changes if they are important to the library user on each version bump:

### Commonly used properties

*Try to keep sent data in ' lower camel case'*

Special significance: **orgNo**

Other examples:

- firstName, lastName, personNumber, email, phone, mobile, customerName, country
- postalCode, postalTown, postalAddress

1.2.1-prealpha
______________________________________
- Added the ability to upload files after an envelope has been created.
- Added possibility to modify recipients ( Add, remove , update )
- Added posibility to submit user data however times needed
( see docs for more info )

1.1.0-prealpha
______________________________________
- Added ability to trigger flow action and receive result

0.6.0
______________________________________
- Provided getMyRoles method in VeLib.core
- Fixed params document uid and descriptor selectors based on private /public template


0.4.0
______________________________________
Added behavior to send x-namespace companyUid by looking into params in public templates requests helper.
( However this should not affect any old templates )

0.3.1
______________________________________
- Fixed critical bug with custom domain and signing url


0.3.0
______________________________________
- Added request authorization for companyUid param
- Stopped polling in id_rights when response is 404
- Replaced fetch with Axios for requests


0.3.3
______________________________________
- Will only issue an warning in case access token is missing from the URL.
- VeLib.core.init now accepts second argument the descriptor_id so it can be removed from the url
