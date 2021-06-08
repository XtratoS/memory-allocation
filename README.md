# What is this?
- This is a Desktop Application - which can be also treated as a web application since its core is written in **React** - that's built using **Electron**.
- This application shows the implementation of different memory allocation methods, namely; **First Fit**, **Best Fit** and **Worst Fit**.

# How to use it?
## Hosting the application
- A live version of this application is hosted using github pages:
  https://xtratos.github.io/memory-allocation/
- Using the desktop application
  Download the .exe file from releases
  https://github.com/XtratoS/memory-allocation/releases/download/v1.0.0/memory-alloc.exe

- To build the application on your machine
  1. Clone the repository.
  2. Use `npm install` to install dependancies.
  3. Use `yarn electron:build` to build the application.
  4. Run the application from the executable created in `/dist`.

## Using the application
1. On the first page, we input the size of the memory in bytes, then we hit enter or press on Submit button.
2. On the second page, we first insert the holes, when holes overlap you will recieve an error message, also when any new hole is inserted, it is shown on the rightmost column.
3. After inserting the holes, the Add Process button will be enabled.
4. Note that the system inserts the first process for us by default, so we type the process name and click on Save beside the process name text box.
5. We click on Add Segment to insert the first segment in the first process.
6. We input the name and size of the segment then press on Save below the segment information text boxes.
7. We can hide Holes and Processes using the \[hide\] buttons.
8. We choose the Allocation Method from the dropdown menu, and get the result right below it.
9.  We input as many processes/segments like we did in the previous steps.
10. We can traverse between Processes using the menu in the rightmost column, the selected process's backgroud is in yellow/orange.
11. We can remove a segment by clicking on the trash icon beside it.
12. We can remove a process by clicking on the Remove Process button.

# Additional Implemented Features
- Added Worst Fit Option.
- Error checking:
  - User can't insert overlapping holes.
  - User can't insert a negative size for the memory, a hole or a segment.
  - User can't insert a hole that's outside the memory's boundary.
- User can apply **External Compaction** by pressing the **Squash All Holes Together** button.

# Other Features
- Live Modification:
  - User can switch between different Allocation Methods at any time.
  - User can add holes at any time.
  - User can add Processes and Segments and Remove them at any time.
  - When deallocating a process, all segments are automatically reallocated.
- Output View:
  - The output view of the memory is scaled to 480 pixels by default.
  - The output view can be expanded to 960 pixels and contracted back to 480 pixels on demand.
- When one or more process(es) allocation fails, the user is alerted with the failed process(es).

# Known Bugs
*When a bug is fixed it will marked as [x]*
- [ ] When expanding or contracting the segment view column, if one or more processes couldn't be allocated, the error message will appear again.