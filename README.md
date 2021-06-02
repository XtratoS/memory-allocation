# What Is This?
This is a Desktop Application - which can be also treated as a web application since its core is written in React - that's built using Electron.
This application shows the implementation of different memory allocation methods, namely; First Fit, Best Fit and Worst Fit
# How Does It Work?
1. On the first page, we input the size of the memory in bytes, then we hit enter or press on Submit button
2. On the second page, we first insert the holes, when holes overlap you will recieve an error message, also when any new hole is inserted, it is shown on the rightmost column.
3. After inserting the holes, the Add Process button will be enabled.
4. Note that the system inserts the first process for us by default, so we type the process name and click on Save beside the process name text box.
5. We click on Add Segment to insert the first segment in the first process.
6. We input the name and size of the segment then press on Save below the segment information text boxes.
7. We can hide Holes and Processes using the \[hide\] buttons.
8. We choose the Allocation Method from the dropdown menu, and get the result right below it.
9. We input as many processes/segments like we did in the previous steps.
10. We can traverse between Processes using the menu in the rightmost column, the selected process's backgroud is in yellow/orange.
11. We can remove a segment by clicking on the trash icon beside it.
12. We can remove a process by clicking on the Remove Process button.
# Additional Implemented Features
Error checking:
- User can't insert overlapping holes.
- User can't insert a negative size for the memory, a hole or a segment
Live Modification:
- User can switch between different Allocation Methods at any time.
- User can add holes at any time.
- User can add Processes and Segments and Remove them at any time.
Output View:
- The output view of the memory size is scaled to a 500 pixels height column.
- 