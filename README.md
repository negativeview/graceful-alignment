![Latest Release Download Count](https://img.shields.io/github/downloads/negativeview/graceful-alignment/latest/module.zip)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fgracefulalignment&colorB=4aa94a)](https://forge-vtt.com/bazaar#package=gracefulalignment)
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fgracefulalignment%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/gracefulalignment/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fgracefulalignment%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/gracefulalignment/)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnegativeview%2Fgraceful-alignment%2Fmaster%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)
![Repository License](https://img.shields.io/github/license/negativeview/graceful-alignment)


# Graceful Alignment

Utility module to help aligning canvas elements precisely.

![The main alignment dialog window](images/alignment-0.png)

# How to Use

First, create a bunch of text drawings. Things work better if you have them in roughly the right position, but you do not have to care that much about precise positioning or sizes.

Secondly, select a group of drawings that have a precise relationship with eachother.

Click the Graceful Alignment button under the drawings menu.

Fill in the fields required to get the behavior you want (see the section below labelled Behavior), and click the checkbox. Your drawings will be sized and positioned accordingly.

# Behaviors

1. If you provide a value for "Base X" and "Offset X", all selected elements will be sorted by their current X position (ties will then sort by their current Y position). Then, starting from the left-most element, the first element will be assigned an X position of "Base X." The next one will be "Base X" + "Offset X". Each subsequent element will be "Offset X" further right from the previous element. Basically, put them all in a horizontal line.

2. If you provide a value for "Base X" but leave "Offset X" blank, all elements will have their X value set to "Base X." This will align all of their left edges.

3. If "Base X" is not set, but "Offset X" is set, we find the element with the lowest X value, and pretend like you typed that into "Base X." Behavior is otherwise exactly the case were both were set. This also sets everything into a horizontal line, but intuits the furthest-left position instead of requiring you to provide it.

4. "Base Y" and "Offset Y" behave exactly the same as their "X" counterparts, with the logical chances.

5. Size X set: Sets the width of all selected elements equal to Size X.

6. Size Y set: Sets the height of all selected elements equal to Size Y.