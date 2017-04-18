'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as request from 'request';

// variables
var configuration = vscode.workspace.getConfiguration('microsoftteams');
// Retrieve one of more Microsoft Teams webhooks from the settings.json file
let webhooks = configuration.get('teamswebhook');

// Microsoft Teams Class
class MicrosoftTeams {
    private _statusBarItem: vscode.StatusBarItem;
    private savedWebhook: string;

    private pickTeams() {
        return vscode.window.showQuickPick(Object.keys(webhooks), { matchOnDescription: true, placeHolder: 'Select a channel' });
    }

    public postMessage() {
        var options = {
            prompt: "Please enter a message",
            value: this.savedWebhook
        };
        vscode.window.showInputBox(options).then(text => {
            if (text) {
                // Select Webhook uri from settings
                var microsoftteams = new MicrosoftTeams;
                var team = microsoftteams.pickTeams()
                team.then(item => {
                    //console.log(webhooks[item]);
                    this.savedWebhook = webhooks[item];

                    var options: any = {
                        url: this.savedWebhook, // Retrieve Webhook uri from settings.
                        method: 'POST',
                        json: { text: text } // TODO Add title parameter

                    };
                    //Start the request
                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            //console.log(body);
                            // Display a message box to the user
                            vscode.window.showInformationMessage('Message Posted');
                        }
                        else
                            //console.log(error);
                            vscode.window.showErrorMessage(error);
                    });
                });



            };
        });
    }

    dispose() {
    }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    if (webhooks) {
        let microsoftteams = new MicrosoftTeams();
        // send typed message
        vscode.commands.registerCommand('extension.postMessage', () => microsoftteams.postMessage());

        // Add to a list of disposables which are disposed when this extension is deactivated.
        context.subscriptions.push(microsoftteams);
    }
    else {
        vscode.window.showErrorMessage('Please enter a team token to use this extension.');
    }
}