#Verified library for templates

Master will not point to anything, checkout individual branches.

I will list versions bump notices here and the changes if they are important to the library user on each version bump:

0.3.1
______________________________________
- Fixed critical bug with custom domain and signing url


0.3.0
______________________________________
- Added request authorization for companyUid param
- Stopped polling in id_rights when response is 404
- Replaced fetch with Axios for requests


### Commonly used properties

*Try to keep sent data in ' lower camel case'*

Special significance: **orgNo**

Other examples:

- firstName, lastName, personNumber, email, phone, mobile, customerName, country
- postalCode, postalTown, postalAddress
