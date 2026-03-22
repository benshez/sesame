# Sesame Backend

## To generate a Google App Password
Follow these steps:

Enable 2-Step Verification:
You must have 2-Step Verification (2SV) enabled on your Google Account.  Go to your Google Account > Security > 2-Step Verification and turn it on using a phone number, authenticator app, or security key. 

```
Access App Passwords Page:
Go directly to the App Passwords page: https://myaccount.google.com/apppasswords. You may be prompted to sign in again. 
```

Create the App Password:

Select Other from the "Select app" dropdown. 
Enter a name for the app (e.g., "Mail Client", "Yeastar PBX", "Snov.io").
Click Generate.
A 16-digit app password will appear.  Copy it immediately—you won’t be able to view it again. 
Use the Password:
Use this 16-digit code in place of your regular Google password when configuring apps like email clients, SMTP/IMAP setups, or third-party tools. 


## To use Gmail as an SMTP host
Configure your application or device with the following settings:

SMTP Server: smtp.gmail.com
Port: Use 587 with TLS or 465 with SSL
Authentication: Enable SMTP authentication
Username: Your full Gmail or Google Workspace email address (e.g., you@gmail.com)
Password: Your Gmail password or an App Password if 2-Step Verification is enabled 