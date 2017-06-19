# wcm-members-module

This module gives you the opportunity to use astad authentication in the WCM.

## Prerequisites
 - A running implementation of the Pelorus CMS is needed either locally or on a server.
 (see https://github.com/hvperdrive/pelorus-cms)
 - Node needs to be installed on the system.
 (see https://nodejs.org)
 - Gulp needs to be installed globally on the system (npm i gulp -g).

## How to install
1. Clone or download the zip of this repository.
2. Run "npm install" in the main folder directory.
3. Run "gulp build" in the main folder directory.
4. Upload the zip created by previous steps (located in the "dist" folder).

## Usage

### API
You can find the API reference in the swagger/output folder as a swagger definition.
You can beautify the output by copying the content into a swagger editor (eg. http://editor.swagger.io/#/).

### Implementation

#### Service (eg. Twitter, A-profiel, ...) flow
1. Redirect the user to '/members/auth/:type' with at least a 'success_redirect' query parameter. <br>
`/members/auth/:type?` <br>
&nbsp;&nbsp;&nbsp;&nbsp;`success_redirect=Your success redirect&` <br>
&nbsp;&nbsp;&nbsp;&nbsp;`error_redirect=optional error redirect`
2. Catch the authorization_code (or error) as a query on the redirect(s) you specified. <br>
`http(s)://your_success_redirect?authorization_code=your appointed authorization code` <br>
`http(s)://your_error_redirect?message=error message&errorType=type to program against`
3. Use the authorization_code to request a access token <br>
`/members/auth/token?authorization_code=your code here`
4. Store the access token and service type (eg. twitter, aprofiel, ...).
5. Always set the following headers when requesting user specific data:
    - Authorization header: `authorization: "Bearer Your access code here"`
    - service type header: `service_type: "the sercive type (eg. twitter, aprofiel, ...)"`

#### Local register flow
Send the date of the new member as follows:
```json
{
    username: 'Username',
    // IMPORTANT: The password needs to be hashed by the sha256 algorithm!
    // Example library: https://github.com/brix/crypto-js
    passowrd: 'SHA256 hashed password',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'e-mail',
    avatarUrl: 'URL', // optional
    phone: 'phone', // optional
}
```

#### Local login
Redirect to: <br>
`/members/auth/local?` <br>
&nbsp;&nbsp;&nbsp;&nbsp;`username=username&` <br>
&nbsp;&nbsp;&nbsp;&nbsp;`password=hashed password (SHA256)&` <br>
&nbsp;&nbsp;&nbsp;&nbsp;`success_redirect=Your success redirect&` <br>
&nbsp;&nbsp;&nbsp;&nbsp;`error_redirect=optional error redirect`

### Important notes

- The password needs to be hashed by the sha256 algorithm! <br>
This is used to prevent showing plain text passwords in debugger network tab. <br>
This alone is not enough! Always use HTTPS for Authentication calls!!! <br>
We recommend using this library: https://github.com/brix/crypto-js

## Module development

Please read the following on how to work with WCM modules before changing anything to this repo.

[Modules manual](https://github.com/hvperdrive/pelorus-cms/blob/develop/readmes/modules.md)
