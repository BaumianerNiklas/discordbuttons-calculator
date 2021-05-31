# Fully Functioning Calculator with Discord Message Buttons

## Important Note

This is part of my testing bot, so that's also why the command and event handlers are included. I made the calculator because I liked the idea and not because I wanted it to actually be used by lots of people. So, this uses a VERY hacky approach and is storing the current expression in a textfile. This is not scalable **AT ALL**, especially when multiple servers and users are using it at the same time. Do NOT use this on a bot that's going to be actually used by people.

## Requirements

This uses the master branch of discord.js, which is a branch that has support for slash commands but is still being rapidly developed. For the buttons, raw API requests are sent to Discord via the `client#api` property.
For the actual math, `mathjs` is used.

## The Calculator

The main logic of the calculator is on the `src/commands/calculator.js` file and the `src/bot.js` file.
[Preview](https://www.reddit.com/r/discordapp/comments/nombq7/i_implemented_a_fully_functioning_calculator/?utm_source=share&utm_medium=web2x&context=3)