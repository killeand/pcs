# Pathfinder Character Sheet Manager
This project is a character sheet manager for the roleplaying game Pathfinder (1st edition). This manager is not meant to be a wizard (because I do not have access to a db of classes, items, spells, feats, etc...), or an online tabletop system (its mostly supposed to be used offline). So then the question might be, then what use is this?

This is an offline character sheet manager. You remember those sheets we used to print off that contained no information whatsoever that you filled in with your character details? Yes, that, but now digital. And while I was at it, I took care of a couple calculations for you. Not only that, but you can manage multiple characters, save share and load others too!

Project Requirements:
- Node v16+
- git

To get started, either clone the repo and run the following commands to get up and running and built:
```
# git clone https://github.com/killeand/pcs
# cd pcs
# npm install
# npm run build
```

Or you can download the latest release on the right under releases. It is a compiled all in one html page, no requesting online resources (at least not by me. Who knows about React...)

This file should be usable on any platform that has a browser, and that said browser has modern JS standards. It also contains a method for you to save and load characters (should the platform you are using allows you to save and load from the drive.). There is no big hidden secret as to the format of the save file. The Characters are saved in a JSON format (see /pcs/docs/SaveFileStructure.json) first, then encoded in base64 format, then changed to base64url format. If you look online you should be able to find a base64url decoder and see that it is exactly as I describe.