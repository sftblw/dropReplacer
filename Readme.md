# dropReplacer

![showcase](./doc/showcase.gif)

Rename drag-dropped files by regular expression (regex).

A simple electron app. currently tested only on windows.

## capability & todo list

- [x] dropReplacer the base
  - [x] drag-drop
  - [x] rename by regex
- [ ] options
  - [x] include or exclude extension
- [ ] ~~Show dragging files match info~~ : not work: [chromium / electron issue](https://github.com/electron/electron/issues/9840)
- [ ] Check regex
  - [ ] highlight regex
    - [x] brace
    - [x] escape sequence - basic
  - [ ] is valid regex?
  - [ ] is valid file name?
  - [ ] escape invalid renaming rules to right ones
- [ ] ~~A neat progress bar~~: is not needed
- [x] Cleaner look
- [ ] Log renamed files
- [ ] ~~Undo~~: too complicated
- [ ] Resize images to fit below specific size?: wishlist
- [x] Icon for packaged binary
- [ ] auto update

## dev

only some npm commands.

- `npm start` : Test. run `electron-prebuilt` for testing app.
- `npm run build` : Make excutables. run `electron-packager` for windows.

## etc

Yes, It's just a program for tagging anime-names into anime-captured images! XD
