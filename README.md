# Behaviors

1. Base X set, Offset X set: Sorts all elements by their current X position (ties are sorted by Y position). Starting with the left/top most, sets their X position to `Base X + (Offset X * (Number - 1))`.
2. Base X set, Offset X not set: Sets the X position of all selected elements to Base X. ie, aligns them all.
3. Base X not set, Offset X set: Finds the left-most item, acts like you set Base X to its value. Behaves as if you set both Base X and Offset X.
4. Behavior is the same for Base Y and Offset Y, but with appropriate values instead of X/Left.
5. Size X set: Sets the width of all selected elements equal to Size X.
6. Size Y set: Sets the height of all selected elements equal to Size Y.