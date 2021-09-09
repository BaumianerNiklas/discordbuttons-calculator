# Fully Functioning Calculator with Discord Message Buttons

**The code in the new calculator doesn't work anymore.** (The old one should still work, but that shouldn't be used at all anyway, as you can read below)
The new implementation was made on a development branch of Discord.js, and there has since been some breaking changes that make this command now broken, so this repo has also been archived. However, there's a reworked version (in TypeScript and with a few more features) in my main bot, [which you can check out here!](https://github.com/BaumianerNiklas/Waddle-Bot/blob/rewrite/src/commands/Fun/calculator.ts)

## Note
This is part of my testing bot, so that's also why the command and event handlers are included. 

After the Message Components PR has been merged into the dev branch of Discord.js, I decided to redo this calculator command. Also changed some little things (especially nicer formatting), but it should work pretty much the same as the former version. This approach is also actually usable, so feel free to implement this into your own bots! For the new version, see `src/commands/calculator-new.js`. (If you want to use this in your bot you need to install the master branch of Discord.js via `npm i discord.js@dev`.)

---
### **Everything below this point only applies to the old version, which you should not use anyway.** 


I made the calculator because I liked the idea and not because I wanted it to actually be used by lots of people. So, this uses a VERY hacky approach and is storing the current expression in a textfile. This is not scalable **AT ALL**, especially when multiple servers and users are using it at the same time. Do NOT use this on a bot that's going to be actually used by people.

## Requirements

This uses the master branch of discord.js, which is a branch that has support for slash commands but is still being rapidly developed. For the buttons, raw API requests are sent to Discord via the `client#api` property.
For the actual math, `mathjs` is used.

## The Calculator

The main logic of the calculator is on the `src/commands/calculator.js` file and the `src/bot.js` file.
[Preview](https://www.reddit.com/r/discordapp/comments/nombq7/i_implemented_a_fully_functioning_calculator/?utm_source=share&utm_medium=web2x&context=3)
