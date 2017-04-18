# Visual Studio Code Microsoft Teams extension

This extension is not created by, affilated with, or supported by Microsoft.

## Features

With the extension you can send messages to multiple Microsoft Teams using configured webhooks for those teams.

The following features are currently implemented:
1. Send message to a Microsoft Team
2. Send current open file in vscode to a Microsoft Team

## Requirements

Before you can use this extension you first need to configure a webhook in Microsoft Teams for the team you want to post messages to.

### Create the webhook
Follow the steps below to see how to send a simple card to a connector:
1. From within Microsoft Teams, click ... next to the channel name and then select Connectors.
2. Scroll through the list of connectors to Incoming Webhook, and click Add.
3. Enter a name for the webhook, upload an image to associate with data from the webhook, and select Create.
4. Copy the webhook to the clipboard and save it. You'll need the webhook URL for sending information to Microsoft Teams.
6. Click Done.

After saving the webhook(s) you need to configure the following vscode settings.

Go to User Settings (File > Preferences > User Settings) and add the following 
```
    // Microsoft Teams Webhooks
    "microsoftteams.teamswebhook": {
        "<your microsoft team name>: "<webhook>",
        "<your microsoft team name>: "<webhook>"
    }
```

* ##### `"microsoft teams name"` (required)
    * You can enter any name you like as long as you know which team it represents.

* ##### `"webhook"` (required)
    * Enter the webhook value you copied when creating the Microsoft Team Webhook


If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Known Issues

* Some code formatting issues when sending current file.
* Keyboard short-cut is not working yet.

## Release Notes

### 1.0.3

Initial release of the Visual Studio Code Microsoft Teams extension.

Added features Send Message and current file.

-----------------------------------------------------------------------------------------------------------
